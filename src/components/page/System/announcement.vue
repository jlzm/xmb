<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix">
        <div class="floatLeft leftBox clearfix">
          <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"
               @click="getFormulaBar(item.clickEvent)">
            <i class="iconfont marR5" :class="[item.icon]"></i>
            <span class="btnTitle">{{item.title}}</span>
          </div>
        </div>
      </div>
      <div class="contentBox clearfix bgWhite padTb10">
        <div class="pad20 bgWhite">
          <!-- 投标文件开始 -->
          <el-table
            ref="multipleTable"
            :data="tableData.list"
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
              prop="title"
              label="公告标题"
              align="center"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="createtime"
              label="发布时间"
              align="center"
              width="180">
            </el-table-column>

            <el-table-column
              prop="username"
              label="发布人"
              align="center">
            </el-table-column>

            <el-table-column
              fixed="right"
              label="操作"
              width="280"
              align="center">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="查看" placement="top-end">
                  <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view"></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                  <el-button type="success" icon="el-icon-edit" @click="setNoticeInfo(scope.row)"></el-button>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                  <el-button type="danger" icon="el-icon-delete"
                             @click="deleteNoticeInfo(scope.row.id)"></el-button>
                </el-tooltip>

              </template>
            </el-table-column>
          </el-table>
          <!-- 投标文件结束 -->

        </div>
        <!-- 分页 -->
        <div class="pagination" v-if="tableData">
          <el-pagination
            background
            @current-change="pagingChange"
            layout="prev, pager, next"
            :total="tableData.total">
          </el-pagination>
        </div>


      </div>
    </div>


    <el-dialog
      :visible.sync="noticeVisible"
      width="60%"
      class=""
      fullscreen>
      <div class="noticeTitle">{{atNotice.title}}</div>
      <div class="noticeContent" v-html="atNotice.content"></div>
    </el-dialog>

    <el-dialog
      :title="compileType==0?'新建公告':'编辑公告'"
      :visible.sync="compileVisible"
      width="60%"
      class="">
      <el-form label-width="100%" class="compileBox">
        <el-form-item :show-message='false' :required='true' label="公告标题" label-position="left" label-width="100px">
          <el-input v-model="compileData.title"></el-input>
        </el-form-item>
        <el-form-item :required='true' label="公告内容" label-width="100px">
          <quill-editor v-model="compileData.content"
                        class="editer"
                        :options="editorOption" @change="onEditorChang($event)">
          </quill-editor>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="onNoticeEdit">保存</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  import {Axios} from './../../../api/axios'
  import {Session} from './../../../api/axios'

  import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
  import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
  import vBidInfo from '../../common/BidInfo.vue';  //招投标信息

  // require styles 引入富文本样式
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    data() {
      return {
        loading: false,
        searchData: {
          antistop: '',
          area: '',
          principal: ''
        },
        tableData: [],
        multipleSelection: [],
        pageSize: 10,
        noticeVisible: false,
        compileVisible: false,
        compileType: 0,
        compileData: {
          endtime: '',
          starttime: '',
          title: '',
          content: ''
        },
        atNotice: {},
        formulaList: { //编辑栏按钮数
          parent: 'marketClue',
          right: [
            {
              title: '新建',
              clickEvent: 'new',
              icon: 'icon-bianji'
            }
          ]
        },
        editorOption: {},
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
      }
    },
    components: {
      vParticularsTab, vProjectInfo, vBidInfo,
    },
    created() {
      this.getnoticemanagelist(1)
    },
    methods: {
      //富文本编辑器
      onEditorChang({editor, html, text}) {
        // console.log(html);
        this.compileData.content = html;
      },
      //FormulaBar组件按钮事件 新建
      getFormulaBar(res) {
        for (var key in this.compileData) {
          delete this.compileData[key];
        }
        this.compileType = 0
        this.compileVisible = true
      },
      //查看详情
      onDetails(row) {
        console.log(row);
        this.atNotice = row
        this.noticeVisible = true
      },
      //编辑
      setNoticeInfo(row) {
        console.log(row);
        this.compileType = 1
        this.compileData = row;
        this.compileVisible = true
      },
      //删除
      deleteNoticeInfo(id) {
        this.loading = true;
        let reqBody = {
          "api": "deletenotice",
          "id": id
        }
        Axios(reqBody, 'index').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('删除成功!');
            this.compileVisible = false;
            this.getnoticemanagelist(1)
          } else {
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
      },
      //保存
      onNoticeEdit() {
        if (this.compileType == 0) {
          //新增保存
          this.loading = true;
          let reqBody = {
            "api": "addnotice",
            "userid": sessionStorage.getItem('userid'),
            "companyid": sessionStorage.getItem('companyid'),
            "title": this.compileData.title,
            "content": this.compileData.content,
          }
          Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
              this.$message.success('添加成功!');
              this.compileVisible = false;
              this.getnoticemanagelist(1)
            } else {
              this.$message.error(res.msg);
            }
            setTimeout(() => {
              this.loading = false
            }, 1000);

          })
        } else {
          // 修改保存
          this.loading = true;
          let reqBody = {
            "api": "updatenotice",
            "userid": sessionStorage.getItem('userid'),
            "companyid": sessionStorage.getItem('companyid'),
            "title": this.compileData.title,
            "content": this.compileData.content,
          }
          Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
              this.$message.success('修改成功!');
              this.compileVisible = false;
              this.getnoticemanagelist(1)
            } else {
              this.$message.error(res.msg);
            }
            setTimeout(() => {
              this.loading = false
            }, 1000);

          })
        }
      },
      //分页
      pagingChange(val) {
        this.getnoticemanagelist(val)
      },
      //获取列表数据
      getnoticemanagelist(page) {
        this.loading = true
        let reqBody = {
          "api": "getnoticemanagelist",
          "companyid": sessionStorage.getItem('companyid'),
          "page": page,
          "pagesize": this.pageSize
        }

        Axios(reqBody, 'index').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.tableData = res.data

          } else {
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
      },
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .bid
    width 100%
    padding 10px 15px
    overflow hidden
    .operationBox
      height 52px
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
    .el-dialog
      padding 0 40px

  .border
    border-color: #00AC97

  .el-dialog__wrapper
    padding 20px 0
    .compileBox
      width 80%
      margin 0 auto
    .noticeTitle
      font-size 18px
      font-weight bold
      text-align center
      margin-bottom 40px
    .noticeContent {
      font-size 14px
      text-align center
    }

  .dateSel {
    width: 100%
  }

  .editer {

  }

  .dialog-footer
    text-align center
</style>
