<template>
    <div class="new">
        <v-formulaBar :formulaList="formulaList" @formulaBarRoutes="getFormulaBar">
        </v-formulaBar> 

        <div class="contentBox clearfix bgWhite padTb10">
            <div class="title">新建售后工单</div>
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
                        <el-input type="number"  v-model="newMarketClue.linkphone"></el-input>
                    </el-form-item>
                     <el-form-item label="上门地址：" :show-message='false' :required='true'>
                        <el-input v-model="newMarketClue.projectaddress"></el-input>
                    </el-form-item>
                    <el-form-item label="上门时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.gettime"
                        type="datetime"
                        placeholder="选择上门时间"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd">
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
    </div>
</template>

<script>
import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
export default {
  
    data () {
        return {
            purchaseProjectList:[],
            customerList:[],
            deptemp:[],
            formulaList:{ //编辑栏按钮数
                parent:'marketClue',
                left:[
                    {
                        title:'确定新建',
                        clickEvent:'confirm',
                        icon:'icon-iconfontedit'
                    }

                ],
                
            },
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
            }
        }
    },
    components:{
        vFormulaBar
    },
    created(){
        this._getCustomerList()
        this._getDeptemp()
        this._getPurchaseProjectList()
    },
    methods:{
        getFormulaBar(res){
            console.log(res)
            if(res=='confirm'){
                this.addworkorder()
            }
        },
        getCutTab(res){
            console.log(res)
            this.tabListIndex = res.index
        },
        //新增
        addworkorder(){
            let newMarketClue = this.newMarketClue
            if(!newMarketClue.projectid || !newMarketClue.projectaddress || !newMarketClue.linkman || !newMarketClue.linkphone || !newMarketClue.gettime || !newMarketClue.flag ||newMarketClue.serviceid.length<=0 || !newMarketClue.servicetype ){
                this.$message.error('请填写完整信息');
                return false
            }
            let serviceid = ''
            for(let i=0;i<newMarketClue.serviceid.length;i++){
                if(serviceid){
                    serviceid = serviceid + ',' +newMarketClue.serviceid[i]
                }else{
                    serviceid = newMarketClue.serviceid[i]
                }
            }
            let reqBody = {
                "api": "addworkorder",
                "projectid":newMarketClue.projectid,
                "projectaddress":newMarketClue.projectaddress,
                "companyid":sessionStorage.getItem('companyid'),
                "linkman":newMarketClue.linkman,
                "userid":sessionStorage.getItem('userid'),
                "linkphone":newMarketClue.linkphone,                                                                                    
                "longitude":1111,
                "latitude":222,
                "gettime":newMarketClue.gettime,
                "flag":newMarketClue.flag,
                "servicetype":newMarketClue.servicetype,
                "serviceid":serviceid,
                "remark":newMarketClue.remark

            }
            console.log(reqBody)
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message({
                        message: '新建成功',
                        type: 'success'
                    })
                    this.$router.replace({ 
                        path: 'afterSale',                
                    })
                    
                }else{
                    this.$message.error(res.msg);
                }
            })
            
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
</style>
