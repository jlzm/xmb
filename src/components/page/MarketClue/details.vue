<template>
    <div class="marketClue">
        <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
        </v-formulaBar> 
        <div class="contentBox clearfix">
            <div class="leftBox leftBox554">
                <!-- 标题Tab开始 -->
                <v-particularsTab :particularsTabList="leftTabList" @returnCutTab="getCutTab"></v-particularsTab>
                <!-- 标题Tab结束 -->
                <!-- 项目信息开始 -->
                <v-projectInfo :infoData="threadInfo.sellThread"></v-projectInfo>     
                <!-- 项目信息结束 -->          

            </div>
            <div class="floatLeft rightBox554">
                <div class="rightContentBox">
                    <!-- 标题Tab开始 -->
                    <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>
                    <!-- 标题Tab结束 -->
                    <div class="pad10" v-if="threadInfo.sellThreadRates&&threadInfo.sellThreadRates.length>0">
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
                        </div>

                    </div>
                    <div class="pad20"  v-if="threadInfo.sellThreadRates&&threadInfo.sellThreadRates.length<=0">
                        <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                        <div class="notText">暂无跟进记录</div>
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
                <el-radio v-model="radioState" label="1">转入招投标</el-radio>
            </div>
            <div>
                <el-radio v-model="radioState" label="2">取消跟进</el-radio>
            </div>
            
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="changeDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeConfirm">确 定</el-button>
        </span>
        </el-dialog>

    </div>
</template>

<script>
import vFormulaBar from '../../common/FormulaBar.vue';
import vParticularsTab from '../../common/ParticularsTab.vue';
import vProjectInfo from '../../common/ProjectInfo.vue';
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
export default {
  
  data () {
    return {
        threadInfo:{},
        addDialogVisible:false,
        changeDialogVisible:false,
        record:'',
        radioState:'1',
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.save
                } 
            ],
            right:[
                {
                    title:'添加跟进记录',
                    clickEvent:'addRecord',
                    icon:'icon-jia',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.add
                },
                {
                    title:'更改项目状态',
                    clickEvent:'changeState',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.save
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
                
            ]
        }
    }
  },
  components:{
    vFormulaBar,vParticularsTab,vProjectInfo
  },
  created(){
    this._getSellThreadInfo()
  },
  methods:{
    getFormulaBar(res){
        
        if(res=='compile'){
            this.onCompile()
        }else if(res=='addRecord'){
            this.addDialogVisible = true
        }else if(res=="changeState"){
            this.changeDialogVisible = true
        }
    },
    getCutTab(res){
        console.log(res)
    },
    onCompile(){
        this.$router.push({ 
            path: 'newMarket',                
            query:{
                threadid:this.$route.query.threadid
            }
        })
    },
    //获取详情
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
    //更改状态
    changeConfirm(){
        let reqBody={}
        if(this.radioState==1){
            reqBody = {
                "api": "addbin",
                "projectname": this.threadInfo.sellThread.projectname,
                "sellid":this.$route.query.threadid,

            }

        }else if(this.radioState==2){
            reqBody = {
                "api": "updatesellthreadstatus",
                "threadid": this.$route.query.threadid,

            }
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('更改成功');
                this.changeDialogVisible = false
                if(this.radioState==1){
                    this.$router.push({ 
                        path: 'bid',                
                        
                    })
                }
                
            }else{
                this.$message.error(res.msg);
            }

        })
        
    }
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .marketClue
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
    .notAvailable
        display block
        margin 140px auto
        width 200px
        height 247px
        
    
</style>