<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="项目状态">
                            <el-select v-model="searchData.status" placeholder="请选择项目状态" popper-class="border">
                                <el-option value="-1" label="所有项目"></el-option>
                                <el-option value="1" label="未完成"></el-option>
                               
                                <el-option value="0" label="已完成"></el-option>
                                
                                
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn"  @click="setReset">
                        
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
                        width="200">
                        </el-table-column>
                        <el-table-column
                        prop="staffname"
                        label="项目经理"
                        align="center"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="projectstarttime1"
                        label="项目启动时间"
                        align="center"
                        width="120">
                            <template slot-scope="scope">
                                <span>{{!scope.row.projectstarttime1?'待填写':scope.row.projectstarttime1}}</span>
                            </template>
                        </el-table-column>
                     

                        <el-table-column
                        prop="appointedtime1"
                        label="约定完成时间"
                        align="center"
                        width="120">
                            <template slot-scope="scope">
                                <span>{{!scope.row.appointedtime1?'待填写':scope.row.appointedtime1}}</span>
                            </template>
                        </el-table-column>
                         <el-table-column
                        prop=""
                        label="当前进度"
                        align="center"
                        width="180">
                            <template slot-scope="scope">
                                <span>{{!scope.row.updatedescribe?'待填写':scope.row.updatedescribe}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="添加人"
                        align="center"
                        width="100">
                            <template slot-scope="scope">
                                <span>{{!scope.row.operator?'待填写':scope.row.operator}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="添加时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.addtime?'待填写':scope.row.addtime}}</span>
                            </template>
                        </el-table-column>
                        
                        
                       
                        <el-table-column
                      
                        label="项目状态"
                        align="center"
                        width="80">
                            <template slot-scope="scope">
                                <span>{{!scope.row.status==0?'未完成':'已完成'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                      
                        label="完成时间"
                        align="center"
                        width="120">
                            <template slot-scope="scope">
                                <span>{{scope.row.finishtime?scope.row.finishtime:'--'}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看进度" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.rate.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>

                                <el-tooltip class="item" effect="dark" content="添加进度节点" placement="top-end">
                                    <el-button type="success" v-if="jurisdiction.rate.add" icon="el-icon-tickets"  @click="addDialog(scope.row)" ></el-button>
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
                    :current-page.sync="page"
                    :page-size="pageSize"
                    @current-change="pagingChange"
                    layout="prev, pager, next"
                    :total="tableData.total">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        

        <el-dialog
        title="添加进度节点"
        :visible.sync="addDialogVisible"
        width="30%"
        >
        <div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 40}"
                placeholder="请输入内容"
                v-model="updatedescribe">
            </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addprojectrate">确 定</el-button>
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
        searchData:{
            antistop:'',
            area:'',
            principal:'',
            status:"-1"
        },
        tableData: [],
        multipleSelection: [],
        optProjectid:'',
        pageSize:10,
        page:1,
        pageReset:false,
        updatedescribe:'',
        addDialogVisible:false,
        limits:JSON.parse(sessionStorage.getItem('limits')),
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.save
                }

            ],
            right:[
               
            ]
        },
        
    }
  },
  created () {
      this.getProjectList(1)      
    
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
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
        this.page = val
        this.getProjectList(val)
    },
    setReset(){
        this.pageReset = false
        this.page = 1
        this.getProjectList()
    },
    onDetails(row){
        this.$router.push({ 
            path: 'scheduleDetails',                
            query:{
                id:row.id
            }
         })
    },
    addDialog(row){
        if(row.status==0){
            this.$message.error('该项目已完成')
            return false
        }
        this.updatedescribe = ''
        this.addDialogVisible=true
        this.optProjectid=row.id
    },
    getProjectList(){
        this.loading = true
        let reqBody = {
            "api": "getsmlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['rate'],
            "status":this.searchData.status,
            "page":this.page,
       
            "pagesize":this.pageSize
        }

        Axios(reqBody,'project').then((res) => {
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
    //添加节点
    addprojectrate(){
        if(!this.updatedescribe){
            this.$message.error('请填写节点内容');
            return false
        }
        let reqBody = {
            "api": "addprojectrate",
            "uid": sessionStorage.getItem('userid'),
            "projectid": this.optProjectid,
            "companyid": sessionStorage.getItem('companyid'),
            "updatedescribe":this.updatedescribe
        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功');
                this.addDialogVisible = false
                this.updatedescribe = ''
                this.getProjectList(1)
            }else{
                this.$message.error(res.msg);
            }

        })
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
</style>