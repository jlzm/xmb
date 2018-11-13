<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="销售状态">
                            <el-select v-model="sellStatus" placeholder="请选择销售状态" popper-class="border">
                                <el-option value="-1" label="所有线索"></el-option>
                                <el-option value="0" label="跟进中"></el-option>
                               
                                <el-option value="3" label="取消跟进"></el-option>
                                <el-option value="1" label="转入招投标"></el-option>
                                
                                
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="项目负责人"> 
                            <el-select  v-model="searchData.principal" placeholder="请选择项目负责人">
                                <el-option value="11" label="请选择品牌"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item>
                            <div class="leftBtn btn"  @click="setReset">
                        
                                <span class="btnTitle" >查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" @click="getFormulaList('new')"  v-if="jurisdiction.sellthreacd.add" >
                        <div>
                            <i class="iconfont marR5 icon-jia" ></i>
                            <span class="btnTitle">新建线索</span>
                        </div>
                    </div> 
                    <div class="rightBtn btn bg4C97FF" @click="getFormulaList('exportsellthread')" v-if="jurisdiction.sellthreacd.query"  >
                        <div>
                            <i class="iconfont marR5 icon-export" ></i>
                            <span class="btnTitle">批量导出</span>
                        </div>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
                    <el-row :gutter="20" class="marB20" >
                        <el-col :span="6">
                            <div class="financialDataBox" v-if="tableData.mothsummoney">
                                <div class="marB10 "><span class="fbold color666">本月销售线索金额：</span><span class="fsize24" style="color:#4c97ff">￥{{tableData.mothsummoney}}</span></div>
                               
                            </div>
                            </el-col>
                        <el-col :span="12">
                            <div class="financialDataBox" v-if="tableData.yearsummoney">
                                <div class="marB10 "><span class="fbold color666">年度销售线索金额：</span><span  class="fsize24" style="color:#1ace59">￥{{tableData.yearsummoney}}</span></div>
                                
                            </div>
                        </el-col>
                    
                    </el-row>
                    <!-- 投标文件开始 -->
                    <el-table
                        ref="multipleTable"
                        :data="tableData.list"
                        stripe
                        v-loading="loading"
                        align="center"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        >
                        <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        type="index"
                        label="序号"
                        width="55"
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
                        width="240">
                        </el-table-column>
                        
                        <el-table-column
                        prop="estimatedsum"
                        label="项目预算"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.estimatedsum1?'待填写':'￥'+scope.row.estimatedsum1}}</span>
                            </template>
                        </el-table-column>
                    
                        <el-table-column
                        prop="estimatedtime"
                        label="预计招投标时间"
                        align="center"
                        width="140">
                        </el-table-column>
                        <el-table-column
                        prop="staffname"
                        label="项目负责人"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span>{{!scope.row.staffname?'待填写':scope.row.staffname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        label="项目状态"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==3">取消跟进</span>
                                <span v-if="scope.row.state==0">跟进中</span>
                                <span v-if="scope.row.state==1">转入招投标</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="createtime"
                        label="创建时间"
                        align="center"
                        width="140">
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center" v-if="jurisdiction.sellthreacd.query||jurisdiction.sellthreacd.save">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.sellthreacd.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit" v-if="jurisdiction.sellthreacd.save"  @click="_getSellThreadInfo(scope.row)" ></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="更改项目状态" placement="top-end" >
                                    <el-button type="warning" icon="el-icon-refresh" 
                                    v-if="jurisdiction.sellthreacd.save"
                                    @click="onChangeDialogVisible(scope.row)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                    

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="pageReset">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    :current-page.sync="page"
                    layout="prev, pager, next"
                    
                    @current-change="pagingChange"
                    :total="tableData.total">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        
        <el-dialog
        title="更改销售线索状态"
        :visible.sync="changeDialogVisible"
        width="30%"
        >
        <div>
            <div class="marB20">
                <el-radio v-model="radioState" label="1">转入招投标</el-radio>
            </div>
            <div class="marB20">
                <el-radio v-model="radioState" label="3">跟进中</el-radio>
            </div>
            <div>
                <el-radio v-model="radioState" label="2">取消跟进</el-radio>
            </div>
            
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeConfirm">确 定</el-button>
        </span>
        </el-dialog>
        
        <el-dialog
        :title="newTitle"
        :visible.sync="newDialogVisible"
        width="45%"
        >
            <div class="newContent">
                <el-form ref="newMarketClue" :model="newMarketClue" label-width="140px">
                    <el-form-item label="项目名称：" :show-message='false' :required='true'>
                        <el-input v-model="newMarketClue.projectname"></el-input>
                    </el-form-item>
                    <el-form-item label="预计招投标时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.estimatedtime"
                        type="date"
                        value-format="yyyy-MM-dd "
                        format="yyyy-MM-dd "
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目预算金额：" :show-message='false' :required='true'>
                        <el-input type="number"  v-model="newMarketClue.estimatedsum"></el-input>
                        <span class="money">元</span>
                    </el-form-item>
                    <el-form-item label="项目资金来源：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.sumsourceid" placeholder="请选择">
                            <el-option :label="item.typename" :value="item.id" v-for="(item,index) in sumsourceList" :key="index"></el-option>
                          
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户信息：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.customerid" placeholder="请选择" @change="getAddressd">
                            <el-option v-for="(item,index) in customerList" :key="index" :label="item.custmername" :value="item.id"></el-option>
                            
                        </el-select>
                        <div class="">
                                <el-button type="success" icon="el-icon-edit" class="newCustmer" @click="newCustmer">新建</el-button>
                            </div>
                    </el-form-item>
                    <el-form-item label="所在地区：" :show-message='false' :required='true'>
                        <el-input disabled  v-model="newMarketClue.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人姓名：" :show-message='false' :required='true'>
                        <el-input  v-model="newMarketClue.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" :show-message='false' :required='true'>
                        <el-input type="number"  v-model="newMarketClue.linkmanphone"></el-input>
                    </el-form-item>
                    <el-form-item label="项目概况：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="newMarketClue.projectdesc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
                <el-button @click="newDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="_confirmEvent">确 定</el-button>
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

import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息




import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
import vMap from '../../common/Map.vue';  //地图


export default {
  
  data () {
    return {
        loading:false,
        searchData:{
            antistop:'',
            area:'',
            principal:''
        },
        changeDialogVisible:false,
        
        pitchChangeDialog:{},
        radioState:'1',
        sellStatus:'-1',
        tableData: [],
        pageSize:10,
        limits:JSON.parse(sessionStorage.getItem('limits')),
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
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
            
        },
        newDialogVisible:false,
        newTitle:'',
        newMarketClue:{
            projectname:'',
            estimatedsum:'',
            sumsource:'',
            estimatedtime:'',
            customerid:'',
            linkman:'',
            linkmanphone:'',
            projectdesc:'',
            address:'',
            sumsourceid:""
            
        },
        customerList:[],
        sumsourceList:[],
        newCustmerVisible:false,
        mapVisible:false,
        mapVal:{},
        thatThreadId : '',
        newCustmerData:{
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        },
        page:1,
        pageReset:false,
       
    }
  },
  created(){
        
        console.log(JSON.parse(sessionStorage.getItem('limits')))
        this.getSellThreadList(1)
        this._getCustomerList()
        this._getSumsource()
        
   },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo,vMap
  },
  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
    },
  
    //Formula 判断
    getFormulaList(clickEvent){
        if(clickEvent=='new'){
            this.onNew()
        }else if(clickEvent=='exportsellthread'){
            this.exportworkorder()
        }
    },
    setReset(){
        this.pageReset = false
        this.page = 1
        this.getSellThreadList()
    },
    //分页
    pagingChange(val){
        this.page = val
        this.getSellThreadList()
    },
    //表格选择事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePreview(file) {
        console.log(file);
        let reqBody = {
            "api": "importsellthread",
            "companyid": sessionStorage.getItem('companyid'),
            "file": file.raw,
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
 
            }else{
                this.$message.error(res.msg);
            }
        })
      },
    //跳转新建
    onNew(){
        this.thatThreadId = ''
        this.newTitle = '新建销售线索'
        this.newDialogVisible = true
        this.newMarketClue={
            projectname:'',
            estimatedsum:'',
            sumsource:'',
            estimatedtime:'',
            customerid:'',
            linkman:'',
            linkmanphone:'',
            projectdesc:'',
            address:'',
            sumsourceid:""
            
        }
    },
    //跳转详情事件
    onDetails(row){
        this.$router.push({ 
            path: 'marketClueDetails',                
            query:{
                threadid:row.id
            }
        })
    },
    onCompile(row){
        console.log(row)
        this.$router.push({ 
            path: 'newMarket',                
            query:{
                threadid:row.id
            }
        })
    },
    //获取列表数据
    getSellThreadList(){
        this.loading = true
        let reqBody = {
            "api": "getsellthreadlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['sellthreacd'],
            "status":this.sellStatus,
            "page":this.page,
            "pagesize":this.pageSize
        }

        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                if(res.data.total>0){
                    this.pageReset = true
                }
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
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
        window.open(Session.exportUrl+'exportsellthread?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
    },
    //弹出
    onChangeDialogVisible(row){
        this.changeDialogVisible = true
        this.pitchChangeDialog = row
        console.log(row)
    },
    //确定更改
    changeConfirm(){
        let pitchChangeDialog = this.pitchChangeDialog 
        let reqBody={}
        if(this.radioState==1){
            reqBody = {
                "api": "addbin",
                "projectname": pitchChangeDialog.projectname,
                "sellid":pitchChangeDialog.id,

            }

        }else if(this.radioState==2){
            reqBody = {
                "api": "updatesellthreadstatus",
                "threadid": pitchChangeDialog.id,

            }
        }else if(this.radioState==3){
            reqBody = {
                "api": "updatesellthreadstatus1",
                "threadid": pitchChangeDialog.id,
            }
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('更改成功');
                this.changeDialogVisible = false
                if(this.radioState==1){
                    this.$router.push({ 
                        path: 'bid',                
                        
                    })
                }else{
                    this.getSellThreadList(1)
                }
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
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
    //资金来源列表
    _getSumsource(){
        let reqBody = {
            "api": "getsumsource",
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
     //获取地址
    getAddressd(res){
        console.log(res)
        for(let i=0;i<this.customerList.length;i++){
            if(res == this.customerList[i].id){
                this.newMarketClue.address = this.customerList[i].addressd
                break;
            }
        }
    },
    newCustmer() {
        this.newCustmerVisible = true
        this.newCustmerData={
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        }
    },
    _getSellThreadInfo(row){
        this.newTitle = '编辑销售线索'
        this.thatThreadId = row.id
        let reqBody = {
            "api": "getsellthreadinfo",
            "threadid": row.id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.newDialogVisible = true
                
                let sellThread = res.data.sellThread
                let newMarketClue = {
                    projectname:sellThread.projectname,
                    estimatedsum:sellThread.estimatedsum,
                    sumsource:sellThread.sumsource,
                    estimatedtime:sellThread.estimatedtime,
                    customerid:sellThread.customerid,
                    linkman:sellThread.linkman,
                    linkmanphone:sellThread.linkmanphone,
                    projectdesc:sellThread.projectdesc,
                    address:sellThread.addressd,
                    sumsourceid:sellThread.sumsourceid
                    
                }
                this.newMarketClue = newMarketClue

                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //新建
    _confirmEvent(){
            let newMarketClue = this.newMarketClue
            let reqBody = {}
            if(this.thatThreadId){
                if(!newMarketClue.projectname || !newMarketClue.estimatedsum ||!newMarketClue.sumsourceid  ||!newMarketClue.linkmanphone ||!newMarketClue.linkman ||!newMarketClue.estimatedtime || !newMarketClue.customerid){
                    this.$message.error('请填写完整信息')
                    return false
                }
                reqBody = {
                "api": "updatesellthread",
                "projectname": newMarketClue.projectname,
                "estimatedsum":newMarketClue.estimatedsum,
                "sumsource": newMarketClue.sumsource,
                "estimatedtime": newMarketClue.estimatedtime,
                "customerid": newMarketClue.customerid,
                "linkman": newMarketClue.linkman,
                "linkmanphone": newMarketClue.linkmanphone,
                "threadid":this.thatThreadId,
                "userid": sessionStorage.getItem('userid'),
                "projectdesc": newMarketClue.projectdesc,
                "sumsourceid":newMarketClue.sumsourceid
                }
            }else{
                if(!newMarketClue.projectname || !newMarketClue.estimatedsum ||!newMarketClue.sumsourceid  ||!newMarketClue.linkmanphone ||!newMarketClue.linkman ||!newMarketClue.estimatedtime || !newMarketClue.customerid){
                    this.$message.error('请填写完整信息')
                    return false
                }
               reqBody = {
                "api": "addsellthread",
                "projectname": newMarketClue.projectname,
                "estimatedsum":newMarketClue.estimatedsum,
                "sumsource": newMarketClue.sumsource,
                "estimatedtime": newMarketClue.estimatedtime,
                "customerid": newMarketClue.customerid,
                "linkman": newMarketClue.linkman,
                "linkmanphone": newMarketClue.linkmanphone,
                "companyid": sessionStorage.getItem('companyid'),
                "userid": sessionStorage.getItem('userid'),
                "projectdesc": newMarketClue.projectdesc,
                "sumsourceid":newMarketClue.sumsourceid
                }
            }
            
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message({
                        message: this.thatThreadId?'修改成功':'添加成功',
                        type: 'success'
                    })
                    this.newDialogVisible = false
                    this.getSellThreadList()
                }else{
                    this.$message.error(res.msg);
                }
            })
            console.log(this.newMarketClue)
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
                this._getCustomerList()
                
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
    .border
        border-color:#00AC97
    .newContent
        padding-right 100px
        .el-date-editor,.el-select
            width 100%
        .el-form-item
            position relative
        .money
            position absolute
            top 0
            right -20px
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