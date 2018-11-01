<template>
    <div class="marketAnalyze">
        <div class="operationBox" v-if="jurisdiction.sellanalysis.query">
            <el-row>
                <el-col :span="9">
                    <div class="clearfix">
                        <div  class="tabItem pointer" :class="tabIndex==0?'activeTabItem':''" @click="onTabCut(0)"><span >销售线索</span></div>
                        <div  class="tabItem pointer" :class="tabIndex==1?'activeTabItem':''" @click="onTabCut(1)"><span >招投标项目</span></div>
                        <!-- <div  class="tabItem pointer" :class="tabIndex==2?'activeTabItem':''" @click="onTabCut(2)"><span >财务数据</span></div> -->
                        
                    </div>
                </el-col>
                <el-col :span="15">
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
                                <el-select v-model="daynum"  placeholder="请选择">
                                    <el-option label="近30天" value="30"></el-option>
                                    <el-option label="近60天" value="60"></el-option>
                                    <el-option label="近90天" value="90"></el-option>
                                    <el-option label="自定义" value="-1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="10">
                                <el-date-picker
                                v-model="datePicke"
                                value-format='yyyy-MM-dd'
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
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
                        <div class="chartTitle">销售线索金额</div>
                        <ve-chart :data="marketMoneyData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">销售线索状态</div>
                        <ve-chart :data="marketStateData" :settings="chartSettings" :colors="colors"></ve-chart>
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
                        <div class="chartTitle">招投标项目金额</div>
                        <ve-chart :data="binMoneyData" :settings="chartSettings" :colors="colors"></ve-chart>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="bgWhite">
                        <div class="chartTitle">招投标项目状态</div>
                        <ve-chart :data="binStateData" :settings="chartSettings" :colors="colors"></ve-chart>
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
    </div>
    
</template>

<script>
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

export default {
  
  data () {
   
    this.colors = ['#66A6FF','#AB66FF', '#FFA04C',
        '#FF594C', '#37D983','#D7C6FA','#0071B6']
    this.typeArr = ['ring', 'line', 'bar']
    this.ChartType = 'ring'
    return {
        daynum:"30",
        tabIndex:0,
        datePicke:'',
        starttime:'',
        endtime:'',
        graph:[
            {
                value: 'ring',
                label: '环形图'
            },
            {
                value: 'line',
                label: '折线图'
            },
            {
                value: 'bar',
                label: '条形图'
            },
        ],
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        chartSettings:{
            type: this.ChartType ,
            selectedMode:'single',
        },
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
        console.log(this.marketNumberData)
        if(this.datePicke.length>0){
            this.starttime = this.datePicke[0]
            this.endtime = this.datePicke[1]
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
    //销售线索数量分析
    getSellanalysisnum(){
        let reqBody = {
            "api": "getsellanalysisnum",
            "companyid": sessionStorage.getItem('companyid'),
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
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
           
            if(res.state==10001){
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
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                
                let rows = [
                   
                ]
                for(let i=0;i<res.data.analysis.length;i++){
                    if(res.data.analysis[i].state==0){
                        rows.push({
                            "名称":'销售线索',
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
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
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
            "daynum":this.daynum
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
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
            
</style>