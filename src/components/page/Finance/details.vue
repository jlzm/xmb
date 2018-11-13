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
                            <div class="floatLeft infoItemTitle">支出项目：</div>
                            <div class="floatLeft infoItemContent">{{expenditureInfo.projectname}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">支出时间：</div>
                            <div class="floatLeft infoItemContent">{{expenditureInfo.expendituretime}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">支出金额：</div>
                            <div class="floatLeft infoItemContent">{{expenditureInfo.sum1}}元</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">支出类别：</div>
                            <div class="floatLeft infoItemContent">{{expenditureInfo.type}}</div>
                        </div>
                        <div class="infoItem clearfix">
                            <div class="floatLeft infoItemTitle">经手人：</div>
                            <div class="floatLeft infoItemContent">{{expenditureInfo.passman}}</div>
                        </div>
                        
                        <div class="infoItem clearfix">
                            <div class="infoItemTitle floatLeft">备注信息：</div>
                            <div class="infoitemTextBox floatLeft">{{expenditureInfo.remark}}</div>
                        </div>
                    </div>

                </div>
                <div class="floatLeft rightBox554">
                    <div class="rightContentBox">
                        <!-- 标题Tab开始 -->
                        <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>

                       
                        <!-- 标题Tab结束 -->
                        <div class="pad10" v-if="imgList.length>0">

                            <!-- 跟进记录开始 -->
                           <div class="voucherImgBox clearfix marB15">
                                <div class="voucherImgItem" v-for="(_item,_index) in imgList" :key="_index" @click="examinePicture(_item)">
                                    <img :src="_item" alt="">
                                </div>
                                               
                           </div>
                        </div>
                        <div class="pad10"  v-if="imgList.length<=0">
                            <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                            <div class="notText">暂无支出凭证</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <el-dialog title="编辑支出" :visible.sync="expendDialogVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="支出项目：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.projectid" placeholder="请选择支出项目">
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出类别：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.typeid" placeholder="请选择支出类别">
                            <el-option
                            v-for="(item,index) in sumsourceList"
                            :key="index"
                            :label="item.typename"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出金额：" :show-message='false' :required='true'>
                        <el-input v-model="newExpend.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        :action="imageUrl"
                        ref='upload'
                        :on-success="handleSuccess"
                        :multiple='true'
                        list-type="picture-card"
                        :file-list="expendImagelist"
                        :data="uploadData"
                        :on-remove="handleRemoveImg">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newExpend.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="expendDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateexpenditure">确 定</el-button>
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
        dialogVisible: false,
        expendDialogVisible:false,
        expendImagelist:[],
        sumsourceList:[],
        projectList:[],
        tabListIndex:0,
        imageUrl:Session.exportUrl+'saveImage',
        expenditureInfo:{},  //工单详情
        imgList:[], //进度进程列表
        imagepc:'',
        uploadData:{},
        proofList:[],
        newExpend:{
            projectid:'',
            typeid:'',
            sum:'',
            remark:'',
            images:'',
            imagestwo:''
        },
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).finance.save
                }
            ],
            right:[
           
            ]
        },
        leftTabList:{
            tabType:'leftTabList',
            tabTitle:'项目支出详情',
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
                    title:'支出凭证',
                    clickEvent:'projectInfo'
                }
                
                
            ]
        }
    }
  },
  components:{
    vFormulaBar,vParticularsTab
  },
  created(){
    sessionStorage.setItem('tabIndex',1)
    this._getExpenditureInfo()
    this._getSumsource()
    this._getPurchaseProjectList()
  },
  methods:{
    getFormulaBar(res){
        this.expendDialogVisible = true
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handleSuccess(response, file, fileList){
        if(file.response){
            if(this.newExpend.imagestwo){
                this.newExpend.imagestwo = this.newExpend.imagestwo+','+file.response.fileUrl
            }else{
                this.newExpend.imagestwo  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    //图片删除
    handleRemoveImg(file, fileList) {
        this.newExpend.images = ''
        this.newExpend.imagestwo = ''
        for(let i=0;i<fileList.length;i++){
            
            if(this.newExpend.imagestwo){
                if(fileList[i].response){
                    this.newExpend.imagestwo = this.newExpend.imagestwo+','+fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newExpend.imagestwo = this.newExpend.imagestwo+','+fileList[i].url
                }
            }else{
                if(fileList[i].response){
                    this.newExpend.imagestwo = fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newExpend.imagestwo = fileList[i].url
                }
            }
        }
        console.log(this.newExpend.imagestwo);
    },
    
    //项目支出详情
    _getExpenditureInfo(){
        let reqBody = {
            "api": "getexpenditureinfo",
            "id":this.$route.query.id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let images = []
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.projectid,
                }
                this.expenditureInfo = res.data
                this.imgList = res.data.images.split(',')
                for(let i=0;i<this.imgList.length;i++){
                    images.push({
                        url:this.imgList[i]
                    })
                    console.log(this.imgList[i])
                    
                }
                this.expendImagelist = images
                this.newExpend = {
                    projectid:res.data.projectid,
                    typeid:res.data.typeid,
                    sum:res.data.sum,
                    remark:res.data.remark,
                    images:'',
                    imagestwo:res.data.images
                }
  
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    //获取列表数据 -- 项目回款
    _getSumsource(){
        let reqBody = {
            "api": "getexpendituretype",
            "companyid": sessionStorage.getItem('companyid'),
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.sumsourceList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
    },
     
    //获取列表数据 -- 项目回款
    _getPurchaseProjectList(){
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
          
            
        })
    },
   
    
    updateexpenditure(){
        let newExpend = this.newExpend
        if(!newExpend.projectid || !newExpend.sum || !newExpend.typeid  ){

            this.$message.error('请填写完整信息');
            return false
        }
        console.log(this.newExpend)
        let reqBody = {
            "api": "updateexpenditure",
            "projectid": this.newExpend.projectid,
            "sum": this.newExpend.sum,
            "typeid": this.newExpend.typeid,
            "remark": this.newExpend.remark,
            "images": this.newExpend.images,
            "imagestwo": this.newExpend.imagestwo,
            "id":this.$route.query.id,

           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('修改成功')
                this.expendDialogVisible = false
                this._getExpenditureInfo()
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
    .voucherImgItem
        float left
        width 100px
        height 100px
        margin-right 20px
        margin-bottom 20px
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
                line-height 24px
                margin-left 20px
                font-size 14px
                min-height 140px
    .el-select,.el-date-editor
            width 100%
</style>