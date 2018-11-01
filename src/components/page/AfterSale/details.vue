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

                    <div class="projectInfoBox">
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">工单编号：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.wordorder}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">项目名称：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.projectname}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">客户名称：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.custmername}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">客户地址：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.addressd}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">联系人姓名：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.linkman}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">联系电话：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.linkphone}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">发起人：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.username}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">上门时间：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.gettime}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">紧急程度：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.flag==0?'一般':'紧急'}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">服务类型：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.servicetype==0?'免费':'收费'}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">服务人员：</div>
                            <div class="floatLeft infoItemContent">{{servicelist}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">完成状态：</div>
                            <div class="floatLeft infoItemContent">{{workorderInfo.workstatus==0?'进行中':'已完成'}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="infoItemTitle floatLeft">描述信息：</div>
                            <div class="infoitemTextBox floatLeft">{{workorderInfo.remark}}</div>
                        </div>
                    </div>

                </div>
                <div class="floatLeft rightBox554">
                    <div class="rightContentBox">
                        <!-- 标题Tab开始 -->
                        <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>

                       
                        <!-- 标题Tab结束 -->
                        <div class="pad10">

                            <!-- 跟进记录开始 -->
                            
                            <div v-show="tabListIndex==0" class="invitationBox">
                                <div class="pad20">
                                    <div class="stepsItem" v-for="(item,index) in workrateList" :key="index">
                                        <div>
                                            <i class="el-icon-circle-check-outline stepsIcon"></i><span class="stepsText">{{item.workservicename}}</span>
                                            <span class="stepsText" v-if="item.state==0"><span class="bgText">发起</span></span>
                                            <span class="stepsText" v-else-if="item.state==1"><span class="bgText">接受派单</span></span>
                                            <span class="stepsText" v-else-if="item.state==2"><span class="bgText">确认完成</span></span>
                                            <span class="stepsText" v-else-if="item.state==3"><span class="bgText">结束工单</span></span>
                                        </div>
                                        <div class="clearfix">
                                            <div class="floatLeft lineBox">
                                                <div class="line"></div>
                                            </div>
                                            <div class="floatLeft">
                                                <div class="fsize14 color666 marB15 marT5" v-if="item.state==0">发起任务成功</div>
                                                <div class="fsize14 color666 marB15 marT5" v-else-if="item.state==1">确认接受派单</div>
                                                <div class="fsize14 color666 marB15 marT5" v-else-if="item.state==2">确认完成工单</div>
                                                <div class="fsize14 color666 marB15 marT5" v-else-if="item.state==3">结束任务成功</div>
                                                <div class="fsize14 color666 marB10">{{item.createtime}}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                                

                            <!-- 投标准备开始 -->
                            <div v-show="tabListIndex==1" class="invitationBox">
                               <div class="pad20">
                                   <!-- 凭证列表项开始 -->
                                   <div class="voucherItem clearfix" v-for="(item,index) in proofList" :key="index">
                                       <div class="floatLeft">
                                           <div class="portrait">
                                               <img  :src="item.portrait" alt="">
                                           </div>
                                       </div>
                                       <div class="floatLeft imgBox">
                                           <div class="fsize14 fbold marB15">{{item.staffname}} <span class="marL20">{{item.createtime}}</span> </div>
                                           <div class="fsize14 color666 marB15">{{item.remark}}</div>
                                           <div class="voucherImgBox clearfix marB15" v-if="item.fileurl">
                                               <div class="voucherImgItem" v-for="(_item,_index) in item.fileurl.split(',')" :key="_index" @click="examinePicture(_item)">
                                                   <img :src="_item" alt="">
                                               </div>
                                               
                                           </div>
                                           <div class="fsize14 color999 marB15">{{item.serviceaddress}}</div>
                                       </div>
                                   </div>
                                   <!-- 凭证列表项结束 -->
                                   
                               </div>
                               <div class="pad20"  v-if="proofList.length<=0">
                                    <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                    <div class="notText">暂无完成凭证</div>
                                </div>
                            </div>
                            <!-- 投标准备结束 -->
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <el-dialog
        title="添加凭证"
        :visible.sync="dialogVisible"
        width="40%"
        >
        <div id="voucher">
            <div class="clearfix marB20">
                <div class="floatLeft addVoucherTitle">描述信息<font color="red">*</font></div>
                <div class="floatLeft addVoucherContent">
                    <el-input type="textarea" v-model="upVoucher.remark" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
                </div>
            </div>
            <div class="clearfix">
                <div class="floatLeft addVoucherTitle">添加图片</div>
                <div class="floatLeft addVoucherContent">
                    <el-upload
                    multiple
                    :data="uploadData"
                    :action="imageUrl"
                    :on-remove = "handleRemove"
                    :on-success="handleSuccess"
                    list-type="picture-card"
                    :file-list="imagelist"
                    :limit="9"
                    :on-exceed="handleExceed"
                     ref="upload">
                    <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addproof">确 定</el-button>
        </span>
        </el-dialog>


        <el-dialog
        title="编辑售后工单"
        :visible.sync="addDialogVisible"
        width="40%"
        >
        <div>
            <div class="newContent">
                <el-form ref="newMarketClue" :model="newMarketClue" label-width="140px">
                    <el-form-item label="项目名称：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.projectid" placeholder="请选择">
                            <el-option
                            v-for="(item,index) in purchaseProjectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="联系人姓名：" :show-message='false' :required='true'>
                        <el-input  v-model="newMarketClue.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：" :show-message='false' :required='true'>
                        <el-input  type="number" v-model="newMarketClue.linkphone"></el-input>
                    </el-form-item>
                    <el-form-item label="上门地址：" :show-message='false' :required='true'>
                        <el-input v-model="newMarketClue.projectaddress"></el-input>
                    </el-form-item>
                    <el-form-item label="上门时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.gettime"
                        type="datetime"
                        placeholder="选择上门时间"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="紧急程度：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.flag" placeholder="请选择">
                            <el-option label="一般 " value="0"></el-option>
                            <el-option label="紧急" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务类型：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.servicetype" placeholder="请选择">
                            <el-option label="免费" value="0"></el-option>
                            <el-option label="收费" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="服务人员：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.serviceid" multiple  placeholder="请选择">
                            <el-option
                            v-for="(item,index) in deptemp"
                            :key="index"
                            :label="item.staffname"
                            :value="item.userid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述信息：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="newMarketClue.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateCompile">确 定</el-button>
        </span>
        </el-dialog>

    </div>
    
</template>
<script>
import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab



import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'



export default {
  
  data () {
    return {
      
        imagelist:[],
        upVoucher:{
            fileurl:'',
            remark:''
        },
        imageUrl:Session.exportUrl+'saveImage',
        imagepc:'',
        uploadData:{

        },
        dialogVisible: false,
        addDialogVisible:false,
        newMarketClue:{
            projectid:'',
            projectaddress:'',
            linkman:'',
            linkphone:'',
            gettime:'',
            flag:'',
            servicetype:'',
            serviceid:'',
            remark:'',
            companyid:''
        },
        tabListIndex:0,
        workorderInfo:{},  //工单详情
        workrateList:[], //进度进程列表
        multipleSelection: [],
        proofList:[],
        purchaseProjectList:[],
        customerList:[],
        deptemp:[],
        servicelist:'',
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                
            ],
            right:[
                
            ]
        },
        leftTabList:{
            tabType:'leftTabList',
            tabTitle:'工单详情',
            tabActive:0,
            icon:'icon-jibenxinxi',
            
        },
        rightTabList:{
            tabType:'rightTabList',
            tabTitle:'关联数据',
            tabActive:0,
            icon:'icon-guanliangongnengliebiaoiconxuanzhong',
            item:[
                {
                    title:'工单进度',
                    clickEvent:'projectInfo'
                },
                {
                    title:'完成凭证',
                    clickEvent:'projectInfo'  
                },
                
            ]
        }
    }
  },
  components:{
    vFormulaBar,vParticularsTab
  },
  created(){
    this._getWorkorderInfo()
    this._getWorkrateList()
    this._getProofList()
  },
  methods:{
    getFormulaBar(res){
        if(res=='uploading'){
            this.imagepc = ''
            this.imagelist = []
            this.dialogVisible = true
        }else if(res=='reception'){
            this.addworkrate(0)
        }else if(res=='confirm'){
            this.addworkrate(1)
        }else if(res=='compile'){
            this.addDialogVisible = true
        }
        
        console.log(res)
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
    },
    
    //图片上传处理
    handleRemove(file, fileList) {
        this.imagepc = ''
        console.log(fileList)
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                if(this.imagepc){
                    this.imagepc = this.imagepc+','+fileList[i].response.fileUrl
                }else{
                    this.imagepc  = fileList[i].response.fileUrl
                }
            }
        }
    },
    handleSuccess(response, file, fileList){
        if(file.response){
            if(this.imagepc){
                this.imagepc = this.imagepc+','+file.response.fileUrl
            }else{
                this.imagepc  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    handleExceed(files, fileList) {
        this.$message.warning(`最多选择9张图片`);
    },
   
    /////////
    //售后工单详情
    _getWorkorderInfo(getDeptemp){
        let reqBody = {
            "api": "getworkorderinfo",
            "workorderid":this.$route.query.workorderid,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                if(!getDeptemp){
                     this._getCustomerList()
                    this._getDeptemp()
                    this._getPurchaseProjectList()
                }
               
                this.workorderInfo = res.data.workorderinfo
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.workorderinfo.projectid,
                }
                let serviceid = []
                let servicelist = ''
                for(let i=0;i<res.data.servicelist.length;i++){
                    serviceid.push(res.data.servicelist[i].userid)
                    if(servicelist){
                        servicelist = servicelist +','+res.data.servicelist[i].staffname
                    }else{
                        servicelist = res.data.servicelist[i].staffname
                    }
                }
                let newMarketClue = res.data.workorderinfo
                this.newMarketClue = {
                    "projectid":newMarketClue.projectid+'',
                    "projectaddress":newMarketClue.projectaddress,
                    "companyid":newMarketClue.custmerid,
                    "linkman":newMarketClue.linkman,
                    "userid":sessionStorage.getItem('userid'),
                    "linkphone":newMarketClue.linkphone,                                                                                    
                    "longitude":newMarketClue.longitude,
                    "latitude":newMarketClue.latitude,
                    "gettime":newMarketClue.gettime,
                    "flag":newMarketClue.flag+'',
                    "servicetype":newMarketClue.servicetype+'',
                    "serviceid":serviceid,
                    "remark":newMarketClue.remark
                }
                this.servicelist = servicelist
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //售后工单进度列表
    _getWorkrateList(){
        let reqBody = {
            "api": "getworkratelist",
            "workorderid":this.$route.query.workorderid,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                if(res.data.isworkservice==0){
                    this.formulaList.right = [
                        {
                            title:'上传凭证',
                            clickEvent:'uploading',
                            icon:'icon-iconfontedit',
                            limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                        },
                        {
                            title:'确认完成',
                            clickEvent:'confirm',
                            icon:'icon-jia',
                            limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                        }
                    ]
                    if(res.data.workstatus==1){
                        this.formulaList.left = [
                            
                        ]
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                            }
                        ]
                    }else{
                        this.formulaList.left = [
                            {
                                title:'编辑',
                                clickEvent:'compile',
                                icon:'icon-bianji',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                            }
                        ]
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                            }
                        ]
                        
                    }
                }else if(res.data.isworkservice==1){
                    if(res.data.isaccept==0){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                            },
                            {
                                title:'接受派单',
                                clickEvent:'reception',
                                icon:'icon-bianji',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                            }
                        ]
                    }else if(res.data.isaccept==1){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                            },
                                {
                                title:'确认完成',
                                clickEvent:'confirm',
                                icon:'icon-jia',
                                 limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                            }
                        ]
                    }else if(res.data.isaccept==2){
                        this.formulaList.right = [
                            
                        ]
                    }
                    if(res.data.workstatus==1){
                        this.formulaList.left = [
                           
                        ]
                        this.formulaList.right = [
                            
                        ]
                    }
                    
                }else if(res.data.isworkservice==2){
                    if(res.data.isaccept==1){
                        this.formulaList.right = [
                        {
                            title:'上传凭证',
                            clickEvent:'uploading',
                            icon:'icon-iconfontedit',
                            limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                        },
                        {
                            title:'确认完成',
                            clickEvent:'confirm',
                            icon:'icon-jia',
                            limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                        }
                        ]
                    }else if(res.data.isaccept==2){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.add
                            }
                        ]
                    }
                    if(res.data.workstatus==0){
                        this.formulaList.left = [
                            {
                                title:'编辑',
                                clickEvent:'compile',
                                icon:'icon-bianji',
                                limits:JSON.parse(sessionStorage.getItem('jurisdiction')).workorder.save
                            }
                        ]
                    }else{
                        this.formulaList.left = [
                           
                        ]
                    }
                    
                    
                }
                
            

                this.workrateList = res.data.workratelist
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //售后工单凭证
    _getProofList(){
        let reqBody = {
            "api": "getprooflist",
            "workid":this.$route.query.workorderid
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let proofList = res.data
                //proofList.fileurl.split(',')
                console.log(proofList)
                this.proofList = proofList
                
            }else{
                //this.$message.error(res.msg);
            }
        })
    },
    addproof(){
        if(!this.upVoucher.remark){
            this.$message.error('请填写描述')
            return false
        }
        let reqBody = {
            "api": "addproof",
            "workid": this.$route.query.workorderid,
            "serviceid": sessionStorage.getItem('userid'),
            "serviceaddress": "项目宝-电脑版",
            "remark": this.upVoucher.remark,
            "fileurl": "",
            "companyid":sessionStorage.getItem('companyid'),
            "imagepc":this.imagepc
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('上传成功');
                this.dialogVisible = false
                this.upVoucher={
                    fileurl:'',
                    remark:''
                }
                this._getProofList()
                
            }else{
                this.$message.error(res.msg);
            }
        })
       
    },
    addworkrate(state){
        let reqBody = {
            "api": "addworkrate",
            "workorderid": this.$route.query.workorderid,
            "workserviceid": sessionStorage.getItem('userid'),
            "state":state

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                state==1? this.$message.success('完成工单'): this.$message.success('接受工单成功');
                this._getWorkrateList()
                this._getWorkorderInfo()
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    examinePicture(url){
         this.$alert('<img class="bigImg" src='+url+'></img>', {
          dangerouslyUseHTMLString: true,
          showConfirmButton:false
        });
    },

    //获取项目列表
    _getPurchaseProjectList(){
        let reqBody = {
            "api": "getpurchaseprojectlist",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": ""

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.purchaseProjectList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //获取客户列表
    _getCustomerList(){
        let reqBody = {
            "api": "getcustomerlist",
            "companyid": sessionStorage.getItem('companyid'),
            

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.customerList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //获取部门的所有员工
    _getDeptemp(){
        let reqBody = {
            "api": "getdeptemp",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": "",
            "deptid":''
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.deptemp = res.data
                
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    updateCompile(){
        
        let newMarketClue = this.newMarketClue
        if(!newMarketClue.projectid || !newMarketClue.projectaddress || !newMarketClue.linkman || !this.$route.query.workorderid || !newMarketClue.linkphone || !newMarketClue.gettime || newMarketClue.serviceid.length<=0){
            this.$message.error('请填写完整信息')
            return false
        }
        let serviceid = ''
        let servicelist = newMarketClue.serviceid
        for(let i=0;i<servicelist.length;i++){
           if(serviceid){
               serviceid = serviceid + ',' + servicelist[i]
           }else{
               serviceid = servicelist[i]
           }
        }
        let reqBody = {
            "api": "updateworkorder",
            "projectid":newMarketClue.projectid,
            "projectaddress":newMarketClue.projectaddress,
            "companyid":sessionStorage.getItem('companyid'),
            "linkman":newMarketClue.linkman,
            "id":this.$route.query.workorderid,
            "linkphone":newMarketClue.linkphone,    
            "longitude":'0',
            "latitude":'0',
            "gettime":newMarketClue.gettime,
            "flag":newMarketClue.flag+'',
            "servicetype":newMarketClue.servicetype+'',
            "serviceid":serviceid,
            "remark":newMarketClue.remark

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success(res.msg);
                this.addDialogVisible=false,
                this._getWorkorderInfo(true)      
                
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
    .stepsIcon
        font-size 36px
        color #409EFF
        margin-right 20px
    .stepsText
        display inline-block
        line-height 36px
        vertical-align top
        font-size 14px
        margin-right 10px
        .bgText
            padding:2px 12px
            background-color #4c97ff
            color #fff
            border-radius 2px
    .stepsItem:last-child
        .lineBox
            .line
                width 0
    .lineBox
        width 36px
        margin-right 20px
        height 80px
        .line
            width 2px
            height 80px
            background-color #ddd
            margin 0 auto
    .voucherItem
        border-bottom 2px solid #eee
        margin-bottom 20px
        &:last-child
            border-bottom 0
        .portrait
            width 50px
            height 50px
            margin-right 20px
        .voucherImgItem
            float left
            width 100px
            height 100px
            margin-right 20px
            margin-bottom 20px
        .imgBox
            width 970px
    .addVoucherTitle
        width 10%
    .addVoucherContent
        width 90%
    .projectInfoBox
        padding 20px
        .infoItem
            margin-bottom 15px
            .infoItemTitle
                width 128px
                line-height 25px
                text-align right 
                font-size 14px
                font-weight bold
            .infoItemContent
                width 386px
                line-height 25px
                font-size 14px
                padding-left 20px
            .infoitemTextBox
                width 366px
                min-height 140px
                line-height 25px
                margin-left 20px
                font-size 14px
    .el-date-editor,.el-select
        width 100%
    
</style>