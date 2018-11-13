<template>
    <div class="bid">
        <div class="listBox">
            <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
            </v-formulaBar> 
            <div class="contentBox clearfix">
                <div class="leftBox leftBox554">
                    <div class="purchaseBox">
                        <div class="title clearfix">
                            <span class="titleSpan">{{purchaseInfo.projectname}}</span>
                            <!-- <div class="compileBtn"  @click="openCompile" v-if="jurisdiction.purchase.save">编辑</div> -->
                    
                        </div>

                        <div class="">
                            <div class="item">
                                <span class="label">采购类别：</span>
                                <span>{{purchaseInfo.typename}}</span>
                            </div>
                            <div class="item">
                                <span class="label">采购金额：</span>
                                <span>{{purchaseInfo.sum1}}元</span>
                            </div>
                            <div class="item">
                                <span class="label">经手人：</span>
                                <span>{{purchaseInfo.passman}}</span>
                            </div>
                            <div class="item">
                                <span class="label">采购时间：</span>
                                <span>{{purchaseInfo.purchasetime}}</span>
                            </div>
                            <div class="item">
                                <span class="label">备注信息：</span>
                                <span>{{purchaseInfo.remark}}</span>
                            </div>
                        </div>
                        
                    </div>

                </div>
                <div class="floatLeft rightBox554">
                    <div class="rightContentBox">
                        <!-- 标题Tab开始 -->
                        <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>
                        <!-- 标题Tab结束 -->
                        <div class="pad10">
                            <!-- 进度查看开始 -->
                            <div v-show="tabListIndex==0" class="invitationBox">
                                <el-table
                                    ref="multipleTable"
                                    :data="fileList.list"
                                    stripe
                                    align="center"
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
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    
                                    <el-table-column
                                    prop="filename"
                                    label="文件名称"
                                    align="center"
                                   show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="username"
                                    label="创建人"
                                    align="center"
                                    width="160"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    prop="createtime"
                                    label="创建时间"
                                    align="center"
                                    width="240"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="查看" placement="top-end">
                                                <el-button type="primary" v-if="jurisdiction.purchase.query"  icon="el-icon-view"   @click="onExamine(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                                <el-button type="success" v-if="jurisdiction.purchase.query" icon="el-icon-download"   @click="onDownload(scope.row)" ></el-button>
                                            </el-tooltip>

                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                                <el-button type="danger"  v-if="jurisdiction.purchase.remove" icon="el-icon-delete"  @click="onDel(scope.row.id)" ></el-button>
                                            </el-tooltip>
                                            
                                        </template>
                                    </el-table-column>
                                    
                                </el-table>
                            </div>
                            <!-- 进度查看结束 -->

                            <div v-show="tabListIndex==1" class="invitationBox clearfix">
                                <div class="imgItem" v-for="(item,index) in imgList" :key="index" @click="examinePicture(item)">
                                    <img :src="item" alt="">
                                </div>
                            </div>

            

                            

                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <el-dialog
        title="添加文件"
        :visible.sync="addFileVisible"
        width="30%"
        >
        <div>
           
            <el-upload
            multiple
            ref="upload"
            class="upload-demo"
            :action="exportUrl"
            :data="uploadData"
            :on-remove = "handleRemove"
            :file-list="fileUploadList"
            :auto-upload="false"
            :on-success="handleSuccess"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
            <el-button @click="addFileVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
        </el-dialog>
        <el-dialog title="在线浏览"
        :visible.sync="iframeVisible"
        width="90%"
        class="iframeVisible"
        fullscreen
        >
            
                <iframe class="iframe"  v-if="iframeUrl"  :src='iframeUrl' width='100%'  ></iframe>
        </el-dialog>


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
                        :file-list="imgList1"
                        
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
    </div>
    
</template>
<script>
import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息

import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'



export default {
  
  data () {
    return {
        tabListIndex:0,
        purchaseInfo:{},
      
        imgList:[],
        imgList1:[],
        imagepc:'',
        uploadData:{

        },
        exportUrl:Session.exportUrl+'saveFile',
        imageUrl:Session.exportUrl+'saveImage',
        addFileVisible:false,
        fileBoxList:[],
        fileUploadList:[],
        fileList:[],
        fileList1:[],
        fileListStr:'',
        fileListName:'',
        fileListSize:'',
        successLength:0,
        iframeVisible:false,
        iframeUrl:'',
        multipleSelection: [],
        compileVisible:false,
        purchaseArr:[
            {
                pid:'',
                typeid1:'',
                money:''
            }
            
        ],
        addPurchaseData:{
            file:[],
            purchaseurl:'',
            purchaseurltwo:'',
            remark:'',
            
        },
        projectList:[],
        purchaseTypeList:[],
        remark:'',
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.save
                },
                

            ],
            
            right:[
                {
                    title:'添加文件',
                    clickEvent:'addFile',
                    icon:'icon-jia',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.add
                },
                {
                    title:'下载文件',
                    clickEvent:'download',
                    icon:'icon-download',
                    bgColor:'bg4C97FF',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.query
                },{
                    title:'删除文件',
                    clickEvent:'delFile',
                    icon:'icon-delete',
                    bgColor:'bgDelete',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.remove
                }
            ]
        },
        leftTabList:{
            tabType:'leftTabList',
            tabTitle:'基本信息',
            tabActive:0,
            icon:'icon-jibenxinxi',
            item:[
                {
                    title:'项目信息',
                    clickEvent:'projectInfo',
                    
                },
                {
                    title:'招投标信息',
                    clickEvent:'bidInfo',
                    
                }
            ]
        },
        rightTabList:{
            tabType:'rightTabList',
            tabTitle:'关联数据',
            tabActive:0,
            icon:'icon-guanliangongnengliebiaoiconxuanzhong',
            item:[
                
                {
                    title:'附件',
                    clickEvent:'projectInfo'  
                },
                {
                    title:'图片',
                    clickEvent:'projectInfo'  
                }
            ]
        }
    }
  },
  components:{
    vFormulaBar,vParticularsTab,vProjectInfo,vBidInfo
  },
  created(){
    this._getPurchaseInfo()     
    this.getPurchaseProjectList()
    this.getPurchaseTypeList()   
  },
  methods:{
     handleSuccess(response, file, fileList){
        //console.log(response,fileList);
        
        if(this.fileListStr){
            this.fileListStr = this.fileListStr + ',' + response.fileUrl
        }else{
            this.fileListStr = response.fileUrl
        }
        if(this.fileListName){
            this.fileListName = this.fileListName + ',' + response.fileName
        }else{
            this.fileListName = response.fileName
        }
        if(this.fileListSize){
            this.fileListSize = this.fileListSize + ',' + response.filesize
        }else{
            this.fileListSize = response.filesize
        }
        if(response.fileUrl){
            this.successLength = this.successLength+1
        }
        if(this.successLength== fileList.length){
            this.successLength = 0
           this.addFile()
        }
       
        
        console.log(fileList.length)
    },
    handleRemove(file, fileList) {
        console.log(fileList);
        this.fileListName=''
        this.fileListStr = ''
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                
                if(this.fileListStr){
                    this.fileListStr = this.fileListStr + ',' + fileList[i].response.fileUrl
                }else{
                    this.fileListStr = fileList[i].response.fileUrl
                }
                if(this.fileListName){
                    this.fileListName = this.fileListName + ',' + fileList[i].response.fileName
                }else{
                    this.fileListName = fileList[i].response.fileName
                }

            }
        }
    },
    
    getFormulaBar(res){
        console.log(res)
        if(res=='add'){
            this.$router.push({ 
            path: 'purchaseNew'              
            
         })
        }else if(res=='addFile'){
            this.fileListStr = ''
            this.fileListName = ''
            this.fileListSize = ''
            this.successLength = 0
            this.fileUploadList = []
            this.addFileVisible = true
        }else if(res =='download'){
            this.batchFileDownload()
        }else if(res == 'delFile'){
            this.delFile()
        }else if(res == 'compile'){
            this.openCompile()
        }
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
    },
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
    },
    _getPurchaseInfo(){
        let reqBody = {
            "api": "getpurchaseinfo",
            "id": this.$route.query.id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.projectid,
                }

                this.purchaseInfo = res.data
                if(res.data.purchaseurl.indexOf(",") != -1){
                    this.imgList = res.data.purchaseurl.split(",")
                }else{
                    this.imgList.push(res.data.purchaseurl) 
                }
                this.getPurchasefilelist(res.data.id)

                // 编辑
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
                this.imgList1 = []
                this.addPurchaseData.purchaseurltwo = res.data.purchaseurl
                this.imagepc = res.data.purchaseurl
                if(res.data.purchaseurl&&res.data.purchaseurl.indexOf(",") != -1){
                    let purchaseurl = res.data.purchaseurl.split(",")
                    for(let i=0;i<purchaseurl.length;i++){
                        this.imgList1.push({
                            url:purchaseurl[i]
                        }) 
                    }
                }else if(!res.data.purchaseurl){
                    this.imgList1 = []
                }else{
                    this.imgList1.push({
                            url:res.data.purchaseurl
                        }) 
                }
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
                this.fileList = res.data
                for(let i=0;i<res.data.list.length;i++){
                    this.fileList1.push({
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
    onDownload(row){
        window.open(row.fileurl)
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },

    batchFileDownload(){
        if(this.multipleSelection.length<1){
            this.$message.error('请选择文件')
            return false
        }
        for(let i=0;i<this.multipleSelection.length;i++){
            let triggerDelay = 2000
            setTimeout(() => {
               //window.open(this.multipleSelection[i].fileurl)
                    var a = document.createElement("a"), //创建a标签
                    e = document.createEvent("MouseEvents"); //创建鼠标事件对象
                    e.initEvent("click", false, false); //初始化事件对象
                    a.href = this.multipleSelection[i].fileurl;  //设置下载地址
                    a.dispatchEvent(e); //给指定的元素，执行事件click事件
            }, triggerDelay*i);
        }
       
        //window.open(row.fileurl)
    },
    // fileDownload(url, triggerDelay, removeDelay){
    //     setTimeout(function() {
    //         var frame = document.createElement("iframe") 
    //         //frame.css('display','none')
    //         console.log(frame)
    //         //frame.src(url);
    //         // $(document.body).after(frame);
    //         setTimeout(function() {
    //             frame.remove();
    //         }, removeDelay);
    //     }, triggerDelay);
    // },
    delFile(){
        if(this.multipleSelection.length<=0){
             this.$message.error('请先勾选');
             return false
        }
        let multipleSelection =  this.multipleSelection
        let fid = ''
        for(let i=0;i<multipleSelection.length;i++){
            if(fid){
                fid = fid + ',' + multipleSelection[i].id
            }else{
               fid =  multipleSelection[i].id
            }
        }
        this.onDel(fid)
    },
    onDel(id){
        this.$confirm('是否确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody = {
            "api": "updatepurchasefileflag",
            "id": id,
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success('删除成功')
                    this.getPurchasefilelist(this.purchaseInfo.id)
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
    addFile(){
        console.log(this.fileListName)
        if(!this.fileListStr){
            this.$message.error('请选择文件')
            return false
        }
        let reqBody = {
            "api": "addpurchasefile",
            "purchaseid": this.$route.query.id,
            "fileurl": this.fileListStr,
            "filename": this.fileListName,
            "filesize":this.fileListSize,
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功')
                this.successLength = 0
                this.addFileVisible = false
                this.getPurchasefilelist(this.purchaseInfo.id)
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    examinePicture(url){
         this.$alert('<img src='+url+'></img>', {
          dangerouslyUseHTMLString: true,
          showConfirmButton:false
        });
    },
    submitUpload(){
        this.$refs.upload.submit()
       
    },
    onExamine(url){
        this.iframeUrl = Session.browse+encodeURIComponent(url)
        this.iframeVisible = true
    },
    openCompile(){
        this.compileVisible = true
       // console.log(this.addPurchaseData)
    },
    handleExceed(files, fileList) {
        this.$message.warning(`最多选择9张图片`);
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
            "purchaseid": this.$route.query.id,
         
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this._getPurchaseInfo()
                this.$message.success('修改成功')
                this.compileVisible = false
                
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
        .purchaseBox
            padding 0 20px 20px
            .title
                font-weight bold
                font-size 14px
                color #666
                border-bottom 2px solid #ccc
                line-height 48px
            .item
                font-size 14px
                color #666
                line-height 48px
                .label
                    display inline-block
                    vertical-align middle
                    font-weight bold
                    width 70px
                    text-align right 
        .imgItem
            width 160px
            height 160px
            margin-right 20px
            margin-bottom 20px
            float left
        .iframe
            height 100vh
            padding-bottom 200px
            overflow: auto
            margin: 0
            z-index 3333
        .iframeVisible .el-dialog__body
            overflow hidden
    .compileBtn
        float right   
        width 80px
        text-align center
        height: 30px
        line-height: 30px
        font-size: 12px
        padding: 0 15px
        border-radius: 3px
        color: #fff
        background-color: #00ac97
        cursor: pointer
        margin-top 10px
    .titleSpan
        display inline-block
        width 410px
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