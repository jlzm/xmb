<template>
    <div class="marketAnalyze">
        <div class="operationBox" v-if="jurisdiction.sellanalysis.query">
            <el-row>
                <el-col :span="6">
                    <div class="clearfix">
                        <div  class="tabItem pointer" :class="tabIndex==0?'activeTabItem':''" @click="onTabCut(0)"><span >销售线索</span></div>
                        <div  class="tabItem pointer" :class="tabIndex==1?'activeTabItem':''" @click="onTabCut(1)"><span >招投标项目</span></div>
                        <!-- <div  class="tabItem pointer" :class="tabIndex==2?'activeTabItem':''" @click="onTabCut(2)"><span >财务数据</span></div> -->
        
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="screenBox">
                        <el-row >
                            <el-col :span="6">
                                <el-select v-model="chartType" placeholder="请选择" @change="setShartType">
                                    <el-option
                                    v-for="item in graph"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-select v-model="daynum"  placeholder="请选择" @change="selectChange">
                                    <el-option label="近30天" value="30"></el-option>
                                    <el-option label="近60天" value="60"></el-option>
                                    <el-option label="近90天" value="90"></el-option>
                                    <el-option label="自定义" value="-1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="10">
                                <!-- <el-date-picker
                                v-model="datePicke"
                                value-format='yyyy-MM-dd'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                                </el-date-picker> -->

                                <el-date-picker
                                v-model="starttime"
                                type="date"
                                :picker-options="pickerOptions0"
                                value-format='yyyy-MM-dd'
                                placeholder="开始日期">
                                </el-date-picker>
                                <span>至</span>

                                <el-date-picker
                                v-model="endtime"
                                :picker-options="pickerOptions1"
                                type="date"
                                value-format='yyyy-MM-dd'
                                placeholder="结束日期">
                                </el-date-picker>
                            </el-col>
                            <el-col :span="2">
                                <el-button type="primary" @click="onInquire">查询</el-button>
                            </el-col>



                            
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-if="tabIndex==0">
            <el-row :gutter="11">
                <!-- <el-col :span="8">
                    <div class="bgWhite">
                        <div class="chartTitle">销售线索数量</div>
                        <ve-chart v-if="marketNumberData.rows" :data="marketNumberData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col> -->
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">销售线索金额（元）</div>
                        <ve-chart :data="marketMoneyData" :settings="chartSettings" :colors="colors" :events="sellthreadlistana" v-if="marketMoneyData.rows.length"></ve-chart>
                        <div class="pad20"  v-else>
                            <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                            <div class="notText">暂无数据</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">销售线索状态</div>
                        <ve-chart :data="marketStateData" :settings="chartSettings" :colors="colors"  :events="sellthreacdState" v-if="marketStateData.rows.length"></ve-chart>
                        <div class="pad20"  v-else>
                            <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                            <div class="notText">暂无数据</div>
                        </div>
                    </div>
                </el-col>
                
            </el-row>
        </div>

        <div v-if="tabIndex==1">
            <el-row :gutter="11">
                <!-- <el-col :span="8">
                    <div class="bgWhite">
                        <div class="chartTitle">招投标阶段数量</div>
                        <ve-chart v-if="binNumberData.rows" :data="binNumberData"  :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col> -->
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">招投标项目金额（元）</div>
                        <ve-chart :data="binMoneyData" :settings="chartSettings" :colors="colors" :events="binMoneyClick" v-if="binMoneyData.rows.length"></ve-chart>
                        <div class="pad20"  v-else>
                            <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                            <div class="notText">暂无数据</div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">招投标项目状态</div>
                        <ve-chart :data="binStateData" :settings="chartSettings" :colors="colors" :events="binMoneyStateClick" v-if="binStateData.rows.length"></ve-chart>
                        <div class="pad20"  v-else>
                            <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                            <div class="notText">暂无数据</div>
                        </div>
                    </div>
                </el-col>
                
            </el-row>
        </div>

        <div v-if="tabIndex==2">
            <el-row :gutter="11">
                <el-col :span="8">
                    <div class="bgWhite">
                        <div class="chartTitle">项目支出</div>
                        <ve-chart v-if="expendData.rows" :data="expendData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="bgWhite">
                        <div class="chartTitle">项目回款</div>
                        <ve-chart :data="recycleData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="bgWhite">
                        <div class="chartTitle">收支对比</div>
                        <ve-chart :data="proportionData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col>
                
            </el-row>
        </div>

        <el-dialog
        title="销售线索明细"
        :visible.sync="sellthreadDialog"
        width="80%"
        class="newDialog"
        >
            <div>
                <el-table
                        ref="multipleTable"
                        :data="sellanalysisData.list"
                        stripe
                        v-loading="loading"
                        align="center"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        
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
                        width="240">
                            
                        </el-table-column>
                        <el-table-column
                        prop="linkman"
                        label="联系人"
                        align="center"
                        width="100">
                            
                        </el-table-column>
                        <el-table-column
                        prop="staffname"
                        label="负责人"
                        align="center"
                        width="100">
                            
                        </el-table-column>
                        
                        
                        <el-table-column
                        prop="estimatedtime"
                        label="招标预计时间"
                        align="center"
                        width="200">
                        </el-table-column>
                         <el-table-column
                        prop="estimatedsum"
                        label="招投标预计金额"
                        align="center"
                        width="200">
                        <template slot-scope="scope">
                                <span>{{!scope.row.estimatedsum?'待填写':'￥'+scope.row.estimatedsum1}}</span>
                        </template>
                        
                        </el-table-column>
                        <el-table-column
                        prop="estimatedsum"
                        label="项目状态"
                        align="center"
                         width="100"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==0">跟进中</span>
                                <span v-if="scope.row.state==1">转入招投标</span>
                                <span v-if="scope.row.state==3">取消跟进</span>
                            </template>
                        </el-table-column>
                        
                       
                   
                        
                        
                        
                    </el-table>
            </div>
            <div class="pagination" v-if="sellanalysisData">
                    <el-pagination 
                    background
                    :page-size="pagesize"
                    @current-change="pagingChange"
                    layout="prev, pager, next"
                    :total="sellanalysisData.total">
                    </el-pagination>
            </div>
        </el-dialog>

        <el-dialog
        title="招投标项目明细"
        :visible.sync="binMoneyDialog"
        width="80%"
        class="newDialog"
        >
            <div>
                <el-table
                        ref="multipleTable"
                        :data="binData.list"
                        stripe
                        v-loading="loading"
                        align="center"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        >
                        
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
                        width="240"> 
                        </el-table-column>
                    
                        <el-table-column
                        prop="staffname"
                        label="负责人"
                        align="center"
                        width="140">
                            
                        </el-table-column>
        
                        <el-table-column
                        prop="binddocumenttime"
                        label="标书购买时间"
                        align="center"
                        width="160">
                            <template slot-scope="scope">
                                <span>{{!scope.row.binddocumenttime?'待填写':scope.row.binddocumenttime}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        prop="bindendtime"
                        label="投标结束时间"
                        align="center"
                        width="160">
                            <template slot-scope="scope">
                                <span>{{!scope.row.bindendtime?'待填写':scope.row.bindendtime}}</span>
                            </template>
                        </el-table-column>
                         <el-table-column
                        prop="bindsum"
                        label="采购预算金额"
                        align="center"
                        width="160">
                            <template slot-scope="scope">
                                <span>{{!scope.row.bindsum?'待填写':'￥'+scope.row.bindsum1}}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column
                        prop="estimatedsum"
                        label="项目状态"
                        align="center"
                         width="100"
                        >
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==0">投标中</span>
                                <span v-if="scope.row.state==1">未中标</span>
                                <span v-if="scope.row.state==2">已中标</span>
                                <span v-if="scope.row.state==3">未投标</span>
                            </template>
                        </el-table-column>
   
                    </el-table>
            </div>
            <div class="pagination" v-if="binData">
                    <el-pagination 
                    background
                    :page-size="pagesize"
                    @current-change="pagingChange1"
                    layout="prev, pager, next"
                    :total="binData.total">
                    </el-pagination>
            </div>
        </el-dialog>
    </div>
    
</template>

<script>
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

export default {
  
  data () {
   
    this.colors = ['#66A6FF','#AB66FF', '#FFA04C',
        '#FF594C', '#37D983','#D7C6FA','#0071B6']
    this.typeArr = ['ring',  'bar']
    this.ChartType = 'ring'
    var that = this
    //销售线索金额明细
    this.sellthreadlistana = {
        click: function (e) {
            if(that.jurisdiction.sellanalysis.query){
                that.sellthreadDialog = true
                that.sellthreadState = -1
                that.sellthreadUserid = that.sellanalysisMoney[e.dataIndex].userid
                that.getsellthreadlistana(that.sellanalysisMoney[e.dataIndex].userid,-1)
            }
            
        }
    }
    //销售线索状态明细
    this.sellthreacdState = {
        click: function (e) {
            if(that.jurisdiction.sellanalysis.query){
                that.sellthreadDialog = true
                that.sellthreadUserid = ''
                that.sellthreadState = that.sellanalysisState[e.dataIndex].state
                that.getsellthreadlistana('',that.sellanalysisState[e.dataIndex].state)
            }
            
        }
    }

    this.binMoneyClick = {
        click: function (e) {
            if(that.jurisdiction.sellanalysis.query){
                that.binMoneyDialog = true
                that.binState = -1
                that.binMoneyUserid = that.binMoney[e.dataIndex].userid
                that.getbinlistana(that.binMoney[e.dataIndex].userid,-1)
            }
            
        }
    }

    this.binMoneyStateClick = {
        click: function (e) {
            if(that.jurisdiction.sellanalysis.query){
                that.binMoneyDialog = true
                that.binMoneyUserid = ''
                that.binState = that.binMoneyState[e.dataIndex].state
                that.getbinlistana('',that.binMoneyState[e.dataIndex].state)
            }
            
        }
    }
    return {
        loading:false,
        daynum:"30",
        tabIndex:0,
        datePicke:'',
        starttime:'',
        endtime:'',
        page:1,
        page1:1,
        pagesize:10,
        graph:[
            {
                value: 'ring',
                label: '环形图'
            },
           
            {
                value: 'bar',
                label: '条形图'
            },
        ],
        pickerOptions0: {
                disabledDate: (time) => {
                    if (this.endtime != "") {
                        
                        return  time.getTime() > new Date(this.endtime);
                    } 

                }
        },
        pickerOptions1: {
            disabledDate: (time) => {
                return time.getTime() < new Date(this.starttime) 
            }
        },
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        limits:JSON.parse(sessionStorage.getItem('limits')),
        sellthreadDialog:false,
        binMoneyDialog:false,
        chartSettings:{
            type: this.ChartType ,
            selectedMode:'single',
        },
        sellanalysisMoney:[],
        sellanalysisData:{},
        sellanalysisState:[],
        sellthreadUserid:'',
        sellthreadState:'',
        sellthreadName:'',
        binMoney:[],
        binMoneyState:[],
        binData:{},
        binMoneyUserid:'',
        binState:'',
        marketNumberData: {
          columns: ['名字', '数量'],
          rows: [],
        },
        marketMoneyData:{
            columns: ['名字', '金额'],
            rows: []
        },
        marketStateData:{
            columns: ['名称', '状态'],
            rows: []
        },

        binNumberData:{
            columns: ['名字', '数量'],
            rows: [],
        },
        binMoneyData:{
            columns: ['名字', '金额'],
            rows: []
        },
        binStateData:{
            columns: ['名称', '状态'],
            rows: []
        },
        expendData:{
            columns: ['项目名称', '金额'],
            rows: []
        },
        recycleData:{
            columns: ['项目名称', '金额'],
            rows: []
        },
        proportionData:{
            columns: ['名称', '金额'],
            rows: []
        },
        chartType:'ring'
    }
  },
  created(){
       // this.getSellanalysisnum()
        this.getSellanalysisMoney()
        this.getSellanalysisState()

        //this.getBinanalysisNum()
        this.getBinanalysisMoney()
        this.getBinanalysisState()

        // this.getprojectzcmoneytotal()
        // this.getreturnmonettotal()
        // this.getzcandreturnana()
  },
  methods:{
    onTabCut(idx){
        this.tabIndex = idx
    },
    onInquire(){
       // console.log(this.marketNumberData)
        if(this.starttime||this.endtime){
            this.daynum = "-1"
        }
        if(this.tabIndex==0){
            //this.getSellanalysisnum()
            this.getSellanalysisMoney()
            this.getSellanalysisState()
        }else if(this.tabIndex==1){
            //this.getBinanalysisNum()
            this.getBinanalysisMoney()
            this.getBinanalysisState()
        }
        
    },
    selectChange(val){
        console.log(val)
        if(val!=-1){
            this.starttime=''
            this.endtime=''
        }
    },
    //分页
    pagingChange(val){
        this.page = val
        this.getsellthreadlistana(this.sellthreadUserid,this.sellthreadState)
    },
    pagingChange1(val){
        this.page1 = val
        this.getbinlistana(this.binMoneyUserid,this.binState)
    },
    //销售线索数量分析
    getSellanalysisnum(){
        let reqBody = {
            "api": "getsellanalysisnum",
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
           
            if(res.state==10001){
                this.marketNumberData.rows = res.data.analysis
                let marketNumberData = []
                for(let i=0;i<res.data.analysis.length;i++){
                    let analysis = {
                        "名字":res.data.analysis[i].name,
                        "数量":res.data.analysis[i].number,
                    }
                    marketNumberData.push(analysis)
                }
                this.marketNumberData.rows = marketNumberData
                
            }else{
                this.$message.error(res.msg);
            } 
        })
    },
    //销售线索金额分析
    getSellanalysisMoney(){
        let reqBody = {
            "api": "getsellanalysismoney",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "limit":this.limits['sellanalysis'],
            "userid": sessionStorage.getItem('userid'),
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
           console.log(res)
            if(res.state==10001){
                this.sellanalysisMoney = res.data.analysis
                let marketMoneyData = []
                for(let i=0;i<res.data.analysis.length;i++){
                    let analysis = {
                        "名字":res.data.analysis[i].name,
                        "金额":res.data.analysis[i].money,
                    }
                    console.log(res.data.analysis[i])
                    marketMoneyData.push(analysis)
                }
                console.log(marketMoneyData)
                this.marketMoneyData.rows = marketMoneyData
                
            }else{
                this.$message.error(res.msg);
            }
            
            
        })
    },
    //销售线索状态分析
    getSellanalysisState(){
        let reqBody = {
            "api": "getsellstatemoney",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "limit":this.limits['sellanalysis'],
            "userid": sessionStorage.getItem('userid'),
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.sellanalysisState = res.data.analysis
                let rows = [
                   
                ]
                for(let i=0;i<res.data.analysis.length;i++){
                    if(res.data.analysis[i].state==0){
                        rows.push({
                            "名称":'跟进中',
                            "状态":res.data.analysis[i].money
                        })
                    }else if(res.data.analysis[i].state==1){
                        rows.push({
                            "名称":'转入招投标',
                            "状态":res.data.analysis[i].money
                        })
                    }else if(res.data.analysis[i].state==3){
                        rows.push({
                            "名称":'取消跟进',
                            "状态":res.data.analysis[i].money
                        })
                    }
                }
                 this.marketStateData.rows = rows
            }else{
                this.$message.error(res.msg);
            }
        })
    },


    //招投标数量分析
    getBinanalysisNum(){
        let reqBody = {
            "api": "getbinanalysisnum",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "limit":this.limits['sellanalysis'],
            "userid": sessionStorage.getItem('userid'),
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            
            if(res.state==10001){
                let forData = []
                for(let i=0;i<res.data.analysis.length;i++){
                    let analysis = {
                        "名字":res.data.analysis[i].name,
                        "数量":res.data.analysis[i].number,
                    }
                    console.log(res.data.analysis[i])
                    forData.push(analysis)
                }
                this.binNumberData.rows = forData
                
            }else{
                this.$message.error(res.msg);
            }
            
            
        })
    },

    //招投标金额分析
    getBinanalysisMoney(){
        let reqBody = {
            "api": "getbinanalysismoney",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "limit":this.limits['sellanalysis'],
            "userid": sessionStorage.getItem('userid'),
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.binMoney = res.data.analysis
                let forData = []
                for(let i=0;i<res.data.analysis.length;i++){
                    let analysis = {
                        "名字":res.data.analysis[i].name,
                        "金额":res.data.analysis[i].money,
                    }
                    
                    forData.push(analysis)
                }
                this.binMoneyData.rows = forData
                
            }else{
                this.$message.error(res.msg);
            }
            
            
        })
    },

    //招投标状态分析
    getBinanalysisState(){
        let reqBody = {
            "api": "getbinstatemoney",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "limit":this.limits['sellanalysis'],
            "userid": sessionStorage.getItem('userid'),
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.binMoneyState = res.data.analysis
                let rows = [
                   
                ]
                 for(let i=0;i<res.data.analysis.length;i++){
                    if(res.data.analysis[i].state==0){
                        rows.push({
                            "名称":'投标中',
                            "状态":res.data.analysis[i].money
                        })
                    }else if(res.data.analysis[i].state==1){
                        rows.push({
                            "名称":'未中标',
                            "状态":res.data.analysis[i].money
                        })
                    }else if(res.data.analysis[i].state==2){
                        rows.push({
                            "名称":'已中标',
                            "状态":res.data.analysis[i].money
                        })
                    }else if(res.data.analysis[i].state==3){
                        rows.push({
                            "名称":'未投标',
                            "状态":res.data.analysis[i].money
                        })
                    }
                }
                 this.binStateData.rows = rows
                 console.log(this.binStateData)
            }else{
                this.$message.error(res.msg);
            }
        })
    },

    //项目支出分析
    getprojectzcmoneytotal(){
        let reqBody = {
            "api": "getprojectzcmoneytotal",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let forData = []
                for(let i=0;i<res.data.projectzcmoneytana.length;i++){
                    let projectzcmoneytana = {
                        "项目名称":res.data.projectzcmoneytana[i].projectname,
                        "金额":res.data.projectzcmoneytana[i].money,
                    }
                    forData.push(projectzcmoneytana)
                }
                 this.expendData.rows = forData
                 
            }else{
                this.$message.error(res.msg);
            }
        })
    },

    //项目回款分析
    getreturnmonettotal(){
        let reqBody = {
            "api": "getreturnmonettotal",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let forData = []
                for(let i=0;i<res.data.projectreturnmoneytana.length;i++){
                    let projectreturnmoneytana = {
                        "项目名称":res.data.projectreturnmoneytana[i].projectname,
                        "金额":res.data.projectreturnmoneytana[i].money,
                    }
                    forData.push(projectreturnmoneytana)
                }
                 this.recycleData.rows = forData
                 
            }else{
                this.$message.error(res.msg);
            }
        })
    },

    //收支对比分析
    getzcandreturnana(){
        let reqBody = {
            "api": "zcandreturnana",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let rows = [
                    {
                        "名称":'回款总金额',
                        "金额":res.data.hkmoneytotal
                    },
                    {
                        "名称":'支出总金额',
                        "金额":res.data.zcmoneytotal
                    } 
                ]
                 this.proportionData.rows = rows
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },

    
    setShartType(val){
        
        this.chartSettings.type = val
        console.log(this.chartSettings)
    },
    //销售线索分析具体数据列表
    getsellthreadlistana(userid,state){
        this.loading = true
        let reqBody = {
            "api": "getsellthreadlistana",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum,
            "page":this.page,
            "pagesize":this.pagesize,
            "state":state,
            "userid": userid,
            "uidd": sessionStorage.getItem('userid'),
            "limit":this.limits['sellanalysis'],

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.sellanalysisData = res.data
                
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 500);
        })
    },
    //招投标分析具体数据列表
    getbinlistana(userid,state){
        this.loading = true
        let reqBody = {
            "api": "getbinlistana",
            "companyid": sessionStorage.getItem('companyid'),
            "starttime": this.starttime,
            "endtime": this.endtime,
            "daynum":this.daynum,
            "page":this.page,
            "pagesize":this.pagesize,
            "state":state,
            "userid": userid,
            "uidd": sessionStorage.getItem('userid'),
            "limit":this.limits['sellanalysis'],
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.binData = res.data
                
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 500);
        })
    }
    

  },
  computed:{
      thisChartType(){
          return this.chartType
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .marketAnalyze
        width 100%
        padding 10px 15px
        overflow hidden  
        .chartTitle
            line-height 40px
            text-align center
            font-size 14px
            border-bottom 1px solid #ddd
            margin-bottom 10px
            color #666
        .operationBox
            background-color #fff
            color #666
            margin-bottom 10px
            .tabItem
                float left 
                height 46px
                line-height 46px
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
                line-height 46px
    .notText
        margin-bottom: 60px;
    .notIcon
        margin-top: 60px;
            
</style>