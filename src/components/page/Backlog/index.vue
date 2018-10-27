<template>
    <div class="backlog">
        <div class="listBox" >
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入关键词"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <div class="leftBtn btn"  @click="_getMyBacklogList(1)">
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                    </el-form>

                </div>

            </div>
            <div class="contentBox clearfix padTb5 ">
                <div class="" v-loading="loading">
                    <div class="bgWhite backlogItem cp" v-for="(item,index) in myBacklogList" :key="index" @click="onMyBacklogDetail(item.taskid)">
                        <div class="backlogItemTitle">
                            <!-- 修改 -->
                           <el-row :gutter="20">
                                <el-col :span="12">
                                    <div class="remind-alert"
                                        type="error"
                                        :closable="false"
                                        center>
                                        <img v-if="item.state==0 && item.flag!=0" v-lazy="'static/img/backlogIcon/urgency.png'" alt="">
                                        <img v-else-if="item.state==0 && item.flag==0" v-lazy="'static/img/backlogIcon/general.png'" alt="">
                                        <img v-else-if="item.state==1" v-lazy="'static/img/backlogIcon/complete.png'" alt="">
                                        <img v-else v-lazy="'static/img/backlogIcon/complete.png'" alt="">
                                    </div>
                                </el-col>
                                <!-- 修改 -->
                                <el-col :span="12">
                                    <div class="back-create-time textRight">
                                        {{item.createtime}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                        <!--New 修改 -->
                        <div class="backlogItemContent">
                            <div class="content-desc">{{item.taskdescribe}}</div>

                            <div class="backlog-bottom-items">

                                <!-- 发起人 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/initiator.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">{{item.createpeople}}</span>
                                </div>

                                <!-- 待办截止时间 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/timexs.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">{{item.endtime}}</span>
                                </div>

                                <!-- 评论人数 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/comments-16.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">{{item.recordcount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="myBacklogList[0]">
                    <el-pagination
                    background
                    @current-change="onChangePaging"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="Number(myBacklogList[0].count)">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 待办弹出框 -->
        <transition name="el-zoom-in-top">
            <div v-show="show" class="particulars">
                <!-- 容器 -->

                <!-- 修改 -->
                <!-- New -->
                <!-- 标题 -->
                <div class="particulars-title-wrap">
                    <el-row >
                        <el-col :span=12 class="vam">
                            <div class="particulars-title-left dib">
                                <i class="iconBox-particulars vam">
                                    <img  v-lazy="'static/img/backlogIcon/list.png'" alt="">
                                </i>
                                <span class="particulars-title-txt vam">我的待办详情</span>
                            </div>
                        </el-col>
                        <el-col :span=12 class="tar vam">
                            <div class="particulars-title-right dib">
                                <!-- 关闭弹出层 -->
                                <i class="iconBox-particulars cp" @click="show = false">
                                    <img  v-lazy="'static/img/backlogIcon/gray_error.png'" alt="">
                                </i>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <!-- 内容区域 -->
                <div class="particulars-content">

                    <!-- 截止完成时间区域 -->
                     <div class="particulars-endTime-wrap">
                        <div class="particulars-desc-title row">
                            <i class="iconBox-particulars vam">
                                <img  v-lazy="'static/img/backlogIcon/timems.png'" alt="">
                            </i>
                            <!-- 截止完成时间 -->
                            <span class="particulars-content-titleTxt vam">截止时间</span>
                        </div>
                        <div class="particulars-desc-content-box row">
                            <div class="col-lg-7 particulars-desc-content vam">{{backlogDetail.endtime}}</div>
                            <div class="col-lg-3 vam tar fsize14">
                                <el-button type="primary" @click="onConfirm(2)">确认完成</el-button>
                            </div>
                        </div>
                    </div>

                    <!-- 待办内容区域 -->
                    <div class="particulars-desc-wrap">
                        <div class="particulars-desc-title row">
                            <i class="iconBox-particulars">
                                <img  v-lazy="'static/img/backlogIcon/gray_content.png'" alt="">
                            </i>
                            <span class="particulars-content-titleTxt">待办内容</span>
                        </div>
                        <!-- 待办详情 -->
                        <div class="particulars-desc-content-box">
                            <div class="particulars-desc-content">
                                {{backlogDetail.taskdescribe}}
                            </div>
                            <div class="particulars-desc-bottom">
                                <span>{{backlogDetail.taskname}}</span>
                                <span class="particulars-bottom-interval">|</span>
                                <span class="particulars-desc-createTime">{{backlogDetail.createtime}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 执行人区域 -->
                    <div class="particulars-executor-wrap">
                        <div class="particulars-executor row">
                            <i class="iconBox-particulars">
                                <img  v-lazy="'static/img/backlogIcon/gray_executor.png'" alt="">
                            </i>
                            <span class="particulars-content-titleTxt" style="margin-right:20px">执行人</span>
                            <span class="particulars-content-titleTxt">{{backlogDetail.complete}}/{{backlogDetail.taskpeople}} 已完成</span>
                        </div>
                        <!-- 执行人列表 -->
                        <div class="particulars-personnel-list">
                            <el-row >
                                <el-col :span="4" v-for="(item,index) in backlogDetail.userlist" :key="index" class="particulars-personnel-item">
                                    <div class="personnel-avatar">
                                        <img class="personnelImg" v-lazy="{src:item.portrait,error:'static/img/portrait.png'}"  alt="">
                                    </div>
                                    <i class="accomplish-icon" v-if="item.state == 2">
                                        <img v-lazy="'static/img/do_complete.png'"  alt="">
                                    </i>
                                    <div class="personnel-completeTxt tac">{{item.staffname}}</div>
                                    <div v-if="item.state == 2" class="personnel-completeTime tac">{{item.createtime}}</div>
                                </el-col>
                        </el-row>
                        </div>
                    </div>

                    <!-- 评论区域 -->
                    <div class="particulars-comment-wrap">
                        <div class="particulars-comment row">
                            <i class="iconBox-particulars">
                                <img  v-lazy="'static/img/backlogIcon/comments_20.png'" alt="">
                            </i>
                            <span class="particulars-content-titleTxt" style="margin-right:5px">评论</span>
                            <span class="particulars-content-titleTxt">({{backlogDetail.taskrecordlist && backlogDetail.taskrecordlist.length}})</span>
                        </div>
                        <div class="particulars-comment-items">
                            <el-row :gutter="20" v-for="(item,index) in backlogDetail.taskrecordlist" :key="index" class="particulars-comment-item">
                                <el-col :span="3">
                                    <div class="personnel-avatar">
                                        <img class="personnelImg" :src="item.portrait"  alt="">
                                    </div>
                                </el-col>
                                <el-col :span="21">
                                    <div class="marT20">
                                        <el-row class="comment-item-title">
                                        <el-col :span="12">{{item.staffname}}</el-col>
                                        <el-col :span="12" class="tar">{{item.updatetime}}</el-col>
                                        </el-row>
                                        <!-- 评论内容 -->
                                        <div class="comment-item-desc flb row">
                                            <span class="fsize16" style="line-height: 25px">{{item.remark}}</span>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>

                <!-- New 评论编辑区域 -->
                <div class="publishBox">
                    <form action="" class="comment-form row">
                        <div class="comment-input-box dib vam" style="width:85%;">
                            <el-input class="vam" @keydown.native="handlerMultiEnter(backlogDetail.taskid, $event)" type="textarea" autosize  style="width:100%;"  placeholder="请输入内容" v-model="backlogRemark"></el-input>
                        </div>
                        <div class="comment-btn-box tar dib vam" style="width:15%">
                            <el-button class="vam" style="width:95%;" native-type="submit" type="primary" @click="onRecordAdd(backlogDetail.taskid)">发送</el-button>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
    </div>

</template>
<script>

import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

// css
import "../../../assets/stylus/upcoming/details.styl"

export default {

  data () {
    return {
        loading:false,
        show:false,
        dialogVisible: false,
        pageSize:10,
        currentPage:1,
        myBacklogList:[],
        backlogDetail:{},
        backlogRemark:'',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },

        searchData:{
            antistop:'',
        },

        multipleSelection: [],
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit'
                }

            ],
            right:[

            ]
        },
        atTaskid:'',
    }
  },

  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created(){
      this._getMyBacklogList(1)


  },
  methods:{
    getFormulaBar(res){
        console.log(res)
    },
    getCutTab(res){
        console.log(res)
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },


    onDetails(row){
        this.$router.push({
            path: 'bidDetails',
            query:{
                tabType:'accountInfo'
            }
         })
    },
    newBacklog(){
        this.getDepartmentList()

    },
    //获取列表数据
    _getMyBacklogList(page){
        this.loading = true;
        let reqBody = {
            "api": "mybackloglist",
            "userid":sessionStorage.getItem('userid'),
            "page":page,
            "pagesize":this.pageSize,
            "companyid":sessionStorage.getItem('companyid'),
            "search":this.searchData.antistop
        }
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.myBacklogList = res.data

            }else{
                if(res.state==10002){
                    this.myBacklogList = []
                }
                this.$message.error(res.msg);
            }
        }).then(res => {
            this.loading = false;
        })
    },
    //分页事件
    onChangePaging(val) {

        this._getMyBacklogList(val)
    },
    //详情
    onMyBacklogDetail(taskid,show){
        let reqBody = {
            "api": "mybacklogdetail",
            "userid":sessionStorage.getItem('userid'),
            "taskid":taskid,
        }
        this.atTaskid = taskid
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                if(!show){
                    this.show = !this.show
                }
                this.backlogDetail = res.data
            }else{
                if(res.state==10002){

                }
                this.$message.error(res.msg);
            }

        })
    },
    //待办确认完成
    onConfirm(taskType){
        let reqBody = {
            "api": "complete",
            "userid":sessionStorage.getItem('userid'),
            "taskid":this.atTaskid,
            "type":taskType

        }
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success(res.msg);
                this.show = false
                this._getMyBacklogList(1)
            }else{
                if(res.state==10002){

                }
                this.$message.error(res.msg);
            }

        })
    },

    // 回车发送评论
    handlerMultiEnter (taskid, e){
        
        let code = e.keyCode,
                ctrl = e.ctrlKey,
                shift = e.shiftKey,
                alt = e.altKey;
        
        // if(code == "13" && ctrl && !shift && !alt) {
        //     e.target.value += '\n';
        // }
        if(code == "13" && !ctrl && !shift && !alt) {
            e.preventDefault();
            this.onRecordAdd(taskid);
        }
    },

    //发送信息
    onRecordAdd(taskid){
        let reqBody = {
                "api": "recordadd",
                "userid":sessionStorage.getItem('userid'),
                "taskid":taskid,
                "remark":this.backlogRemark
        }
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('评论成功');
                this.backlogRemark = ''
                this._getMyBacklogList(1)
                this.onMyBacklogDetail(taskid,true)
            }else{
                if(res.state==10002){
                    
                }
                this.$message.error(res.msg);
            }
            
        })
    },
  }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .backlog
        position relative
        width 100%
        padding 10px 15px

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
        border-color:#00AC97
    .breadcrumb
        padding-bottom 10px
        border-bottom 2px solid #ddd
    .backlogItem
        // border:1px solid #ddd
        margin-bottom 10px
        .backlogItemContent
            padding:20px 20px
            font-size 14px
            color #666
            .backlog-bottom-items
                padding-top 15px
                .backlog-bottom-item
                    margin-right 20px
                    font-size 0
                    color #666
                    .iconBox
                        margin-right 10px
                    .backlog-bottom-txt
                        font-size 14px
        .back-endt-time
            font-size 14px
            color #666
        .backlogItemTitle
            border-bottom 1px solid #ddd
            padding 10px 20px 10px 0
            .back-create-time
                line-height 30px
                font-size 14px
                color #999
            .backlogItemMessage
                line-height 35px
                font-size 22px
                color #999
                vertical-align middle
                i
                    vertical-align middle
                .number
                    font-size 14px
                    color #666
                    vertical-align middle
            .textRight
                text-align right
    .particulars
        position fixed
        bottom 0
        right 0
        width 31.25%
        height 88.4%
        background-color #fff
        z-index 9999
        box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
        .particularsTitle
            line-height: 32px
            padding-bottom 20px
            margin-bottom 20px
            border-bottom 2px solid #ccc
        .particularsItem

            margin-bottom 20px
            .particularsItemIcon
                line-height 30px
                font-size 30px
                color #999
                margin-right 14px
            .particularsItemCen
                width 599px
                border-bottom 2px solid #ddd
                padding-bottom 10px
                color #666
                .itemCenTime
                    line-height 30px
                    color #999
            .personnelBox
                position relative
                width 50px
                height 50px
                margin 0 auto
                margin-bottom 5px
                .personnelImg
                    border-radius 100%
                .accomplishIcon
                    z-index 99
                    position absolute
                    top 0
                    right 0
                    display inline-block
                    width 18px
                    height 18px

                    border-radius 4px

        .publishBox
            position absolute
            margit-top 60px
            background #fbfbfb
            border-top 1px solid #f5f5f5
            bottom 0
            left 0
            padding 0 20px
            width 100%
            // height 65px
            .comment-form
                padding 13.5px

        .particularsCen
            overflow-y auto
            height 720px

    .iconBox
        color #666
        display inline-block
        vertical-align:middle
        width 16px
        height 16px

    .departmentList {
        .departmentItem {
        .xmb_departmentItem {
            height: 50px;
            line-height: 50px;
            padding-left: 10px;
            border-bottom: 1px solid #dcdfe6;
            .el-icon-arrow-right {
            font-size: 20px;
            color: #999;
            padding-right: 20px;
            float: right;
            line-height: 50px;
            }
        }
        .xmb_departmentItem:hover {
            background-color: #f5f5f5
        }
        }
    }
    .el-date-editor,.el-select
        width 100%



// New

// 更改
.backlogItemTitle
    .remind-alert
        height 30px
        width 70px

.content-desc
    white-space:nowrap
    text-overflow ellipsis 
    overflow hidden
    padding-bottom- 20px
    font-size 16px
    color #333





</style>
