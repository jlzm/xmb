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
      <div class="contentBox clearfix" v-if="mark == 1">
        <div class="leftBox leftBox554">
          <div class="sectionBox">
            <div class="title"><img class="iconImg" src="../../../assets/img/bm.png" alt="">角色详情</div>
            <div class="padTb20">
              <el-form ref="form" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色姓名：">
                    <el-input v-model="rolename"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <el-form ref="form" label-width="100px">
                <div class="sectionItem">
                  <el-form-item label="角色描述：">
                    <el-input resize="none" type="textarea" :autosize="{ minRows: 10, maxRows: 30}"
                              v-model="roledesc"></el-input>
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
                <el-checkbox-group v-model="checkList">
                  <div class="jurisdictionItem" v-for="(item,index) in array">
                    <div class="itemTitle">
                      <el-checkbox :checked="item.state == 1 ? true : false"
                                   :label="item.alllimits == 0 ? item.authid : item.authids "
                                   @change="handleCheckAllChange">{{item.authname}}
                      </el-checkbox>
                      <el-select :disabled="item.state == 1 ? false : true" size="mini" v-model="item.alllimits"
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
                    <div class="genreList">
                      <div class="itemGenre">{{item.describes}}</div>
                    </div>
                  </div>
                </el-checkbox-group>
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

        </div>
        <div class="floatLeft rightBox554">
          <div class="rightContentBox">
            <!-- 标题Tab开始 -->
            <v-particularsTab :particularsTabList="rightTabList"></v-particularsTab>
            <!-- 标题Tab结束 -->
            <div class="pad10">
              <!-- 进度查看开始 -->
              <div class="jurisdiction">
                <el-checkbox-group v-model="checkList">
                  <div class="jurisdictionItem" v-for="(item,index) in array" :key="index">
                    <div class="itemTitle">
                      <el-checkbox :label="item.alllimits == 0 ? item.authid : item.authids "
                                   @change="handleCheckAllChange">{{item.authname}}
                      </el-checkbox>
                      <el-select size="mini" v-model="item.alllimits" @change="choice(index)" placeholder="请选择"
                                 class="xmb_select">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="genreList">
                      <div class="itemGenre">{{item.describes}}</div>
                    </div>
                  </div>
                </el-checkbox-group>
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
        array: [],
        checked: false,
        dataList: [],
        checkList: [],
        roleList: [],
        mark: 0,
        roleid: '',
        roledesc: '',
        rolename: '',
        authid: '',
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
        value: ''
      }
    },
    methods: {
      init() {
        this.roleList = this.$route.query.roleList ? this.$route.query.roleList : [];
        this.mark = this.$route.query.mark ? this.$route.query.mark : 0;
        this.roledesc = this.$route.query.roledesc ? this.$route.query.roledesc : '';
        this.rolename = this.$route.query.rolename ? this.$route.query.rolename : '';
        this.rolename1 = this.$route.query.rolename ? this.$route.query.rolename : '';
        this.roleid = this.$route.query.roleid ? this.$route.query.roleid : '';
        this.jurisdictionList();
      },
      // 编辑
      edit() {
        this.roleList.length && this.roleList.forEach((item, index) => {
          this.array.forEach((el, dt) => {
            if (item.authname == el.authname) {
              el.alllimits = item.alllimits;
              el.state = item.state
            }
          })
        })
      },
      //下拉框选择
      choice(index) {
        var compare = function (x, y) {//比较函数
          if (x < y) {
            return -1;
          } else if (x > y) {
            return 1;
          } else {
            return 0;
          }
        }
        this.checkList.map(Number).sort(compare);
        this.checkList.sort(compare);
        this.checkList.splice(index, 1)
        this.handleCheckAllChange();
      },
      // 复选框选中
      handleCheckAllChange() {
        this.authid = this.checkList.join(",");
      },
      //保存
      _getRoleDetails() {
        if (this.mark == 0) {
          if (this.compile.name == '') {
            this.$message.error('请输入角色姓名!');
          } else {
            this.loading = true
            let reqBody = {
              "api": "rolehold",
              "uid": sessionStorage.getItem('userid'),
              "companyid": sessionStorage.getItem('companyid'),
              "roleid": '',
              "authid": this.authid, /*权限数组*/
              "rolename": this.compile.name,
              "roledesc": this.compile.describe,
            }
            Axios(reqBody, 'user').then((res) => {
              console.log(res)
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

        } else if (this.mark == 1) {
          if (this.rolename == '') {
            this.$message.error('请输入角色姓名!');
          } else {
            this.loading = true
            let reqBody = {
              "api": "roleupdate",
              "companyid": sessionStorage.getItem('companyid'),
              "uid": sessionStorage.getItem('userid'),
              "roleid": this.roleid,
              "authid": this.authid, /*权限数组*/
              "rolename": this.rolename == this.rolename1 ? "" : this.rolename,
              "roledesc": this.roledesc,
            }
            Axios(reqBody, 'user').then((res) => {
              console.log(res)
              if (res.state == 10001) {
                this.$message.success('修改成功!');
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
        }
      },
      // 返回
      onBack() {
        this.$router.back(-1)
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
            this.dataList = res.data;
            this.dataList.forEach((item, index) => {
              if (index % 2 == 0) {
                this.array.push({
                  alllimits: item.alllimits,
                  authid: item.authid,
                  authname: item.authname,
                  describes: item.describes,
                  state: item.state,
                })
              } else {
                this.array.forEach((el, ind) => {
                  if (item.authname === el.authname) {
                    el.authids = item.authid;
                  }
                })
              }
            })
            this.edit();
            // console.log(this.array);
          } else {
            if (res.state == 10002) {
              this.checkList = []
            }
            this.$message.error(res.msg);
          }

        })
      },
    },
    mounted() {
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
