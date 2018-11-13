<template>
    <div class="backlog"  @click="hideToDodetail">
        <div class="listBox" >
            <el-row class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <div class="dib vam">
                            <el-form-item >
                                <el-input v-model="searchData.antistop" placeholder="请输入关键词"></el-input>
                            </el-form-item>
                        </div>
                        <div class="dib vam">
                            <div class="dib">
                            <el-date-picker
                            v-model="starttime"
                            type="date"
                            :picker-options="pickerOptions0"
                            value-format='yyyy-MM-dd'
                            placeholder="开始日期">
                            </el-date-picker>
                        </div>
                        <span>至</span>
                        <div class="dib">
                            <el-date-picker
                            v-model="endtime"
                            :picker-options="pickerOptions1"
                            type="date"
                            value-format='yyyy-MM-dd'
                            placeholder="结束日期">
                        </el-date-picker>
                        </div>
                        <el-form-item >
                        <div class="btn"  @click="_getMyBacklogList(1)">
                            <span class="btnTitle">查询</span>
                        </div>
                        </el-form-item>
                        </div>
                    </el-form>
                </div>
                <!-- 右侧编辑栏 -->
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"  @click="_openNewBacklog" >
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </el-row>
            <div class="contentBox clearfix padTb5 ">
                <div class="" v-loading="loading">
                    <div class="bgWhite backlogItem cp" ref="toDoList" v-for="(item,index) in toDoList" :key="index" @click="myIssueDetail(item.taskid)">
                        <div class="backlogItemTitle">
                            <!-- 修改 -->
                           <el-row>
                                <el-col :span="12">
                                    <div class="remind-alert"
                                        :closable="false"
                                        center>
                                        <!-- <img v-if="item.state==0 && item.surplusday<0 && (item.flag==1 || item.flag==0)" src="static/img/backlogIcon/overdue.png" alt=""> -->
                                        <img v-if="item.state==0 && item.flag==1" src="static/img/backlogIcon/urgency.png" alt="">
                                        <img v-else-if="item.state==0 && item.flag==0" src="static/img/backlogIcon/general.png" alt="">
                                        <img v-else-if="item.state==3" src="static/img/backlogIcon/closed.png" alt="">
                                        <img v-else-if="item.state==1" src="static/img/backlogIcon/complete.png" alt="">
                                    </div>
                                </el-col>
                                <!-- 修改 -->
                                <el-col :span="12">
                                    <div class="back-create-time tar">
                                        {{item.createtime}}
                                    </div>
                                </el-col>
                            </el-row>
                        </div>

                        <!--New 修改 -->
                        <div class="backlogItemContent">
                            <div class="content-desc row">
                                <span v-if="item.state==0 && item.surplusday>0" class="fsize14" style="color:#4c97ff">【剩余{{item.surplusday}}天】</span>
                                <span v-else-if="item.state==0 && item.surplusday==0" class="fsize14" style="color:#f69e3f">【最后1天】</span>
                                <span v-else-if="item.state==0 && item.surplusday<0" class="fsize14" style="color:#f33b3b">【逾期{{Math.abs(item.surplusday)}}天】</span>
                                <span v-else-if="item.state==2 && item.mysurplusday<0" class="fsize14" style="color:#f33b3b">【逾期{{Math.abs(item.mysurplusday)}}天】</span>
                                <p :class="[item.state==3 || item.state==1? 'color999' : 'color333']" class="dib fsize16">{{item.taskdescribe}}</p>
                                </div>
                            <div class="backlog-bottom-items">
                                <!-- 发起人 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/initiator.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">我发出的</span>
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

        <!-- 新建待办 -->
        <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="60%"
            >
            <div >
                <el-row>
                    <el-col :span="14">
                        <div class="padB80">
                            <el-form ref="form" :model="newIssue" label-width="140px">
                                <!-- <el-form-item label="任务名称" :show-message='false' :required='true'>
                                   <el-input v-model="newIssue.taskname"></el-input>
                                </el-form-item> -->
                                <el-form-item label="待办详情内容" :show-message='false' :required='true'>
                                    <el-input type="textarea" v-model="newIssue.taskdescribe" resize="none" :autosize="{ minRows: 10, maxRows: 30}"></el-input>
                                </el-form-item>
                                
                                <el-form-item label="任务截止时间" :show-message='false' :required='true'>
                                    <el-date-picker
                                    v-model="newIssue.endtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="紧急程度" :show-message='false' :required='true'>
                                    <el-select v-model="newIssue.flag" placeholder="请设置紧急程度">
                                        <el-option label="一般" value="0"></el-option>
                                        <el-option label="紧急" value="1"></el-option>
                                        
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="执行人员" class="padB60" :show-message='false' :required='true'>
                                    <el-input v-model="taskuserName" disabled></el-input>
                                </el-form-item>
                                
                                <el-form-item>
                                    <el-button @click="detailModify" v-if="modify==true" type="primary">确认修改</el-button>
                                    <el-button @click="_establish()" v-else type="primary">立即创建</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                    <!-- 部门 -->
                    <el-col :span="10" v-if="departShow">
                        <div class="padLr10">
                            <div class="breadcrumb">
                                <el-breadcrumb separator="/">
                                    <el-breadcrumb-item>{{departmentData.companyname}}</el-breadcrumb-item>
                                </el-breadcrumb>
                            </div>
                            <div class="departmentList">
                                <div class="departmentItem">
                                     <el-tree :data="departList" 
                                    :load="loadNode" 
                                    show-checkbox
                                    :default-expanded-keys="expandedDeparList"
                                    :default-checked-keys="checkedDeparList"
                                    node-key="treeId" 
                                    ref="tree"
                                    @check="handleCheckChange" 
                                    :props="defaultProps">
                                    </el-tree>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

        <!-- 待办详情 -->
        <transition name="el-zoom-in-top">
            <div v-show="show" ref="toDoDetail" class="particulars">
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
                                <span class="particulars-title-txt vam">我发出的待办详情</span>
                            </div>
                        </el-col>
                        <el-col :span=12 class="tar vam">
                            <div class="particulars-title-right dib">
                                <!-- 编辑待办 -->
                                <i @click="_editDetail" class="iconBox-particulars cp">
                                    <img  v-lazy="'static/img/backlogIcon/gray_editor.png'" alt="">
                                </i>
                                <!-- 删除此条待办 -->
                                <i @click="_deleteToDo(backlogDetail.taskid)" class="iconBox-particulars cp">
                                    <img  v-lazy="'static/img/backlogIcon/gray-delet.png'" alt="">
                                </i>
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
                            <span v-if="backlogDetail.state==0 && backlogDetail.surplusday>0" class="vam fsize14" style="color:#4c97ff">【剩余{{backlogDetail.surplusday}}天】</span>
                            <span v-else-if="backlogDetail.state==0 && backlogDetail.surplusday==0" class="vam fsize14" style="color:#f69e3f">【最后1天】</span>
                            <span v-else-if="backlogDetail.state==0 && backlogDetail.surplusday<0" class="vam fsize14" style="color:#f33b3b">【逾期{{Math.abs(backlogDetail.surplusday)}}天】</span>
                            <span v-else-if="backlogDetail.state==2 && backlogDetail.mysurplusday<0" class="fsize14" style="color:#f33b3b">【逾期{{Math.abs(backlogDetail.mysurplusday)}}天】</span>
                        </div>
                        <div class="particulars-desc-content-box row">
                            <div class="col-lg-7 particulars-desc-content vam">{{backlogDetail.endtime}}</div>
                            <div class="col-lg-3 vam tar fsize14">
                                <el-button v-if="backlogDetail.state == 0 || backlogDetail.state == 1" style="background:#f69e3f;color:#fff;border:0" @click="closeTask()">关闭任务</el-button>
                                <el-button v-else-if="backlogDetail.state == 3" disabled style="background:#ccc;color:#fff">已关闭</el-button>
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
                                <span>我发出的</span>
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
                            <div class="row">
                                <div v-for="(item,index) in backlogDetail.userlist" :key="index" class="col-lg-1_6">
                                   <div class="particulars-personnel-item">
                                        <div class="personnel-avatar">
                                         
                                        <img class="personnelImg" :src="item.portrait" @error="item.portrait = 'static/img/portrait.png'" alt="">
                                        </div>
                                        <i class="accomplish-icon" v-if="item.state==2">
                                            <img v-lazy="'static/img/do_complete.png'"  alt="">
                                        </i>
                                        <div class="personnel-completeTxt tac">{{item.staffname}}</div>
                                        <div v-if="item.state==2" class="personnel-completeTime tac">{{item.createtime}}</div>
                                   </div>
                                </div>
                            </div>
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
                                        <img class="personnelImg" :src="item.portrait" @error="item.portrait = 'static/img/portrait.png'" alt="">
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

import vParticularsTab from "../../common/ParticularsTab.vue"; //详情信息tab
import vProjectInfo from "../../common/ProjectInfo.vue"; //项目信息
import vBidInfo from "../../common/BidInfo.vue"; //招投标信息

import { Axios } from "./../../../api/axios";

import comment from '../../../mixins/upcoming/comment.vue';

// css
import "../../../assets/stylus/upcoming/details.styl";

export default {
    mixins: [comment],
    created() {
        // this._getMyBacklogList(1);
    },
    mounted() {
        this._getMyBacklogList(1);
    },
    data() {
        return {
            currentPage: 1,
            
            // 新建相关数据
            formulaList: {
                //编辑栏按钮数
                parent: "marketClue",
                left: [
                    {
                        title: "编辑",
                        clickEvent: "compile",
                        icon: "icon-iconfontedit"
                    }
                ],
                right: [
                    {
                        title: "新建待办",
                        clickEvent: "changeState",
                        icon: "icon-jia"
                    }
                ]
            },
            newIssue: {
                //表单绑定数据
                taskid: "",
                // taskname: "",
                taskdescribe: "",
                endtime: "",
                flag: "",
                taskuserid: ""
            },
            departList: [], //部门级人员列表
            expandedDeparList: [], //回选展开
            checkedDeparList: [], //回选人员
            departShow: true, //显示判断
            deptIndex: 0, //选择部门下标
            taskuserName: "", //新建人员名称
            taskuserId: "", //新建人员id
            departmentData: {}, //部门列表
            deptInitData: [], //部门处理后列表
            deptChecked: [],
            departArr: [],
            staffModel: [],
            modify: false
        };
    },
    
    methods: {
        // 删除待办
        _deleteToDo(taskId) {
        this.$confirm('此操作将删除本条待办, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody = {
                "api": "mybacklogremove",
                "companyid": sessionStorage.getItem("companyid"),
                "userid": sessionStorage.getItem("userid"),
                "taskid": taskId
            }
            this.deleteToDo(reqBody).then(res => {
                this.show = false;
                this._getMyBacklogList(1);
            })
          }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

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

        //  修改待办
        detailModify () {
            this._establish(this.newIssue.taskid);
            this.dialogVisible = false;
            this.modify = false;
        },

        // 编辑待办
        _editDetail(taskid) {
            this.modify = true;
            this.show = false;
            this.dialogVisible = true;
            this.dialogTitle = '编辑待办';
            let _newTaskuser = {
                name: "",
                id: ""
            };
            console.log('this.backlogDetail:', this.backlogDetail);
            let detailUser = this.backlogDetail.userlist;
            detailUser.forEach(item => {
                if(_newTaskuser.name) {
                    _newTaskuser.name += `,${item.staffname}`;
                    _newTaskuser.id += `,${item.userid}`;
                } else {
                    _newTaskuser.name = `${item.staffname}`;
                    _newTaskuser.id = `${item.userid}`;
                }
            });
            this.taskuserName = _newTaskuser.name;
            this.taskuserId = _newTaskuser.id;
            this.newIssue.taskdescribe = this.backlogDetail.taskdescribe;
            this.newIssue.createtime = this.backlogDetail.createtime;
            this.newIssue.endtime = this.backlogDetail.endtime;
            this.newIssue.flag = this.backlogDetail.flag;

            // 当前待办id
            this.newIssue.taskid = this.backlogDetail.taskid;

            this._getDepartList(this.backlogDetail.userlist);
        },

        // 获取待办列表
        _getMyBacklogList(page) {
            let reqBody = {
                api: "myIssuelist",
                uid: sessionStorage.getItem("userid"),
                page: page,
                pagesize: this.pageSize,
                companyid: sessionStorage.getItem("companyid"),
                search: this.searchData.antistop,
                starttime: this.starttime,
                endtime: this.endtime
            };
            this.getToDoList(reqBody);
        },

        // 获取部门和人员
        _getDepartList (participantsList) {
            let reqBody = {
                api: "departlist",
                companyid: sessionStorage.getItem("companyid"),
                page: 1,
                pagesize: "4"
            }
            this.getDepartList(reqBody, participantsList)
        },

        // 获取待办详情
        myIssueDetail(taskid, show) {
            let reqBody = {
                api: "myIssuedetail",
                taskid: taskid
            };
            this.atTaskid = taskid;
            this.toDoDetail(reqBody, show)
        },

        // 分页
        onChangePaging (val) {
            this._getMyBacklogList(val);
        },

        // 关闭待办
        closeTask() {
            this.$confirm('还有执行人未完成，是否仍要关闭？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let reqBody = {
                    api: "endtask",
                    uid: sessionStorage.getItem("userid"),
                    taskid: this.atTaskid,
                };
                Axios(reqBody, "user").then(res => {
                    console.log(res);
                    if (res.state == 10001) {
                        this.show = false;
                        this._getMyBacklogList(1);
                        this.$message.success(res.msg);
                    } else {
                        if (res.state == 10002) {
                        }
                        this.$message.error(res.msg);
                    }
                });
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

        //发送评论
        _onRecordAdd(taskid) {
            let reqBody = {
                api: "recordadd",
                userid: sessionStorage.getItem("userid"),
                taskid: taskid,
                remark: this.backlogRemark
            };

            this.onRecordAdd(reqBody, taskid).then(res => {
                this._getMyBacklogList(1);
                this.myIssueDetail(taskid, true);
            })
        },



        // 打开新建待办弹出层
        _openNewBacklog() {
            this.dialogTitle = '新建待办'
            let reqBody = {
                api: "departmentlist",
                uid: sessionStorage.getItem("userid"),
                page: 1,
                pagesize: 4
            };
            this._getDepartList();
            this.getDepartmentList(reqBody);
        },

        // 创建和编辑待办
        _establish (taskId) {
            // 更新判断
            let api = null;
            if(!taskId) {
                api = 'myIssuesave'
            } else {
                api = 'myIssueupdate'
            }
            console.log('taskId:', taskId);
            
            console.log('api:', api);
            
            let reqBody = {
                "api": api,
                "taskid": taskId,
                "taskdescribe": this.newIssue.taskdescribe,
                "endtime": this.newIssue.endtime,
                "flag": this.newIssue.flag,
                "taskuserid": this.taskuserId,
                "userid": sessionStorage.getItem("userid"),
                "companyid": sessionStorage.getItem("companyid")
            };
            console.log('reqBody:', reqBody);
            
            
            this.establish(reqBody, taskId).then(res => {
                this._getMyBacklogList(1);
            })
        },


    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .border
        border-color:#00AC97
    .breadcrumb
        padding-bottom 10px
        border-bottom 2px solid #ddd
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
        font-size 14px
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
            border-top 1px solid #fbfbfb
            bottom 0
            left 0
            padding 0 20px
            width 100%
            height 65px
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


.backlog-bottom-item
    margin-right 20px
    .iconBox
        margin-right 10px

</style>
