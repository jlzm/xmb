<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <el-row>
                    <el-col :span="4">
                        <div class="clearfix">
                            <div  class="tabItem pointer" :class="workstatus==0?'activeTabItem':''" @click="setWorkStatus(0)"><span >进行中工单</span></div>
                            <div  class="tabItem pointer" :class="workstatus==1?'activeTabItem':''" @click="setWorkStatus(1)"><span >已完成工单</span></div>
                            <!-- <div  class="tabItem pointer" :class="tabIndex==2?'activeTabItem':''" @click="onTabCut(2)"><span >财务数据</span></div> -->
            
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="screenBox">
                        
                            <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                                <!-- <el-form-item>
                                    <div class="leftBtn btnst" :class="workstatus==0?'actBtn':''"  @click="setWorkStatus(0)">
                                        <span class="btnTitle">进行中工单</span>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="leftBtn btnst" :class="workstatus==1?'actBtn':''"  @click="setWorkStatus(1)">
                                        <span class="btnTitle">已完成工单</span>
                                    </div>
                                </el-form-item> -->
                                <el-form-item >
                                    <el-input v-model="searchData.antistop" placeholder="请输入工单编号或项目名称"></el-input>
                                </el-form-item>
                                
                                <el-form-item>
                                    <div class="leftBtn btn"  @click="setReset">
                                        <span class="btnTitle">查询</span>
                                    </div>
                                </el-form-item>

                                
                                
                            </el-form>

                        </div>
                        
                    
                    </el-col>
                    <el-col :span="10">
                        <div class="floatRight rightBox clearfix">
                            <div class="rightBtn btn" @click="onNew"  v-if="jurisdiction.workorder.add" >
                                <div>
                                    <i class="iconfont marR5 icon-jia" ></i>
                                    <span class="btnTitle">新建工单</span>
                                </div>
                            </div> 
                            <div class="rightBtn btn bg4C97FF" @click="exportworkorder" v-if="jurisdiction.workorder.query"  >
                                <div>
                                    <i class="iconfont marR5 icon-export" ></i>
                                    <span class="btnTitle">批量导出</span>
                                </div>
                            </div> 
                        </div>
                    </el-col>
                </el-row>
                
                
                
               
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
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
                        prop="wordorder"
                        label="工单编号"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{scope.row.wordorder}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="projectname"
                        label="所属项目"
                        
                        align="center"
                        show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span>{{scope.row.projectname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="发起人"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span>{{!scope.row.name?'待填写':scope.row.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createtime"
                        label="创建时间"
                        align="center"
                        width="160">
                        </el-table-column>

                        <el-table-column
                        prop="servicename"
                        label="服务人员"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.servicename?'待填写':scope.row.servicename}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="gettime"
                        label="上门时间"
                        align="center"
                        width="120">
                            <template slot-scope="scope">
                                <span>{{!scope.row.gettime?'待填写':scope.row.gettime}}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column
                        prop="linkman"
                        label="对接联系人"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span>{{!scope.row.linkman?'待填写':scope.row.linkman}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="优先级"
                        align="center"
                        width="80">
                            <template slot-scope="scope">
                                <span>{{scope.row.flag==0?'一般':'紧急'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                      
                        label="服务类型"
                        align="center"
                        width="80">
                            <template slot-scope="scope">
                                <span>{{scope.row.servicetype==0?'免费':'收费'}}</span>
                            </template>
                        </el-table-column>

                       
                        <!-- <el-table-column
                      
                        label="完成状态"
                        align="center"
                        width="80">
                             <template slot-scope="scope">
                                <span>{{scope.row.workstatus==0?'进行中':'已完成'}}</span>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                        prop="finishtime"
                        label="完成时间"
                        align="center"
                        width="140"
                      
                        v-if="workstatus==1"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.finishtime?scope.row.finishtime:'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center"  v-if="(jurisdiction.workorder.save&&workstatus!=1)||jurisdiction.workorder.query">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.workorder.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit" v-if="jurisdiction.workorder.save&&workstatus!=1"  @click="onCompile(scope.row)" ></el-button>
                                </el-tooltip>

                                <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                    <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                </el-tooltip> -->
                                 
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="pageReset">
                    <el-pagination 
                    background
                    :current-page.sync="page"
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData[0].total">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        
        <el-dialog
        title="编辑售后工单"
        :visible.sync="addDialogVisible"
        width="40%"
        >
        <div>
            <div class="newContent">
                <el-form ref="newMarketClue" :model="newMarketClue" label-width="140px">
                    <el-form-item label="项目名称：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.projectid" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in purchaseProjectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="联系人姓名：" :show-message='false' :required='true'>
                        <el-input  v-model="newMarketClue.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" :show-message='false' :required='true'>
                        <el-input  type="number" v-model="newMarketClue.linkphone"></el-input>
                    </el-form-item>
                    <el-form-item class="relative" label="上门地址：" :show-message='false' :required='true'>
                        <el-input v-model="newMarketClue.projectaddress"></el-input>
                        <i class="mapIcon"  @click="mapCompile = true" >
                            <img src="static/img/mapIcon.png" alt="">
                        </i>
                    </el-form-item>
                    <el-form-item label="上门时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.gettime"
                        type="datetime"
                        placeholder="选择上门时间"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="紧急程度：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.flag" placeholder="请选择">
                            <el-option label="一般 " value="0"></el-option>
                            <el-option label="紧急" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务类型：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.servicetype" placeholder="请选择">
                            <el-option label="免费" value="0"></el-option>
                            <el-option label="收费" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务人员：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.serviceid" multiple  placeholder="请选择">
                            <el-option
                            v-for="(item,index) in deptemp"
                            :key="index"
                            :label="item.staffname"
                            :value="item.userid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述信息：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="newMarketClue.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateCompile">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog
            title="新建售后工单"
            :visible.sync="newVisible"
            width="40%"
        >
            <v-newAfter @newAfter='newAfter' @onVisible="onVisible"  v-if="newVisible"></v-newAfter>
            
        
        </el-dialog>

        <v-map :mapVisible="mapCompile" :mapVal="mapCompileVal" @closeVisible="closeCompile" @confirmVal="confirmCompile"  v-if="mapCompile"></v-map>
    </div>
    
</template>
<script>


import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
import {AxiosExport} from './../../../api/axios'
import vMap from '../../common/Map.vue';  
import vNewAfter from './new.vue';  //项目信息

export default {
  
  data () {
    return {
        loading:false,
        mapCompile:false,
        addDialogVisible:false,
        mapCompileVal:{},
        searchData:{
            antistop:'',
            area:'',
            principal:''
        },
        tableData: [],
        multipleSelection: [],
        purchaseProjectList:[],
        customerList:[],
        deptemp:[],
        workorderid:'',
        servicelist:[],
        workstatus:"0",
        pageSize:10,
        page:1,
        pageReset:false,
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        limits:JSON.parse(sessionStorage.getItem('limits')),
        newMarketClue:{
            projectid:'',
            projectaddress:'',
            linkman:'',
            linkphone:'',
            gettime:'',
            flag:'',
            servicetype:'',
            serviceid:'',
            remark:'',
            companyid:'',
            longitude:'',
            latitude:''
        },
        newVisible:false
        
    }
  },
  components:{
    vMap,vNewAfter
  },
  created () {
      this.getWorkorderList(1)      
    
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
    setWorkStatus(workstatus){
        if(workstatus!=this.workstatus){
            this.pageReset = false
            this.page = 1
            this.workstatus = workstatus
            this.getWorkorderList()  
        }
    },
    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //分页
    pagingChange(val){
        this.page = val
        this.getWorkorderList()
    },
    setReset(){
        this.pageReset = false
        this.page = 1
        this.getWorkorderList()
    },
    //新建
    onNew(row){
        this.newVisible = true
    },
    //跳转详情事件
    onDetails(row){
        this.$router.push({ 
            path: 'afterSaledetails',                
            query:{
                workorderid:row.id
            }
         })
    },

    //获取列表数据
    getWorkorderList(){
        this.loading = true
        let reqBody = {
            "api": "getworkorderlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "workstatus":this.workstatus,
            "limit":this.limits['workorder'],
            "page":this.page,
            "pagesize":this.pageSize
        }

        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                if(res.data[0].total>0){
                    this.pageReset = true
                }
                this._getCustomerList()
                this._getDeptemp()
                this._getPurchaseProjectList()
            }else{
                this.tableData = []
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取项目列表
    _getPurchaseProjectList(){
        let reqBody = {
            "api": "getpurchaseprojectlist",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": ""

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.purchaseProjectList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //获取客户列表
    _getCustomerList(){
        let reqBody = {
            "api": "getcustomerlist",
            "companyid": sessionStorage.getItem('companyid'),
            

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.customerList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //获取部门的所有员工
    _getDeptemp(){
        let reqBody = {
            "api": "getdeptemp",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": "",
            "deptid":''
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.deptemp = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    onCompile(row){
        console.log(row)
        this.workorderid = row.id
        this._getWorkorderInfo(row.id)
    },
    _getWorkorderInfo(workorderid){
        let reqBody = {
            "api": "getworkorderinfo",
            "workorderid":workorderid,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.addDialogVisible = true
                let newMarketClue = res.data.workorderinfo
                this.mapCompileVal = {
                    lng:res.data.workorderinfo.longitude,
                    lat:res.data.workorderinfo.latitude,
                    address:res.data.workorderinfo.projectaddress,
                }
                let serviceid = []
                let servicelist = res.data.servicelist
                this.servicelist = res.data.servicelist
                for(let i=0;i<servicelist.length;i++){
                    serviceid.push(servicelist[i].userid)
                }
                this.newMarketClue = {
                    "projectid":newMarketClue.projectid+'',
                    "projectaddress":newMarketClue.projectaddress,
                    "companyid":newMarketClue.custmerid,
                    "linkman":newMarketClue.linkman,
                    "userid":sessionStorage.getItem('userid'),
                    "linkphone":newMarketClue.linkphone,                                                                                    
                    "longitude":newMarketClue.longitude,
                    "latitude":newMarketClue.latitude,
                    "gettime":newMarketClue.gettime,
                    "flag":newMarketClue.flag+'',
                    "servicetype":newMarketClue.servicetype+'',
                    "serviceid":serviceid,
                    "remark":newMarketClue.remark
                }
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    updateCompile(){
        
        let newMarketClue = this.newMarketClue
        if(!newMarketClue.projectid || !newMarketClue.projectaddress || !newMarketClue.linkman || !this.workorderid || !newMarketClue.linkphone || !newMarketClue.gettime || newMarketClue.serviceid.length<=0){
            this.$message.error('请填写完整信息')
            return false
        }
        let serviceid = ''
        let servicelist = newMarketClue.serviceid
        for(let i=0;i<servicelist.length;i++){
           if(serviceid){
               serviceid = serviceid + ',' + servicelist[i]
           }else{
               serviceid = servicelist[i]
           }
        }
        let reqBody = {
            "api": "updateworkorder",
            "projectid":newMarketClue.projectid,
            "projectaddress":newMarketClue.projectaddress,
            "companyid":sessionStorage.getItem('companyid'),
            "linkman":newMarketClue.linkman,
            "id":this.workorderid,
            "linkphone":newMarketClue.linkphone,    
            "longitude":newMarketClue.longitude,
            "latitude":newMarketClue.latitude,
            "gettime":newMarketClue.gettime,
            "flag":newMarketClue.flag+'',
            "servicetype":newMarketClue.servicetype+'',
            "serviceid":serviceid,
            "remark":newMarketClue.remark

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success(res.msg);
                this.addDialogVisible=false,
                this.getWorkorderList(1)      
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
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
        window.open(Session.exportUrl+'exportworkorder?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
        let reqBody = {
            "api": "exportworkorder",
            "companyid": sessionStorage.getItem('companyid'),
            "ids": ids,
        }
        
    },
    closeCompile(mapVisible){
        console.log(mapVisible)
        this.mapCompile = mapVisible
       
    },
    confirmCompile(mapVal){
        this.mapCompile = false
      
        this.newMarketClue.projectaddress = mapVal.address
        this.newMarketClue.longitude = mapVal.lng
        this.newMarketClue.latitude = mapVal.lat
    },
    newAfter(msg){
        console.log(msg)
        this.page = 1
        this.newVisible = false
        this.getWorkorderList()
    },
    onVisible(msg){
        console.log(msg)
        this.newVisible = false
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
            background-color #fff
            color #666
            margin-bottom 10px
            .tabItem
                float left 
                height 52px
                line-height 52px
                padding 0 15px
                border-bottom 1px solid transparent
                border-left 1px solid transparent
                border-right 1px solid transparent
                font-size 14px
                &.activeTabItem
                    position relative
                    border-left 1px solid #f4f4f4
                    border-right 1px solid #f4f4f4
                    border-bottom 1px solid #fff
                    &:after
                        position absolute
                        content ''
                        top 0
                        left 0
                        width 100%
                        height 3px
                        background-color #4c97ff
            .screenBox
                padding 10px 0
                .el-form-item
                    margin-bottom: 0
                .el-input
                    vertical-align: top
                
        .btn
            height 32px
            line-height 30px
            font-size 12px
            padding 0 15px
            border-radius 3px
            border 1px solid #00AC97
            color #fff
            background-color #00AC97
            cursor pointer
            min-width 80px
            text-align center
        .btnst
            height 32px
            line-height 30px
            font-size 12px
            padding 0 15px
            border-radius 3px
            border 1px solid #00AC97
            color #00ac97
            cursor pointer
            min-width 80px
            text-align center
        .actBtn
            color #fff
            background-color #00AC97
            
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
    .border
        border-color:#00AC97
    .newContent
        margin-left 20px
        padding 20px 0
        margin-right 40px
        .el-date-editor,.el-select
            width 100%
    .mapBox
        background rgba(0,0,0,.5)
    .relative 
        position relative
        .mapIcon
            right: -36px;
            top:4px
            width: 28px;
            height: 28px;
    .newContent
        padding-right 40px
    .rightBox 
        padding: 10px
</style>