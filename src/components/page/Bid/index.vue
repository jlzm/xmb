<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="投标状态">
                            <el-select v-model="sellStatus" placeholder="请选择投标状态" popper-class="border">
                                <el-option value="-1" label="所有列表"></el-option>
                                <el-option value="0" label="投标中"></el-option>
                                <el-option value="1" label="未中标"></el-option>
                                <el-option value="2" label="已中标"></el-option>
                                <el-option value="3" label="未投标"></el-option>
                                
                                
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <div class="leftBtn btn"  @click="getBinList(1)">
                        
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-if="item.limits" v-for="(item,index) in formulaList.right" :key="index"  @click="getFormulaBar(item.clickEvent)" >
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
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
                        width="240">
                        </el-table-column>
                      
                        <el-table-column
                        prop="bindsum"
                        label="投标预算金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.bindsum?'待填写':'￥'+scope.row.bindsum1}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                        prop="binddocumenttime"
                        label="标书购买截止时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.binddocumenttime?'待填写':scope.row.binddocumenttime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="bindendtime"
                        label="标书投递截止时间"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.bindendtime?'待填写':scope.row.bindendtime}}</span>
                            </template>
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
                        prop="state"
                        label="招标状态"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span v-if="scope.row.state==0">投标中</span>
                                <span v-if="scope.row.state==1">未中标</span>
                                <span v-if="scope.row.state==2">已中标</span>
                                <span v-if="scope.row.state==3">未投标</span>
                             
                            </template>
                        </el-table-column>
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="200"
                        align="center"
                        v-if="jurisdiction.bin.query||jurisdiction.bin.save">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.bin.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                 <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit" v-if="jurisdiction.bin.save"   @click="onCompile(scope.row)" ></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="更改项目状态" placement="top-end" >
                                    <el-button type="warning" icon="el-icon-refresh" v-if="jurisdiction.bin.save"  @click="onChangeDialogVisible(scope.row)"></el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="tableData.total>0">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData.total">
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
                <el-radio v-model="radioState" label="2">已中标</el-radio>
            </div>
            <div class="marB20">
                <el-radio v-model="radioState" label="1">未中标</el-radio>
            </div>
            <div >
                <el-radio v-model="radioState" label="3">未投标</el-radio>
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeConfirm">确 定</el-button>
        </span>
        </el-dialog>


        <el-dialog
        title="编辑招投标信息"
        :visible.sync="compileDialogVisible"
        width="30%"
        >
        <div>
            <el-form ref="form" :model="form" label-width="140px" class="compileDialog">
                <el-form-item label="项目名称">
                    <el-input v-model="form.projectname" disabled></el-input>
                </el-form-item>
                <el-form-item label="投标预算金额" :show-message='false' :required='true'>
                    <el-input type="number" v-model="form.bindsum" :controls="false"></el-input>
                    <span>元</span>
                </el-form-item>
                <el-form-item label="标书购买截止时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.binddocumenttime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="标书投递截止时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.bindendtime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="标书购买">
                    <el-select v-model="form.binddocumentis" placeholder="请选择">
                        <el-option label="准备中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投标证书保证金缴纳">
                    <el-select v-model="form.bindsumis" placeholder="请选择">
                        <el-option label="准备中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商务标书">
                    <el-select v-model="form.businessbind" placeholder="请选择">
                        <el-option label="准备中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="技术标书">
                    <el-select v-model="form.technologybindis" placeholder="请选择">
                        <el-option label="准备中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="资质文件及授权">
                    <el-select v-model="form.authorizationis" placeholder="请选择">
                        <el-option label="准备中" value="0"></el-option>
                        <el-option label="已完成" value="1"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="compileDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updatebin">确 定</el-button>
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
        form: {
          projectname: '',
          bindsum:'',
          binddocumenttime:'',
          bindendtime:'',
          binddocumentis:'',
          bindsumis:'',
          businessbind:'',
          technologybindis:'',
          authorizationis:''
        },
        binInfo:{},
        changeDialogVisible:false,
        compileDialogVisible:false,
        pitchChangeDialog:{},
        radioState:'2',
        sellStatus:'-1',
        tableData: [],
        limits:JSON.parse(sessionStorage.getItem('limits')),
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        multipleSelection: [],
        pageSize:10,
        page:1,
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
               
            ],
            right:[
                {
                    title:'导出',
                    clickEvent:'export',
                    icon:'icon-jia',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).bin.query
                }
            ]
        }
    }
  },
  
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created(){
      this.getBinList(1)
  },
  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
        if(res=='export'){
            this.exportworkorder()
        }
    },
    //Tab 切换事件
    getCutTab(res){
        console.log(res)
    },
    //分页
    pagingChange(val){
        this.page = val
        this.getBinList()
    },
    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //跳转详情事件
    onDetails(row){
        this.$router.push({ 
            path: 'bidDetails',                
            query:{
                threadid:row.sellid,
                id:row.id
            }
         })
    },
    //获取列表数据
    getBinList(){
        this.loading = true
        let reqBody = {
            "api": "getbinlist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['bin'],
            "status":this.sellStatus,
            "page":this.page,
            "pagesize":this.pageSize
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
    //弹出
    onChangeDialogVisible(row){
        this.changeDialogVisible = true
        this.pitchChangeDialog = row
        console.log(row)
    },
    //确定更改
    changeConfirm(){
        let pitchChangeDialog = this.pitchChangeDialog 
        let reqBody={
            "api": "updatebinstatus",
            "id": pitchChangeDialog.id,
            "state": this.radioState
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('更改成功');
                this.changeDialogVisible = false
                this.getBinList(1)
                
            }else{
                this.$message.error(res.msg);
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
        window.open(Session.exportUrl+'exportbin?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
    },
    onCompile(row){
        this._getBinInfo(row.id)
    },
    //编辑
    updatebin(){
        let form = this.form
        if(!form.bindsum||!form.binddocumenttime||!form.bindendtime){
            this.$message.error('请填写完整信息')
            return false
        }
        let reqBody = {
            "api": "updatebin",
            "id": this.binInfo.bininfo.id,
            "projectname": form.projectname,
            "bindsum": form.bindsum,
            "binddocumenttime": form.binddocumenttime,
            "bindendtime": form.bindendtime,
            "binddocumentis": form.binddocumentis,
            "bindsumis": form.bindsumis,
            "businessbind": form.businessbind,
            "technologybindis": form.technologybindis,
            "authorizationis": form.authorizationis
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('修改成功');
                this.compileDialogVisible = false
                this.getBinList()
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //招投标信息
    _getBinInfo(id){
        let reqBody = {
            "api": "getbininfo",
            "id": id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                
                this.binInfo = res.data
                let bininfo = res.data.bininfo
                this.form= {
                    projectname: bininfo.projectname,
                    bindsum:bininfo.bindsum,
                    binddocumenttime:bininfo.binddocumenttime,
                    bindendtime:bininfo.bindendtime,
                    binddocumentis:bininfo.binddocumentis+'',
                    bindsumis:bininfo.bindsumis+'',
                    businessbind:bininfo.businessbind+'',
                    technologybindis:bininfo.technologybindis+'',
                    authorizationis:bininfo.authorizationis+''
                }
                this.compileDialogVisible = true
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
    .compileDialog
        .el-input
            width 220px
        .el-input-number
            width 220px
        .el-select
            width 220px
</style>