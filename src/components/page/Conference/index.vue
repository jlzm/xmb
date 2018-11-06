<template>
    <div class="backlog" @click="hideToDodetail">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入会议主题"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn" @click="_getMeetingList(1)" >
                        
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"  @click="_openNewBacklog" >
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix padTb5">
                <div class="" v-loading="loading">
                    <div class="bgWhite backlogItem cp" ref="toDoList" v-for="(item,index) in toDoList" :key="index" @click="meetingDetail(item.meetingid, item.createid)">
                        <div class="backlogItemTitle">
                            <!-- 修改 -->
                           <div class="row">
                                <div class="dib vam" style="width:50%">
                                    <i class="meeting-title-icon dib vam">
                                        <img v-lazy="'static/img/backlogIcon/meeting.png'" alt="">
                                    </i>
                                    <span class="meeting-title-txt dib vam">{{item.meetingtype}}</span>
                                </div>
                                <div class="dib vam" style="width:50%">
                                    <div class="back-create-time tar">
                                    {{item.createtime}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="backlogItemContent">
                            <div class="backlogItemTheme">会议主题：{{item.meetingname}}</div>
                            <div class="content-desc">{{item.meetingdesc}}</div>
                            <div class="backlog-bottom-items row">
                                
                                <!-- 会议地点 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/location.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">{{item.address}}</span>
                                </div>

                                <!-- 待办截止时间 -->
                                <div class="dib backlog-bottom-item">
                                    <i class="iconBox">
                                        <img v-lazy="'static/img/backlogIcon/timexs.png'"  alt="">
                                    </i>
                                    <span class="backlog-bottom-txt vam">{{item.meetingtime}}</span>
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
                    @current-change="_onChangePaging"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="Number(toDoList[0].count)">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        
        <!-- 新建会议弹出层 -->
        <el-dialog
            title="新建会议"
            :visible.sync="dialogVisible"
            width="60%"
            >
            <div >
                <el-row>
                    <el-col :span="14">
                        <div class="padB80">
                            <el-form ref="form" :model="newMeeting"  label-width="140px">
                                <el-form-item label="参会人员" :show-message='false' :required='true'>
                                    <el-input v-model="taskuserName" disabled></el-input>
                                </el-form-item>
                                <el-form-item label="会议类型"  :show-message='false' :required='true'>
                                    <el-select v-model="newMeeting.meetingtype" placeholder="请选择会议类型">
                                        <el-option
                                        v-for="(item,index) in meetingTypeList"
                                        :key="index"
                                        :label="item.typename"
                                        :value="item.basicsid">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="会议主题" :show-message='false' :required='true'>
                                   <el-input v-model="newMeeting.meetingname"></el-input>
                                </el-form-item>
                                <el-form-item label="会议详情内容" :show-message='false' :required='true'>
                                    <el-input type="textarea" v-model="newMeeting.meetingdesc" resize="none" :autosize="{ minRows: 10, maxRows: 30}"></el-input>
                                </el-form-item>
                                <el-form-item label="会议地点" :show-message='false' :required='true'>
                                   <el-input v-model="newMeeting.address"></el-input>
                                </el-form-item>
                                 <el-form-item label="会议时间" :show-message='false' :required='true'>
                                    <el-date-picker
                                    v-model="newMeeting.meetingtime"
                                    type="datetime"
                                    value-format="yyyy-MM-dd HH:mm"
                                    format="yyyy-MM-dd HH:mm"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                
                                <el-form-item>
                                    <el-button @click="detailModify" v-if="modify==true" type="primary">确认修改</el-button>
                                    <el-button @click="establish()" v-else type="primary">立即创建</el-button>

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
                                    node-key="treeId" ref="tree"
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

        <!-- 会议详情弹出层 -->
        <transition name="el-zoom-in-top">
            <div v-show="show" ref="toDoDetail" class="particulars">
                <!-- 容器 -->
                <!-- New -->
                <!-- 标题 -->
                <div class="particulars-title-wrap">
                    <el-row >
                        <el-col :span=12 class="vam">
                            <div class="particulars-title-left dib">
                                <i class="iconBox-particulars vam">
                                    <img  v-lazy="'static/img/backlogIcon/list.png'" alt="">
                                </i>
                                <span class="particulars-title-txt vam">会议纪要详情</span>
                            </div>
                        </el-col>
                        <el-col :span=12 class="tar vam">
                            <div class="particulars-title-right dib">
                                <!-- 编辑待办 -->
                                <i v-if="permissionShow == true" @click="_editDetail" class="iconBox-particulars cp">
                                    <img  v-lazy="'static/img/backlogIcon/gray_editor.png'" alt="">
                                </i>
                                <!-- 删除此条待办 -->
                                <i v-if="permissionShow == true" @click="_deleteMeeting(backlogDetail.meetingid)" class="iconBox-particulars cp">
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
                        </div>
                        <div class="particulars-desc-content-box row">
                            <div class="particulars-desc-content vam">{{backlogDetail.meetingtime}}</div>
                        </div>
                    </div>
                    <!-- 会议主题 -->
                    <div class="particulars-endTime-wrap">
                        <el-row>
                            <el-col :span="12">
                                <div class="particulars-endTime-left row">
                                    <i class="iconBox-particulars vam">
                                        <img  v-lazy="'static/img/backlogIcon/theme.png'" alt="">
                                    </i>
                                    <!-- 会议时间 -->
                                    <span class="particulars-desc-content vam">{{backlogDetail.meetingname || '待添加'}}</span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- 会议内容区域 -->
                    <div class="particulars-desc-wrap">
                        <div class="particulars-desc-title row">
                            <i class="iconBox-particulars">
                                <img  v-lazy="'static/img/backlogIcon/gray_content.png'" alt="">
                            </i>
                            <span class="particulars-content-titleTxt">项目会议</span>
                        </div>
                        <!-- 待办详情 -->
                        <div class="particulars-desc-content-box">
                            <div class="particulars-desc-content">
                                {{backlogDetail.meetingdesc}}
                            </div>
                            <div class="particulars-desc-bottom">
                                <span>{{backlogDetail.address ||'暂无地点'}}</span>
                                <span class="particulars-bottom-interval">|</span>
                                <span class="particulars-desc-createTime">{{backlogDetail.meetingtime}}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 执行人区域 -->
                    <div class="particulars-executor-wrap">
                        <div class="particulars-executor row">
                            <i class="iconBox-particulars">
                                <img  v-lazy="'static/img/backlogIcon/gray_executor.png'" alt="">
                            </i>
                            <span class="particulars-content-titleTxt" style="margin-right:20px">参会人员</span>
                        </div>
                        <!-- 执行人列表 -->
                        <div class="particulars-personnel-list">
                            <el-row >
                                <el-col :span="4" v-for="(item,index) in backlogDetail.userlist" :key="index" class="particulars-personnel-item">
                                    <div class="personnel-avatar">
                                        <img class="personnelImg" v-lazy="{src:item.portrait,error:'static/img/portrait.png'}"  alt="">
                                    </div>
                                    <div class="personnel-completeTxt">{{item.staffname}}</div>
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
                            <el-input class="vam" @keydown.native="handlerMultiEnter(backlogDetail.meetingid, $event)" type="textarea" autosize style="width:100%;"  placeholder="请输入评论内容" v-model="backlogRemark"></el-input>
                        </div>
                        <div class="comment-btn-box tar dib vam" style="width:15%">
                            <el-button class="vam" style="width:95%;" native-type="submit" type="primary" @click="_onRecordAdd(backlogDetail.meetingid)">发送</el-button>
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
import {Permission} from './../../../api/axios'

// css
import "../../../assets/stylus/upcoming/details.styl";;

import comment from '../../../mixins/upcoming/comment.vue';
export default {
  mixins: [comment],
  data () {
    return {
        
        permissionShow: false, // 会议操作权限
        // 新建相关数据
    
        newMeeting:{  //表单绑定数据
            meetingtype:'',
            meetingname:'',
            meetingdesc:'',
            address:'',
            meetingtime:'',
            
        },
        departList: [],  //部门级人员列表
        expandedDeparList: [], //回选展开
        checkedDeparList: [], //回选人员
        departShow:true,  //显示判断
        deptIndex:0,    //选择部门下标
        taskuserName:'',  //新建人员名称
        taskuserId:'',    //新建人员id
        meetingid:'', //会议id
        departmentData:{},  //部门列表
        deptInitData:[],  //部门处理后列表
        deptChecked:[],
        departArr:[],
        staffModel:[],
        meetingTypeList:[],
        modify: false   
    }
  },
  
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created(){
    // this.getBasicList()
  },
  mounted() {
    this._getMeetingList(1);
  },
  methods:{
    // 会议权限
    meetingPermission(createId) {
        let reqBody = {
                "companyid": sessionStorage.getItem("companyid"),
                "userid": sessionStorage.getItem("userid"),
                "uid": 'cc92eac238ef4f7bbac653f25e9c1dbd',
            }
             
           return Permission(reqBody,'user/level').then(res => {
                console.log('权限res:', res);
                this.permissionShow = res
            })

    },
    //   删除会议
    _deleteMeeting(meetingId) {
        this.$confirm('此操作将删除本条会议, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
            let reqBody = {
                "api": "meetingremove",
                "companyid": sessionStorage.getItem("companyid"),
                "userid": sessionStorage.getItem("userid"),
                "meetingid": meetingId
            }
            this.deleteToDo(reqBody).then(res => {
                this.show = false;
                this._getMeetingList(1);
            })
            this.$message({
            type: 'success',
            message: '删除成功!'
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

    },
    // 隐藏会议详情
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
        
    // 确认修改
    detailModify () {
        this.establish(this.newMeeting.meetingid);
        this.dialogVisible = false;
        this.modify = false;

    },
    
    // 编辑详情
    _editDetail(taskid) {
        this.modify = true;
        this.show = false;
        this.dialogVisible = true;
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
        this.newMeeting.address = this.backlogDetail.address;
        this.newMeeting.createtime = this.backlogDetail.createtime;
        this.newMeeting.meetingtime = this.backlogDetail.meetingtime;
        this.newMeeting.meetingname = this.backlogDetail.meetingname;
        this.newMeeting.meetingtype = this.backlogDetail.meetingtype;
        this.newMeeting.meetingdesc = this.backlogDetail.meetingdesc;
        // 获取当前会议id
        this.newMeeting.meetingid = this.backlogDetail.meetingid;
        console.log('this.backlogDetail.userlist:', this.backlogDetail.userlist);
        
        this._getDepartList(this.backlogDetail.userlist); 
        
        
    },

    // 获取部门和人员
        _getDepartList (participantsList) {
            let reqBody = {
                api: "departlist",
                companyid: sessionStorage.getItem("companyid"),
                page: 1,
                pagesize: "30"
            }
            this.getDepartList(reqBody, participantsList);
        },
   
    onDetails(row){
        this.$router.push({ 
            path: 'bidDetails',                
            query:{
                tabType:'accountInfo'
            }
         })
    },
        // 会议列表
        _getMeetingList(page) {
           let reqBody = {
                "api": "meetinglist",
                "userid":sessionStorage.getItem('userid'),
                "page":page,
                "pagesize":this.pageSize,
                "companyid":sessionStorage.getItem('companyid'),
                "search":this.searchData.antistop
            }
            this.getToDoList(reqBody);
        },

    // 分页
        _onChangePaging (val) {
            this._getMeetingList(val);
        },

    //会议详情
    meetingDetail(meetingid, createId, show){
        let reqBody = {
            "api": "meetingdetail",
            "companyid":sessionStorage.getItem('companyid'),
            "meetingid":meetingid,
        }
        this.meetingPermission(createId);
        this.toDoDetail(reqBody, show)
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
                "api": "meetingrecordadd",
                "userid":sessionStorage.getItem('userid'),
                "taskid":taskid,
                "remark":this.backlogRemark
            }

            this.onRecordAdd(reqBody, taskid).then(res => {
                this._getMeetingList(1);
                this.meetingDetail(taskid, true);
            })
        },

        // 打开新建待办弹出层
        _openNewBacklog() {
            let reqBody = {
                "api": "departmentlist",
                "uid": sessionStorage.getItem('userid'),
                "page": 1,
                "pagesize": 99999
            }
            this.getBasicList();
            this._getDepartList();
            // this.getDepartmentList(reqBody);
        },

    // 会议类型
    getBasicList(){
        let reqBody = {
            "api": "basiclist",
            "uid": sessionStorage.getItem('userid'),
            "companyid":sessionStorage.getItem('companyid'),
            "page":"1",
            "pagesize":"999999",
            "type":"3"

        }
        Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
               this.meetingTypeList = res.data
            } else {
               
            }
            
        })
    },

    // 创建、编辑待办
    establish(meetingid){
        console.log(this.taskuserId)
        if(!this.newMeeting.meetingtype || !this.newMeeting.meetingname || !this.newMeeting.meetingdesc || !this.taskuserId || !this.newMeeting.address|| !this.newMeeting.meetingtime){
            this.$message.error('请填写完整信息');
            return false;
        }
        let api = null;
        if(!meetingid) {
                api = 'meetingsave'
            } else {
                api = 'meetingupdate'
            }
            
        let reqBody = {
            "api": api,
            "uid":sessionStorage.getItem('userid'),
            "taskuserid":this.taskuserId,
            "meetingid": meetingid,
            "meetingtype":this.newMeeting.meetingtype,
            "meetingname":this.newMeeting.meetingname,
            "meetingdesc":this.newMeeting.meetingdesc,
            "address":this.newMeeting.address,
            "meetingtime":this.newMeeting.meetingtime,
            "companyid":sessionStorage.getItem('companyid'),
        }
        
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                if(!meetingid) {
                        this.$message.success("新建成功");
                    } else {
                        this.$message.success("修改成功");
                    }

                this.dialogVisible = false
                this.taskuserId = ''
                this.taskuserName = ''
                this.newMeeting.meetingtype = '';
                this.newMeeting.meetingname = '';
                this.newMeeting.meetingdesc = '';
                this.newMeeting.address = '';
                this.newMeeting.meetingtime = '';
                this.newMeeting.meetingid = '';
            }else{
                this.$message.error(res.msg);
            }
        }).then(res => {
             this._getMeetingList(1);
        })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .border
        border-color:#00AC97
    .breadcrumb
        padding-bottom 10px
        border-bottom 2px solid #ddd
    .backlogItem
        margin-bottom 10px
        .backlogItemTheme
            font-size 16px
            color #333
            font-weight bold
        .meeting-title-icon
            height 20px
            width 20px
            margin-right 10px
        .meeting-title-txt
            font-size 14px
            color #333333
            font-weight bold
        .backlogItemTime
            line-height 35px
            font-size 14px
            color #666
        .backlogItemMessage
            line-height 35px
            font-size 22px
            color #999
            vertical-align middle
            i
                vertical-align middle
            .number
                font-size 16px
                color #999
                vertical-align middle
        .textRight
            text-align right    
        background-color #fff  
        z-index 9999
        box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
        font-size 14px
        .particularsTitle
            padding-bottom 20px 
            margin-bottom 20px
            border-bottom 2px solid #ccc
            line-height 32px
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
                    
            .personnelBox
                width 50px
                height 50px
                margin 0 auto
                margin-bottom 5px
            
        .particularsCen
            overflow-y auto
            height 720px
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


// new css
    .border
        border-color:#00AC97
    .breadcrumb
        padding-bottom 10px
        border-bottom 2px solid #ddd
    .backlogItem
        // border:1px solid #ddd
        margin-bottom 10px
        .backlogItemContent
            padding 20px 20px
            .backlog-bottom-items
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
            padding 10px 20px
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
            border-top 1px solid #f5f5f5
            bottom 0
            left 0
            padding 0 20px
            width 100%
            height 65px
            .comment-form
                line-height 65px

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

.content-desc
    padding 15px 0 7px


</style>