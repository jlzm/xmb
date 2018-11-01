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
                    <v-projectInfo v-if="leftTabList.tabActive==0" :infoData="projectInfo.project_manage" :servicelist="projectInfo.servicelist"></v-projectInfo>     
                    <!-- 项目信息结束 -->  

                    <!-- 招投标信息开始 -->
                    <!-- <v-bidInfo v-else-if="leftTabList.tabActive==1"></v-bidInfo> -->
                    <!-- 招投标信息结束 -->

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
                                    :data="ratelist"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    >
                                 
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="updatetime"
                                    label="添加时间"
                                    align="center"
                                    width="240">
                                    </el-table-column>
                                    <el-table-column
                                    prop="updatedescribe"
                                    label="节点名称"
                                    align="center"
                                   show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="staffname"
                                    label="添加人"
                                    align="center"
                                    width="200"
                                    >
                                    </el-table-column>
                                    
                                </el-table>
                            </div>
                            <!-- 进度查看结束 -->

                            <!-- 文件管理开始 -->
                            <div v-show="tabListIndex==1" class="invitationBox">
                                
                                <!-- <div style="width:95%;line-height:45px;">
                                    <el-row :gutter="20">
                                        <el-col :span="5">
                                            <div class="fsize14 textCenter">文件夹</div>
                                        </el-col>
                                        <el-col :span="15">
                                            <div class="fsize14 textCenter">最新文件</div>
                                        </el-col>
                                        <el-col :span="4">
                                            <div class="fsize14 textCenter">上传时间</div>
                                        </el-col>
                                    
                                    </el-row>
                                    
                                </div> -->
                                <el-collapse v-model="collapseActive" @change="collapseChange" accordion>
                                    <el-collapse-item v-for="(item,index) in fileTypeList" :key="index" :name="index">
                                        <template slot="title">
                                        <div style="width:95%">
                                            <el-row :gutter="20">
                                            <el-col :span="5">
                                                <div class="fsize14">
                                                    <i class="folderIcon"></i>
                                                    <span>{{item.filename}}</span>
                                                </div>
                                            </el-col>
                                            <!-- <el-col :span="15">
                                                <div class="fsize14 textCenter"><span>{{item.filename1}}</span></div>
                                            </el-col>
                                            <el-col :span="4">
                                                <div class="fsize14 textCenter"><span>{{item.createtime1}}</span></div>
                                            </el-col> -->
                                            
                                            </el-row>
                                        </div>
                                        </template>
                                        <div v-loading="loadingFileList" class="padLr10">
                                            <!-- <el-row :gutter="20" v-if="item.fileList&&item.fileList.length>0">
                                                <el-col :span="5">
                                                    <div class="fsize14 textCenter">文件夹</div>
                                                </el-col>
                                                <el-col :span="15">
                                                    <div class="fsize14 textCenter">最新文件</div>
                                                </el-col>
                                                <el-col :span="4">
                                                    <div class="fsize14 textCenter">上传时间</div>
                                                </el-col>
                                            </el-row> -->
                                            <el-table
                                                
                                                
                                                :data="item.fileList"
                                                stripe
                                                align="center"
                                                tooltip-effect="dark"
                                                style="width: 100%"
                                                
                                            >                                               
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
                                                            <el-button type="primary" v-if="jurisdiction.file.query"  icon="el-icon-view"   @click="onExamine(scope.row.fileurl)" ></el-button>
                                                        </el-tooltip>
                                                        <el-tooltip class="item" effect="dark" content="下载" placement="top-end">
                                                            <el-button type="success" v-if="jurisdiction.file.query" icon="el-icon-download"  @click="fileDownload(scope.row)" ></el-button>
                                                        </el-tooltip>

                                                        <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                                            <el-button type="danger"  v-if="jurisdiction.file.remove" icon="el-icon-delete"  @click="fileremove(scope.row.fileid)" ></el-button>
                                                        </el-tooltip>
                                                        
                                                    </template>
                                                </el-table-column>
                                                
                                            </el-table>
                                            
                                        </div>
                                        
                                    </el-collapse-item>
                                    
                                </el-collapse>
                            </div>
                            <!-- 文件管理结束 -->

                             <!-- New -->
                            <!-- 财务管理开始 -->
                            <div v-show="tabListIndex==2" class="invitationBox">
                                <div class="finance-head-wrap bgWhite">
                                    <el-row :gutter="20">
                                    <el-col :span="8">
                                        <div class="financeItemBox">
                                            <div class="finance-total-box ">
                                                <div class="fsize18">项目总金额</div>
                                                <div class=" marT45 row">
                                                <span class="fsize40">{{fprojectManage.bargainsum}}</span>
                                                <span class="fsize18">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="financeItemBox">
                                            <div class="finance-payback-box row">
                                                <div class="fsize18">回款金额</div>
                                                <div class=" marT45 row">
                                                    <span class="fsize40">{{fprojectManage.sum}}</span>
                                                    <span class="fsize18">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="financeItemBox">
                                            <div class="finance-need-box">
                                                <div class="fsize18">应收金额</div>
                                                <div class="marT45 row">
                                                    <span class="fsize40">{{fprojectManage.totalamount}}</span>
                                                    <span class="fsize18">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    
                                </el-row>
                                </div>
                                <div class="finance-content-wrap marT10">
                                    <el-row :gutter="10">
                                        <el-col :span="12" class="finance-content-r">
                                            <div class="finance-content-r-c bgWhite" v-if="financeInfo.getfinancialdetails&&financeInfo.getfinancialdetails.length>0">
                                                <el-row class="finance-content-title">
                                                    <el-col :span="12">
                                                        <span class="fsize14 color333">资金明细</span>
                                                    </el-col>
                                                    <el-col :span="12" class="tar" >
                                                        <span @click="toFundsMore(financeInfo.fproject_manage.id)" class="fsize14 vam cp" style="color: #4c97ff">查看更多</span>
                                                        <i class="finance-content-more-icon dib vam">
                                                            <img v-lazy="'static/img/porjectAmount/more.png'" alt="">
                                                        </i>
                                                    </el-col>
                                                </el-row>
                                                <div class="finance-content-list-wrap">
                                                    <div class="finance-content-item" v-for="(item, index) in financeInfo.getfinancialdetails" :key="index" :class="{bgF5:index%2==0}">
                                                        <el-row>
                                                            <el-col :span="12" class="marB5">
                                                            <div class="finance-detail-title">
                                                                <span class="fsize14 color222">{{item.remark}}</span>
                                                            </div>

                                                            </el-col>
                                                            <el-col :span="12" class="tar">
                                                                <div class="finance-money-amount row fbold" :class="[item.type ? 'colorGreen' : 'colorRed']">
                                                                    <span v-if="item.type" class="fsize16">+</span>
                                                                    <span v-else class="fsize16">-</span>
                                                                    <span class="fsize16">{{item.fsum}}</span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="row marT12">
                                                            <el-col :span="12" class="row">   
                                                                <span class="fsize14 color999">{{item.expendituretime}}</span>
                                                                <span class="fsize14 color999">|</span>
                                                                <span class="fsize14 color999">{{item.passman}}</span>
                                                            </el-col>
                                                            <el-col :span="12" class="tar">   
                                                                <span class="fsize14 color999">{{item.type==1?'项目回款':'项目支出'}}</span>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pad20" v-else >
                                                    <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                                    <div class="notText">暂无资金明细</div>
                                                </div>
                                        </el-col>
                                        <el-col :span="12" class="finance-content-l">
                                                <div class="finance-content-l-c bgWhite" v-if="financeInfo.getspendinglist&&financeInfo.getspendinglist.length>0">
                                                    <div class="finance-content-title row">
                                                        <span class="fsize14 color333">支出统计</span>
                                                    </div>
                                                    <div class="finance-content-list-wrap">
                                                        <div class="finance-outlay-total row">
                                                            <span class="fsize16 color222">支出总额：</span>
                                                            <span class="fsize16 color222">￥{{financeInfo.binmoneytotal}}</span>
                                                        </div>
                                                        
                                                        <div class="finance-strip-items row">
                                                            <div  class="finance-strip-item"  v-for="(item, index) in financeInfo.getspendinglist" :key="index">
                                                                <div :style="'width:'+item.moneypercentage+'%'" class="finance-strip-bar dib fsize12 colorfff vam">
                                                                    
                                                                </div>
                                                                <div class="finance-strip-item-text">
                                                                    <div class="finance-strip-item-info fsize12 color333 vam tal col-lg-1 ">
                                                                        <div>{{item.spendingcategory}}</div>
                                                                        <div class="marT8 colorRed">￥{{item.spendingamount}}</div>
                                                                    </div>
                                                                    
                                                                    <div class="finance-strip-scale fsize12 color333 vam tal  floatRight">
                                                                        
                                                                        <span class="marL10  fsize12">{{item.moneypercentage}}%</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="pad20" v-else >
                                                    <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                                    <div class="notText">暂无支出数据</div>
                                                </div>
                                        </el-col>
                                </el-row>
                                </div>
                            </div>
                            <!--财务管理结束 -->


                            

                        </div>
                    </div>

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

        <el-dialog
        title="编辑项目"
        :visible.sync="newDialogVisible"
        width="50%"
        class="newDialog"
        >
        <div>
            <el-form ref="form" :model="form" label-width="140px" class="compileDialog">
                <el-form-item label="项目名称" :show-message='false' :required='true'>
                    <el-input v-model="form.projectname"></el-input>
                </el-form-item>
                <el-form-item label="合同签订时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.bargaintime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="合同签订金额" :show-message='false' :required='true'>
                    <el-input v-model="form.bargainsum" type="number"></el-input>
                    <span class="newCustmerSpan">元</span>
                </el-form-item>
                <el-form-item label="项目启动时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.projectstarttime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="约定完工时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.appointedtime" value-format="yyyy-MM-dd HH:mm"  format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="客户名称" :show-message='false' :required='true'>
                    <div class="relative">
                        <el-select v-model="form.custmerid" placeholder="请选择" @change="getAddressd">
                            <el-option :label="item.custmername" :value="item.id" v-for="(item,index) in customerList" :key="index"></el-option>
                           
                        </el-select>
                        <div class="">
                            <el-button type="success" icon="el-icon-edit" class="newCustmer" @click="newCustmer">新建</el-button>
                        </div>
                    </div>  
                </el-form-item>
                <el-form-item label="所在地址" :show-message='false' :required='true'>
                    <el-input  disabled v-model="form.address"></el-input>
                </el-form-item>
                
                <el-form-item label="联系人" :show-message='false' :required='true'>
                    <el-input v-model="form.linkman"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" :show-message='false' :required='true'>
                    <el-input v-model="form.linkmanphone" type="number"></el-input>
                </el-form-item>
                <el-form-item label="项目经理" :show-message='false' :required='true'>
                    <el-select v-model="form.projectleader" placeholder="请选择">
                        <el-option :label="item.staffname" :value="item.userid" v-for="(item,index) in deptempList" :key="index"></el-option>
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="项目组成员" :show-message='false' :required='true'>
                    <el-select v-model="form.projectmember" multiple  placeholder="请选择">
                        <el-option :label="item.staffname" :value="item.userid" v-for="(item,index) in deptempList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目概况：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="form.describe"></el-input>
                    </el-form-item>
            </el-form>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="newDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateproject">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="添加客户信息"
        :visible.sync="newCustmerVisible"
        width="30%"
        >
        <div>
            <el-form  label-width="100px" class="demo-ruleForm">
                <el-form-item label="客户名称" >
                    <el-input v-model="newCustmerData.custmername"></el-input>
                </el-form-item>
                <el-form-item label="客户地址" >
                    <el-input v-model="newCustmerData.addressd"></el-input>
                </el-form-item>
            </el-form>
           
            
        </div>
        <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
            <el-button @click="newCustmerVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCustmer">确 定</el-button>
        </span>
        </el-dialog>

        <el-dialog
        title="添加文件"
        :visible.sync="addFileVisible"
        width="30%"
        >
        <div>
            <el-form  label-position="left" label-width="100px" >
                <el-form-item label="文件夹">
                    <el-select v-model="filetypeid" placeholder="请选择文件夹" @change="selectFile" >
                        <el-option :label="item.filename" :value="item.filetypeid"  v-for="(item,index) in fileBoxList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-upload
            multiple
            ref="upload"
            class="upload-demo"
            :action="exportUrl"
            :data="uploadData"
            :auto-upload="false"
            :file-list="fileList"
           
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
import vProjectInfo from './ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'



export default {
  
  data () {
    return {
        loadingFileList:false,
        tabListIndex:0,
        projectInfo:{},
        ratelist:[],
        fileTypeList:[],
        fileBoxList:[],
        customerList:[],
        deptempList:[],
        updatedescribe:'',
        addDialogVisible:false,
        newDialogVisible:false,
        newCustmerVisible:false,
        addFileVisible:false,
        iframeVisible:false,
        iframeUrl:'',
        collapseActive:'',
        fileList:[],
        fileListStr:'',
        fileListName:'',
        filetypeid:'1',
        uploadData:{},
        successLength:0,
        fprojectManage:'',
        exportUrl:Session.exportUrl+'saveFile',
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        newCustmerData:{
            custmername:'',
            addressd:'',
            

        },
        progressstatus:0,
        financeInfo:'',
        form:{
         
          projectname: '',
          bargaintime:'',
          bargainsum:'',
          projectstarttime:'',
          appointedtime:'',
          custmerid:'',
          address:'',
          linkman:'',
          linkmanphone:'',
          projectleader:'',
          projectmember:[],
          describe:'',
         
        },
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
                // {
                //     title:'添加进度节点',
                //     clickEvent:'addprojectrate',
                //     icon:'icon-bianji'
                // },{
                //     title:'确认完成项目',
                //     clickEvent:'updateprojectstatus',
                //     icon:'icon-jia'
                // }
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
                
            ]
        },
        rightTabList:{
            tabType:'rightTabList',
            tabTitle:'关联数据',
            tabActive:0,
            icon:'icon-guanliangongnengliebiaoiconxuanzhong',
            item:[
                {
                    title:'进度查看',
                    clickEvent:'projectInfo'  ,
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).rate.query
                },
                
                {
                    title:'文件管理',
                    clickEvent:'projectInfo'  ,
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).file.query
                    
                },
                {
                    title:'财务数据',
                    clickEvent:'projectInfo'  ,
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).finance.query
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
            "typeid":this.filetypeid
        }
    this._getProjectInfo()
   
   
    this.getprojectfinancial()
    this.getCustomerList()
    this.getDeptemp()
    this.getfilelist()
    
    
  },
  methods:{
    // 路由跳转
    toFundsMore(projectid) {
        this.$router.push({
            path: 'financeFundsMore',
            query: {
                projectid: projectid
            }
        })
    },
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
        if(res=='addprojectrate'){
            this.addDialogVisible = true
        }else if(res=='updateprojectstatus'){
            this.updateprojectstatus()
        }else if(res=='compile'){
            this.projectInfoData()
        }else if(res=='add'){
            this.fileList=[],
            this.fileListStr='',
            this.fileListName='',
            this.fileListsize='',
      
            this.filetypeid = ''
            this.addFileVisible = true
        }
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
        if(res.index==1){
            this.formulaList.right = [
                {
                    title:'添加文件',
                    clickEvent:'add',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).file.add
                }
            ]
        }else if(res.index==2){
            this.formulaList.right = [
                
            ]
        }else if(res.index==0&&this.progressstatus.status==1){
            if(this.projectInfo.project_manage.projectleader==sessionStorage.getItem('userid')){
                this.formulaList.right = [
                    {
                        title:'添加进度节点',
                        clickEvent:'addprojectrate',
                        icon:'icon-bianji',
                        limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                    },{
                        title:'确认完成项目',
                        clickEvent:'updateprojectstatus',
                        icon:'icon-jia',
                        limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                    }
                ]
            }else{
                this.formulaList.right = [
                    {
                        title:'添加进度节点',
                        clickEvent:'addprojectrate',
                        icon:'icon-bianji',
                        limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                    }
                ]
            }
            
        }else if(res.index==0&&this.progressstatus.status==0){
            this.formulaList.right = []
        }
    },
    //获取详情
    _getProjectInfo(){
        let reqBody = {
            "api": "getprojectinfo",
            "id": this.$route.query.id,
            "companyid":sessionStorage.getItem('companyid'),
            "userid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.projectInfo = res.data
                console.log(this.projectInfo.project_manage.status)
                this._getRateList()
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //进度列表
    _getRateList(){
        let reqBody = {
            "api": "getratelist",
            "projectid": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.progressstatus = res.data.progressstatus
                this.ratelist = res.data.ratelist

                if(res.data.progressstatus.status==0){
                    this.formulaList.right = []
                }
                if(this.tabListIndex==0&&res.data.progressstatus.status==0){
                        this.formulaList.right = []
                }else{
                    if(this.projectInfo.project_manage.projectleader==sessionStorage.getItem('userid')){
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-bianji',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                            },{
                                title:'确认完成项目',
                                clickEvent:'updateprojectstatus',
                                icon:'icon-jia',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                            }
                        ]
                    }else{
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-bianji',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                            }
                        ]
                    }
                }
                
            }else if(res.status==20001){
                this.tabListIndex = 1
            }else{
                this.$message.error(res.msg);
            }
          
            this._getFileTypeList()

        })
    },
    //文件列表
    _getFileTypeList(){
        let reqBody = {
            "api": "getfile_typelist",
            "id": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
        
                this.fileBoxList = res.data.filetype
            }else if(res.status==20001){
                this.tabListIndex = 2
            }else{
                this.$message.error(res.msg);
            }
            
        })
    },
    //客户列表
    getCustomerList(){
        let reqBody = {
            "api": "getcustomerlist",
            "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.customerList =  res.data
                
            } else {
                
            }
        })
    },
    //员工列表
    getDeptemp(){
        let reqBody = {
            "api": "getdeptemp",
            "deptid": "",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
        }

        Axios(reqBody, 'index').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.deptempList =  res.data
                
            } else {
                
            }
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
            "projectid": this.$route.query.id,
            "updatedescribe":this.updatedescribe,
            "companyid":sessionStorage.getItem('companyid'),
        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功');
                this.addDialogVisible = false
                this.updatedescribe = ''
                this._getRateList(true)
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //获取财务数据
    getprojectfinancial(){
        let reqBody = {
            "api": "getprojectfinancial",
            "projectid": this.$route.query.id,
            "companyid":sessionStorage.getItem('companyid'),
        }

        Axios(reqBody,'project').then((res) => {
            console.log('财务数据',res);
            if(res.state==10001){
            
                this.financeInfo = res.data
                this.fprojectManage = res.data.fproject_manage
            }else if(res.status==20001){

            }else{
              //  this.$message.error(res.msg);
            }
            

        })
    },
    //确认完成
    updateprojectstatus(){
        let reqBody = {
            "api": "updateprojectstatus",
            "id": this.$route.query.id,
             "userid": sessionStorage.getItem('userid'),
             "companyid":sessionStorage.getItem('companyid'),

        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this._getProjectInfo()
                this.$message.success('更新成功');
            }else{
                this.$message.error(res.msg);
            }

        })
    },

    //获取详情
    projectInfoData(){

            let projectInfo = this.projectInfo.project_manage
            let projectmember = []
            if(this.projectInfo.servicelist){
                for(let i=0;i<this.projectInfo.servicelist.length;i++){
                    projectmember.push(this.projectInfo.servicelist[i].userid)
                }
            }
            
           
            this.form = {
                api:"updateproject",
                projectname: projectInfo.projectname,
                bargaintime:projectInfo.bargaintime1,
                bargainsum:projectInfo.bargainsum==0?'':projectInfo.bargainsum,
                projectstarttime:projectInfo.projectstarttime1,
                appointedtime:projectInfo.appointedtime1,
                custmerid:projectInfo.custmerid,
                linkman:projectInfo.linkman,
                address:projectInfo.addressd,
                linkmanphone:projectInfo.linkmanphone,
                projectleader:projectInfo.projectleader,
                projectmember:projectmember,
                describe:projectInfo.describe,
                companyid: sessionStorage.getItem('companyid'),
                id:projectInfo.id
            }
       
            this.newDialogVisible = true
        

        
    },
    //编辑
    updateproject(){
        let reqBody = this.form
        if(!reqBody.projectname || !reqBody.bargainsum || !reqBody.bargaintime || !reqBody.projectstarttime || !reqBody.appointedtime || !reqBody.projectleader|| !reqBody.linkman|| !reqBody.linkmanphone || reqBody.projectmember.length<0){
            this.$message.error('请填写完整信息')
            return false
        }
        let projectmember = ''
        for(let i=0;i<reqBody.projectmember.length;i++){
            if(projectmember){
                projectmember = projectmember +',' +reqBody.projectmember[i]
            }else{
                projectmember = reqBody.projectmember[i]
            }
        }
        reqBody.projectmember = projectmember

        console.log(reqBody)
        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message({
                    message: '修改成功',
                    type: 'success'
                })
                
                this.newDialogVisible=false
                this._getProjectInfo()      
            } else {
                this.$message.error(res.data)
            }
        })
    },
    //添加客户
    newCustmer(){
        this.newCustmerVisible = true
    },
    addCustmer(){ 
        if(!this.newCustmerData.custmername || !this.newCustmerData.addressd){
            this.$message.error('请填写完整信息')
            return false
        }
        let reqBody = {
            "api": "basicadd",
            "uid": sessionStorage.getItem('userid'),
            "type": 4,
            "companyid":sessionStorage.getItem('companyid'),
            "custmername": this.newCustmerData.custmername,
            "addressd": this.newCustmerData.addressd,
        }

        Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.getCustomerList()
                this.newCustmerVisible = false

                
            } else {
                
            }
        })
    },
    addFile(){
        if(!this.filetypeid ){
            this.$message.error('请选择文件夹')
            return false
        }else if(!this.fileListStr){
            this.$message.error('请进行文件上传')
            return false
        }
        let reqBody = {
            "api": "addfile",
            "projectid": this.$route.query.id,
            "filetypeid": this.filetypeid,
            "filename":this.fileListName,
            "fileurl":this.fileListStr,
            "filesize":this.filesize,
            "uid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.getfilelist()
                this.fileList = []
                this.fileListStr = ''
                this.fileListName = ''
                this.filesize = ''
                this.successLength = 0
                this.addFileVisible = false

                
            } else {
                
            }
        })
        console.log(this.fileListName)
    },
    getfilelist(){
        let reqBody = {
            "api": "getfile_typelist",
            
            "id": this.$route.query.id,
            "companyid":sessionStorage.getItem('companyid'),
          
            
        }

        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.fileTypeList = res.data.filetype

                
            } else {
                
            }
        })
    },
    submitUpload(){
     

        this.$refs.upload.submit()
       
    },
    selectFile(val){
        this.uploadData = {
            "companyid": sessionStorage.getItem('companyid'),
            "projectid":this.$route.query.id,
            "typeid":val
        }
        console.log(this.uploadData)
    },
    //获取地址
    getAddressd(res){
        console.log(res)
        for(let i=0;i<this.customerList.length;i++){
            if(res == this.customerList[i].id){
                this.form.address = this.customerList[i].addressd
                break;
            }
        }
    },
    //文件详情列表
    _getFileList(idx){
        console.log(idx)
        if(idx===''){
            return false
        }
        this.loadingFileList = true
        let fileTypeList = this.fileTypeList 
        let reqBody = {
            "api": "getfilelist",
            "id": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
            "filetypeid":fileTypeList[idx].filetypeid
        }
        this.uploadData = {
            "companyid": sessionStorage.getItem('companyid'),
            "projectid":this.$route.query.id,
            "typeid":this.fileTypeList[idx].filetypeid
         }
        Axios(reqBody,'project',this.fileTypeList[idx].filetypeid).then((res) => {
            console.log(res)
            if(res.state==10001){
                this.fileTypeList[idx].fileList = res.data
            }else{
               this.fileTypeList[idx].fileList = []
                
            }
            setTimeout(() => {
                this.loadingFileList = false
            }, 500);

        })
    },
    collapseChange(val){
        console.log(val)
        if(val!=null){
            this._getFileList(val)
        }
            
        
        
        
    },
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
    },
   
    
    
  
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .bid
        width 100%
        padding 10px 15px
        overflow hidden
   
    .compileDialog
        padding-right  100px
        .el-date-editor
            width 100%
        .el-select
            width 100%
    .dialog-footer
        padding-right 100px
    .newCustmer
        position absolute
        top 0
        right -85px
    .newCustmer-dialog-footer
        padding-right 0
    .newCustmerSpan
        position absolute
        top 0
        right -25px
    .finance-head-wrap
        padding 20px 40px 40px
        .financeItemBox
            width 326px
            height 166px
            .finance-total-box,
            .finance-payback-box
            .finance-need-box
                color #fff
                padding 20px 20px 36px
                height 100%
                width 100%
            .finance-total-box
                background-image url('../../../../static/img/porjectAmount/total.png')
            .finance-payback-box
                background-image url('../../../../static/img/porjectAmount/payback.png')
            .finance-need-box
                background-image url('../../../../static/img/porjectAmount/need.png')    
    .finance-content-wrap
        // 公共样式
        .finance-content-title
            padding 15px 0
            border-bottom 1px solid #ededed
        .finance-content-list-wrap
            padding 20px 0 20px

        // 公共样式结束
        .finance-content-r-c,
        .finance-content-l-c
            padding 0 20px
            .finance-content-more-icon
                height 14px
                width 14px
            .finance-content-item
                border 1px solid #f2f2f2
                padding 20px 10px
        .finance-strip-items
            margin-top 30px
            .finance-strip-item
                margin-bottom 20px
                .finance-strip-bar
                    position relative
                    background #d8e9fd
                    border-radius 3px
                    padding 5px
                    .finance-strip-scale
                        position absolute
                        right -10%
                        top 16px

.finance-strip-items
    margin-top 30px
    .finance-strip-item
        position relative
        margin-bottom 20px
        height 42px
        .finance-strip-bar
            position relative
            background #d8e9fd
            border-radius 3px
            padding 5px
            height 42px
            
    .finance-strip-item-text
        position absolute
        top 0
        left 0
        height 42px
        width 100%
        z-index 10
        cursor pointer
        .finance-strip-scale
            width 14%
            line-height 42px
        .finance-strip-item-info
            width 85%
            height 42px
            color #666
            font-size 12px
            padding 5px 10px
.lineHeight42
    line-height 42px

// 背景
.bgF5
    background #f5f5f5    


    .compileDialog
        padding-right  100px
        .el-date-editor
            width 100%
        .el-select
            width 100%
    .dialog-footer
        padding-right 100px
    .newCustmer
        position absolute
        top 0
        right -85px
    .newCustmer-dialog-footer
        padding-right 0

.colorRed
    color #f33b3b
.colorGreen
    color #259f89
.notIcon
    margin: 40px auto
.folderIcon
    margin 0 10px
    display inline-block
    width 28px
    height 28px
    vertical-align: middle;
    background  url('../../../../static/img/folder.png')  
    background-size 100% 100%
.iframe
    height 100vh
    padding-bottom 200px
    overflow: auto
    margin: 0
    z-index 3333
    .iframeVisible .el-dialog__body
        overflow hidden
</style>