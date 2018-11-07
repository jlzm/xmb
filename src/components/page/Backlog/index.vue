<template>
    <div class="backlog" @click="hideToDodetail">
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
                    <div class="bgWhite backlogItem cp" ref="toDoList" v-for="(item,index) in toDoList" :key="index" @click="MyBacklogDetail(item.taskid)">
                        <div class="backlogItemTitle">
                            <!-- 修改 -->
                           <el-row :gutter="20">
                                <el-col :span="12">
                                    <div class="remind-alert"
                                        type="error"
                                        :closable="false"
                                        center>
                                        <img v-if="item.mystate==0 && item.surplusday<0 && (item.flag==1 || item.flag==0)" src="static/img/backlogIcon/overdue.png" alt="">
                                        <img v-else-if="item.mystate==0 && item.flag==1" src="static/img/backlogIcon/urgency.png" alt="">
                                        <img v-else-if="item.mystate==0 && item.flag==0" src="static/img/backlogIcon/general.png" alt="">
                                        <img v-else-if="item.state!=3 && item.mystate==2" src="static/img/backlogIcon/complete.png" alt="">
                                        <img v-else-if="item.state==3" src="static/img/backlogIcon/closed.png" alt="">
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
                            <div class="content-desc">
                                <span v-if="item.mystate==0 && item.surplusday>0" class="fsize14" style="color:#4c97ff">【剩余{{item.surplusday}}天】</span>
                                <span v-else-if="item.mystate==0 && item.surplusday==0" class="fsize14" style="color:#f69e3f">【最后1天】</span>
                                <span v-else-if="item.mystate==0 && item.surplusday<0" class="fsize14" style="color:#f33b3b">【逾期{{Math.abs(item.surplusday)}}天】</span>
                                <p :class="[item.state==3 ? 'color999' : 'color333']" class="dib fsize16">{{item.taskdescribe}}</p>
                                </div>
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
                <div class="pagination" v-if="toDoList[0]">
                    <el-pagination
                    background
                    @current-change="onChangePaging"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="Number(toDoList[0].count)">
                    </el-pagination>
                </div>
            </div>
        </div>

        <!-- 待办弹出框 -->
        <transition name="el-zoom-in-top">
            <div ref="toDoDetail" v-if="show" class="particulars">
                <!-- New -->
                <!-- 标题 -->
                <div  class="particulars-title-wrap">
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
                            <span v-if="backlogDetail.mystate==0 && backlogDetail.surplusday>0" class="vam fsize14" style="color:#4c97ff">【剩余{{backlogDetail.surplusday}}天】</span>
                            <span v-else-if="backlogDetail.mystate==0 && backlogDetail.surplusday==0" class="vam fsize14" style="color:#f69e3f">【最后1天】</span>
                            <span v-else-if="backlogDetail.mystate==0 && backlogDetail.surplusday<0" class="vam fsize14" style="color:#f33b3b">【逾期{{Math.abs(backlogDetail.surplusday)}}天】</span>
                        </div>
                        <div class="particulars-desc-content-box row">
                            <div class="col-lg-7 particulars-desc-content vam">{{backlogDetail.endtime}}</div>
                            <div class="col-lg-3 vam tar fsize14">
                                <el-button v-if="backlogDetail.mystate==0" type="primary" @click="onConfirm(2)">确认完成</el-button>
                                <el-button v-else-if="backlogDetail.state!=3 && backlogDetail.mystate==2" style="background:#39d88f;color:#fff;border:0"  disabled>已完成</el-button>
                                <el-button v-else-if="backlogDetail.state==3" disabled style="background:#ccc;color:#fff">已关闭</el-button>
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
                            <div class="particulars-desc-content">{{backlogDetail.taskdescribe}}</div>
                            <div class="particulars-desc-bottom">
                                <span>{{backlogDetail.createpeople}}</span>
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
                                        <img class="personnelImg" :src="item.portrait" @error="item.portrait = 'static/img/portrait.png'"  alt="">
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
                            
                            <span class="particulars-content-titleTxt">({{backlogDetail.taskrecordlist && backlogDetail.taskrecordlist.length || 0}})</span>
                        </div>
                        <div class="particulars-comment-items">
                            <el-row :gutter="20" v-for="(item,index) in backlogDetail.taskrecordlist" :key="index" class="particulars-comment-item">
                                <el-col :span="3">
                                    <div class="personnel-avatar">
                                        <img class="personnelImg" :src="item.portrait"  alt="">
                                    </div>
                                </el-col>
                                <el-col :span="21">
                                    <div class="comment-item-content">
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
                            <el-input class="vam" @keydown.native="handlerMultiEnter(backlogDetail.taskid, $event)" type="textarea" autosize  style="width:100%;"  placeholder="请输入评论内容" v-model="backlogRemark"></el-input>
                        </div>
                        <div class="comment-btn-box tar dib vam" style="width:15%">
                            <el-button class="vam" style="width:95%;" native-type="submit" type="primary" @click="_onRecordAdd(backlogDetail.taskid)">发送</el-button>
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
import "../../../assets/stylus/upcoming/details.styl";

import comment from '../../../mixins/upcoming/comment.vue';

export default {
    mixins: [comment],
        created(){
    //         // this._getMyBacklogList(1)
    //         document.addEventListener('click',(e)=>{
    //         console.log(this.$refs.toDodetail.contains(e.target));
    //         if(!this.$refs.toDodetail.contains(e.target)){
    //             this.show = false;
    //     }
    // })
        },
    created() {
        // this._getMyBacklogList(1);    
    },
    mounted() {
        this._getMyBacklogList(1);
    },
    components:{
        vParticularsTab,vProjectInfo,vBidInfo
    },
    data () {
        return {
            currentPage: 1,

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

    methods:{
        // 隐藏待办详情
        hideToDodetail(e) { 
        let toDoList = this.$refs.toDoList;
        let toDoDetail = this.$refs.toDoDetail && !this.$refs.toDoDetail.contains(e.target);
        let detailShow = true;
        toDoList.forEach(item => {
            if(item.contains(e.target)) {
                detailShow = false
            }
            return detailShow
        });
            if (detailShow && toDoDetail) { 
                this.show = false;
            }
        },
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


        //获取列表数据
        _getMyBacklogList(page){
            let reqBody = {
                "api": "mybackloglist",
                "userid":sessionStorage.getItem('userid'),
                "page":page,
                "pagesize":this.pageSize,
                "companyid":sessionStorage.getItem('companyid'),
                "search":this.searchData.antistop
            }
            this.getToDoList(reqBody);
        },

        // 分页
        onChangePaging (val) {
            this._getMyBacklogList(val);
        },

        //详情
        MyBacklogDetail(taskid,show){
            let reqBody = {
                "api": "mybacklogdetail",
                "userid":sessionStorage.getItem('userid'),
                "taskid":taskid,
            }
            this.atTaskid = taskid;
            this.toDoDetail(reqBody, show);
        },

        //待办确认完成
        onConfirm(taskType){
            this.$confirm('是否确认完成当前待办事项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
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
                            this._getMyBacklogList(1);
                        }else{
                            if(res.state==10002){
                            }
                            this.$message.error(res.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                });          
                });
            
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
                this._onRecordAdd(taskid);
            }
        },

        //发送信息
        _onRecordAdd(taskid){
            let reqBody = {
                    "api": "recordadd",
                    "userid":sessionStorage.getItem('userid'),
                    "taskid":taskid,
                    "remark":this.backlogRemark
            }
            this.onRecordAdd(reqBody, taskid).then(res => {
                this._getMyBacklogList(1);
                this.MyBacklogDetail(taskid, true)
            })
        },
    }

}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>
