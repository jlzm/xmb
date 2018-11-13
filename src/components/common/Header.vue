// 头部组件
<template>
    <div class="header">
        <div class="logo">项目宝</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                
                <!-- 消息中心 -->
                
                <!-- 用户头像 -->
                <div class="user-avator"><img v-lazy="{src:userportrait,error:'static/img/portrait.png'}"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userName}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  command="userDetail" >个人中心</el-dropdown-item>
                        <el-dropdown-item  command="setPassword">修改密码</el-dropdown-item>
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

        <el-dialog
        title="个人中心"
        :visible.sync="userDetailVisible"
        width="30%"
        >
            <div >
               
                <el-row class="marB20">
                    <el-col :span="6" ><div class="userDetailTitle">姓名：</div></el-col>
                    <el-col :span="18"><div class="fsize14">{{userInfo.username}}</div></el-col>
                </el-row>
                <el-row class="marB20">
                    <el-col :span="6" ><div class="userDetailTitle">手机：</div></el-col>
                    <el-col :span="18"><div class="fsize14">{{userInfo.userphone}}</div></el-col>
                </el-row>
                <el-row class="marB30">
                    <el-col :span="6" ><div class="userDetailTitle">公司：</div></el-col>
                    <el-col :span="16"><div class="fsize14">{{userInfo.companyname}}</div></el-col>
                </el-row>
                <el-row class="marB20">
                    <el-col :span="6" ><div class="userDetailTitle"></div></el-col>
                    <el-col :span="16"><div class="fsize14"> <el-button type="primary" @click="getCompile">修改资料</el-button></div></el-col>
                </el-row>
            </div>
        </el-dialog>

        <el-dialog
        title="编辑个人资料"
        :visible.sync="compileVisible"
        width="30%"
        >
            <div >
                <el-row class="marB20 lineHeight" >
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>姓名：</div></el-col>
                    <el-col :span="14"><div class="fsize14"><el-input v-model="userInfo.username" placeholder="请输入姓名"></el-input></div></el-col>
                </el-row>
                <el-row class="marB20 lineHeight">
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>手机：</div></el-col>
                    <el-col :span="14"><div class="fsize14"><el-input v-model="userInfo.userphone" type="number" placeholder="请输入姓名"></el-input></div></el-col>
                </el-row>
                <el-row class="marB20 lineHeight" v-if="userphone!=userInfo.userphone">
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>验证码：</div></el-col>
                    <el-col :span="9"><div class="fsize14"><el-input v-model="verificationcode" type="number" placeholder="请输入验证码"></el-input></div></el-col>
                    <el-col :span="4" :offset="1"><div class="fsize14"> <el-button type="primary" :disabled="!codeBtn" class="codeBtn" @click="getCode">{{codeText}}</el-button></div></el-col>
                </el-row>
                <el-row class="marB30 lineHeight">
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>公司：</div></el-col>
                    <el-col :span="14">
                        <div class="fsize14">
                            <el-select v-model="userInfo.companyid" placeholder="请选择">
                                <el-option :label="item.companyname" :value="item.companyid" v-for="(item,index) in myCompany" :key="index"></el-option>
                            </el-select>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
                <el-button @click="compileVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveUserDetail">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
        title="修改密码"
        :visible.sync="passwordVisible"
        width="30%"
        >
            <div >
                <el-row class="marB20 lineHeight" >
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>旧密码：</div></el-col>
                    <el-col :span="14"><div class="fsize14"><el-input v-model="oldPassword"  placeholder="请输入旧密码"></el-input></div></el-col>
                </el-row>
                <el-row class="marB20 lineHeight">
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>新密码：</div></el-col>
                    <el-col :span="14"><div class="fsize14"><el-input v-model="password" type="password" placeholder="请输入新密码"></el-input></div></el-col>
                </el-row>
                <el-row class="marB20 lineHeight">
                    <el-col :span="6" ><div class="userDetailTitle"><font color="red">* </font>确认新密码：</div></el-col>
                    <el-col :span="14"><div class="fsize14"><el-input v-model="newPassword" type="password" placeholder="请确认新密码"></el-input></div></el-col>
                </el-row>
           
            </div>
             <span slot="footer" class="dialog-footer newCustmer-dialog-footer">
                <el-button @click="passwordVisible = false">取 消</el-button>
                <el-button type="primary" @click="passwordModify">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
.header
    position: relative
    height: 52px
    background-color: #4c97ff
    color:#fff
    font-size: 22px
    .logo
        float: left
        width: 200px
        line-height: 52px
        text-align :center
        

</style>

<script>
    import {Axios} from './../../api/axios'
    import {Session} from './../../api/axios'
    import bus from '../common/bus';
    let t 
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                userDetailVisible:false,
                compileVisible:false,
                passwordVisible:false,
                
                userName: sessionStorage.getItem('ms_username'),
                message: 2,
                userportrait:sessionStorage.getItem('userportrait'),
                verificationcode:'',
                userphone:'',
                companyid:'',
                userInfo:{},
                codeText:'获取验证码',
                codeBtn:true,
                myCompany:[],
                oldPassword:'',
                newPassword:'',
                password:'',
            }
        },
        computed:{
            username(){
                let username = sessionStorage.getItem('ms_username');
                
                return username ? username : this.name;
            }
        },
        methods:{
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                if(command == 'loginout'){
                    sessionStorage.removeItem('companyid')
                    sessionStorage.removeItem('userid')
                    sessionStorage.removeItem('ms_username')
                    sessionStorage.removeItem('fauths')
                    sessionStorage.removeItem('limits')
                    sessionStorage.removeItem('jurisdiction')
                    sessionStorage.removeItem('userportrait')
                    
                    
                    this.$router.replace('/login');
                }else if(command == 'userDetail'){
                    
                    this.getUserDetail()
                }else if(command == 'setPassword'){
                    this.oldPassword = ''
                    this.newPassword = ''
                    this.password = ''
                    this.passwordVisible = true
                }
            },
            //获取个人资料
            getUserDetail(){
                let reqBody = {
                    "api": "userdetail",
                    "userid": sessionStorage.getItem('userid'),
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.userInfo = res.data
                        this.companyid = res.data.companyid
                        this.userphone = res.data.userphone
                        this.userDetailVisible = true
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            //获取个人所在公司
            getCompile(){
                let reqBody = {
                    "api": "mycompanyid",
                    "userid": sessionStorage.getItem('userid'),
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.myCompany = res.data
                        this.compileVisible = true
                    }else{
                        this.$message.error(res.msg);
                    }
                })
                
            },
            getCode(){
                if(!this.userInfo.userphone){
                    this.$message.error('请输入手机号码');
                    return false
                }
                if(!this.codeBtn){
                    return false
                }
                let reqBody = {
                    "api": "sendverfictioncode",
                    "phone": this.userInfo.userphone,
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.$message.success('发送成功');
                        this.countDown()
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            countDown(reset){
                if(reset){
                    this.codeText = '获取验证码'
                    this.codeBtn = true
                    this.verificationcode = ''
                    clearInterval(t)
                    return false
                }else{
                    let time = 60
                    this.codeBtn = false
                    t = setInterval(() => {   
                        time -- 
                        if(time<=0){
                            this.codeText = '获取验证码'
                            this.codeBtn = true
                            clearInterval(t)

                        }else{
                            this.codeText = time+' s'
                        }
                    }, 1000);
                }
                
            },
            //修改个人资料
            setUserDetail(){
                let reqBody
                if(!this.userInfo.username){
                    this.$message.error('请填写姓名');
                    return false
                }else if(!this.userInfo.userphone){
                    this.$message.error('请填写手机号码');
                    return false
                }else if(!this.userInfo.companyid){
                    this.$message.error('请选择公司');
                    return false
                }

                if(this.userInfo.userphone!=this.userphone){
                    if(!this.verificationcode){
                        this.$message.error('请填写验证码');
                        return false
                    }
                    reqBody = {
                        "api": "submitmyprofile",
                        "userid": sessionStorage.getItem('userid'),
                        "verificationcode":this.verificationcode,
                        "userphone":this.userInfo.userphone,
                        "username":this.userInfo.username,
                        "companyid" :this.userInfo.companyid
                    }
                }else{
                    reqBody = {
                        "api": "submitmyprofile",
                        "userid": sessionStorage.getItem('userid'),
                        "username":this.userInfo.username,
                        "companyid" :this.userInfo.companyid
                    }
                }
                
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.$message.success('修改成功');
                        this.countDown(true)
                        sessionStorage.setItem('ms_username',this.userInfo.username);
                        sessionStorage.setItem('companyid',this.userInfo.companyid);
                        this.userName = this.userInfo.username
                        this.compileVisible = false
                        this.getUserDetail()
                        if(this.companyid!=this.userInfo.companyid){
                           this.$router.go(0)
                        }
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            saveUserDetail(){
                if(this.companyid!=this.userInfo.companyid){
                    this.switchCompany()
                }else{
                    this.setUserDetail()
                }
            },
            //切换公司
            switchCompany(){
                let reqBody = {
                    "api": "switchcompany",
                    "userid": sessionStorage.getItem('userid'),
                    "companyid" :this.userInfo.companyid
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.setUserDetail()
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },

            //修改密码
            passwordModify(){
                if(!this.oldPassword){
                    this.$message.error('请填写输入旧密码');
                    return false
                }else if(!this.password){
                    this.$message.error('请填写新密码');
                    return false
                }else if(!this.newPassword){
                    this.$message.error('请确认新密码');
                    return false
                }else if(this.password!=this.newPassword){
                    this.$message.error('密码不一致');
                    return false
                }else if(this.oldPassword==this.newPassword||this.oldPassword==this.password){
                    this.$message.error('新密码不能与旧密码一致');
                    return false
                }

                let reqBody = {
                    "api": "passwordModify",
                    "userid": sessionStorage.getItem('userid'),
                    "oldpassword":this.oldPassword,
                    "newpassword":this.password,
                    "newpassword2":this.newPassword
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                    if(res.state==10001){
                        this.$message.success('修改成功');
                        setTimeout(() => {
                            this.handleCommand('loginout')
                        }, 400);
                        
                    }else{
                        this.$message.error(res.msg);
                    }
                })
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        }
    }
</script>
<style scoped>
    
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 52px;
    }
   
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 52px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
    .el-select{
        width: 100%;
    }
    .userDetailTitle{
        font-size: 14px;
        text-align: right;
        padding-right: 20px;
    }
    .lineHeight{
        height: 32px;
    }
    .codeBtn{
        width: 100%;
    }
</style>
