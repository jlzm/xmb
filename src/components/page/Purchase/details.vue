<template>
    <div class="bid">
        <div class="listBox">
            <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
            </v-formulaBar> 
            <div class="contentBox clearfix">
                <div class="leftBox leftBox554">
                    <div class="purchaseBox">
                        <div class="title">{{purchaseInfo.projectname}}</div>
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
        uploadData:{

        },
        exportUrl:Session.exportUrl+'saveFile',
        addFileVisible:false,
        fileBoxList:[],
        fileUploadList:[],
        fileList:[],
        fileListStr:'',
        fileListName:'',
        fileListSize:'',
        successLength:0,
        multipleSelection: [],
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                // {
                //     title:'添加记录',
                //     clickEvent:'add',
                //     icon:'icon-iconfontedit'
                // },
                {
                    title:'添加文件',
                    clickEvent:'addFile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.add
                }

            ],
            right:[
                {
                    title:'下载文件',
                    clickEvent:'download',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).purchase.query
                },{
                    title:'删除文件',
                    clickEvent:'delFile',
                    icon:'icon-jia',
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
    fileDownload(url, triggerDelay, removeDelay){
        setTimeout(function() {
            var frame = document.createElement("iframe") 
            //frame.css('display','none')
            console.log(frame)
            //frame.src(url);
            // $(document.body).after(frame);
            setTimeout(function() {
                frame.remove();
            }, removeDelay);
        }, triggerDelay);
    },
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
        
    
</style>