<template>
  <div class="backlog">
    <div class="listBox">
      <div class="contentBox clearfix padTb10 bgWhite ">
        <div class="pad20 bgWhite">
           <el-table
            :data="purchaseTypeList"
            stripe
            v-loading="loading"
            align="center"
            border
            tooltip-effect="dark"
            style="width: 80%;">
            <el-table-column
              type="index"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="typename"
              label="采购类别"
              align="center">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="300"
              align="center"
              v-if="limit == 1 && jurisdiction.database.save == 1">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                  <el-button @click="onCompileVisible(scope.row)" type="success" icon="el-icon-edit-outline"></el-button>
                </el-tooltip>

              </template>
            </el-table-column>
          </el-table>
        </div>


      </div>
    </div>

    <el-dialog title="编辑采购类别" :visible.sync="compileVisible" width="40%">
      <el-form :model="searchData" class="newStaff">
        <el-form-item :required='true' label="采购类别：" label-position="left" label-width="100px">
          <el-input v-model="searchData.typename"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="_onBasicAdd">保存</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  import {Axios} from './../../../api/axios'
  import {Session} from './../../../api/axios'


  export default {
    data() {
      return {
        loading: false,
        compileVisible: false,
        purchaseTypeList: [],
        searchData: {
          typename: '',
          area: '',
          principal: '',
          basicsid:''
        },
        limit: JSON.parse(sessionStorage.getItem('limits'))['deptemp'],
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
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
            }
          ]
        },
      }
    },

    components: {},
    created() {
      this._getPurchaseTypeList(1)
    },
    methods: {
      //获取列表数据
      _getPurchaseTypeList(page) {
        this.loading = true
        let reqBody = {
          "api": "getpurchasetypelist",
          "companyid": sessionStorage.getItem('companyid'),

        }
        Axios(reqBody, 'index').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.purchaseTypeList = res.data

          } else {
            if (res.state == 10002) {
              this.purchaseTypeList = []
            }
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
      },
      // 弹出
      onCompileVisible(row) {
        this.compileVisible = true
        this.searchData.typename = row.typename
        this.searchData.basicsid = row.id
      },
      // 添加修改
      _onBasicAdd() {
        if (!this.searchData.typename) {
          this.$message.error('输入框不能为空')
        } else {
          let reqBody = {
            "api": "basicupdate",
            "companyid": sessionStorage.getItem('companyid'),
            "uid": sessionStorage.getItem('userid'),
            "fbasicid": this.searchData.basicsid,
            "typename": this.searchData.typename,
            "type": "1"

          }
          Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
              this.$message.success('修改成功!')
              this.compileVisible = false
              this._getPurchaseTypeList(1)

            } else {

              this.$message.error(res.msg);
            }


          })
        }

      }


    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .backlog
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
    .padB80
      padding-bottom 80px
    .padB60
      padding-bottom 60px

  .border
    border-color: #00AC97

  .purchaseListTitle
    line-height 50px
    border-bottom: 2px solid #ccc
    padding: 0 10px
    color: #666

  .purchaseItem
    line-height 50px
    border-bottom 1px solid #ddd
    padding: 0 20px
    font-size 14px
    color #666

  .newStaff
    width 60%
    margin 0 auto
    .el-select
      width 100%

  .dialog-footer
    text-align center
</style>
