<template>
    <div class="backlog">
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
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"  @click="newBacklog" >
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix padTb5">
                <div class="" v-loading="loading">
                    <div class="bgWhite backlogItem cp" v-for="(item,index) in meetingList" :key="index" @click="meetingDetail(item.meetingid)">
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
                                    {{item.meetingtime}}
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
                                    <span class="backlog-bottom-txt vam">{{item.endtime || '待添加'}}</span>
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
                <div class="pagination" v-if="meetingList[0]">
                    <el-pagination 
                    background
                    @current-change="onChangePaging"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    :total="Number(meetingList[0].count)">
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
                                    <el-input v-model="taskuserText" disabled></el-input>
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
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                
                                <el-form-item>
                                    <el-button type="primary" @click="establish">立即创建</el-button>
                                  
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
                                    <el-checkbox-group v-model="deptChecked" @change="departAll">
                                    <div class="xmb_departmentItem" v-for="(item,index) in deptInitData"
                                    :key="index">
                                        <el-checkbox :label="index"  :disabled="item.deptnumber==0?true:false" >{{item.deptname}}
                                            ({{item.deptnumber}}人)
                                        </el-checkbox>
                                        <i class="el-icon-arrow-right" @click="getDeptIndex(item,index,false)"></i>
                                    </div>
                                </el-checkbox-group>
                                </div>
                            </div>
                            
                        </div>
                    </el-col>
                    <!--成员-->
                    <el-col :span="10" v-if="!departShow">
                        <div class="padLr10">
                            <div class="breadcrumb">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item><span  @click="departShow = !departShow">{{departmentData.companyname}}</span></el-breadcrumb-item>
                                <el-breadcrumb-item>{{departmentData.dept[deptIndex].deptname}}</el-breadcrumb-item>
                            </el-breadcrumb>
                            </div>
                                <div class="departmentList">
                                <div class="departmentItem" >
                                    <el-checkbox-group v-model="staffModel" @change="staffSelect">
                                    <div class="xmb_departmentItem" v-for="(item,index) in departmentData.dept[deptIndex].staffList" :key="index">
                                        <el-checkbox :label="index" >{{item.staffname}}</el-checkbox>
                                    </div>
                                    </el-checkbox-group>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>

            </div>
        </el-dialog>

        <!-- 会议详情弹出层 -->
        <transition name="el-zoom-in-top">
            <div v-show="show" class="particulars">
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
                                <span class="particulars-title-txt vam">我发出的待办详情</span>
                            </div>
                        </el-col>
                        <el-col :span=12 class="tar vam">
                            <div class="particulars-title-right dib">
                                <!-- 编辑待办 -->
                                <i class="iconBox-particulars cp">
                                    <img  v-lazy="'static/img/backlogIcon/gray_editor.png'" alt="">
                                </i>
                                <!-- 删除此条待办 -->
                                <i class="iconBox-particulars cp">
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
                        <el-row>
                            <el-col :span="12">
                                <div class="particulars-endTime-left row">
                                    <i class="iconBox-particulars vam">
                                        <img  v-lazy="'static/img/backlogIcon/timems.png'" alt="">
                                    </i>
                                    <!-- 会议时间 -->
                                    <span class="particulars-endTime-titleTxt vam">{{backlogDetail.endtime || '待添加'}}</span>
                                </div>
                            </el-col>
                        </el-row>
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
                                    <span class="particulars-endTime-titleTxt vam">{{backlogDetail.meetingname || '待添加'}}</span>
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
                                {{backlogDetail.taskdescribe}}
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
                            <span class="particulars-content-titleTxt" style="margin-right:20px">执行人</span>
                            <span class="particulars-content-titleTxt">2/9已完成</span>
                        </div>
                        <!-- 执行人列表 -->
                        <div class="particulars-personnel-list">
                            <el-row >
                                <el-col :span="4" v-for="(item,index) in backlogDetail.userlist" :key="index" class="particulars-personnel-item">
                                    <div class="personnel-avatar">
                                        <img class="personnelImg" v-lazy="{src:item.portrait,error:'static/img/portrait.png'}"  alt="">
                                    </div>
                                    <div class="personnel-completeTxt">{{item.staffname}}</div>
                                    <div class="personnel-completeTime">{{item.staffname}}</div>
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
                            <span class="particulars-content-titleTxt">(5)</span>
                        </div>
                        <div class="particulars-comment-items">
                            <el-row :gutter="20" v-for="(item,index) in backlogDetail.taskrecordlist" :key="index" class="particulars-comment-item">
                                <el-col :span="3">
                                    <div class="personnel-avatar">
                                    <img class="personnelImg" v-lazy="{src:item.portrait,error:'static/img/portrait.png'}"  alt="">
                                    </div>
                                </el-col>
                                <el-col :span="21">
                                    <el-row class="comment-item-title">
                                        <el-col span="12">{{item.staffname}}</el-col>
                                        <el-col span="12" class="tar">{{item.updatetime}}</el-col>
                                    </el-row>
                                    <!-- 评论内容 -->
                                    <div class="comment-item-desc">
                                        <span style="padding-top:10px">{{item.remark}}</span>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>

                <!-- New 评论编辑区域 -->
                <div class="publishBox">
                    <form action="" class="comment-form row">
                        <div class="comment-input-box dib" style="width:85%;">
                            <el-input style="width:100%;"  placeholder="请输入内容" v-model="backlogRemark"></el-input>
                        </div>
                        <div class="comment-btn-box tar dib" style="width:15%">
                            <el-button style="width:95%;" type="primary" @click="onRecordAdd(backlogDetail.taskid)">发送</el-button>
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


export default {
  
  data () {
    return {
        dialogVisible: false,
        loading:false,
        show:false,
        meetingList:[],
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
        pageSize:10,
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
                {
                    title:'新建',
                    clickEvent:'changeState',
                    icon:'icon-bianji'
                }
            ]
        },


        // 新建相关数据
    
        newMeeting:{  //表单绑定数据
            meetingtype:'',
            meetingname:'',
            meetingdesc:'',
            address:'',
            meetingtime:'',
            
        },
        
        departShow:true,  //显示判断
        deptIndex:0,    //选择部门下标
        taskuserText:'',  //选中人员名单
        taskuserId:'',
        departmentData:{},  //部门列表
        deptInitData:[],  //部门处理后列表
        deptChecked:[],
        departArr:[],
        staffModel:[],
        meetingTypeList:[]
        
        
    }
  },
  
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created(){
    this._getMeetingList(1)
    this.getBasicList()
  },
  methods:{
    getFormulaBar(res){
        console.log(res)
    },
    getCutTab(res){
        console.log(res)
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
    //获取会议纪要列表
    _getMeetingList(page){
        this.loading = true
        let reqBody = {
            "api": "meetinglist",
            "userid":sessionStorage.getItem('userid'),
            "page":page,
            "pagesize":this.pageSize,
            "companyid":sessionStorage.getItem('companyid'),
            "search":this.searchData.antistop
        }
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.meetingList = res.data
            }else{
                if(res.state==10002){
                    this.meetingList = []
                }
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //分页事件
    onChangePaging(val) {
        this._getMeetingList(val)
    },
    meetingDetail(meetingid,show){
        let reqBody = {
            "api": "meetingdetail",
            "companyid":sessionStorage.getItem('companyid'),
            "meetingid":meetingid,

        }
        Axios(reqBody,'user').then((res) => {
            console.log(res)
            if(res.state==10001){
                if(!show){
                    this.show = !this.show
                }
                console.log(this.show)
                
                this.backlogDetail = res.data
            }else{
                if(res.state==10002){
                    
                }
                this.$message.error(res.msg);
            }
            
        })
    },
    //发送信息
    onRecordAdd(taskid){
        let reqBody = {
                "api": "meetingrecordadd",
                "userid":sessionStorage.getItem('userid'),
                "taskid":taskid,
                "remark":this.backlogRemark

            }
            Axios(reqBody,'user').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success(res.msg);
                    this.backlogRemark = ''
                    this._getMeetingList(1)
                    this.meetingDetail(taskid,true)
                }else{
                    if(res.state==10002){
                        
                    }
                    this.$message.error(res.msg);
                }
                
            })
    },


    //获取部门列表 打开新建待办
    getDepartmentList() { 
        let reqBody = {
            "api": "departmentlist",
            "uid": sessionStorage.getItem('userid'),
            "page": 1,
            "pagesize": 99999
        }
        Axios(reqBody, 'user').then((res) => {
             console.log(res)
            if (res.state == 10001) {
                let departInitData = []
                for(let i=0;i<res.data.dept.length;i++){
                    let itemData = res.data.dept[i]
                    itemData.staffModel=[]
                    itemData.staffList=[]
                    itemData.isAll = false
                    itemData.getData = false
                    itemData.thatIntex = i
                    departInitData.push(itemData)
                }
                this.deptInitData = departInitData
                this.departmentData = res.data
                this.dialogVisible = true
            
            } else {
            
            }
            
        });
    },
    getDeptIndex(el,deptIndex,circulation){
        this.deptIndex = deptIndex
        this.staffModel = []
        for(let i=0;i<el.staffList.length;i++){
            if(el.staffList[i].isSelect){
                this.staffModel.push(i)
            }
        }
        this.getMemberList(el,deptIndex,circulation)
    },

    //获取部门下人员名单
    getMemberList(el,deptIndex,circulation){
        
        if(el.deptnumber== 0){
            return false
        }
        if(!circulation){
            this.departShow = !this.departShow
        }
        
        if(el.staffList.length>0){
            return false
        }
        let reqBody = {
            "api": "memberlist",
            "companyid": sessionStorage.getItem('companyid'),
            "deptid": el.deptid,
            "page": 1,
            "pagesize": 999999
        }
        Axios(reqBody, 'user').then((res) => {
            if (res.state == 10001) {
                let staffList = []
                for(let i=0;i<res.data.length;i++){
                    let itemData = res.data[i]
                    itemData.isSelect = false
                    staffList.push(itemData)
                }
                this.deptInitData[deptIndex].staffList = staffList
                this.deptInitData[deptIndex].getData = true
                if(circulation){
                    this.departAll(circulation)
                }
            } else {
                this.deptInitData[deptIndex].getData = true
                if(circulation){
                    this.departAll(circulation)
                }
            }
            
        })
    },
    //部门选择循环
    departAll(el,staff){
        console.log(el)
        let atStaff = staff?false:true
        this.departArr = el
        let deptInitData = this.deptInitData
        let taskuserText = ''
        let taskuserId = ''
        for(let i=0;i<deptInitData.length;i++){
            let staffList = deptInitData[i].staffList
            if(deptInitData[i].isAll&&el.indexOf(i) == -1){
                deptInitData[i].isAll = false
                for(let t=0;t<staffList.length;t++){
                    staffList[t].isSelect = false
                }
            }
            if(el.indexOf(i) > -1){
                deptInitData[i].isAll = true
            }else{
                deptInitData[i].isAll = false
            }
            deptInitData[i].staffModel = []
            if(deptInitData[i].getData == false&&atStaff){
                this.getMemberList(deptInitData[i],i,el)
            }

            
            for(let t=0;t<staffList.length;t++){
                
                if(deptInitData[i].isAll){
                    staffList[t].isSelect = true
                    deptInitData[i].staffModel.push(t)
                    if(taskuserText){
                        taskuserText = taskuserText +','+ staffList[t].staffname
                        taskuserId = taskuserId +','+ staffList[t].userid
                    }else{
                        taskuserText = staffList[t].staffname
                        taskuserId = staffList[t].userid
                    }
                }else{
                    // if(!deptInitData[i].isAll&&deptInitData[i].staffModel.length<1){
                    //     staffList[t].isSelect = false
                    // }
                    if(staffList[t].isSelect){
                        deptInitData[i].staffModel.push(t)
                        if(taskuserText){
                            taskuserText = taskuserText +','+ staffList[t].staffname
                            taskuserId = taskuserId +','+ staffList[t].userid
                        }else{
                            taskuserText = staffList[t].staffname
                            taskuserId = staffList[t].userid
                        }
                    }
                }
                
            }
            

        }
            
        
        
        this.taskuserText = taskuserText
        this.taskuserId = taskuserId
    },
   
    staffSelect(el){
        let deptIndex = this.deptIndex
        let atDeptInitData = this.deptInitData[deptIndex]
        let deptChecked = this.deptChecked
        for(let i=0;i<atDeptInitData.staffList.length;i++){
            if(el.indexOf(i) > -1){
                atDeptInitData.staffList[i].isSelect = true
            }else{
                atDeptInitData.staffList[i].isSelect = false
            }
        }
        if(el.length!=atDeptInitData.staffList.length){
            atDeptInitData.isAll = false
            if(deptChecked.indexOf(deptIndex) >-1){
                deptChecked.splice(deptChecked.indexOf(deptIndex), 1);
            }
        }else{
            atDeptInitData.isAll = true
            
            if(deptChecked.indexOf(deptIndex) == -1){
                deptChecked.push(deptIndex)
            }
        }
        
        // for(let i=0;i<el.length;i++){
        //     if(deptChecked.indexOf(el[i]) == -1){
        //         deptChecked.push(el[i])
        //     }
        // }
        this.staffModel = el
        this.deptChecked = deptChecked
        this.deptInitData[deptIndex] = atDeptInitData
        this.departAll(deptChecked,true)
        
        
    },
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
    establish(){
        console.log(this.taskuserId)
        if(!this.newMeeting.meetingtype || !this.newMeeting.meetingname || !this.newMeeting.meetingdesc || !this.taskuserId || !this.newMeeting.address|| !this.newMeeting.meetingtime){
            this.$message.error('请填写完整信息');
            return false
        }
        let reqBody = {
            "api": "meetingsave",
            "uid":sessionStorage.getItem('userid'),
            "taskuserid":this.taskuserId,
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
                this.$message.success('新建成功')
                this.dialogVisible = false
                this.taskuserId = ''
                this.taskuserText = ''
                this.newMeeting.meetingtype = ''
                this.newMeeting.meetingname = ''
                this.newMeeting.meetingdesc = ''
                this.newMeeting.address = ''
                this.newMeeting.meetingtime = ''
                this._getMeetingList(1)
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
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
        .publishBox
            position absolute
            bottom:0
            left 0
            padding 0 20px
            width 100%
            height 60px
            padding-top 9px
            
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
        height 81.5%

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
            background #f5f5f5
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
    white-space nowrap
    text-overflow ellipsis 
    overflow hidden
    padding 20px 0
    font-size 16px
    color #333
    font-family MicrosoftYaHei






// 待办详情弹出层修改
.particulars
    -moz-box-shadow -6px 0px 16px #ededed
    -webkit-box-shadow -6px 0px 16px #ededed
    box-shadow -6px 0px 16px #ededed
    // 公共样式
    .personnel-avatar
        width 50px
        height 50px
        border-radius 25px
        overflow hidden
    // 标题
    .particulars-title-wrap
        vertical-align bottom
        background #f5f5f5
        padding 10px 20px 10px
        // height 6%
        .particulars-title-left
            .iconBox-particulars
                margin-right 10px 
            .particulars-title-txt
                color #333
                font-size 16px
        .particulars-title-right
            .iconBox-particulars
                margin-left 20px
    // 详细内容
    .particulars-content
        overflow: auto;  
        height 86%
        padding 0 20px
        .iconBox-particulars
            margin-right 20px
        // 截止时间
        .particulars-endTime-wrap
            padding 15px 0
            .particulars-endTime-left
               line-height 30px
               .particulars-endTime-titleTxt
                    font-size 18px
                    color #333
        //安排事项
        .particulars-desc-wrap
            padding-bottom 20px
            .particulars-desc-title
                // vertical-align top
            .particulars-desc-content-box
                padding 20px 0 0 40px
            .particulars-desc-bottom
                margin-top 20px
                font-size 14px
                color #999
        // 执行人
        .particulars-executor-wrap
            padding-bottom 20px
            .particulars-personnel-list
                padding 20px 0 0 20px
                .particulars-personnel-item
                    display: flex;
                    flex-direction column
                    justify-content center
                    align-items center;
                    position relative
                    padding-bottom 20px
                    .accomplish-icon
                        position absolute
                        height 20px
                        width 20px
                        border-radius 50%
                        overflow hidden
                        top 0
                        right 10px
                    .personnel-completeTxt,
                    .personnel-completeTime
                        padding-top 10px
                    .personnel-completeTxt
                        font-size 14px
                        color #666
                    .personnel-completeTime
                        font-size 12px
                        color #999
        // 评论区
        .particulars-comment-wrap
            padding-top 20px
            .particulars-comment-items
                padding-left 40px
                .particulars-comment-item
                    padding-top 20px
                    .comment-item-title
                        font-size 14px
                        color #666
                    .comment-item-desc
                        margin 10px 0 5px 0
                        font-size 16px
                        color #333
            
            
// 待办弹出层公共样式
.particulars-title-wrap,
.particulars-endTime-wrap,
.particulars-desc-wrap,
.particulars-executor-wrap
    padding-top 20px
    border-bottom 1px solid #f5f5f5
    
.particulars-content-titleTxt
    vertical-align middle
    font-size 14px
    color #333
// 新增公共样式
.iconBox-particulars
    display inline-block
    vertical-align middle
    width 20px
    height 20px
// 字体

</style>