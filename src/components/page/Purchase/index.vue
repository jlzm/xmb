<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item>
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="选择项目">
                            <el-select v-model="searchData.custmerId" placeholder="请选择项目">
                                <el-option label="全部项目" value="" ></el-option>
                                <el-option :label="item.projectname" :value="item.id" v-for="(item,index) in projectList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <el-form-item label="采购类别">
                            <el-select v-model="searchData.purchaseType" placeholder="请选择采购类别">
                                <el-option label="全部类别" value="" ></el-option>
                                <el-option :label="item.typename" :value="item.id" v-for="(item,index) in purchaseTypeList" :key="index"></el-option>
                            </el-select>
                        </el-form-item> -->


                        <el-form-item>
                            <div class="leftBtn btn" @click="setReset" >
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item> 

                        <!-- <el-form-item v-if="jurisdiction.purchase.add">
                            <div class="leftBtn btn"  >
                                <span class="btnTitle">添加采购记录</span>
                            </div>
                        </el-form-item>
                        <el-form-item v-if="jurisdiction.purchase.query">
                            <div class="leftBtn btn" @click="exportworkorder()" >
                                <span class="btnTitle">导出</span>
                            </div>
                        </el-form-item> -->
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-if="jurisdiction.purchase.add"  @click="onAdd" >
                        <i class="iconfont marR5 icon-jia" ></i>
                        <span class="btnTitle">新建采购记录</span>
                    </div> 
                    <div class="rightBtn btn bg4C97FF" v-if="jurisdiction.purchase.query"  @click="exportworkorder" >
                        <i class="iconfont marR5 icon-export" ></i>
                        <span class="btnTitle">批量导出</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
                    <el-row :gutter="20" class="marB20" >
                        <el-col :span="6">
                            <div class="financialDataBox" v-if="tableData.mothpurchasemoney">
                                <div class="marB10 "><span class="fbold color666">本月采购金额：</span><span class="fsize24" style="color:#4c97ff">￥{{tableData.mothpurchasemoney}}</span></div>
                               
                            </div>
                            </el-col>
                        <el-col :span="12">
                            <div class="financialDataBox" v-if="tableData.yearpurchasemoney">
                                <div class="marB10 "><span class="fbold color666">年度采购金额：</span><span  class="fsize24" style="color:#1ace59">￥{{tableData.yearpurchasemoney}}</span></div>
                                
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
                        prop="typename"
                        label="采购类别"
                        align="center"
                        width="160">
                            <template slot-scope="scope">
                                <span>{{!scope.row.typename?'待填写':scope.row.typename}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="sum"
                        label="采购金额"
                        align="center"
                        width="140">
                            <template slot-scope="scope">
                                <span>{{!scope.row.sum?'待填写':'￥'+scope.row.sum1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="passman"
                        label="经手人"
                        align="center"
                        width="120">
                            <template slot-scope="scope">
                                <span>{{!scope.row.passman?'待填写':scope.row.passman}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="purchasetime"
                        label="采购时间"
                        align="center"
                        width="160">
                            <template slot-scope="scope">
                                <span>{{!scope.row.purchasetime?'待填写':scope.row.purchasetime}}</span>
                            </template>
                        </el-table-column>
                        
                       
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="260"
                        align="center" v-if="jurisdiction.purchase.query||jurisdiction.purchase.save||jurisdiction.purchase.remove">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="详情" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" v-if="jurisdiction.purchase.query" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button  type="success" icon="el-icon-edit-outline" v-if="jurisdiction.purchase.save" @click="openCompile(scope.row)"></el-button>
                                </el-tooltip>
                                <!-- <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" type="warning" icon="el-icon-download" ></el-button>
                                </el-tooltip> -->
                                
                                <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                    <el-button type="danger" icon="el-icon-delete"  v-if="jurisdiction.purchase.remove"  @click="onDelete(scope.row)" ></el-button>
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
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData.total">
                    </el-pagination>
                </div>

               
            </div>
        </div>

        <el-dialog
        title="编辑采购明细"
        :visible.sync="compileVisible"
        width="40%"
        >
        <div>
            <div class="compileBox clearfix">
                <div class="detailItem" v-for="(item,index) in purchaseArr" :key="index">
                    
                    <div>
                        <el-form :ref="purchaseArr[index]" :model="purchaseArr[index]" label-position="left" label-width="80px" >
                            <el-form-item label="采购项目">
                                <el-select v-model="purchaseArr[index].pid" placeholder="请选择采购项目">
                                    <el-option :label="_item.projectname" :value="_item.id" v-for="(_item,_index) in projectList" :key="_index"></el-option>
                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购类别">
                                <el-select v-model="purchaseArr[index].typeid1" placeholder="请选择采购类别">
                                    <el-option :label="item_.typename" :value="item_.id" v-for="(item_,index_) in purchaseTypeList" :key="index_"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购金额">
                                <el-input v-model="purchaseArr[index].money" type="number"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

               

                <div class="clearfix marB15">
                    <div class="floatLeft addVoucherTitle">添加图片</div>
                    <div class="floatLeft addVoucherContent">
                        <el-upload
                         :action="imageUrl"
                
                        multiple
                        :limit="9"
                      
                        :on-exceed="handleExceed"
                        list-type="picture-card"
                        :file-list="imgList"
                        :on-change="imgChange"
                        :on-success="handleSuccessImg"
                        :on-remove="handleRemoveImg">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>  
               

                <div class="clearfix marB15">
                    <div class="floatLeft addVoucherTitle">备注信息</div>
                    <div class="floatLeft addVoucherContent">
                        <el-input type="textarea"  v-model="remark"  :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </div>
                </div>  

            </div>
                
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="compileVisible = false">取 消</el-button>
            <el-button type="primary" @click="upDatePurchase">确 定</el-button>
        </span>
        </el-dialog>
        
         <el-dialog
            title="新建采购明细"
            :visible.sync="newVisible"
            width="40%"
        >
            <v-newPurchase @newPurchase='newPurchase' @onVisible="onVisible"  v-if="newVisible"></v-newPurchase>
                
            
         </el-dialog>
        
    </div>
    
</template>
<script>


import vNewPurchase from './new.vue';  //项目信息
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'


export default {
  
  data () {
    return {
        loading:false,
        searchData:{
            antistop:'',
            area:'',
            purchaseType:'',
            custmerId:''
        },
        tableData: [],
        imageUrl:Session.exportUrl+'saveImage',
        purchaseTypeList:[],
        projectList:[],
        pageSize:10,
        page:1,
        pageReset:false,
        multipleSelection: [],
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.save
                }

            ],
            right:[
               
            ]
        },
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        limits:JSON.parse(sessionStorage.getItem('limits')),
        // 编辑数据
        compileVisible:false,
        purchaseArr:[
            {
                pid:'',
                typeid1:'',
                money:''
            }
            
        ],
        imgList:[],
        fileList:[],
        addPurchaseData:{
            file:[],
            purchaseurl:'',
            purchaseurltwo:'',
            remark:'',
            
        },
        imagepc:'',
        remark:'',
        purchaseid:'',
        exportUrl:Session.exportUrl+'saveFile',
        newVisible:false
    }
  },
  created () {
      this.getPurchaseList()
      this.getPurchaseTypeList()      
      this.getPurchaseProjectList()
    
  },
  components:{
    vNewPurchase
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
    handleExceed(files, fileList) {
        this.$message.warning(`最多选择9张图片`);
    },
   
    
    //分页
    pagingChange(val){
        this.page = val
        this.getPurchaseList()
    },
    setReset(){
        this.pageReset = false
        this.page = 1
        this.getPurchaseList()
    },
    //跳转详情事件
    onDetails(row){
        this.$router.push({ 
            path: 'purchaseDetails',                
            query:{
                id:row.id
            }
         })
    },
    //获取列表数据
    getPurchaseList(){
        this.loading = true
        let reqBody = {
            "api": "getpurchaselist",
            "searchname": this.searchData.antistop,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "limit":this.limits['purchase'],
            "projectid":this.searchData.custmerId,
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
    //获取采购类型
    getPurchaseTypeList(){
        this.loading = true
        let reqBody = {
            "api": "getpurchasetypelist",
            "companyid": sessionStorage.getItem('companyid')
            
        }

        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.purchaseTypeList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取项目列表
    getPurchaseProjectList(){
        this.loading = true
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
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //跳转添加
    onAdd(){
        this.newVisible = true
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
        window.open(Session.exportUrl+'exportpurchase?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
    },
    //删除
    onDelete(row){
        this.$confirm('是否确定删除该采购记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody = {
                "api": "deletepuchase",
                "purchaseid": row.id
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success('删除成功')
                    this.getPurchaseList()
                    
                }else{
                    this.$message.error(res.msg);
                }

            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    // //////////编辑
    //打开编辑层
    openCompile(row){
        this.imagepc = ''
        let reqBody = {
            "api": "getpurchaseinfo",
            "id": row.id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.purchaseid = res.data.id
                this.getPurchasefilelist(row.id)
                this.purchaseArr = [
                    {
                        pid:res.data.projectid,
                        typeid1:res.data.typeid,
                        money:res.data.sum
                    }
                ]
                this.addPurchaseData = {
                    file:[],
                    purchaseurl:'',
                    purchaseurltwo:'',
                    remark:'',
                }
                this.remark = res.data.remark
                this.imgList = []
                this.addPurchaseData.purchaseurltwo = res.data.purchaseurl
                this.imagepc = res.data.purchaseurl
                if(res.data.purchaseurl&&res.data.purchaseurl.indexOf(",") != -1){
                    let purchaseurl = res.data.purchaseurl.split(",")
                    for(let i=0;i<purchaseurl.length;i++){
                        this.imgList.push({
                            url:purchaseurl[i]
                        }) 
                    }
                }else if(!res.data.purchaseurl){
                    this.imgList = []
                }else{
                    this.imgList.push({
                            url:res.data.purchaseurl
                        }) 
                }
                this.compileVisible = true
            }else{
                this.$message.error(res.msg);
            }

        })
        
    },
    getPurchasefilelist(purchaseid){
        let reqBody = {
            "api": "getpurchasefilelist",
            "purchaseid": purchaseid,
            "page": 1,
            "pagesize": 10000
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                for(let i=0;i<res.data.list.length;i++){
                    this.fileList.push({
                        url:res.data.list[i].fileurl,
                        name:res.data.list[i].filename,
                    })
                    this.addPurchaseData.file.push({
                        fileurl:res.data.list[i].fileurl,
                        filename:res.data.list[i].filename,
                    })
                }
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
    },

    //文件上传成功
    handleSuccess(response, file, fileList){
        console.log(fileList);
        let fileObj = {
            fileurl:response.fileUrl,
            filename:response.fileName
        }
        this.addPurchaseData.file.push(fileObj)
    },
    //文件删除
    handleRemove(file, fileList) {
        console.log(fileList);
        this.addPurchaseData.file=[]
       
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                let fileObj = {
                    fileurl:fileList[i].response.fileUrl,
                    filename:fileList[i].response.fileName
                }
                
                this.addPurchaseData.file.push(fileObj)

            }
        }
    }, 
    //图片选择
    imgChange(file, fileList){
        console.log(fileList)
        for(let i=0;i<fileList.length;i++){
            
            
        }
       
        
    },
  
    //图片上传处理
    handleRemoveImg(file, fileList) {
        this.imagepc = ''
        console.log(fileList)
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                if(this.imagepc){
                    this.imagepc = this.imagepc+','+fileList[i].response.fileUrl
                }else{
                    this.imagepc  = fileList[i].response.fileUrl
                }
            }else{
                if(this.imagepc){
                    this.imagepc = this.imagepc+','+fileList[i].url
                }else{
                    this.imagepc  = fileList[i].url
                }
            }
        }
    },
    handleSuccessImg(response, file, fileList){
        if(file.response){
            if(this.imagepc){
                this.imagepc = this.imagepc+','+file.response.fileUrl
            }else{
                this.imagepc  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    //添加明细
    addPurchaseArr(){
        this.purchaseArr.push({
                pid:'',
                typeid1:'',
                money:''
            })
    },
    upDatePurchase(){
        console.log(this.addPurchaseData)
        if(!this.purchaseArr[0].money){
            this.$message.error('请填写金额')
            return false
        }
        
        let reqBody = {
            "api": "updatepurchase",
            "projectid": this.purchaseArr[0].pid,
            "typeid": this.purchaseArr[0].typeid1,
            "sum": this.purchaseArr[0].money,
            "remark": this.remark,
            "purchaseurl": this.addPurchaseData.purchaseurl,
            "purchaseurltwo": this.imagepc,
            "purchaseid": this.purchaseid,
         
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.getPurchaseList()
                this.$message.success('修改成功')
                this.compileVisible = false
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    newPurchase(msg){
        console.log(msg)
        this.page = 1
        this.newVisible = false
        this.getPurchaseList()
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
    .compileBox
        width 700px
        border:1px soldi #ddd
        background-color #fff
        padding 20px
        font-size 14px
        .detailItem
            padding-bottom 10px
            margin-bottom 15px
            border-bottom 2px solid #ccc
            &:last-of-type
                border-bottom 0
            .el-select
                width 100%
        .addVoucherTitle
            width 80px
        .addVoucherContent
            width 580px
</style>