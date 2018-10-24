<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                       
                        <el-form-item label="项目">
                            <el-select v-model="searchData.projectId" placeholder="请选择项目" popper-class="border">
                                <el-option value="" label="所有项目"></el-option>
                                <el-option :value="item.id" :label="item.projectname" v-for="(item,index) in  projectList" :key="index"></el-option>

                                
                            </el-select>
                        </el-form-item>

                        <el-form-item label="类型">
                            <el-select v-model="searchData.sumsourceId" placeholder="请选择类型" popper-class="border">
                                <el-option value="" label="所有类型"></el-option>
                                <el-option :value="item.id" :label="item.typename" v-for="(item,index) in  sumsourceList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="">
                            <el-date-picker
                            v-model="searchData.time"
                            type="datetimerange"
                            range-separator=""
                           
                            :value-format="timeVal"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        
                        <el-form-item>
                            <div class="leftBtn btn" @click="getSearchData" >
                        
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn"  @click="newFinance">
                        
                                <span class="btnTitle">{{tableIndex==1?'新建项目支出':'新建项目回款'}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn"  @click="exportworkorder">
                        
                                <span class="btnTitle">导出</span>
                            </div>
                        </el-form-item>

                        <el-form-item>
                            <div class="leftBtn btn"  @click="cutList">
                        
                                <span class="btnTitle">{{tableIndex==1?'切换至回款列表':'切换至支出列表'}}</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"   >
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite" >
                    <div  v-show="tableIndex==1">
                        <!-- 投标文件开始 -->
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            v-loading="loading"
                            align="center"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="projectname"
                            label="支出项目"
                            align="center"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="expendituretime"
                            label="支出时间"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="sum"
                            label="支出金额"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            label="支出类别"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="passman"
                            label="经手人"
                            align="center"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align="center"
                            width="220">
                            </el-table-column>
                        
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="200"
                            align="center">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                        <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                    </el-tooltip>
                                    
                                    <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                        <el-button type="success" icon="el-icon-edit-outline"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                        <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                    </el-tooltip> -->
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 投标文件结束 -->
                    </div>
                    
                    <div v-show="tableIndex==2">
                        <!-- 投标文件开始 -->
                        <el-table
                            ref="multipleTable"
                            :data="tableData1"
                            stripe
                            v-loading="loading"
                            align="center"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange" >
                            <el-table-column
                            type="selection"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="projectname"
                            label="回款项目"
                            align="center"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="returnedtime"
                            label="回款时间"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="sum"
                            label="回款金额"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="content"
                            label="回款内容"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="passman"
                            label="经手人"
                            align="center"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="createtime"
                            label="创建时间"
                            align="center"
                            width="220">
                            </el-table-column>
                        
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="200"
                            align="center">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                        <el-button @click="onDetails2(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                    </el-tooltip>
                                    
                                    <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                        <el-button type="success" icon="el-icon-edit-outline"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                        <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                    </el-tooltip> -->
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 投标文件结束 -->
                    </div>
                    

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="tableIndex==1&&tableData[0]">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData[0].total">
                    </el-pagination>
                </div>
                <div class="pagination" v-if="tableIndex==2&&tableData1[0]">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange1"
                    :total="tableData1[0].total">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        
        <el-dialog title="新建项目支出" :visible.sync="expendDialogVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="支出项目：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.projectid" placeholder="请选择支出项目">
                            
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出类别：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.typeid" placeholder="请选择支出类别">
                            <el-option
                            v-for="(item,index) in sumsourceList"
                            :key="index"
                            :label="item.typename"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出金额：" :show-message='false' :required='true'>
                        <el-input v-model="newExpend.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false"
                        :multiple='true'
                        :file-list="expendImagelist"
                        list-type="picture-card"
                        :on-change="imgChange"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newExpend.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="expendDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addExpendiTure">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新建项目回款" :visible.sync="returnedDialogVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="回款项目：" :show-message='false' :required='true'>
                        <el-select v-model="newReturned.projectid" placeholder="请选择回款项目">
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="回款金额：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="回款内容：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.content" type="textarea" :autosize="{ minRows: 3, maxRows: 15}"></el-input>
                    </el-form-item>
                    <el-form-item label="回款时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newReturned.returnedtime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:hh:mm"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :auto-upload="false"
                        :multiple='true'
                        list-type="picture-card"
                        :file-list="returnedImagelist"
                        :on-change="imgChange"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newReturned.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="returnedDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addReturndMoney">确 定</el-button>
            </span>
        </el-dialog>

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
        loading:false,
        expendDialogVisible:false,
        returnedDialogVisible:false,
        returnedImagelist:[],
        expendImagelist:[],
        timeVal:'yyyy-MM-dd HH:mm:ss',
        searchData:{
            antistop:'',
            projectId:'',
            sumsourceId:'',
            principal:'',
            time:''
        },
        newExpend:{
            projectid:'',
            typeid:'',
            sum:'',
            remark:'',
            images:''
        },
        newReturned:{
            projectid:'',
            content:'',
            sum:'',
            remark:'',
            returnedtime:'',
            images:''
        },
        sumsourceList:[],
        projectList:[],
        pageSize:10,
        tableIndex:1,
        tableData: [],
        tableData1: [],
        limits:JSON.parse(sessionStorage.getItem('limits')),
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
        leftTabList:{
            tabType:'leftTabList',
            tabTitle:'基本信息',
            tabActive:0,
            icon:'icon-jibenxinxi',
            item:[
                {
                    title:'项目信息',
                    clickEvent:'projectInfo',
                    
                },
                {
                    title:'招投标信息',
                    clickEvent:'bidInfo',
                    
                }
            ]
        },
        rightTabList:{
            tabType:'rightTabList',
            tabTitle:'关联数据',
            tabActive:3,
            icon:'icon-guanliangongnengliebiaoiconxuanzhong',
            item:[
                {
                    title:'跟进记录',
                    clickEvent:'projectInfo'
                },
                {
                    title:'投标准备',
                    clickEvent:'projectInfo'  
                },
                {
                    title:'招标文件',
                    clickEvent:'projectInfo'  
                },
                {
                    title:'投标文件',
                    clickEvent:'projectInfo'  
                }
            ]
        }
    }
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created () {
      this.getExpendiTureList(1)  
      this.getReturnedMoneyList(1)
      this._getSumsource()
      this._getPurchaseProjectList()

    
  },
  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
    },
    //Tab 切换事件
    getCutTab(res){
        console.log(res)
    },
    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleRemove(file, fileList) {
        this.newReturned.images = ''
        this.newExpend.images = ''
        for(let i=0;i<fileList.length;i++){
            this.initBase(fileList[i].url)
        }
        console.log(fileList)
    },
    handlePictureCardPreview(file) {
    
    },
    imgChange(file, fileList){
        this.dialogImageUrl = file.url
        this.newReturned.images = ''
        this.newExpend.images = ''
        for(let i=0;i<fileList.length;i++){
            this.initBase(fileList[i].url)
        }
        console.log(fileList)
    },
            
    
    //分页
    pagingChange(val){
        this.getExpendiTureList(val)
    },
    //分页
    pagingChange1(val){
        this.getReturnedMoneyList(val)
    },
    //切换列表
    cutList(){
        this.searchData={
            antistop:'',
            projectId:'',
            sumsourceId:'',
            principal:'',
            time:''
        }
        if(this.tableIndex==1){
            this.tableIndex = 2
        }else{
            this.tableIndex = 1
        }
        this.multipleSelection = []
        this.getExpendiTureList(1)  
        this.getReturnedMoneyList(1)
    },
    onDetails(row){
        this.$router.push({ 
            path: 'financeDetails',                
            query:{
                id:row.id
            }
        })
    },
    onDetails2(row){
        this.$router.push({ 
            path: 'returnedDetails',                
            query:{
                id:row.id
            }
        })
    },
    //获取列表数据 -- 项目支出
    getExpendiTureList(page){
        this.loading = true
        let searchData = {
            time:[
            '',
            ''
            ]
        }
        if(this.searchData.time&&this.searchData.time.length>1){
            searchData = this.searchData
        }
        console.log(this.searchData)
        let reqBody = {
            "api": "getexpenditurelist",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "workstatus":0,
            "limit":this.limits['finance'],
            "page":page,
            "pagesize":this.pageSize,
            "starttime": searchData.time[0],
            "endtime": searchData.time[1],
            "projectid": this.searchData.projectId,
            "type": "",
            "typeid":this.searchData.sumsourceId
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                
            }else{
                this.tableData = []
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取列表数据 -- 项目回款
    getReturnedMoneyList(page){
        this.loading = true
        let searchData = {
            time:[
            '',
            ''
            ]
        }
        if(this.searchData.time&&this.searchData.time.length>1){
            searchData = this.searchData
        }
        let reqBody = {
            "api": "getreturnedmoneylist",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "workstatus":0,
            "limit":Session.limits['finance'],
            "page":page,
            "pagesize":this.pageSize,
            "starttime": searchData.time[0],
            "endtime": searchData.time[1],
            "projectid": this.searchData.projectId,

           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData1 = res.data
                
            }else{
                this.tableData1 = []
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取列表数据 -- 项目回款
    _getSumsource(){
        let reqBody = {
            "api": "getexpendituretype",
            "companyid": sessionStorage.getItem('companyid'),
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.sumsourceList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
    },
    //获取列表数据 -- 项目回款
    _getPurchaseProjectList(){
        let reqBody = {
            "api": "getpurchaseprojectlist",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": ""
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.projectList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
    },
    newFinance(){   
        if(this.tableIndex==1){ 
            this.expendImagelist = []
            this.newExpend={
                projectid:'',
                typeid:'',
                sum:'',
                remark:'',
                images:''
            }
            this.expendDialogVisible = true
        }else {
            this.returnedImagelist = []
            this.newReturned={
                projectid:'',
                content:'',
                sum:'',
                remark:'',
                returnedtime:'',
                images:''
            }
            
            this.returnedDialogVisible = true
            
        }
    },
    initBase(url){
        let that = this
        fetch(url).then(data=>{
            const blob = data.blob();
            return blob;
        }).then(blob=>{
            let reader = new window.FileReader();
            reader.onloadend = function() {
                const data = reader.result;
                if(that.tableIndex==2){
                    if(that.newReturned.images){
                        that.newReturned.images = that.newReturned.images+','+data.replace(/^data:image\/(png|jpg);base64,/, "")
                    }else{
                        that.newReturned.images = data.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                    }
                }else{
                    if(that.newExpend.images){
                        that.newExpend.images = that.newExpend.images+','+data.replace(/^data:image\/(png|jpg);base64,/, "")
                    }else{
                        that.newExpend.images = data.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                    }
                }
                
               
            };
            reader.readAsDataURL(blob);
        })
    },
   
    //新增回款
    addReturndMoney(){
        let newReturned = this.newReturned
        if(!newReturned.projectid || !newReturned.sum || !newReturned.content || !newReturned.returnedtime ){

            this.$message.error('请填写完整信息');
            return false
        }
        let reqBody = {
            "api": "addreturndmoney",
            "projectid": newReturned.projectid,
            "sum": newReturned.sum,
            "content": newReturned.content,
            "returnedtime": newReturned.returnedtime,
            "remark": newReturned.remark,
            "images": newReturned.images,
            "passmanid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('新增成功')
                this.returnedDialogVisible = false
                this.newReturned={
                    projectid:'',
                    content:'',
                    sum:'',
                    remark:'',
                    returnedtime:'',
                    images:''
                }
                this.getReturnedMoneyList(1)
                
            }else{
                this.$message.error(res.msg);
            } 
        })
    },
    //新增支出
    addExpendiTure(){
        let newExpend = this.newExpend
        if(!newExpend.projectid || !newExpend.sum || !newExpend.typeid  ){

            this.$message.error('请填写完整信息');
            return false
        }
        let reqBody = {
            "api": "addexpenditure",
            "projectid": newExpend.projectid,
            "sum": newExpend.sum,
            "typeid": newExpend.typeid,
            "remark": newExpend.remark,
            "images": newExpend.images,
            "companyid": sessionStorage.getItem('companyid'),
            "passmanid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('新增成功');
                this.expendDialogVisible = false
                this.newExpend={
                    projectid:'',
                    typeid:'',
                    sum:'',
                    remark:'',
                    images:''
                }
                this.getExpendiTureList(1) 
                
            }else{
                this.$message.error(res.msg);
            } 
        })
    },
    //导出
    exportworkorder(){
        console.log(this.multipleSelection)
        if(this.multipleSelection.length<1){
            this.$message.error('请选择需要导出的文件')
            return false
        }
        let ids = ''
        for(let i=0;i<this.multipleSelection.length;i++){
            if(ids){
                ids = ids + "," + this.multipleSelection[i].id
            }else{
                ids = this.multipleSelection[i].id
            }
        }
        if(this.tableIndex==1){
            window.open(Session.exportUrl+'index/exportexpenditure?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
        }else{
            window.open(Session.exportUrl+'index/exportreturnedmoney?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
        }
        
        
        
        
    },
    //查询
    getSearchData(){
        if(this.tableIndex==1){
             this.getExpendiTureList(1)  
      
        }else{
            this.getReturnedMoneyList(1)
        }
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
            height 52px
            background-color #fff
            padding 10px
            margin-bottom 10px
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
        .el-select,.el-date-editor
            width 100%
    .border
        border-color:#00AC97
    .line
        text-align center
</style>