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
                    <div>
                        <!-- 标题Tab开始 -->
                        <v-particularsTab class="bgWhite" :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>
                        <!-- 标题Tab结束 -->
                        <div>
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
                                <el-table
                                    
                                    :data="fileTypeList"
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
                                    prop="filename"
                                    label="文件夹"
                                    align="center"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="filename"
                                    label="最新文件"
                                    align="center"
                                    show-overflow-tooltip>
                                        <template slot-scope="scope">
                                            <a :href="scope.row.fileurl" :download="scope.row.filename1">{{scope.row.filename1}}</a>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                    prop="createtime1"
                                    label="上传时间"
                                    align="center"
                                    width="200">
                                    </el-table-column>
                                    
                                </el-table>
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
                                                <span class="fsize40">{{fprojectManage.bargainsum || '300,000.00'}}</span>
                                                <span class="fsize18">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="financeItemBox">
                                            <div class="finance-payback-box row">
                                                <div class="fsize18">项目总金额</div>
                                                <div class=" marT45 row">
                                                    <span class="fsize40">{{fprojectManage.sum || '250,000.00'}}</span>
                                                    <span class="fsize18">元</span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="financeItemBox">
                                            <div class="finance-need-box">
                                                <div class="fsize14">项目总金额</div>
                                                <div class="marT45 row">
                                                    <span class="fsize40">{{fprojectManage.totalamount || '450,000.00'}}</span>
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
                                            <div class="finance-content-r-c bgWhite">
                                                <el-row class="finance-content-title">
                                                    <el-col :span="12">
                                                        <span class="fsize14 color333">资金明细</span>
                                                    </el-col>
                                                    <el-col :span="12" class="tar">
                                                        <span class="fsize14 vam cp" style="color: #4c97ff">查看更多</span>
                                                        <i class="finance-content-more-icon dib vam">
                                                            <img v-lazy="'static/img/porjectAmount/more.png'" alt="">
                                                        </i>
                                                    </el-col>
                                                </el-row>
                                                <div class="finance-content-list-wrap">
                                                    <div class="finance-content-item" v-for="(item, index) in financeDetailList" :key="index" :class="{bgF5:index%2==0}">
                                                        <el-row>
                                                            <el-col :span="12">
                                                            <div class="finance-detail-title">
                                                                <span class="fsize16 color222">{{item.title}}</span>
                                                            </div>

                                                            </el-col>
                                                            <el-col :span="12" class="tar">
                                                                <div class="finance-money-amount row" :class="[item.profit ? 'colorRed' : 'colorGreen']">
                                                                    <span v-if="item.profit" class="fsize16">+</span>
                                                                    <span v-else class="fsize16">-</span>
                                                                    <span class="fsize16">{{item.money}}</span>
                                                                </div>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row class="row marT12">
                                                            <el-col :span="12" class="row">   
                                                                <span class="fsize14 color999">{{item.date}}</span>
                                                                <span class="fsize14 color999">|</span>
                                                                <span class="fsize14 color999">{{item.user}}</span>
                                                            </el-col>
                                                            <el-col :span="12" class="tar">   
                                                                <span class="fsize14 color999">{{item.type}}</span>
                                                            </el-col>
                                                        </el-row>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-col>
                                        <el-col :span="12" class="finance-content-l">
                                            <div class="finance-content-l-c bgWhite">
                                                <div class="finance-content-title row">
                                                    <span class="fsize14 color333">支出统计</span>
                                                </div>
                                                <div class="finance-content-list-wrap">
                                                    <div class="finance-outlay-total row">
                                                        <span class="fsize16 color222">支出总额：</span>
                                                        <span class="fsize16 color222">￥255,685.00</span>
                                                    </div>
                                                    <div class="finance-strip-items row">
                                                        <div class="finance-strip-item">
                                                            <div class="finance-strip-bar dib fsize12 colorfff col-lg-8 vam">
                                                                <div>招待费用</div>
                                                                <div class="marT8">￥255,685.00</div>
                                                            </div>
                                                            <div class="dib col-lg-2 fsize12 color333 vam">
                                                                <span style="padding-left: 10px">80%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
                </el-form-item>
                <el-form-item label="项目启动时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.projectstarttime" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="约定完工时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="form.appointedtime" value-format="yyyy-MM-dd HH:mm"  format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="客户名称" :show-message='false' :required='true'>
                    <div class="relative">
                        <el-select v-model="form.custmerid" placeholder="请选择">
                            <el-option :label="item.custmername" :value="item.id" v-for="(item,index) in customerList" :key="index"></el-option>
                           
                        </el-select>
                        <div class="">
                            <el-button type="success" icon="el-icon-edit" class="newCustmer" @click="newCustmer">新建</el-button>
                        </div>
                    </div>
                    
                    
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
                    <el-select v-model="filetypeid" placeholder="请选择文件夹" >
                        <el-option :label="item.filename" :value="item.filetypeid"  v-for="(item,index) in fileBoxList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-upload
            multiple
            class="upload-demo"
            :action="exportUrl"
            :on-remove = "handleRemove"
            :file-list="fileList"
            :on-success="handleSuccess"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </div>
        <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
            <el-button @click="addFileVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFile">确 定</el-button>
        </span>
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
        fileList:[],
        fileListStr:'',
        fileListName:'',
        filetypeid:'',
        fprojectManage:'',
        exportUrl:Session.exportUrl+'index/saveFile',
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
          linkman:'',
          linkmanphone:'',
          projectleader:'',
          projectmember:[],
          describe:'',
         
        },
        // 资金明细
        financeDetailList: [
            {
                id: 1,
                title: '二期项目尾款',
                date: '2018-10-22 11:23',
                user: '李思明',
                money: 200000.00,
                type: '项目回款',
                profit: true
            },
            {
                id: 2,
                title: '招待公关',
                date: '2018-10-21 11:23',
                user: '李思明',
                money: 8000.00,
                type: '项目支出',
                profit: false
            },
            {
                id: 3,
                title: '差旅费用',
                date: '2018-10-21 11:23',
                user: '李思明',
                money: 3000.00,
                type: '项目支出',
                profit: false
            },
            {
                id: 4,
                title: '差旅费用',
                date: '2018-10-21 11:23',
                user: '李思明',
                money: 6000.00,
                type: '项目支出',
                profit: false
            },
        ],
        // 支出
        totalOutlay: null,
        financeOutlayList: [],
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
                    clickEvent:'projectInfo'  
                },
                {
                    title:'文件管理',
                    clickEvent:'projectInfo'  
                },
                {
                    title:'财务数据',
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
    this._getProjectInfo()
   
    this._getFileTypeList()
    this.getprojectfinancial()
    this.getCustomerList()
    this.getDeptemp()
    this.getfilelist()
    
  },
  mounted() {
      this.getOutlay()
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

        
    },
    // 获取支出费用
    getOutlay() {
        let total = null,
            testArr = [],
            entertain = {
                money: null
            },
            travel = {
                money: null
            },
            office = {},
            salary = {},
            purchase = {},
            other = {};
        this.financeDetailList.forEach((item, index) => {
            switch (item.profit) {
                case false:
                    total += item.money;
                    switch (item.title) {
                case '招待公关':
                    entertain.title = item.title;
                    entertain.money += item.money;
                    break;
                case '差旅费用':
                    travel.title = item.title;
                    travel.money += item.money;
                    break;
                default:
                    break;
                }
                    break;
                default:
                    break;
            }

        })
            console.log('testArr:', testArr);
            this.financeOutlayList = [total, entertain];
            console.log('this.financeOutlayList:', this.financeOutlayList);
    },

    // 数组排序
    sortByKey(arr, key) {
        return arr.sort((a, b) => {
            let x = a[key];
            let y = b[key];
            return ((x<y) ? -1 :((x>y) ? 1 : 0));
        })
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
                    icon:'icon-bianji'
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
                        icon:'icon-bianji'
                    },{
                        title:'确认完成项目',
                        clickEvent:'updateprojectstatus',
                        icon:'icon-jia'
                    }
                ]
            }else{
                this.formulaList.right = [
                    {
                        title:'添加进度节点',
                        clickEvent:'addprojectrate',
                        icon:'icon-bianji'
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
                                icon:'icon-bianji'
                            },{
                                title:'确认完成项目',
                                clickEvent:'updateprojectstatus',
                                icon:'icon-jia'
                            }
                        ]
                    }else{
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-bianji'
                            }
                        ]
                    }
                }
                this.progressstatus = res.data.progressstatus
                this.ratelist = res.data.ratelist
            }else{
                this.$message.error(res.msg);
            }

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
            "updatedescribe":this.updatedescribe
        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('添加成功');
                this.addDialogVisible = false
                this.updatedescribe = ''
                this._getRateList()
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
        }

        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.financeInfo = res.data
                this.fprojectManage = res.data.fproject_manage
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //确认完成
    updateprojectstatus(){
        let reqBody = {
            "api": "updateprojectstatus",
            "id": this.$route.query.id,
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
            "uid":sessionStorage.getItem('userid'),

        }

        Axios(reqBody, 'project').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.getfilelist()
                this.fileList = []
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
    }
   
    
    
  
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .bid
        width 100%
        padding 10px 15px
        overflow hidden
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
                    background #66adff
                    border-radius 3px
                    padding 8px


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
</style>