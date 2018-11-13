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
                            <div  ref="progress">
                                
                                <div :style="'left:'+progressTextLeft+'px'" class="progressText" ref="progressText">
                                    <div  v-if="fProjectManage.status==1">
                                        <div v-if="rateData.remainingdays>=0">
                                            <div class="marB5">项目启动历时<span class="dayStyle">{{rateData.currentdays}}</span>天</div>
                                            <div >距离完成剩余<span class="dayStyle">{{rateData.remainingdays}}</span>天</div>
                                        </div>
                                        <div v-else>
                                            <div class="marB5">项目启动历时<span class="dayStyle dayOverdueStyle">{{rateData.currentdays}}</span>天</div>
                                            <div >项目已逾期<span class="dayStyle dayOverdueStyle">{{-rateData.remainingdays}}</span>天</div>
                                        </div>
                                        

                                    </div>
                                    <div v-if="fProjectManage.status==0">
                                        <div  v-if="rateData.remainingdays>=0">
                                            <div class="marB5">项目启动历时<span class="dayStyle">{{rateData.currentdays}}</span>天</div>
                                            <div class="marB5"><span class="timeIcon"></span><span>{{fProjectManage.finishtime}}</span></div>
                                        </div>
                                        <div  v-else>
                                            <div class="marB5">项目启动历时<span class="dayStyle dayOverdueStyle">{{rateData.currentdays}}</span>天</div>
                                            <div class="marB5">项目逾期<span class="dayStyle dayOverdueStyle">{{-rateData.remainingdays}}</span>天完成</div>
                                            <div class="marB5"><span class="timeIcon"></span><span>{{fProjectManage.finishtime}}</span></div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div class="progressBox" >
                                    
                                    <div class="progressbar-box">
                                        <div class="progressbar">
                                            <div class="progressbar-line" :class="rateData.remainingdays>=0?'':'overdue'" :style="'width:'+this.progressVal+'%'">
                                                <span class="progressbar-icon"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="clearfix progressTime" >
                                    <div class="floatLeft">
                                        <div class="marB5">项目启动时间</div>
                                        <div>{{fProjectManage.projectstarttime1}}</div>
                                    </div>
                                    <div class="floatRight endTime">
                                        <div class="marB5">约定完工时间</div>
                                        <div>{{fProjectManage.appointedtime1}}</div>
                                    </div>
                                </div>

                                
                            </div>
                            <!-- 进度查看开始 -->
                            <div class="invitationBox">
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
        fProjectManage:{},
        rateData:{},
        updatedescribe:'',
        addDialogVisible:false,
        progressVal:0,
        progressWidth:0,
        progressTextWidth:0,
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
            tabTitle:'基本信息',
            tabActive:0,
            icon:'icon-jibenxinxi',
            item:[
                {
                    title:'项目信息',
                    clickEvent:'projectInfo',
                    
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
                    title:'进度查看',
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
    this._getRateList()
    
  },
  mounted(){
        this.progressTextWidth = this.$refs.progressText.offsetWidth
        this.progressWidth = this.$refs.progress.offsetWidth
         console.log(this.$refs.progress.offsetWidth-17)
    },
  methods:{
    getFormulaBar(res){
        if(res=='addprojectrate'){
            this.updatedescribe = ''
            this.addDialogVisible = true
        }else if(res=='updateprojectstatus'){
            this.updateprojectstatus()
        }
        
    },
    getCutTab(res){
        console.log(res)
        this.tabListIndex = res.index
    },
  
   
    //获取详情
    _getProjectInfo(){
        let reqBody = {
            "api": "getprojectinfo",
            "id": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.projectInfo = res.data
                
                if(res.data.project_manage.status==0){
                    this.formulaList.right = []
                }else{
                    if(this.projectInfo.isrp==2){
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-jia',
                                limits:true
                            }
                        ]
                    }else{
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-jia',
                                limits:true
                            },{
                                 title:'确认完成',
                                clickEvent:'updateprojectstatus',
                                icon:'icon-wancheng',
                                bgColor:'bg4C97FF',
                                limits:true
                            }
                        ]
                    }
                }
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //进度列表
    _getRateList(){
        let reqBody = {
            "api": "getratedetails",
            "projectid": this.$route.query.id,
            "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody,'project').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.ratelist = res.data.ratelist
                this.rateData = res.data
                this.fProjectManage = res.data.fProject_manage
                if(res.data.currentdays<=res.data.allday&&res.data.currentdays!=0){
                    this.progressVal = res.data.currentdays/res.data.allday*100
                }else if(res.data.currentdays<=res.data.allday&&res.data.currentdays==0){
                    this.progressVal = 0
                }else{
                    this.progressVal = 100
                }
                
                if(res.data.fProject_manage.status==0){
                    this.formulaList.right = []
                }else{
                    if(this.projectInfo.isrp==2){
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-jia',
                                limits:true
                            }
                        ]
                    }else{
                        this.formulaList.right = [
                            {
                                title:'添加进度节点',
                                clickEvent:'addprojectrate',
                                icon:'icon-jia',
                                limits:true
                            },{
                                title:'确认完成',
                                clickEvent:'updateprojectstatus',
                                icon:'icon-wancheng',
                                bgColor:'bg4C97FF',
                                limits:true
                            }
                        ]
                    }
                }
            }else{
                this.$message.error(res.msg);
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
            "companyid":sessionStorage.getItem('companyid'),
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
                this._getRateList()
                this.$message.success('更新成功');
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    
  },
  computed: {
    // 一个计算属性的 
    progressTextLeft () {
        
        let Width =  this.progressWidth-17-140
        let marLeft = (Width * this.progressVal /100)+70
        return marLeft
    },
    progressBoxPad(){
        let pad = this.progressTextWidth/2
        return pad
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .bid
        width 100%
        padding 10px 15px
        overflow hidden
    .progressBox{
        padding 0 70px
        margin 12px 0
    }
    .progressText
        text-align center
        position relative
        display inline-block
        font-size 14px
        color #666
        transform:translateX(-50%)
        .dayStyle
            font-size 20px
            color #409EFF
            font-weight bold
            margin 0 2px
        .dayOverdueStyle
            color #F33B3B
        .timeIcon
            display inline-block
            width 14px
            height 14px
            background  url('../../../../static/img/do_complete.png')  
            background-size 100% 100%
            vertical-align middle
            margin-right 6px

    .progressTime
        text-align center
        padding 0 10px 40px
        font-size 14px
        color #666
    // .endTime
    //     text-align right 
    
    // 
    .progressbar-box
        position relative
        .progressbar
            position relative
            height 10px
            border-radius 100px
            background-color #ebeef5
            width 100%
            position relative
            vertical-align middle
            .progressbar-line
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                background-color: #409EFF;
                text-align: right;
                border-radius: 100px;
                line-height: 1;
                .progressbar-icon
                    position: absolute
                    right 0
                    top -4px
                    display inline-block
                    width 18px
                    height 18px
                    background  url('../../../../static/img/progressbarIcon.png')  
            .overdue
                background-color:#F33B3B;
                .progressbar-icon
                    position: absolute
                    right 0
                    top -4px
                    display inline-block
                    width 18px
                    height 18px
                    background  url('../../../../static/img/overdueIcon.png')  
            
</style>    