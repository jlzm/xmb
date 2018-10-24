<template>
  <div class="bid">
    <div class="listBox">
      <div class="operationBox clearfix">
        <div class="floatLeft leftBox clearfix">
          <el-form :inline="true" class="demo-form-inline" :model="searchData">

            <el-form-item>
              <div class="leftBtn btn" @click="onBack">
                <span class="btnTitle">返回</span>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="leftBtn btn" @click="newRole">
                <span class="btnTitle">编辑</span>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="contentBox clearfix">
        <div class="leftBox leftBox554">
          <div class="sectionBox">
            <div class="title">角色详情</div>
            <div class="padTb10">
              <div class="sectionItem">角色名称：{{roleList.rolename}}</div>
              <div class="sectionItem">角色描述：{{roleList.roledesc}}</div>

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
                <div class="jurisdictionItem" v-for="(item,index) in roleList">
                  <div class="itemTitle">{{item.authname}}
                    <el-select disabled size="mini" v-model="item.alllimits" placeholder="请选择" class="xmb_select">
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
        roleid: null,
        roleList: [],
        newRoleList: [],
        searchData: {
          antistop: '',
          area: '',
          principal: ''
        },
        options: [{
          value: '0',
          label: '个人权限',
        }, {
          value: '1',
          label: '全部权限'
        }],
        rightTabList: {
          tabType: 'rightTabList',
          tabTitle: '角色权限',
          tabActive: 0,
          icon: 'icon-guanliangongnengliebiaoiconxuanzhong',

        }
      }
    },
    methods: {
      init() {
        this.roleid = this.$route.query.roleid;
      },
      // 返回
      onBack() {
        this.$router.back(-1)
      },
      newRole() {
        this.$router.push({
          path: 'compileRole',
          query: {
            roleList: this.roleList,
            roledesc:this.roleList.roledesc,
            roleid:this.roleList.roleid,
            rolename:this.roleList.rolename,
            mark:1
          }
        })
      },
      _getRoleDetails() {
        this.loading = true
        let reqBody = {
          "api": "roledetails",
          "uid": sessionStorage.getItem('userid'),
          "roleid": this.roleid,

        }
        Axios(reqBody, 'user').then((res) => {
          console.log(res)
          if (res.state == 10001) {
            /*拿到角色的权限*/
            res.data.authid.forEach((item, index) => {
              if (item.state == 1) {
                this.roleList.push({
                  alllimits: item.alllimits,
                  authid: item.authid,
                  authname: item.authname,
                  describes: item.describes,
                  state: item.state
                })
              }
            })
            res.data.authid2.forEach((item, index) => {
              if (item.state == 1) {
                this.newRoleList.push({
                  alllimits: item.alllimits,
                  authid: item.authid,
                  authname: item.authname,
                  describes: item.describes,
                  state: item.state
                })
              }
            })
            this.roleList.push.apply(this.roleList, this.newRoleList);
            this.roleList.roledesc = res.data.roledesc;
            this.roleList.roleid = res.data.roleid;
            this.roleList.rolename = res.data.rolename
          } else {
            if (res.state == 10002) {
              this.purchaseTypeList = []
            }
            this.$message.error(res.msg);
          }

        })
      }

    },
    activated() {
      this.init();
      this._getRoleDetails()
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
    min-height 500px
    .title
      padding: 10px 0
      font-size 14px
      color #666
      border-bottom 2px solid #ddd
    .sectionItem
      font-size 14px
      padding: 0 10px
      color #666
      line-height 44px

  .jurisdictionItem
    margin-bottom 20px
    border: 1px solid #ddd
    .itemTitle
      line-height 40px
      background-color #f5f5f5
      color #666
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
