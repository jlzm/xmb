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
                            <div ref="progress" >
                                <div :style="'margin-left:'+progressTextLeft+'px'" class="progressText" ref="progressText">
                                    <div v-if="fProjectManage.status==1">
                                        <div class="marB5">项目启动历时{{rateData.currentdays}}天</div>
                                        <div>距离完成剩余{{rateData.remainingdays}}天</div>
                                    </div>
                                    <div v-if="fProjectManage.status==0">
                                        <div class="marB5">该项目已完成</div>
                                    </div>
                                    
                                </div>
                                <div class="progressBox" :style="'padding: 0px '+progressBoxPad+'px'">
                                    <el-progress :stroke-width="10" :percentage="this.progressVal" :show-text="false"></el-progress>
                                </div>
                                <div class="clearfix progressTime" :style="'padding: 0px '+progressBoxPad+'px 40px'">
                                    <div class="floatLeft">
                                        <div class="marB5">项目启动时间</div>
                                        <div>{{fProjectManage.projectstarttime1}}</div>
                                    </div>
                                    <div class="floatRight endTime">
                                        <div class="marB5">项目结束时间</div>
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
         console.log(this.$refs.progressText.offsetWidth)
    },
  methods:{
    getFormulaBar(res){
        this.updatedescribe = ''
        this.addDialogVisible = true
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
                    this.formulaList.right = [{
                    title:'添加进度节点',
                    clickEvent:'addprojectrate',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).project.add
                }]
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
    
  },
  computed: {
    // 一个计算属性的 
    progressTextLeft () {
        let Width =  this.progressWidth - this.progressTextWidth -20
        let marLeft = Width * this.progressVal /100
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
       
        margin 20px 0
    }
    .progressText
        display inline-block
        font-size 14px
        color #666
        min-width 110px
    .progressTime
        font-size 14px
        color #666
    .endTime
        text-align right 
</style>