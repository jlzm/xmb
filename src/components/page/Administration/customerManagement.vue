<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix">
        <div class="floatLeft leftBox clearfix">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="关键词">
              <el-input v-model="searchData.search" placeholder="请输入客户名称"></el-input>
            </el-form-item>


            <el-form-item>
              <div class="leftBtn btn" @click="onSearch">
                <span class="btnTitle">查询</span>
              </div>
            </el-form-item>

            <el-form-item v-if="limit==1">
              <div class="leftBtn btn" @click="onNew">
                <span class="btnTitle">新建</span>
              </div>
            </el-form-item>

          </el-form>

        </div>

      </div>
      <div class="contentBox clearfix bgWhite padTb10">
        <div class="pad20 bgWhite">
          <!-- 表格开始 -->
          <el-table
            ref="multipleTable"
            :data="folderList"
            stripe
            v-loading="loading"
            align="center"
            border
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="custmername"
              label="客户名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="addressd"
              label="所在地区"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="200"
              align="center">
              <template slot-scope="scope" v-if="limit==1">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                  <el-button @click="onCompileVisible(scope.row)" type="success"
                             icon="el-icon-edit-outline"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 表格结束 -->

        </div>
        <!-- 分页 -->
        <div class="pagination" v-if="folderList[0]">
          <el-pagination
            background
            :page-size="pageSize"
            layout="prev, pager, next"
            @current-change="pagingChange"
            :total="Number(folderList[0].count)">
          </el-pagination>
        </div>


      </div>
    </div>

    <el-dialog :title='title' :visible.sync="compileVisible" width="40%">
      <el-form class="newStaff">
        <el-form-item :required='true' label="客户名称：" label-position="left" label-width="100px">
          <el-input ref="custmername" v-model="searchData.custmername"></el-input>
        </el-form-item>
        <el-form-item :required='true' label="所在地区：" label-position="left" label-width="100px">
          <el-input ref="addressd" :disabled="searchData.latitude?false:true"  v-model="searchData.addressd"></el-input>
          <i class="mapIcon"  @click="mapVisible = true">
              <img src="static/img/mapIcon.png" alt="">
          </i>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="_onBasicAdd">保存</el-button>
      </div>
    </el-dialog>

    <v-map :mapVisible="mapVisible" :mapVal="mapVal" @closeVisible="closeVisible" @confirmVal="confirmVal"  v-if="mapVisible"></v-map>
  </div>

</template>
<script>

  import {Axios} from './../../../api/axios'
  import {Session} from './../../../api/axios'
  import vMap from '../../common/Map.vue';  //招投标信息

  export default {
    data() {
      return {
        title: '',
        search: '',
        loading: false,
        compileVisible: false,
        mapVisible:false,
        pageSize: 10,
        edit: 0,
        searchData: {
          custid: '',
          addressd: '',
          custmername: '',
          search: '',
          longitude:'',
          latitude:'',
        },
        folderList: [],
        limit: JSON.parse(sessionStorage.getItem('limits'))['deptemp'],
        mapVal:{},
        formulaList: { //编辑栏按钮数
          parent: 'marketClue',
          left: [
            {
              title: '编辑',
              clickEvent: 'compile',
              icon: 'icon-iconfontedit'
            }

          ],
          right: [
            {
              title: '新建线索',
              clickEvent: 'changeState',
              icon: 'icon-bianji'
            }
          ]
        },
      }
    },

    components: {vMap},
    created() {
      this._getBasicList(1)
    },
    methods: {
      // 搜索
      onSearch() {
        this.search = this.searchData.search;
        this._getBasicList(1)
      },
      //分页
      pagingChange(val) {
        this._getBasicList(val)
      },
      //获取列表数据
      _getBasicList(page) {
        this.loading = true
        let reqBody = {
          "api": "basiclist",
          "companyid": sessionStorage.getItem('companyid'),
          "uid": sessionStorage.getItem('userid'),
          "page": page,
          "search": this.search,
          "pagesize": this.pageSize,
          "type": "4"

        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.folderList = res.data

          } else {
            if (res.state == 10002) {
              this.folderList = []
            }
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
      },
      //新建
      onNew() {
        this.edit = 0;
        this.title = '新建客户';
        this.compileVisible = true;
        this.searchData.custmername = "";
        this.searchData.addressd = "";
        this.searchData.latitude = ''
        this.searchData.longitude = ''
      },
      // 编辑
      onCompileVisible(type) {
        this.mapVal = {
          lng:type.longitude,
          lat:type.latitude,
          address:type.addressd,
        }
        this.edit = 1;
        this.title = '编辑客户';
        this.compileVisible = true
        this.searchData.custmername = type.custmername
        this.searchData.custid = type.custid
        this.searchData.addressd = type.addressd
        this.searchData.latitude = type.latitude
        this.searchData.longitude = type.longitude

      },
      _onBasicAdd() {
        if (this.$refs.custmername.value == '' || this.$refs.addressd.value == '') {
          this.$message.error('输入框不能为空')
        } else {
          if (this.edit === 1) {
            let reqBody = {
              "api": "basicupdate",
              "companyid": sessionStorage.getItem('companyid'),
              "uid": sessionStorage.getItem('userid'),
              "custmername": this.searchData.custmername,
              "addressd": this.searchData.addressd,
              "fbasicid": this.searchData.custid,
              "longitude":this.searchData.longitude,
              "latitude":this.searchData.latitude ,
              "type": "4"

            }
            Axios(reqBody, 'user').then((res) => {
              console.log(res)
              if (res.state == 10001) {

                this.$message.success('修改成功!')
                this.compileVisible = false
                this._getBasicList(1)

              } else {
                if (res.state == 10002) {
                  this.folderList = []
                }
                this.$message.error(res.msg);
              }
              setTimeout(() => {
                this.loading = false
              }, 1000);

            })
          } else {
            let reqBody = {
              "api": "basicadd",
              "companyid": sessionStorage.getItem('companyid'),
              "uid": sessionStorage.getItem('userid'),
              "custmername": this.searchData.custmername,
              "addressd": this.searchData.addressd,
              "longitude":this.searchData.longitude,
              "latitude":this.searchData.latitude ,
              "type": "4"

            }
            Axios(reqBody, 'user').then((res) => {
              console.log(res)
              if (res.state == 10001) {

                this.$message.success('添加成功!')
                this.compileVisible = false
                this._getBasicList(1)

              } else {
                if (res.state == 10002) {
                  this.folderList = []
                }
                this.$message.error(res.msg);
              }
              setTimeout(() => {
                this.loading = false
              }, 1000);

            })
          }

        }
      },

      //地图相关
    closeVisible(mapVisible){
        console.log(mapVisible)
        this.mapVisible = mapVisible
    },
    confirmVal(mapVal){
        this.mapVisible = false
        console.log(mapVal)
        this.searchData.addressd = mapVal.address
        this.searchData.longitude = mapVal.lng
        this.searchData.latitude = mapVal.lat
    }



    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .bid
    width 100%
    padding 10px 15px
    overflow hidden
    .operationBox
      height 50px
      background-color #fff
      padding 10px
      padding-left 20px
      margin-bottom 10px
    .btn
      height 30px
      line-height 30px
      font-size 12px
      padding 0 15px
      border-radius 3px
      color #fff
      background-color #00AC97
      cursor pointer
      min-width 80px
      text-align center
    .leftBtn
      float left
      margin-right 5px
    .rightBtn
      float left
      margin-left 5px
    .returnBtn
      background-color #f4f4f4
      color #666
    .btnTitle
      vertical-align middle
    .newStaff
      width 60%
      margin 0 auto
      .el-select
        width 100%

  .border
    border-color: #00AC97
</style>
