<template>
    <div class="bid">
        <div class="listBox">
            <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
            </v-formulaBar> 
            <div class="contentBox clearfix">
                <div class="leftBox leftBox554">
                    <div class="fileListBox">
                        <div class="title">{{projectname}}</div>
                        <div class="">
                            <div class="fileItem" v-for="(item,index) in fileTypeList" :key="index" @click="_getFileList(index)">
                                <i class="fileIcon"></i>
                                <span :class="fileIndex==index?'fileText':''">{{item.filename}}</span>
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
                                    :data="fileList"
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
                                    prop="staffname"
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
                                                <el-button type="primary" v-if="query"  icon="el-icon-view"   @click="onExamine(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                                <el-button type="success" v-if="query" icon="el-icon-download"  @click="fileDownload(scope.row)" ></el-button>
                                            </el-tooltip>

                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                                <el-button type="danger"  v-if="remove" icon="el-icon-delete"  @click="fileremove(scope.row.fileid)" ></el-button>
                                            </el-tooltip>
                                            
                                        </template>
                                    </el-table-column>
                                    
                                </el-table>
                            </div>
                            <!-- 进度查看结束 -->                                        
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
            <!-- <el-form  label-position="left" label-width="100px" >
                <el-form-item label="文件夹">
                    <el-select v-model="filetypeid" placeholder="请选择文件夹" >
                        <el-option :label="item.filename" :value="item.filetypeid"  v-for="(item,index) in fileTypeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
            <el-upload
            multiple
            ref="upload"
            class="upload-demo"
            :action="exportUrl"
            :data = "uploadData"
            :auto-upload="false"
        
            :file-list="fileListData"
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
        addFileVisible:false,
        fileIndex:0,
        fileTypeList:[],
        fileList:[],
        fileListData:[],
        filetypeid:'',
        fileListStr:'',
        fileListName:'',
        filesize:'',
        successLength:0,
        iframeVisible:false,
        projectname:'',
        iframeUrl:'',
        query:false,
        add:false,
        remove:false,
        uploadData:{
 
        },
        exportUrl:Session.exportUrl+'saveFile',
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        multipleSelection: [],
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'添加文件',
                    clickEvent:'add',
                    icon:'icon-iconfontedit',
                    limits:false
                }
            ],
            right:[
                {
                    title:'下载文件',
                    clickEvent:'download',
                    icon:'icon-download',
                    limits:false
                },{
                    title:'删除文件',
                    clickEvent:'del',
                    icon:'icon-delete',
                    limits:false
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
                    title:'文件列表',
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
      if(this.jurisdiction.file.add||(this.jurisdiction.project&&this.jurisdiction.project.add)){
          this.formulaList.left[0].limits = true
          this.add = true
      }
      if(this.jurisdiction.file.query||(this.jurisdiction.project&&this.jurisdiction.project.query)){
          this.formulaList.right[0].limits = true
          this.query = true
      }
      if(this.jurisdiction.file.remove||(this.jurisdiction.project&&this.jurisdiction.project.remove)){
          this.formulaList.right[1].limits = true
          this.remove = true
      }
    this.uploadData = {
        "companyid": sessionStorage.getItem('companyid'),
        "projectid":this.$route.query.id,
    }
    
    this._getFileTypeList()
    
  },
  methods:{
      handleSuccess(response, file, fileList){
        console.log(fileList);
        
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
        if(this.filesize){
            this.filesize = this.filesize+','+response.filesize
            
        }else{
            this.filesize = response.filesize
        }
        if(response.fileUrl){
            this.successLength = this.successLength+1
        }
        if(this.successLength== fileList.length){
            this.successLength = 0
           this.addFile()
        }

        
    },
    handleRemove(file, fileList) {
        console.log(fileList);
        this.fileListName=''
        this.fileListStr = ''
        this.filesize = ''
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
                if(this.filesize){
                    this.filesize = this.filesize+','+fileList[i].response.size
                    
                }else{
                    this.filesize = fileList[i].response.size
                }

            }
        }
    },
    getFormulaBar(res){
        console.log(res)
        if(res=='download'){
            this.batchFileDownload()
        }else if(res=='del'){
            this.filebatchremove()
        }else if(res=='add'){
            this.fileListData = []
            this.fileListStr = ''
            this.fileListName = ''
            this.filesize = ''
            this.addFileVisible = true
        }
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //文件列表
    _getFileTypeList(){
        let reqBody = {
            "api": "getdocumentdetails",
            "companyid": sessionStorage.getItem('companyid'),
            "id": this.$route.query.id,
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.fileTypeList = res.data.file_type
                this.projectname = res.data.fProject_manage.projectname
                if(res.data.file_type){
                   this._getFileList(0)
                }
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //文件详情列表
    _getFileList(idx){
        let reqBody = {
            "api": "getfilelist",
            "id": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
            "filetypeid":this.fileTypeList[idx].filetypeid
        }
        this.uploadData = {
            "companyid": sessionStorage.getItem('companyid'),
            "projectid":this.$route.query.id,
            "typeid":this.fileTypeList[idx].filetypeid
         }
        Axios(reqBody,'project',this.fileTypeList[idx].filetypeid).then((res) => {
            console.log(res)
            this.fileIndex = idx
            if(res.state==10001){
                
                this.fileList = res.data
                
            }else{
                this.fileList = []
                this.$message.error(res.msg);
            }

        })
    },
    //下载
    fileDownload(row){
        window.open(row.fileurl)
    },
    onExamine(url){
        this.iframeUrl = Session.browse+encodeURIComponent(url)
        this.iframeVisible = true
    },
    //批量下载
    batchFileDownload(){
        if(this.multipleSelection.length<1){
            this.$message.error('请选择文件')
            return false
        }
        for(let i=0;i<this.multipleSelection.length;i++){
            window.open(this.multipleSelection[i].fileurl)
        }
       
        //window.open(row.fileurl)
    },
    //删除文件
    fileremove(fileid){
        this.$confirm('是否确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody = {
                "api": "updatefilestatus",
                "fileid":fileid
            }
            Axios(reqBody,'project').then((res) => {
                console.log(res)
                
                if(res.state==10001){
                    this.$message.success('删除成功');
                    this._getFileList(this.fileIndex)
                    
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
    //批量下载
    filebatchremove(){
        if(this.multipleSelection.length<1){
            this.$message.error('请选择文件')
            return false
        }
        let ids = ''
        for(let i=0;i<this.multipleSelection.length;i++){
            if(ids){
                ids = ids + ',' + this.multipleSelection[i].fileid
            }else{
                ids = this.multipleSelection[i].fileid
            }
        }
        let reqBody = {
            "api": "updatefilestatus",
            "fileid":ids
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            
            if(res.state==10001){
                this.$message.success('删除成功');
                this._getFileList(this.fileIndex)
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    addFile(){
        if(!this.fileListStr ){
            this.$message.error('请选择文件')
            return false
        }
        let reqBody = {
            "api": "addfile",
            "projectid": this.$route.query.id,
            "filetypeid": this.fileTypeList[this.fileIndex].filetypeid,
            "filename":this.fileListName,
            "fileurl":this.fileListStr,
            'filesize':this.filesize,
            "uid":sessionStorage.getItem('userid'),

        }

        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.fileListData = []
                this.fileListStr = ''
                this.fileListName = ''
                this.filesize = ''
                this.successLength = 0
                this.addFileVisible = false
                this._getFileList(this.fileIndex)

                
            } else {
                
            }
        })
        console.log(this.fileListName)
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
        .fileListBox
            padding 0 20px 20px
            .title
                font-weight bold
                font-size 14px
                color #666
                border-bottom 2px solid #ccc
                line-height 48px
            .fileItem
                padding 0 10px
                border-bottom 2px solid #ccc
                font-size 14px
                color #666
                line-height 48px
                &:hover
                    cursor pointer
                .fileIcon
                    display inline-block
                    vertical-align middle
                    width 32px
                    height 32px
                    margin-right 10px
                    background  url('../../../../static/img/folder.png')  
                    background-size 100% 100%
                .fileText
                    color #4c97ff
    .iframe
        height 100vh
        padding-bottom 200px
        overflow: auto
        margin: 0
        z-index 3333
    .iframeVisible .el-dialog__body
        overflow hidden

</style>