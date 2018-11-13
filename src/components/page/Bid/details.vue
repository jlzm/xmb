<template>
    <div class="bid">
        <div class="listBox">
            <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
            </v-formulaBar> 
            <div class="contentBox clearfix">
                <div class="leftBox leftBox554">
                    <!-- 标题Tab开始 -->
                    <v-particularsTab :particularsTabList="leftTabList" @returnCutTab="getCutTab"></v-particularsTab>
                    <!-- 标题Tab结束 -->

                    <!-- 项目信息开始 -->
                    <v-projectInfo v-if="leftTabList.tabActive==1" :infoData="threadInfo.sellThread" bidType='true' :binState="binInfo.bininfo.state"></v-projectInfo>     
                    <!-- 项目信息结束 -->  

                    <!-- 招投标信息开始 -->
                    <v-bidInfo v-if="leftTabList.tabActive==0" :infoData="binInfo.bininfo"></v-bidInfo>
                    <!-- 招投标信息结束 -->

                </div>
                <div class="floatLeft rightBox554">
                    <div class="rightContentBox">
                        <!-- 标题Tab开始 -->
                        <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>

                        
                        <!-- 标题Tab结束 -->
                        <div class="pad10">

                            <!-- 跟进记录开始 -->
                         
                            <div  v-if="tabListIndex==0" class="invitationBox">
                                <div>
                                    <div class="particularsRightItem"  v-for="(item,index) in threadInfo.sellThreadRates" :key="index" >
                                        <div class="rightItemTitleBox clearfix">
                                            <div class="rightItemTitle floatLeft">{{item.name}} {{item.updatetime}}</div>
                                            <!-- <div class="rightItemTitleBtnBox floatRight">
                                                <div class="rightItemTitleBtn floatLeft">编辑</div>
                                                <div class="rightItemTitleBtn titleBtnDelete floatLeft">删除</div>
                                            </div> -->
                                        </div>
                                        <div class="rightItemContentBox">
                                            <div>{{item.record}}</div>
                                        </div>
                                    </div>
                                    <div class="pad20"  v-if="threadInfo.sellThreadRates&&threadInfo.sellThreadRates.length<=0">
                                        <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                    <div class="notText">暂无跟进记录</div>
                                </div>
                                </div>
                            </div>
                         
                            <!-- 跟进记录结束 -->

                            <!-- 投标准备开始 -->
                            
                            <div v-if="tabListIndex==5" class="invitationBox">
                                <el-table
                                    
                                    :data="binInfo.binddocumentlist"
                                    
                                    align="center"
                                   
                                    style="width: 100%"
                                    >
                                    
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="工作内容"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成状态"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="完成时间"
                                    align="center"
                                    width="200">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" v-if="jurisdiction.bin.query"  type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2" v-if="jurisdiction.bin.query"  @click="onAffirm(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" v-if="jurisdiction.bin.remove" @click="onAffirm(scope.row.id)"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                             
                            <!-- 投标准备结束 -->

                            <!-- 招标文件开始 -->
                            
                            <div  v-if="tabListIndex==1" class="invitationBox">
                                <el-table
                                   
                                    :data="binInfo.binddocumentlist"
                                    
                                    align="center"
                                    
                                    style="width: 100%"
                                    >
                                
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="filename"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    width="120"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="createtime"
                                    label="创建时间"
                                    width="200"
                                    align="center">
                                    </el-table-column>
                                   
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="240"
                                    align="center">
                                        <template slot-scope="scope">
                                            
                                            <el-tooltip class="item" effect="dark" content="查看" placement="top-end">
                                                <el-button type="primary" icon="el-icon-view"  v-if="jurisdiction.bin.query"  @click="onExamine(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload" v-if="jurisdiction.bin.query"  @click="onDownload(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" v-if="jurisdiction.bin.remove" @click="deletebinddocument(scope.row.id)"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                           
                            <!-- 招标文件结束 -->

                            <!-- 投标文件开始 -->
                         
                            <div  v-if="tabListIndex==2" class="bidBox">
                                <el-table
                                   
                                    :data="binInfo.tenderdocumentlist"
                                    
                                    align="center"
                                    
                                    style="width: 100%">
                                  
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="filename"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    width="120"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="createtime"
                                    label="创建时间"
                                    width="200"
                                    align="center">
                                    </el-table-column>
                                   
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="240"
                                    align="center" v-if="jurisdiction.bin.query||jurisdiction.bin.query||jurisdiction.bin.query">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="查看" placement="top-end">
                                                <el-button type="primary" icon="el-icon-view"  v-if="jurisdiction.bin.query"  @click="onExamine(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload"  v-if="jurisdiction.bin.query"  @click="onDownload(scope.row.fileurl)" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete"  v-if="jurisdiction.bin.remove" @click="deletetenderdocument(scope.row.id)"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                          
                            <!-- 投标文件结束 -->

                        

                        </div>
                    </div>

                </div>
            </div>
        </div>

        <el-dialog
        title="添加跟进记录"
        :visible.sync="addDialogVisible"
        width="30%"
        >
        <div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 40}"
                placeholder="请输入内容"
                v-model="record">
            </el-input>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="_addSellthreadrate">确 定</el-button>
        </span>
        </el-dialog>

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
            <div class="marB20">
                <el-radio v-model="radioState" label="3">未投标</el-radio>
            </div>
            <div >
                <el-radio v-model="radioState" label="0">投标中</el-radio>
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
            :on-error="handleError"
            :data="uploadData"
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
            <!-- addFile -->
            
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
        threadInfo:{},
        tabListIndex:0,
        binInfo:{},
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        changeDialogVisible:false,
        addDialogVisible:false,
        compileDialogVisible:false,
        iframeVisible:false,
        radioState:'2',
        record:'',
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
        iframeUrl:'',
        addFileVisible:false,
        fileListStr:'',
        fileListName:'',
        fileListSize:'',
        fileListData:[],
        successLength:0,
        exportUrl:Session.exportUrl+'saveFile',
        uploadData:{},

        multipleSelection: [],
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).bin.save
                }

            ],
            right:[
                {
                    title:'添加跟进记录',
                    clickEvent:'addRecord',
                    icon:'icon-jia',
                    limits:true
                },
                {
                    title:'更改项目状态',
                    clickEvent:'changeState',
                    icon:'icon-bianji',
                    bgColor:'bg4C97FF',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).bin.save
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
                    title:'招投标信息',
                    clickEvent:'bidInfo',
                    
                },
                {
                    title:'项目信息',
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
                    title:'跟进记录',
                    clickEvent:'projectInfo'
                },
                // {
                //     title:'投标准备',
                //     clickEvent:'projectInfo'  
                // },
                {
                    title:'招标文件',
                    clickEvent:'projectInfo'  
                },
                {
                    title:'投标文件',
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
    this.uploadData = {
        "companyid": sessionStorage.getItem('companyid'),
        "projectid":this.$route.query.id,
    }
    this._getSellThreadInfo()
    this._getBinInfo()
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
        this.fileListSize = ''
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

                if(this.fileListSize){
                    this.fileListSize = this.fileListSize + ',' + fileList[i].response.filesize
                }else{
                    this.fileListSize = fileList[i].response.filesize
                }

            }
        }
    },
    handleError(response, file, fileList){
        console.log(response)
    },
  

    getFormulaBar(res){
        if(res=='compile'){
            let bininfo = this.binInfo.bininfo
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
        }else if(res=='addRecord'){
            
            this.addDialogVisible = true
        }else if(res=="changeState"){
            this.changeDialogVisible = true
        }else if(res=='add'){
            this.fileListData = []
            this.fileListName=''
            this.fileListStr = ''
            this.fileListSize = ''
            this.addFileVisible = true
        }
    },
    getCutTab(res){
        console.log(res)
        if(res.tabType=='rightTabList'){
            this.tabListIndex = res.index
            if(res.index!=0){
                this.formulaList.right=[
                    {
                        title:'添加文件',
                        clickEvent:'add',
                        icon:'icon-jia',
                        limits:true
                    },
                    {
                        title:'添加跟进记录',
                        clickEvent:'addRecord',
                        icon:'icon-jia',
                        limits:true
                    },
                    {
                        title:'更改项目状态',
                        clickEvent:'changeState',
                        icon:'icon-bianji',
                        bgColor:'bg4C97FF',
                        limits:JSON.parse(sessionStorage.getItem('jurisdiction')).bin.save
                    }

                ]
            }else{
                this.formulaList.right=[
                    {
                        title:'添加跟进记录',
                        clickEvent:'addRecord',
                        icon:'icon-jia',
                        limits:true
                    },
                    {
                        title:'更改项目状态',
                        clickEvent:'changeState',
                        icon:'icon-bianji',
                        bgColor:'bg4C97FF',
                        limits:JSON.parse(sessionStorage.getItem('jurisdiction')).bin.save
                    }
                ]
            }
        }
        
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
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //销售线索信息
    _getSellThreadInfo(){
        let reqBody = {
            "api": "getsellthreadinfo",
            "threadid": this.$route.query.threadid,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.threadInfo = res.data
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //招投标信息
    _getBinInfo(){
        let reqBody = {
            "api": "getbininfo",
            "id": this.$route.query.id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.binInfo = res.data
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //添加记录
    _addSellthreadrate(){
        if(!this.record){
            this.$message.error('请填写跟进记录');
            return false
        }
        let reqBody = {
            "api": "addsellthreadrate",
            "threadid": this.$route.query.threadid,
            "userid":sessionStorage.getItem('userid'),
            "record":this.record

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功');
                this.addDialogVisible = false
                this.record = ''
                this._getSellThreadInfo()
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //确定更改
    changeConfirm(){
        let pitchChangeDialog = this.pitchChangeDialog 
        let reqBody={
            "api": "updatebinstatus",
            "id": this.$route.query.id,
            "state": this.radioState
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('更改成功');
                this.changeDialogVisible = false
               
                this._getSellThreadInfo()
                this._getBinInfo()
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    onDownload(url){
        window.open(url);
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
            "id": this.$route.query.id,
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
                this._getSellThreadInfo()
                this._getBinInfo()
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //添加文件判断
    addFile(){
        console.log(this.tabListIndex)
        if(!this.fileListStr&&!this.fileListName){
            this.$message.error('请先添加文件')
            return false
        }
        let reqBody={}
        if(this.tabListIndex=='1'){
            //招标文件
            reqBody={
                 "api": "addbinddocument",
                "fileurl": this.fileListStr,
                "filename": this.fileListName,
                "filesize": this.fileListSize,
                "userid": sessionStorage.getItem('userid'),
                "bindid":this.$route.query.id,

            }
        }else if(this.tabListIndex=='2'){
            //投标文件
            reqBody={
                "api": "addtenderdocument",
                "fileurl": this.fileListStr,
                "filename": this.fileListName,
                "userid": sessionStorage.getItem('userid'),
                "bindid":this.$route.query.id,
                "filesize":this.fileListSize
            }
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功');
                this.successLength = 0
                this.addFileVisible = false
                this.fileListData = []
                this._getSellThreadInfo()
                this._getBinInfo()
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //招标文件删除
    deletebinddocument(id){
        this.$confirm('是否确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody={
                "api": "deletebinddocument",
                "id": id,
                
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success('删除成功');
                    
                
                    this._getSellThreadInfo()
                    this._getBinInfo()
                    
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
    
    //招标文件删除
    deletetenderdocument(id){
        this.$confirm('是否确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody={
                "api": "deletetenderdocument",
                "id": id,
                
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success('删除成功');

                    this._getSellThreadInfo()
                    this._getBinInfo()
                    
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
    onExamine(url){
        this.iframeUrl = Session.browse+encodeURIComponent(url)
        this.iframeVisible = true
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
    .particularsRightItem
            font-size 14px  
            background-color #F5F5F5
            margin-bottom 10px
            .rightItemTitleBox
                line-height 38px
                font-weight bold
                border-bottom 1px solid #fff
                padding 0 10px
            .rightItemTitleBtnBox
                .rightItemTitleBtn
                    color #ffffff
                    width 44px
                    height 20px
                    line-height 20px
                    text-align center
                    background-color #00AC97
                    margin-left 5px
                    margin-top 9px
                    border-radius 4px
                    cursor pointer
                    &.titleBtnDelete
                        background-color #f1253d
            .rightItemContentBox
                padding 15px 10px
                line-height 25px
                font-size 12px    
    .compileDialog
        .el-input
            width 220px
        .el-input-number
            width 220px
        .el-select
            width 220px
    .iframe
        height 100vh
        padding-bottom 60px
        overflow: auto
        margin: 0
        z-index 3333
    .iframeVisible .el-dialog__body
        overflow hidden
</style>