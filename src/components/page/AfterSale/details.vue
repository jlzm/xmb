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
                            <div class="floatLeft infoItemContent">进行中</div>
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
        tabListIndex:0,
        workorderInfo:{},  //工单详情
        workrateList:[], //进度进程列表
        multipleSelection: [],
        proofList:[],
        servicelist:'',
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
    _getWorkorderInfo(){
        let reqBody = {
            "api": "getworkorderinfo",
            "workorderid":this.$route.query.workorderid,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                
                this.workorderInfo = res.data.workorderinfo
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.workorderinfo.projectid,
                }
                let servicelist = ''
                for(let i=0;i<res.data.servicelist.length;i++){
                    if(servicelist){
                        servicelist = servicelist +','+res.data.servicelist[i].staffname
                    }else{
                        servicelist = res.data.servicelist[i].staffname
                    }
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
                            icon:'icon-iconfontedit'
                        },
                        {
                            title:'确认完成',
                            clickEvent:'confirm',
                            icon:'icon-jia'
                        }
                    ]
                }else if(res.data.isworkservice==1){
                    if(res.data.isaccept==0){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit'
                            },
                            {
                                title:'接受派单',
                                clickEvent:'reception',
                                icon:'icon-bianji'
                            }
                        ]
                    }else if(res.data.isaccept==1){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit'
                            },
                                {
                                title:'确认完成',
                                clickEvent:'confirm',
                                icon:'icon-jia'
                            }
                        ]
                    }else if(res.data.isaccept==2){
                        this.formulaList.right = [
                            
                        ]
                    }
                    
                }else if(res.data.isworkservice==2){
                    if(res.data.isaccept==1){
                        this.formulaList.right = [
                        {
                            title:'上传凭证',
                            clickEvent:'uploading',
                            icon:'icon-iconfontedit'
                        },
                        {
                            title:'确认完成',
                            clickEvent:'confirm',
                            icon:'icon-jia'
                        }
                        ]
                    }else if(res.data.isaccept==2){
                        this.formulaList.right = [
                            {
                                title:'上传凭证',
                                clickEvent:'uploading',
                                icon:'icon-iconfontedit'
                            }
                        ]
                    }

                    this.formulaList.left = [
                        {
                            title:'编辑',
                            clickEvent:'compile',
                            icon:'icon-bianji'
                        }
                    ]
                    
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
    }
    
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
    
</style>