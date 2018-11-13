<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix">
        <div class="floatLeft leftBox clearfix">
          <el-form :inline="true" class="demo-form-inline">

            <el-form-item>
              <div class="leftBtn btn" @click="onBack">
                <span class="btnTitle">返回</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="leftBtn btn" @click="_getRoleDetails">
                <span class="btnTitle">确定</span>
              </div>
            </el-form-item>

          </el-form>
        </div>
      </div>


      <!--编辑-->
      <div class="contentBox clearfix" v-if="editList.mark == 1">
        <div class="leftBox leftBox554">
          <div class="sectionBox">
            <div class="title"><img class="iconImg" src="../../../assets/img/bm.png" alt="">角色详情</div>
            <div class="padTb20">
              <el-form ref="form" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色姓名：">
                    <el-input v-model="editList.rolename"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <el-form ref="form" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色描述：">
                    <el-input resize="none" type="textarea" :autosize="{ minRows: 10, maxRows: 30}"
                              v-model="editList.roledesc"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        <div class="floatLeft rightBox554">
          <div class="rightContentBox">
            <!-- 标题Tab开始 -->
            <v-particularsTab :particularsTabList="rightTabList"></v-particularsTab>
            <!-- 标题Tab结束 -->
            <div class="pad10">
              <!-- 进度查看开始 -->
              <div class="jurisdiction">
                <div class="jurisdictionItem" v-for="(item,index) in array">
                  <div class="itemTitle">
                    <el-checkbox v-model="item.mychecked"
                                 :indeterminate="item.isIndeterminate"
                                 :label="item.alllimits == 0 ? item.authid : item.authids "
                                 @change="CheckAll(index,$event)">{{item.authname}}
                    </el-checkbox>
                    <el-select size="mini" v-model="item.alllimits"
                               @change="choice(index)" placeholder="请选择"
                               class="xmb_select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="genreList" v-if="item.alllimits == 0">
                    <el-checkbox v-model="el.mychecked"
                                 v-for="(el,dl) in item.auth"
                                 :key="dl"
                                 :label="item.authid"
                                 @change="CheckedCities(index,el.authid,$event)">
                      {{el.authname}}
                    </el-checkbox>
                  </div>
                  <div class="genreList" v-else-if="item.alllimits == 1">
                    <el-checkbox v-model="el.mychecked"
                                 v-for="(el,dl) in item.auth1"
                                 :key="dl"
                                 :label="item.authids"
                                 @change="CheckedCities(index,el.authid,$event)">
                      {{el.authname}}
                    </el-checkbox>
                  </div>
                </div>
              </div>
              <!-- 进度查看结束 -->
            </div>
          </div>

        </div>
      </div>
      <!-- 新建-->
      <div class="contentBox clearfix" v-else>
        <div class="leftBox leftBox554">
          <div class="sectionBox">
            <div class="title"><img class="iconImg" src="../../../assets/img/xq.png" alt="">角色详情</div>
            <div class="padTb20">
              <el-form ref="form" :model="compile" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色姓名：">
                    <el-input v-model="compile.name"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <el-form ref="form" :model="compile" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色描述：">
                    <el-input resize="none" type="textarea" :autosize="{ minRows: 10, maxRows: 30}"
                              v-model="compile.describe"></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
          <div class="sectionBox">
            <div class="title" @click="test">权限等级</div>
            <div class="padTb20">
              <el-tree :data="rankList"
                       :props="defaultProps"
                       show-checkbox
                       node-key="id"
                       ref="tree"
                       :check-strictly="true"
                       default-expand-all
                       :expand-on-click-node="false"
                       @check-change="handleCheckChange"
                       @node-click="nodeClick"></el-tree>
            </div>
          </div>
          <div>

          </div>
        </div>
        <div class="floatLeft rightBox554">
          <div class="rightContentBox">
            <!-- 标题Tab开始 -->
            <v-particularsTab :particularsTabList="rightTabList"></v-particularsTab>
            <!-- 标题Tab结束 -->
            <div class="pad10">
              <!-- 进度查看开始 -->
              <div class="jurisdiction">
                <div class="jurisdictionItem" v-for="(item,index) in array" :key="index">
                  <div class="itemTitle">
                    <el-checkbox :indeterminate="item.isIndeterminate"
                                 v-model="item.mychecked"
                                 :label="item.alllimits == 0 ? item.authid : item.authids "
                                 @change="CheckAll(index,$event)">{{item.authname}}
                    </el-checkbox>
                    <el-select size="mini" v-model="item.alllimits" @change="choice(index)"
                               placeholder="请选择" class="xmb_select">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="genreList" v-if="item.alllimits == 0">
                    <el-checkbox v-model="el.mychecked"
                                 v-for="(el,dl) in item.auth"
                                 :key="dl"
                                 :label="item.authid"
                                 @change="CheckedCities(index,el.authid,$event)">
                      {{el.authname}}
                    </el-checkbox>
                  </div>
                  <div class="genreList" v-else-if="item.alllimits == 1">
                    <el-checkbox v-model="el.mychecked"
                                 v-for="(el,dl) in item.auth1"
                                 :key="dl"
                                 :label="item.authids"
                                 @change="CheckedCities(index,el.authid,$event)">
                      {{el.authname}}
                    </el-checkbox>
                  </div>
                </div>
              </div>
              <!-- 进度查看结束 -->
            </div>
          </div>

        </div>
      </div>

    </div>
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
        defaultProps: {
          children: 'children',
          label: 'rolename'
        },
        clickId: '',
        rankList: [],
        props: {
          children: 'children',
          label: 'rolename'
        },
        editData: [],
        newRoleData: [],
        list: [],
        array: [],
        dataList: [],
        roleList: [],
        roleData: {},
        editList: {
          mark: 0,
          roleid: '',
          roledesc: '',
          rolename: '',
        },
        authidList: '',
        compile: {
          name: '',
          describe: '',

        },
        rightTabList: {
          tabType: 'rightTabList',
          tabTitle: '角色权限',
          tabActive: 0,
          icon: 'icon-guanliangongnengliebiaoiconxuanzhong',

        },
        options: [{
          value: '0',
          label: '个人权限',
        }, {
          value: '1',
          label: '全部权限'
        }],
        value: '',
      }
    },
    methods: {
      init() {
        this.jurisdictionList();
        this.roleRank();
      },
      //跳转测试
      test() {
       /* this.$router.push({
          path: 'treeTable',
          query: {
            rankList :this.rankList
          }
        })*/
      },
      handleCheckChange(data, checked, item) {
        if (checked == true) {//点击未选中复选框
          this.clickId = data.roleid;
          this.$refs.tree.setCheckedKeys([data]);
          this.$refs.tree.setCheckedKeys([item.id]);
        }
      },
      nodeClick(data, checked, item) {
        this.clickId = data.roleid
        this.$refs.tree.setCheckedKeys([data])
      },
      //递归拼装树形结构
      toTreeData(data) {
        let resData = data;
        let tree = [];
        for (let i = 0; i < resData.length; i++) {
          if (resData[i].pid == 0) {
            let obj = {
              pid: resData[i].pid,
              roleid: resData[i].roleid,
              rolename: resData[i].rolename,
              children: []
            };
            tree.push(obj);
            resData.splice(i, 1);
            i--;
          }
        }
        run(tree);

        function run(chiArr) {
          if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
              for (let j = 0; j < resData.length; j++) {
                if (chiArr[i].roleid === resData[j].pid) {
                  let obj = {
                    pid: resData[j].pid,
                    roleid: resData[j].roleid,
                    rolename: resData[j].rolename,
                    children: []
                  };
                  chiArr[i].children.push(obj);
                  resData.splice(j, 1);
                  j--;
                }
              }
              // console.log(chiArr[i].children);
              run(chiArr[i].children);
            }
          }
        }

        return tree;
      },


      //树状图
      roleRank() {
        let reqBody = {
          "api": "roleslists",
          "companyid": sessionStorage.getItem('companyid'),
        };
        Axios(reqBody, 'user').then((res) => {
          // console.log(res)
          if (res.state == 10001) {
            console.log(res.data);
            this.rankList = this.toTreeData(res.data);
            console.log(this.rankList);
            // this.$refs.tree.setCheckedKeys(this.rankList);
          } else {
            this.$message.error(res.msg);
          }
          setTimeout(() => {
            this.loading = false
          }, 1000);

        })
      },
      //编辑
      edit() {
        this.roleData = JSON.parse(localStorage.getItem("roleData"));
        if (this.roleData == '' || this.roleData == null) {

        } else {
          this.editList.mark = this.roleData.mark;
          this.editList.roleid = this.roleData.roleid;
          this.editList.roledesc = this.roleData.describes;
          this.editList.rolename = this.roleData.authname;
          this.loading = true
          let reqBody = {
            "api": "roledetails",
            "uid": sessionStorage.getItem('userid'),
            "roleid": this.editList.roleid,
          }
          Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
              /*拿到角色的权限*/
              res.data.authid.forEach((item) => {
                if (item.state == 1) {
                  this.editData.push({
                    alllimits: item.alllimits,
                    authid: item.authid,
                    authname: item.authname,
                    describes: item.describes,
                    state: item.state,
                    auth: item.auth
                  })
                }
              })
              res.data.authid2.forEach((item, index) => {
                if (item.state == 1) {
                  this.newRoleData.push({
                    alllimits: item.alllimits,
                    authid: item.authid,
                    authname: item.authname,
                    describes: item.describes,
                    state: item.state,
                    auth: item.auth
                  })
                }
              })
              this.list = this.editData.concat(this.newRoleData)
              this.list.length && this.list.forEach((item, index) => {
                this.array.forEach((el, dt) => {
                  if (item.authname == el.authname) {
                    el.alllimits = item.alllimits;
                    el.state = item.state;
                    el.isIndeterminate = true;
                    el.mychecked = item.state == 1 ? true : false
                  }
                  item.auth.length && item.auth.forEach((list) => {
                    if (item.alllimits == 0) {
                      el.auth.length && el.auth.forEach((data, ind) => {
                        if (list.authid == data.authid) {
                          el.isIndeterminate = true;
                          data.mychecked = list.state == 1 ? true : false
                        }
                      })
                    } else {
                      el.auth1.length && el.auth1.forEach((data, ind) => {
                        if (list.authid == data.authid) {
                          el.isIndeterminate = true;
                          data.mychecked = list.state == 1 ? true : false
                        }
                      })
                    }
                  })
                })
              })
            } else {
              if (res.state == 10002) {
                this.purchaseTypeList = []
              }
              this.$message.error(res.msg);
            }

          })
        }
      },

      //下拉框选择
      choice(index) {
        // console.log(index);
        let nub = 0;
        if (this.array[index].alllimits == 0) {
          this.array[index].auth.forEach(item => {
            if (item.mychecked == true) {
              nub++;
            }
            if (nub > 0) {
              this.array[index].mychecked = true;
            } else {
              this.array[index].mychecked = false;
            }
          })
        } else if (this.array[index].alllimits == 1) {
          this.array[index].auth1.forEach(el => {
            if (el.mychecked == true) {
              nub++;
            }
            if (nub > 0) {
              this.array[index].mychecked = true;
            } else {
              this.array[index].mychecked = false;
            }
          })
        }
      },
      // 父级选择
      CheckAll(index, e) {
        this.array[index].mychecked = e;
        // this.$set(this.array[index], 'mychecked', e)
        if (e == false) {
          this.array[index].isIndeterminate = false //去掉不确定状态

        }
        var childrenArray = this.array[index].auth;
        var childrenArray1 = this.array[index].auth1;
        if (this.array[index].alllimits == 0) {
          if (childrenArray) {
            for (var i = 0, len = childrenArray.length; i < len; i++) {
              childrenArray[i].mychecked = e;
              // this.$set(childrenArray[i], 'mychecked', e)
            }
          }
        } else {
          if (childrenArray1) {
            for (var i = 0, len = childrenArray1.length; i < len; i++) {
              childrenArray1[i].mychecked = e;
              // this.$set(childrenArray[i], 'mychecked', e)
            }
          }
        }
      },
      //子级选择
      CheckedCities(index, sonID, e) {
        let childrenArray = this.array[index].alllimits == 0 ? this.array[index].auth : this.array[index].auth1;
        let tickCount = 0, unTickCount = 0, len = childrenArray.length
        for (var i = 0; i < len; i++) {
          if (sonID == childrenArray[i].authid) {
            // childrenArray[i].mychecked = e;// 错误写法，不是响应性的，页面DOM有时不会渲染
            let obj = childrenArray[i];
            obj.mychecked = e;
            this.$set(childrenArray, i, obj);
          }
          if (childrenArray[i].mychecked == true) {
            tickCount++
          } else if (childrenArray[i].mychecked == false) {
            unTickCount++
          }
        }
        if (tickCount == len) {//子级全勾选
          this.array[index].mychecked = true
          // this.$set(this.array[index], 'mychecked', true)
          this.array[index].isIndeterminate = false
        } else if (unTickCount == len) {//子级全不勾选
          this.array[index].mychecked = false
          // this.$set(this.array[index], 'mychecked', false)
          this.array[index].isIndeterminate = false
        } else {
          this.array[index].mychecked = true;
          // this.$set(this.array[index], 'mychecked', true)
          this.array[index].isIndeterminate = true //添加不确定状态
        }
      },
      //保存
      _getRoleDetails() {
        //判断选中的权限
        if (this.array) {
          let authid = [];
          for (var i = 0, len = this.array.length; i < len; i++) {
            if (this.array[i].mychecked == true) {
              if (this.array[i].alllimits == 0) {
                authid.push(this.array[i].authid)
              } else {
                authid.push(this.array[i].authids)
              }

            }
            if (this.array[i].alllimits == 0) {
              if (this.array[i].auth && this.array[i].auth.length > 0) {
                var sonPermissionArray = this.array[i].auth
                for (var j = 0, leng = sonPermissionArray.length; j < leng; j++) {
                  if (sonPermissionArray[j].mychecked == true) {
                    authid.push(sonPermissionArray[j].authid);
                  }
                }
              }
            } else if (this.array[i].alllimits == 1) {
              if (this.array[i].auth1 && this.array[i].auth1.length > 0) {
                var sonPermissionArray = this.array[i].auth1
                for (var j = 0, leng = sonPermissionArray.length; j < leng; j++) {
                  if (sonPermissionArray[j].mychecked == true) {
                    authid.push(sonPermissionArray[j].authid);
                  }
                }
              }
            }

          }
          this.authidList = authid.join(',');
        }
        if (this.editList.mark == 0) {
          if (this.compile.name == '') {
            this.$message.error('请输入角色姓名!');
          } else {
            this.loading = true
            let reqBody = {
              "api": "rolehold",
              "uid": sessionStorage.getItem('userid'),
              "companyid": sessionStorage.getItem('companyid'),
              "roleid": '',
              "authid": this.authidList, /*权限数组*/
              "rolename": this.compile.name,
              "roledesc": this.compile.describe,
            }
            Axios(reqBody, 'user').then((res) => {
              // console.log(res)
              if (res.state == 10001) {
                this.$message.success('添加成功!');
                this.$router.push({
                  path: 'role',
                })

              } else {
                if (res.state == 10002) {
                  this.checkList = []
                }
                this.$message.error(res.msg);
              }

            })
          }

        } else if (this.editList.mark == 1) {
          if (this.editList.rolename == '') {
            this.$message.error('请输入角色姓名!');
          } else {
            this.loading = true
            let reqBody = {
              "api": "roleupdate",
              "companyid": sessionStorage.getItem('companyid'),
              "uid": sessionStorage.getItem('userid'),
              "roleid": this.editList.roleid,
              "authid": this.authidList, /*权限数组*/
              "rolename": this.editList.rolename == this.roleData.authname ? "" : this.editList.rolename,
              "roledesc": this.editList.roledesc,
            }
            Axios(reqBody, 'user').then((res) => {
              // console.log(res)
              if (res.state == 10001) {
                this.$message.success('修改成功!');
                this.$router.push({
                  path: 'role',
                })
                localStorage.removeItem("roleData")
              } else {
                if (res.state == 10002) {
                  this.checkList = []
                }
                this.$message.error(res.msg);
              }

            })
          }
        }
      },
      // 返回
      onBack() {
        this.$router.back(-1);
        localStorage.removeItem("roleData")
      },
      //权限列表
      jurisdictionList() {
        this.loading = true;
        let reqBody = {
          "api": "jurisdictionlist",
          "companyid": sessionStorage.getItem('companyid'),
          "page": 1,
          "pagesize": 30,

        };
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            let arrayData = [];
            this.dataList = res.data;
            this.dataList && this.dataList.forEach((item, index) => {
              if (index % 2 == 0) {
                item.auth && item.auth.forEach((it, el) => {
                  it.mychecked = false;
                });
                arrayData.push({
                  alllimits: item.alllimits,
                  authid: item.authid,
                  authname: item.authname,
                  describes: item.describes,
                  auth: item.auth,
                  mychecked: false,
                  isIndeterminate: false,
                  state: '',
                })
              } else {
                arrayData.forEach(el => {
                  item.auth && item.auth.forEach(it => {
                    it.mychecked = false
                  });
                  if (item.authname === el.authname) {
                    el.authids = item.authid;
                    el.auth1 = item.auth;
                  }
                })
              }
            })
            this.array = arrayData;
            this.edit();

          } else {
            if (res.state == 10002) {
              this.dataList = []
            }
            this.$message.error(res.msg);
          }

        })
      },
    },
    activated() {
      this.init()
    },
    components: {
      vFormulaBar, vParticularsTab, vProjectInfo, vBidInfo
    },
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

  .sectionBox
    padding: 10px
    padding-top 0
    min-height 500px

    .title
      padding: 10px 0
      font-size 14px
      font-weight: bold
      border-bottom 2px solid #ddd
      .iconImg
        width: 16px;
        margin-right: 5px;
        height: 16px;
        vertical-align: text-top;
    .sectionItem
      width 75%
      font-size 14px
      padding: 0 10px
      color #666
      line-height 44px

  .jurisdictionItem
    margin-bottom 20px
    border: 1px solid #ddd;
    .itemTitle
      line-height 40px
      background-color #f5f5f5
      padding: 0 20px
      font-size 14px
    .xmb_select {
      float: right;
      width: 120px;
    }
    .genreList
      padding: 10px 20px

      border-top: none
      .itemGenre
        line-height 40px
        border-bottom 1px solid #ddd
        font-size 14px
        color #666
      .itemGenre:last-child
        border-bottom none
</style>
