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
                                
                                
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="项目负责人"> 
                            <el-select  v-model="searchData.principal" placeholder="请选择项目负责人">
                                <el-option value="11" label="请选择品牌"></el-option>
                            </el-select>
                        </el-form-item> -->
                        <el-form-item>
                            <div class="leftBtn btn"  @click="getSellThreadList(1)">
                        
                                <span class="btnTitle" >查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" @click="getFormulaList(item.clickEvent)" v-for="(item,index) in formulaList.right" :key="index"   >
                        <div v-if="item.type!='upload'">
                            <i class="iconfont marR5" :class="[item.icon]"></i>
                            <span class="btnTitle">{{item.title}}</span>
                        </div>
                        <div v-else>
                            <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handlePreview" :on-remove="handleRemove" :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            
                           
                            </el-upload>
                        </div>
                        
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
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
                                <span>{{!scope.row.estimatedsum?'待填写':'￥'+scope.row.estimatedsum}}</span>
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
                                <span>{{scope.row.state==3?'取消跟进':'跟进中'}}</span>
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
                        align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit"  @click="onCompile(scope.row)" ></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="更改项目状态" placement="top-end" >
                                    <el-button type="warning" icon="el-icon-refresh" @click="onChangeDialogVisible(scope.row)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                    

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="tableData[0]">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData[0].total">
                    </el-pagination>
                </div>

               
            </div>
        </div>
        
        <el-dialog
        title="更改项目状态"
        :visible.sync="changeDialogVisible"
        width="30%"
        >
        <div>
            <div class="marB20">
                <el-radio v-model="radioState" label="1">转入招投标</el-radio>
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
        changeDialogVisible:false,
        pitchChangeDialog:{},
        radioState:'1',
        sellStatus:'-1',
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
                {
                    title:'新建线索',
                    clickEvent:'new',
                    icon:'icon-bianji'
                },{
                    title:'导出线索',
                    clickEvent:'exportsellthread',
                    icon:'icon-jia'
                },
                // {
                //     title:'导入线索',
                //     clickEvent:'addRecord',
                //     icon:'icon-jia',
                //     type:'upload'
                // }
            ]
        },
       
    }
  },
  created(){
        
        console.log(JSON.parse(sessionStorage.getItem('limits')))
        this.getSellThreadList(1)
        
   },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
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
    //分页
    pagingChange(val){
        this.getSellThreadList(val)
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

        this.$router.push({ 
            path: 'newMarket',                
            query:{
                
            }
        })
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
    getSellThreadList(page){
        this.loading = true
        let reqBody = {
            "api": "getsellthreadlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['sellthreacd'],
            "status":this.sellStatus,
            "page":page,
            "pagesize":this.pageSize
        }

        Axios(reqBody,'index').then((res) => {
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