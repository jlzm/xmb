<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                       <el-form-item label="完成状态">
                            <el-select v-model="searchData.status" placeholder="请选择项目状态" popper-class="border">
                                <el-option value="-1" label="所有项目"></el-option>
                                <el-option value="0" label="已完成"></el-option>
                               
                                <el-option value="1" label="进行中"></el-option>
                                
                                
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn" @click="getProjectList(1)" >
                        
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index" v-if="item.limits!=0&&item.limits"  @click="getFormulaBar(item.clickEvent)">
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
                    <!-- 投标文件开始 -->
                    <el-table
                        ref="multipleTable"
                        :data="tableData.projectlist"
                        stripe
                        v-loading="loading"
                        align="center"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                        align="center">
                        </el-table-column>
                       
                        <el-table-column
                        prop="projectname"
                        label="项目名称"
                        
                        align="center"
                        show-overflow-tooltip>
                        
                        </el-table-column>
                        <el-table-column
                        prop="custmername"
                        label="客户名称"
                        align="center"
                        width="280">
                        </el-table-column>
                        
                        <el-table-column
                        prop="bargainsum"
                        label="合同签订金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{scope.row.bargainsum==0?'待填写':'￥'+scope.row.bargainsum1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="totalamount"
                        label="应收总金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{scope.row.bargainsum==0?'待填写':'￥'+scope.row.totalamount}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="projectstarttime1"
                        label="项目启动时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.projectstarttime1?'待填写':scope.row.projectstarttime1}}</span>
                            </template>
                        </el-table-column>
                            
                        <el-table-column
                        prop="appointedtime1"
                        label="约定完成时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.appointedtime1?'待填写':scope.row.appointedtime1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="staffname"
                        label="项目经理"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span>{{!scope.row.staffname?'待填写':scope.row.staffname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                      
                        label="项目状态"
                        align="center"
                        width="80">
                            <template slot-scope="scope">
                                <span>{{scope.row.status==0?'已完成':'进行中'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="finishtime"
                        label="完成时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{scope.row.finishtime?scope.row.finishtime:'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center" v-if="jurisdiction.project.query||jurisdiction.project.save">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.project.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit" v-if="jurisdiction.project.save"  @click="_getProjectInfo(scope.row)" ></el-button>
                                </el-tooltip>
                               
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="tableData">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    @current-change="pagingChange"
                    layout="prev, pager, next"
                    :total="tableData.total">
                    </el-pagination>
                </div>

               
            </div>
        </div>

        <el-dialog
        :title="dialogtTitle"
        :visible.sync="newDialogVisible"
        width="50%"
        class="newDialog"
        >
        <div>
            <el-form ref="form" :model="form" label-width="140px" class="compileDialog">
                <el-form-item label="项目名称" :show-message='false' :required='true'>
                    <el-input v-model="form.projectname"></el-input>
                </el-form-item>
                <el-form-item label="合同签订时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.bargaintime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同签订金额" :show-message='false' :required='true'>
                    <el-input v-model="form.bargainsum" type="number"></el-input>
                    <span class="newCustmerSpan">元</span>
                </el-form-item>
                <el-form-item label="项目启动时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.projectstarttime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="约定完工时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.appointedtime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="客户名称" :show-message='false' :required='true'>
                    <div class="relative">
                        <el-select v-model="form.custmerid" placeholder="请选择" @change="getAddressd">
                            <el-option :label="item.custmername" :value="item.id" v-for="(item,index) in customerList" :key="index"></el-option>
                        </el-select>
                        <div class="">
                            <el-button type="success" icon="el-icon-edit" class="newCustmer" @click="newCustmer">新建</el-button>
                        </div>
                    </div>  
                </el-form-item>
                <el-form-item label="所在地址" :show-message='false' :required='true'>
                    <el-input  disabled v-model="form.address"></el-input>
                </el-form-item>
                
                <el-form-item label="联系人" :show-message='false' :required='true'>
                    <el-input v-model="form.linkman"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :show-message='false' :required='true'>
                    <el-input v-model="form.linkmanphone" type="number"></el-input>
                </el-form-item>
                <el-form-item label="项目经理" :show-message='false' :required='true'>
                    <el-select v-model="form.projectleader" placeholder="请选择">
                        <el-option :label="item.staffname" :value="item.userid" v-for="(item,index) in deptempList" :key="index"></el-option>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="项目组成员" :show-message='false' :required='true'>
                    <el-select v-model="form.projectmember" multiple  placeholder="请选择">
                        <el-option :label="item.staffname" :value="item.userid" v-for="(item,index) in deptempList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目概况：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="form.describe"></el-input>
                    </el-form-item>
            </el-form>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addProject">确 定</el-button>
        </span>
        </el-dialog>
        
        <el-dialog
        title="添加客户信息"
        :visible.sync="newCustmerVisible"
        width="30%"
        >
        <div>
            <el-form  label-width="100px" class="demo-ruleForm" style="padding-right:60px">
                <el-form-item label="客户名称" :show-message='false' :required='true'>
                    <el-input v-model="newCustmerData.custmername"></el-input>
                </el-form-item>
                <el-form-item label="客户地址" :show-message='false' :required='true'>
                    <el-input :disabled="newCustmerData.latitude?false:true"  v-model="newCustmerData.addressd"></el-input>
                    <i class="mapIcon"  @click="mapVisible = true">
                        <img src="static/img/mapIcon.png" alt="">
                    </i>
                </el-form-item>
               
            </el-form>
           
            
        </div>
        <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
            <el-button @click="newCustmerVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCustmer">确 定</el-button>
        </span>
        </el-dialog>
        <v-map :mapVisible="mapVisible" :mapVal="mapVal" @closeVisible="closeVisible" @confirmVal="confirmVal"  v-if="mapVisible"></v-map>
    </div>
    
</template>
<script>
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息
import vMap from '../../common/Map.vue';  //地图



export default {
  
  data () {
    return {
        loading:false,
        searchData:{
            antistop:'',
            area:'',
            principal:'',
            status:"-1"
        },
        tableData: [],
        multipleSelection: [],
        newDialogVisible:false,
        newCustmerVisible:false,
        mapVisible:false,
        mapVal:{},
        newCustmerData:{
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        },
        dialogtTitle:'',
        pageSize:10,
        customerList:[],
        deptempList:[],
        limits:JSON.parse(sessionStorage.getItem('limits')),
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        isCompile:false,
        form: {
          api:"addproject_manage",
          projectname: '',
          bargaintime:'',
          bargainsum:'',
          projectstarttime:'',
          appointedtime:'',
          custmerid:'',
          linkman:'',
          address:'',
          linkmanphone:'',
          projectleader:'',
          projectmember:[],
          describe:'',
          companyid: sessionStorage.getItem('companyid')
        },
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
              
            ],
            right:[
                {
                    title:'新建',
                    clickEvent:'new',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                },{
                    title:'导出',
                    clickEvent:'export',
                    icon:'icon-jia',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.query
                }
            ]
        }
    }
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo,vMap
  },
  created () {
    this.getProjectList(1)      
    this.getCustomerList()
    this.getDeptemp()
  },
  mounted(){
     
  },
  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
        if(res=='new'){
            this.form = {
                api:"addproject_manage",
                projectname: '',
                bargaintime:'',
                bargainsum:'',
                projectstarttime:'',
                appointedtime:'',
                custmerid:'',
                linkman:'',
                linkmanphone:'',
                projectleader:'',
                projectmember:[],
                describe:'',
                companyid: sessionStorage.getItem('companyid')
            }
            this.dialogtTitle = '新建项目'
            this.newDialogVisible = true
        }else if(res=='export'){
            this.exportworkorder()
        }
    },
    //Tab 切换事件
    getCutTab(res){
        console.log(res)
    },
    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //分页
    pagingChange(val){
        this.getProjectList(val)
    },
    //跳转详情事件
    onDetails(row){
        this.$router.push({ 
            path: 'projectDetails',                
            query:{
                id:row.id
            }
         })
    },
    //获取列表数据
    getProjectList(page){
        this.loading = true
        let reqBody = {
            "api": "getprojectlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['project'],
            "page":page,
            "status":this.searchData.status,

            "pagesize":this.pageSize
        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //客户列表
    getCustomerList(){
        let reqBody = {
            "api": "getcustomerlist",
            "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.customerList =  res.data
                
            } else {
                
            }
        })
    },
    //员工列表
    getDeptemp(){
        let reqBody = {
            "api": "getdeptemp",
            "deptid": "",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.deptempList =  res.data
                
            } else {
                
            }
        })
    },
    //添加项目
    addProject(){
        let reqBody = this.form
        console.log(reqBody)
        if(!reqBody.projectname||!reqBody.bargainsum||!reqBody.custmerid||!reqBody.linkman||!reqBody.linkmanphone||!reqBody.projectleader||!reqBody.projectmember){
            this.$message.error('请填写完整信息')
            return false
        }
        if(this.isCompile){
            this.updateproject()
            return false
        }
        let projectmember = ''
        for(let i=0;i<reqBody.projectmember.length;i++){
            if(projectmember){
                projectmember = projectmember +',' +reqBody.projectmember[i]
            }else{
                projectmember = reqBody.projectmember[i]
            }
        }
        reqBody.projectmember = projectmember

        console.log(reqBody)
        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message({
                    message: '添加成功',
                    type: 'success'
                })
                this.newDialogVisible=false
                this.getProjectList(1)      
            } else {
                this.$message.error(res.data)
            }
        })
    },
    //获取详情
    _getProjectInfo(row){
         this.dialogtTitle = '编辑项目'
        let reqBody = {
            "api": "getprojectinfo",
            "id": row.id,
            "companyid":sessionStorage.getItem('companyid'),
            "userid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                let projectInfo = res.data.project_manage
                let projectmember = []
                if(res.data.servicelist){
                    for(let i=0;i<res.data.servicelist.length;i++){
                        projectmember.push(res.data.servicelist[i].userid)
                    }
                }
                
                console.log(projectmember)
                this.form = {
                    api:"updateproject",
                    projectname: projectInfo.projectname,
                    bargaintime:projectInfo.bargaintime1,
                    bargainsum:projectInfo.bargainsum,
                    projectstarttime:projectInfo.projectstarttime1,
                    appointedtime:projectInfo.appointedtime1,
                    custmerid:projectInfo.custmerid,
                    linkman:projectInfo.linkman,
                    address:projectInfo.addressd,
                    linkmanphone:projectInfo.linkmanphone,
                    projectleader:projectInfo.projectleader,
                    projectmember:projectmember,
                    describe:projectInfo.describe,
                    companyid: sessionStorage.getItem('companyid'),
                    id:projectInfo.id
                }
                this.isCompile = true
                this.newDialogVisible = true
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //编辑
    updateproject(){
        let reqBody = this.form
        let projectmember = ''
        for(let i=0;i<reqBody.projectmember.length;i++){
            if(projectmember){
                projectmember = projectmember +',' +reqBody.projectmember[i]
            }else{
                projectmember = reqBody.projectmember[i]
            }
        }
        reqBody.projectmember = projectmember

        console.log(reqBody)
        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                this.form = {
                    api:"addproject_manage",
                    projectname: '',
                    bargaintime:'',
                    bargainsum:'',
                    projectstarttime:'',
                    appointedtime:'',
                    custmerid:'',
                    address:'',
                    linkman:'',
                    linkmanphone:'',
                    projectleader:'',
                    projectmember:[],
                    describe:'',
                    companyid: sessionStorage.getItem('companyid')
                }
                this.newDialogVisible=false
                this.getProjectList(1)      
            } else {
                this.$message.error(res.data)
            }
        })
    },
    //导出
    exportworkorder(){
        console.log(this.multipleSelection)
        if(this.multipleSelection.length<1){
            this.$message.error('请选择需要导出的数据')
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
        window.open(Session.exportUrl+'exportList?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
    },
    //添加客户
    newCustmer(){
        this.newCustmerData={
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        }

        this.newCustmerVisible = true


    },
    addCustmer(){
        if(!this.newCustmerData.custmername || !this.newCustmerData.addressd){
            this.$message.error('请填写完整信息')
            return false
        }
        let reqBody = {
            "api": "basicadd",
            "uid": sessionStorage.getItem('userid'),
            "type": 4,
            "longitude":this.newCustmerData.longitude,
            "latitude":this.newCustmerData.latitude,
            "companyid":sessionStorage.getItem('companyid'),
            "custmername": this.newCustmerData.custmername,
            "addressd": this.newCustmerData.addressd,
        }

        Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.newCustmerVisible = false
                this.getCustomerList()
                
            } else {
                
            }
        })
    },


    //地图相关
    closeVisible(mapVisible){
        console.log(mapVisible)
        this.mapVisible = mapVisible
    },
    confirmVal(mapVal){
        this.mapVisible = false
        console.log(mapVal)
        this.newCustmerData.addressd = mapVal.address
        this.newCustmerData.longitude = mapVal.lng
        this.newCustmerData.latitude = mapVal.lat
        this.mapVal = {
          lng:mapVal.lng,
          lat:mapVal.lat,
          address:mapVal.address,
        }
    },
    //获取地址
    getAddressd(res){
        console.log(res)
        for(let i=0;i<this.customerList.length;i++){
            if(res == this.customerList[i].id){
                this.form.address = this.customerList[i].addressd
                break;
            }
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
        .el-dialog
            padding 0 40px
    .border
        border-color:#00AC97
    .compileDialog
        padding-right  100px
        .el-date-editor
            width 100%
        .el-select
            width 100%
    .dialog-footer
        padding-right 100px
    .newCustmer
        position absolute
        top 0
        right -85px
    .newCustmer-dialog-footer
        padding-right 0
    .newCustmerSpan
        position absolute
        top 0
        right -25px

    
        
</style>