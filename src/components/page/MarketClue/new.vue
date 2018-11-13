<template>
    <div class="new">
        <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
        </v-formulaBar> 

        <div class="contentBox clearfix bgWhite padTb10">
            <div class="title">{{this.$route.query.threadid?'编辑销售线索':'新建销售线索'}}</div>
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
                        :picker-options="pickerOptions0"
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
        </div>
        
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
import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
import vMap from '../../common/Map.vue';  //地图
export default {
  
    data () {
        return {
            customerList:[],
            sumsourceList:[],
            newCustmerVisible:false,
            mapVisible:false,
            mapVal:{},
            newCustmerData:{
                custmername:'',
                addressd:'',
                longitude:'',
                latitude:'',
            },
            formulaList:{ //编辑栏按钮数
                parent:'marketClue',
                left:[
                    {
                        title:this.$route.query.threadid?'确定修改':'确定新建',
                        clickEvent:'compile',
                        icon:'icon-iconfontedit',
                        limits:this.$route.query.threadid?JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.save:JSON.parse(sessionStorage.getItem('jurisdiction')).sellthreacd.add
                    }

                ],
            },
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
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
        }
    },
    components:{
        vFormulaBar,vMap
    },
    created(){
        this._getCustomerList()
        this._getSumsource()
    },
    methods:{
        //FormulaBar点击事件
        getFormulaBar(res){
            console.log(res)
            if(res=='compile'){
                this._confirmEvent()
            }
        },
        getCutTab(res){
            console.log(res)
            this.tabListIndex = res.index
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
                    if(this.$route.query.threadid){
                        this._getSellThreadInfo()
                    }
                    
                }else{
                    this.$message.error(res.msg);
                }
                
                
            })
        },
        _confirmEvent(){
            let newMarketClue = this.newMarketClue
            let reqBody = {}
            if(this.$route.query.threadid){
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
            }else{
                if(!newMarketClue.projectname || !newMarketClue.estimatedsum ||!newMarketClue.sumsourceid  ||!newMarketClue.linkmanphone ||!newMarketClue.linkman ||!newMarketClue.estimatedtime || !newMarketClue.customerid){
                    this.$message.error('请填写完整信息')
                    return false
                }
               reqBody = {
                "api": "addsellthread",
                "projectname": newMarketClue.projectname,
                "estimatedsum":newMarketClue.estimatedsum,
                "sumsource": newMarketClue.sumsource,
                "estimatedtime": newMarketClue.estimatedtime,
                "customerid": newMarketClue.customerid,
                "linkman": newMarketClue.linkman,
                "linkmanphone": newMarketClue.linkmanphone,
                "companyid": sessionStorage.getItem('companyid'),
                "userid": sessionStorage.getItem('userid'),
                "projectdesc": newMarketClue.projectdesc,
                "sumsourceid":newMarketClue.sumsourceid
                }
            }
            
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message({
                        message: this.$route.query.threadid?'修改成功':'添加成功',
                        type: 'success'
                    })
                    this.$router.replace({ 
                        path: 'marketClue',                
                    })
                }else{
                    this.$message.error(res.msg);
                }
            })
            console.log(this.newMarketClue)
        },
        _getSellThreadInfo(){
            let reqBody = {
                "api": "getsellthreadinfo",
                "threadid": this.$route.query.threadid,
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    let sellThread = res.data.sellThread
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
        
    },
    
    computed:{
        
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .new
        width 100%
        padding 10px 15px
        overflow hidden
        .title
            padding 10px 0
            font-size 14px
            color #666
            border-bottom 2px solid #ccc
            margin 0 20px
        .newContent
            margin-left 20px
            padding 20px 0
            width 30%
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
