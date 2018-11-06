<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix" v-if="limit==1">
        <div class="floatLeft leftBox clearfix">
          <el-form :inline="true" class="demo-form-inline" :model="searchData">
            <el-form-item>
              <el-input v-model="searchData.search" placeholder="请输入员工名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select size="small" v-model="value"
                         @change="choice"
                         placeholder="请选择部门"
                         class="xmb_select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <div class="leftBtn btn" @click="onSearch">
                <span class="btnTitle">查询</span>
              </div>
            </el-form-item>

            <el-form-item class="floatRight">
              <div class="leftBtn btn">
                <span class="btnTitle" @click="sectionVisible = true">新建部门</span>
              </div>
            </el-form-item>
            <el-form-item class="floatRight">
              <div class="leftBtn btn">
                <span class="btnTitle" @click="onNewStaff">新建员工</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="contentBox clearfix">
        <div class="leftBox leftBox554">
          <div class="sectionBox" v-loading="DepartmenLoading">
            <div class="title"><img class="iconImg" src="../../../assets/img/bm.png" alt="">
              {{departmentData.companyname}}
            </div>
            <div class="padTb10">
              <div class="sectionItem" v-for="(item,index) in departmentData.dept" :key="index"
                   @click="_getMemberList(item.deptid,index,item.deptname)">
                <div>{{item.deptname}}</div>
                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                  <el-button v-show="mark == index" @click="onCompileVisible(item.deptname,item.deptid)" type="success"
                             icon="el-icon-edit-outline"></el-button>
                </el-tooltip>
              </div>
            </div>
          </div>

        </div>
        <div class="floatLeft rightBox554">
          <div class="rightContentBox">
            <!-- 标题Tab开始 -->
            <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>
            <!-- 标题Tab结束 -->
            <div class="pad10">
              <!-- 进度查看开始 -->
              <div class="invitationBox">
                <el-table
                  ref="multipleTable"
                  :data="memberList"
                  v-loading="MemberLoading"
                  stripe
                  align="center"
                  tooltip-effect="dark"
                  style="width: 100%"
                >

                  <el-table-column
                    type="index"
                    label="序号"
                    width="80"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="staffname"
                    label="姓名"
                    align="center"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="position"
                    label="职位"
                    align="center"
                    show-overflow-tooltip>
                  </el-table-column>
                  <el-table-column
                    prop="deptname"
                    label="所属部门"
                    align="center"
                    width="200"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="phone"
                    label="手机号"
                    align="center"
                    width="160">
                  </el-table-column>
                  <el-table-column
                    prop="rolename"
                    label="角色"
                    align="center"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="200"
                    align="center">
                    <template slot-scope="scope" v-if="limit==1">
                      <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                        <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                        <el-button @click="onEdit(scope.row)" type="success"
                                   icon="el-icon-edit-outline"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                        <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row.userid)"></el-button>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 进度查看结束 -->

            </div>
          </div>

        </div>
      </div>
    </div>

    <el-dialog :title="newStaff.newStaffTitle" :visible.sync="staffVisible" width="40%">
      <el-form :model="newStaff" class="newStaff">
        <el-form-item label="姓名" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-input v-model="newStaff.staffname"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-input v-model="newStaff.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="职位" label-position="left" label-width="100px">
          <el-input v-model="newStaff.position"></el-input>
        </el-form-item>
        <el-form-item label="所属部门" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-select v-model="newStaff.deptid" placeholder="请选择所属部门">
            <el-option :label="item.deptname" :value="item.deptid" v-for="(item,index) in departmentData.dept"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-select v-model="newStaff.roleid" placeholder="请选择角色">
            <el-option :label="item.rolename" :value="item.roleid" v-for="(item,index) in roleList"
                       :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="_memberAdd">{{newStaff.newStaffBtn}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新建部门" :visible.sync="sectionVisible" width="40%">
      <el-form :model="newDepartment" class="newStaff">
        <el-form-item label="部门名称" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-input v-model="newDepartment.deptname"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="deptsave">确定新建</el-button>
      </div>
    </el-dialog>
    <!--编辑部门-->
    <el-dialog title="编辑部门" :visible.sync="sectionVisible1" width="40%">
      <el-form :model="editDepartment" class="newStaff">
        <el-form-item label="部门名称" label-position="left" :show-message='false' :required='true' label-width="100px">
          <el-input v-model="editDepartment.deptname"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="confirmBtn" type="primary" @click="deptedit">确定修改</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="deleteVisible"
      width="30%"
    >
      <span>是否删除该员工</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="deleteVisible = false">取 消</el-button>
            <el-button type="primary" @click="_onMeberremove ">确 定</el-button>
        </span>
    </el-dialog>
  </div>

</template>
<script>
  import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
  import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
  import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
  import vBidInfo from '../../common/BidInfo.vue';  //招投标信息

  import {Axios} from './../../../api/axios'
  import {Session} from './../../../api/axios'


  export default {

    data() {
      return {
        mark: 0,
        edit: false,
        sectionVisible1: false,
        sectionVisible: false,
        staffVisible: false,
        DepartmenLoading: false,
        MemberLoading: false,
        deleteVisible: false,
        tabListIndex: 0,
        departmentData: {},
        roleList: [],   //角色列表
        newStaff: {
          newStaffTitle: '新建员工',
          newStaffBtn: '确定新建',
          staffname: '',
          position: '',
          roleid: '',
          deptid: '',
          phone: '',
        },
        editDepartment: {
          deptname: '',
          deptid: ''
        },
        newDepartment: {
          deptname: ''
        },
        oldPhone: '',
        removeId: '',
        searchData: {
          search: '',
        },
        limit: JSON.parse(sessionStorage.getItem('limits'))['deptemp'],
        memberList: [],
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
              title: '更改项目状态',
              clickEvent: 'changeState',
              icon: 'icon-bianji'
            }, {
              title: '添加记录',
              clickEvent: 'addRecord',
              icon: 'icon-jia'
            }
          ]
        },
        leftTabList: {
          tabType: 'leftTabList',
          tabTitle: '基本信息',
          tabActive: 0,
          icon: 'icon-jibenxinxi',
          item: [
            {
              title: '项目信息',
              clickEvent: 'projectInfo',

            },
            {
              title: '招投标信息',
              clickEvent: 'bidInfo',

            }
          ]
        },
        rightTabList: {
          tabType: 'rightTabList',
          tabTitle: '',
          tabActive: 0,
          icon: 'icon-guanliangongnengliebiaoiconxuanzhong',

        },
        //下拉框
        options: [],
        value: '',

      }
    },
    activated() {
      this._getDepartmentList()
      this._getRoleList()
    },
    components: {
      vFormulaBar, vParticularsTab, vProjectInfo, vBidInfo
    },
    methods: {
      // 搜索
      onSearch() {
        this._getMemberList(this.value, 0, this.editDepartment.deptname)
      },
      //部门选择
      choice(value) {
        this.deptid = value;
        let obj = {};
        obj = this.options.find((item) => {
          return item.value === value;
        });
        this.editDepartment.deptname = obj.label
      },
      getFormulaBar(res) {
        console.log(res)
      },
      // 编辑部门
      onCompileVisible(deptname, deptid) {
        this.sectionVisible1 = true;
        this.editDepartment.deptname = deptname;
        this.editDepartment.deptid = deptid;

      },
      getCutTab(res) {
        console.log(res)
        this.tabListIndex = res.index
      },
      //企业部门列表
      _getDepartmentList() {
        this.DepartmenLoading = true
        let reqBody = {
          "api": "departmentlist",
          "uid": sessionStorage.getItem('userid'),
          "page": "1",
          "pagesize": "30",

        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.departmentData = res.data
            this.rightTabList.tabTitle = res.data.dept[0].deptname
            this._getMemberList(res.data.dept[0].deptid, 0, res.data.dept[0].deptname)
            this.departmentData.dept.forEach(item => {
              this.options.push({
                value: item.deptid,
                label: item.deptname
              })
            })
          } else {
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.DepartmenLoading = false
          }, 1000);

        })
      },
      //部门人员列表
      _getMemberList(deptid, index, deptname) {
        this.rightTabList.tabTitle = deptname
        this.deptid = deptid;
        this.mark = index
        this.edit = true
        this.MemberLoading = true
        let reqBody = {
          "api": "memberlist",
          "uid": sessionStorage.getItem('userid'),
          "page": 1,
          "pagesize": "30",
          "companyid": sessionStorage.getItem('companyid'),
          "deptid": this.deptid,
          "search": this.searchData.search,
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.memberList = res.data
            this.searchData.search = '';
            this.value = '';
          } else {
            this.memberList = []
            this.searchData.search = '';
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.MemberLoading = false
          }, 1000);

        })
      },
      //角色管理列表
      _getRoleList() {
        let reqBody = {
          "api": "rolelist",
          "uid": sessionStorage.getItem('userid'),
          "companyid": sessionStorage.getItem('companyid'),
          "page": "1",
          "pagesize": "9999",
          "type": "2"
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.roleList = res.data

          } else {
            this.$message.error(res.msg);
          }


        })
      },
      //添加员工
      _memberAdd() {
        let newStaff = this.newStaff
        if (newStaff.newStaffBtn == '确认修改') {
          this._onMemberupdate()
          return false
        }
        if (!newStaff.staffname || !newStaff.roleid || !newStaff.deptid || !newStaff.phone) {
          this.$message.error('请填写完整信息')
          return false
        }
        let reqBody = {
          "api": "memberadd",
          "staffname": newStaff.staffname,
          "position": newStaff.position,
          "roleid": newStaff.roleid,
          "deptid": newStaff.deptid,
          "phone": newStaff.phone,
          "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('添加成功');
            this.staffVisible = false
            this._getDepartmentList()
          } else {
            this.$message.error(res.msg);
          }


        })
      },
      //修改员工
      _onMemberupdate() {
        let newStaff = this.newStaff;
        if (!newStaff.staffname || !newStaff.roleid || !newStaff.deptid || !newStaff.phone) {
          this.$message.error('请填写完整信息')
          return false
        }
        let newPhone = newStaff.phone
        let oldPhone = this.oldPhone
        if (oldPhone == newPhone) {
          newPhone = ''
        }
        let reqBody = {
          "api": "memberupdate",
          "staffname": newStaff.staffname,
          "position": newStaff.position,
          "roleid": newStaff.roleid,
          "deptid": newStaff.deptid,
          "phone": newPhone,
          "companyid": sessionStorage.getItem('companyid'),
          "userid": newStaff.userid,
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('修改成功');
            this.staffVisible = false
            this._getDepartmentList()
          } else {
            this.$message.error(res.msg);
          }


        })
      },
      //删除员工
      _onMeberremove() {
        let reqBody = {
          "api": "meberremove",
          "userid": this.removeId,
          "companyid": sessionStorage.getItem('companyid')
        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('删除成功');
            this.deleteVisible = false
            this._getDepartmentList()
          } else {
            this.$message.error(res.msg);
          }
        })


      },
      // 编辑员工
      onEdit(row) {
        this.staffVisible = true;
        this.oldPhone = row.phone;
        this.newStaff = {
          newStaffTitle: '编辑员工',
          newStaffBtn: '确认修改',
          staffname: row.staffname,
          position: row.position,
          roleid: row.roleid,
          phone: row.phone,
          deptid: this.deptid,
          userid: row.userid
        }
      },
      // 新建员工
      onNewStaff() {
        this.staffVisible = true
        this.newStaff = {
          newStaffTitle: '新建员工',
          newStaffBtn: '确定新建',
          staffname: '',
          position: '',
          roleid: '',
          deptid: '',
          phone: '',
        }
      },
      //删除员工
      onAffirm(userid) {
        this.deleteVisible = true
        this.removeId = userid
      },
      // 用户详情
      onDetails(row) {
        console.log(row)

        let reqBody = {
          "api": "staffdetails",
          "uid": row.userid,

        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            let newStaff = {
              newStaffTitle: '员工信息',
              newStaffBtn: '确认修改',
              staffname: res.data.staffname,
              position: res.data.position,
              roleid: res.data.roleid,
              deptid: res.data.deptid,
              phone: res.data.phone,
              userid: res.data.userid
            }
            this.newStaff = newStaff
            this.oldPhone = res.data.phone
            this.staffVisible = true
          } else {

          }

        })

      },
      //添加部门
      deptsave() {
        if (!this.newDepartment.deptname) {
          this.$message.error('请填写部门名称')
          return false
        }
        let reqBody = {
          "api": "deptsave",
          "deptname": this.newDepartment.deptname,
          "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('添加成功')

            this.sectionVisible = false
            this.newDepartment.deptname = ''
            this._getDepartmentList()
          } else {
            this.$message.error(res.msg);
          }


        })

      },
      //编辑部门
      deptedit() {
        if (!this.editDepartment.deptname) {
          this.$message.error('请填写部门名称')
          return false
        }
        ;
        let reqBody = {
          "api": "deptupdate",
          "deptname": this.editDepartment.deptname,
          "deptid": this.editDepartment.deptid,
          "companyid": sessionStorage.getItem('companyid'),
        };
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            this.$message.success('添加成功')

            this.sectionVisible1 = false
            this.editDepartment.deptname = ''
            this._getDepartmentList()
          } else {
            this.$message.error(res.msg);
          }


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
      margin-bottom 11px
    .btn
      height 32px
      line-height 32px
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

  .sectionBox
    padding: 10px
    padding-top 0
    .title
      padding: 10px 0
      font-size 14px
      font-weight: bold
      border-bottom 2px solid #ddd
      .iconImg
        width: 16px;
        height: 16px;
        vertical-align: text-bottom;

    .sectionItem
      position relative
      font-size 14px
      padding: 0 10px
      color #666
      line-height 44px
      border-bottom: 1px solid #ddd
      .item {
        position absolute
        right 11px
        top: 6px
      }
      &:hover
        background-color #00ac97
        color #fff

  .newStaff
    width 60%
    margin 0 auto
    .el-select
      width 100%

  .dialog-footer
    text-align center

  .floatLeft {
    width: 100%
  }
</style>
