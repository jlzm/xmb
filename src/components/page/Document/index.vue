<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                       
                        
                        <el-form-item>
                            <div class="leftBtn btn" @click="getProjectList(1)" >
                        
                                <span class="btnTitle">查询</span>
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
                        >
                        </el-table-column>
                        <!-- <el-table-column
                        prop="bargainsum"
                        label="项目总金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.bargainsum?'待填写':'￥'+scope.row.bargainsum}}</span>
                            </template>
                        </el-table-column> -->
                        <!-- <el-table-column
                        prop="totalamount"
                        label="应收金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.totalamount?'待填写':'￥'+scope.row.totalamount}}</span>
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
                        label="项目完成时间"
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
                        </el-table-column> -->
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <!-- <el-tooltip class="item" effect="dark" content="添加文件" placement="top-end">
                                    <el-button type="success" icon="el-icon-tickets"  @click="onCompile(scope.row)" ></el-button>
                                </el-tooltip> -->
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
        searchData:{
            antistop:'',
            area:'',
            principal:''
        },
        tableData: [],
        pageSize:10,
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
        
    }
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created () {
      this.getProjectList(1)      
    
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
    //分页
    pagingChange(val){
        this.getProjectList(val)
    },
    onDetails(row){
        this.$router.push({ 
            path: 'documentDetails',                
            query:{
                id:row.id
            }
         })
    },
    getProjectList(page){
        this.loading = true
        let reqBody = {
            "api": "getprojectlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['file'],
            "page":page,
            "status":-1,
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
    .border
        border-color:#00AC97
</style>