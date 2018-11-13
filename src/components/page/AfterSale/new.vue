<template>
    <div class="new">
        <div class="contentBox clearfix bgWhite padTb10">
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
                        <i class="mapIcon"  @click="mapVisible = true" >
                            <img src="static/img/mapIcon.png" alt="">
                        </i>
                    </el-form-item>
                    <el-form-item label="上门时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newMarketClue.gettime"
                   
                        placeholder="选择上门时间"
                        type="datetime"
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
            <el-button @click="visible">取 消</el-button>
            <el-button type="primary" @click="addworkorder">确 定</el-button>
        </span>
        <v-map :mapVisible="mapVisible" :mapVal="mapVal" @closeVisible="closeVisible" @confirmVal="confirmVal"  v-if="mapVisible"></v-map>
    </div>
</template>

<script>

import vMap from '../../common/Map.vue';  
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'
export default {
  
    data () {
        return {
            mapVisible:false,
            mapVal:{},
            purchaseProjectList:[],
            customerList:[],
            deptemp:[],
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
                companyid:'',
                longitude:'',
                latitude:''
            }
        }
    },
    components:{
        vMap
    },
    created(){
        this._getCustomerList()
        this._getDeptemp()
        this._getPurchaseProjectList()
    },
    methods:{
        visible(){
            this.$emit('onVisible',false)
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
                "longitude":newMarketClue.longitude,
                "latitude":newMarketClue.latitude,
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
                     this.$emit('newAfter',true)
                    
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

          //地图相关
        closeVisible(mapVisible){
            console.log(mapVisible)
            this.mapVisible = mapVisible
        },
        confirmVal(mapVal){
            this.mapVisible = false
            console.log(mapVal)
            this.newMarketClue.projectaddress = mapVal.address
            this.newMarketClue.longitude = mapVal.lng
            this.newMarketClue.latitude = mapVal.lat
            this.mapVal.address = mapVal.address
            this.mapVal.lng = mapVal.lng
            this.mapVal.lat = mapVal.lat
        }

        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .new
        width 100%
        
        overflow hidden
        .title
            padding 10px 0
            font-size 14px
            color #666
            border-bottom 2px solid #ccc
            margin 0 20px
        .newContent
            margin-left 20px
            padding-right 80px
            
            .el-date-editor,.el-select
                width 100%
    .mapBox
        background rgba(0,0,0,.5)
    .dialog-footer
        float right
</style>
