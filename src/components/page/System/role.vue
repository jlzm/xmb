<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix" v-if="limit==1">
        <div class="floatLeft leftBox clearfix">
          <el-form :inline="true" class="demo-form-inline" :model="searchData">

            <el-form-item>
              <div class="leftBtn btn" @click="newRole">

                <span class="btnTitle">新建角色</span>
              </div>
            </el-form-item>
          </el-form>

        </div>

      </div>
      <div class="contentBox clearfix bgWhite padTb10">
        <div class="pad20 bgWhite">
          <!-- 投标文件开始 -->
          <el-table
            ref="multipleTable"
            :data="roleList"
            stripe

            align="center"
            border
            tooltip-effect="dark"
            style="width: 100%"
          >
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="rolename"
              label="角色名称"
              align="center"
              width="280">
            </el-table-column>
            <el-table-column
              prop="remark"
              label="角色描述"

              align="center"
              show-overflow-tooltip>

            </el-table-column>
            <el-table-column
              prop="auth"
              label="角色权限"
              align="center"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="300"
              align="center">
              <template slot-scope="scope" v-if="limit==1">
                <el-tooltip class="item" effect="dark" content="角色详情" placement="top-end">
                  <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                  <el-button @click="onCompileVisible(scope.row)" type="success"
                             icon="el-icon-edit-outline"></el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                  <el-button type="danger" @click="onDelete(scope.row)" icon="el-icon-delete"></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- 投标文件结束 -->

        </div>
        <!-- 分页 -->
        <div class="pagination" v-if="roleList[0]">
          <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pagingChange"
            :total="Number(roleList[0].count)">
          </el-pagination>
        </div>


      </div>
    </div>


  </div>

</template>
<script>

  import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
  import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
  import vBidInfo from '../../common/BidInfo.vue';  //招投标信息

  import {Axios} from './../../../api/axios'
  import {Session} from './../../../api/axios'


  export default {

    data() {
      return {
        searchData: {
          antistop: '',
          area: '',
          principal: ''
        },
        limit: JSON.parse(sessionStorage.getItem('limits'))['deptemp'],
        pageSize: 10,
        roleList: [],

        multipleSelection: [],
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
            }, {
              title: '导出线索',
              clickEvent: 'addRecord',
              icon: 'icon-jia'
            }
          ]
        },
        roleData:{
          mark:1,
          roleid:'',
          authname:'',
          describes:'',
        }

      }
    },

    components: {
      vParticularsTab, vProjectInfo, vBidInfo
    },
    activated() {
      this._getRoleList(1);
      localStorage.removeItem("roleData")
    },
    methods: {
      // 新建
      newRole() {
        this.$router.push({
          path: 'compileRole',
          query: {}
        })
      },
      // 详情
      onDetails(row) {
        this.$router.push({
          path: 'newRole',
          query: {
            roleid: row.roleid
          }
        })
      },
      //编辑
      onCompileVisible(row) {
        this.roleData.roleid = row.roleid;
        this.roleData.authname = row.rolename;
        this.roleData.describes = row.remark;
        localStorage.setItem("roleData", JSON.stringify(this.roleData))
        this.$router.push({
          path: 'compileRole',
          query: {
          }
        });
      },
      //删除
      onDelete(row) {
        console.log(row);
        this.loading = true;
        let reqBody = {
          "api": 'releremove',
          'companyid': sessionStorage.getItem('companyid'),
          "roleid": row.roleid
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res);
          if (res.state == 10001) {
            this.$message.success('删除成功');
            this.pagingChange(1)
          } else {
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);
        })
      },
      //分页
      pagingChange(val) {
        this._getRoleList(val)
      },
      _getRoleList(page) {
        this.loading = true
        let reqBody = {
          "api": "rolelist",
          "userid": sessionStorage.getItem('userid'),
          "page": page,
          "pagesize": this.pageSize,
          "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.roleList = res.data

          } else {
            if (res.state == 10002) {
              this.roleList = []
            }
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
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

  .border
    border-color: #00AC97
</style>
