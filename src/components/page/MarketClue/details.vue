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
            <div class="marB20">
                <el-radio v-model="radioState" label="3">跟进中</el-radio>
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

        <el-dialog
        title="编辑销售线索"
        :visible.sync="newDialogVisible"
        width="45%"
        >
            <div class="newContent">
                <el-form ref="newMarketClue" :model="newMarketClue" label-width="140px">
                    <el-form-item label="项目名称：" :show-message='false' :required='true'>
                        <el-input v-model="newMarketClue.projectname"></el-input>
                    </el-form-item>
                    <el-form-item label="预计招投标时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.estimatedtime"
                        type="date"
                        value-format="yyyy-MM-dd "
                        format="yyyy-MM-dd "
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="项目预算金额：" :show-message='false' :required='true'>
                        <el-input type="number"  v-model="newMarketClue.estimatedsum"></el-input>
                        <span class="money">元</span>
                    </el-form-item>
                    <el-form-item label="项目资金来源：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.sumsourceid" placeholder="请选择">
                            <el-option :label="item.typename" :value="item.id" v-for="(item,index) in sumsourceList" :key="index"></el-option>
                          
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户信息：" :show-message='false' :required='true'>
                        <el-select v-model="newMarketClue.customerid" placeholder="请选择" @change="getAddressd">
                            <el-option v-for="(item,index) in customerList" :key="index" :label="item.custmername" :value="item.id"></el-option>
                            
                        </el-select>
                        <div class="">
                                <el-button type="success" icon="el-icon-edit" class="newCustmer" @click="newCustmer">新建</el-button>
                            </div>
                    </el-form-item>
                    <el-form-item label="所在地区：" :show-message='false' :required='true'>
                        <el-input disabled  v-model="newMarketClue.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人姓名：" :show-message='false' :required='true'>
                        <el-input  v-model="newMarketClue.linkman"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" :show-message='false' :required='true'>
                        <el-input type="number"  v-model="newMarketClue.linkmanphone"></el-input>
                    </el-form-item>
                    <el-form-item label="项目概况：">
                        <el-input type="textarea" :autosize="{ minRows: 8, maxRows: 30}" v-model="newMarketClue.projectdesc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
                <el-button @click="newDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="_confirmEvent">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog
        title="添加客户信息"
        :visible.sync="newCustmerVisible"
        width="30%"
        >
            <div>
                <el-form  label-width="100px" class="demo-ruleForm" style="padding-right:60px">
                    <el-form-item label="客户名称" :show-message='false' :required='true'>
                        <el-input v-model="newCustmerData.custmername"></el-input>
                    </el-form-item>
                    <el-form-item label="客户地址" :show-message='false' :required='true'>
                        <el-input :disabled="newCustmerData.latitude?false:true"  v-model="newCustmerData.addressd"></el-input>
                        <i class="mapIcon"  @click="mapVisible = true">
                            <img src="static/img/mapIcon.png" alt="">
                        </i>
                    </el-form-item>
                
                </el-form>
            
                
            </div>
            <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
                <el-button @click="newCustmerVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCustmer">确 定</el-button>
            </span>
        </el-dialog>
        <v-map :mapVisible="mapVisible" :mapVal="mapVal" @closeVisible="closeVisible" @confirmVal="confirmVal"  v-if="mapVisible"></v-map>

    </div>
</template>

<script>
import vFormulaBar from '../../common/FormulaBar.vue';
import vParticularsTab from '../../common/ParticularsTab.vue';
import vProjectInfo from '../../common/ProjectInfo.vue';
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
import vMap from '../../common/Map.vue';  //地图
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
                    limits:true,
                    
                },
                {
                    title:'更改项目状态',
                    clickEvent:'changeState',
                    icon:'icon-bianji',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.save,
                    bgColor:'bg4C97FF'
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
        },
        newDialogVisible:false,

        newMarketClue:{
            projectname:'',
            estimatedsum:'',
            sumsource:'',
            estimatedtime:'',
            customerid:'',
            linkman:'',
            linkmanphone:'',
            projectdesc:'',
            address:'',
            sumsourceid:""
            
        },
        customerList:[],
        sumsourceList:[],
        newCustmerVisible:false,
        mapVisible:false,
        mapVal:{},
        thatThreadId : '',
        newCustmerData:{
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        },
    }
  },
  components:{
    vFormulaBar,vParticularsTab,vProjectInfo
  },
  created(){
    this._getSellThreadInfo()
    this._getCustomerList()
    this._getSumsource()
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
        this.newDialogVisible = true     
        let sellThread = this.threadInfo.sellThread
        let newMarketClue = {
            projectname:sellThread.projectname,
            estimatedsum:sellThread.estimatedsum,
            sumsource:sellThread.sumsource,
            estimatedtime:sellThread.estimatedtime,
            customerid:sellThread.customerid,
            linkman:sellThread.linkman,
            linkmanphone:sellThread.linkmanphone,
            projectdesc:sellThread.projectdesc,
            address:sellThread.addressd,
            sumsourceid:sellThread.sumsourceid
            
        }
        this.newMarketClue = newMarketClue
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
        }else if(this.radioState==3){
            reqBody = {
                "api": "updatesellthreadstatus1",
                "threadid": pitchChangeDialog.id,
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
        
    },
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
    //资金来源列表
    _getSumsource(){
        let reqBody = {
            "api": "getsumsource",
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
     //获取地址
    getAddressd(res){
        console.log(res)
        for(let i=0;i<this.customerList.length;i++){
            if(res == this.customerList[i].id){
                this.newMarketClue.address = this.customerList[i].addressd
                break;
            }
        }
    },
    newCustmer() {
        this.newCustmerVisible = true
        this.newCustmerData={
            custmername:'',
            addressd:'',
            longitude:'',
            latitude:'',
        }
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
            "longitude":this.newCustmerData.longitude,
            "latitude":this.newCustmerData.latitude,
            "companyid":sessionStorage.getItem('companyid'),
            "custmername": this.newCustmerData.custmername,
            "addressd": this.newCustmerData.addressd,
        }

        Axios(reqBody, 'user').then((res) => {
            console.log(res)
            if (res.state == 10001) {
                this.$message.success('添加成功')
                this.newCustmerVisible = false
                this._getCustomerList()
                
            } else {
                
            }
        })
    },
    //地图相关
    closeVisible(mapVisible){
        console.log(mapVisible)
        this.mapVisible = mapVisible
    },
    confirmVal(mapVal){
        this.mapVisible = false
        console.log(mapVal)
        this.newCustmerData.addressd = mapVal.address
        this.newCustmerData.longitude = mapVal.lng
        this.newCustmerData.latitude = mapVal.lat
        this.mapVal = {
            lng:mapVal.lng,
            lat:mapVal.lat,
            address:mapVal.address,
        }
    },

    _confirmEvent(){
            let newMarketClue = this.newMarketClue
            let reqBody = {}
            
            if(!newMarketClue.projectname || !newMarketClue.estimatedsum ||!newMarketClue.sumsourceid  ||!newMarketClue.linkmanphone ||!newMarketClue.linkman ||!newMarketClue.estimatedtime || !newMarketClue.customerid){
                this.$message.error('请填写完整信息')
                return false
            }
            reqBody = {
                "api": "updatesellthread",
                "projectname": newMarketClue.projectname,
                "estimatedsum":newMarketClue.estimatedsum,
                "sumsource": newMarketClue.sumsource,
                "estimatedtime": newMarketClue.estimatedtime,
                "customerid": newMarketClue.customerid,
                "linkman": newMarketClue.linkman,
                "linkmanphone": newMarketClue.linkmanphone,
                "threadid":this.$route.query.threadid,
                "userid": sessionStorage.getItem('userid'),
                "projectdesc": newMarketClue.projectdesc,
                "sumsourceid":newMarketClue.sumsourceid
            }
            
            
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.newDialogVisible = false
                    this._getSellThreadInfo()
                }else{
                    this.$message.error(res.msg);
                }
            })
            console.log(this.newMarketClue)
    },
    
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
    .newContent
        padding-right 100px
        .el-date-editor,.el-select
            width 100%
        .el-form-item
            position relative
        .money
            position absolute
            top 0
            right -20px
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
        
    
</style>