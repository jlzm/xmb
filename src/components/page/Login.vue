<template>
    <div class="login-wrap">
        
        <div class="ms-login">
            <div class="formBox">
                <div class="ms-title">项目宝</div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入账号">
                            <i slot="prefix" class="userNameIcon">
                                <img src="static/img/User.png"  alt="">
                            </i>
                        </el-input>
                        
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="onLogin('ruleForm')">
                            <i slot="prefix" class="userNameIcon">
                                 <img src="static/img/Key.png"  alt="">
                            </i>
                        </el-input>
                        
                    </el-form-item>
                    <div class="login-btn">
                        <el-button  @click="onLogin('ruleForm')">登录</el-button>
                    </div>
                    
                </el-form>
            </div>
            
        </div>
    </div>
</template>

<script>
    import {Axios} from './../../api/axios'
    
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            onLogin(){
                if(!this.ruleForm.username){
                    this.$message.error('请输入账号!');
                    return false;
                }else if(!this.ruleForm.password){
                     this.$message.error('请输入密码!');
                    return false;
                }
                let reqBody = {
                     "api": "accountLogin",
                    "phone": this.ruleForm.username,
                    "password": this.ruleForm.password,
                    
                }
                Axios(reqBody,'user').then((res) => {
                    console.log(res)
                   
                    if(res.state==10001){
                        this.$message.success('登录成功')
                        sessionStorage.setItem('userid',res.data.userid)
                        sessionStorage.setItem('companyid',res.data.companyid)
                        sessionStorage.setItem('ms_username',res.data.username)
                        sessionStorage.setItem('fauths',JSON.stringify(res.data.fauths))
                        sessionStorage.setItem('userportrait',res.data.userportrait)
                        let jurisdiction = {}
                        let limits ={}
                        if(!res.data.fauths){
                            this.$router.replace({ 
                                path: '/announcement',                
                        
                            })
                            return false
                        }
                        for(let i=0;i<res.data.fauths.length;i++){
                            jurisdiction[res.data.fauths[i].modular] = res.data.fauths[i]
                            limits[res.data.fauths[i].modular] = res.data.fauths[i].alllimits
                            console.log(limits[res.data.fauths[i].modular])
                        }
                        sessionStorage.setItem('limits',JSON.stringify(limits))
                        sessionStorage.setItem('jurisdiction',JSON.stringify(jurisdiction))
                        let pathRedirect = ''
                        let fauths = JSON.parse(sessionStorage.getItem('fauths'))
                        for (let i = 0; i < fauths.length; i++) {
                            if (fauths[i].modular == 'sellthreacd') {
                            pathRedirect = '/marketClue'
                            break
                            } else if (fauths[i].modular == 'bin') {
                            pathRedirect = '/bid'
                            break
                            }
                            else if (fauths[i].modular == 'sellanalysis') {
                            pathRedirect = '/marketAnalyze'
                            break
                            }
                            else if (fauths[i].modular == 'project') {
                            pathRedirect = '/project'
                            break
                            }
                            else if (fauths[i].modular == 'rate') {
                            pathRedirect = '/schedule'
                            break
                            }
                            else if (fauths[i].modular == 'file') {
                            pathRedirect = '/document'
                            break
                            }
                            else if (fauths[i].modular == 'purchase') {
                            pathRedirect = '/purchase'
                            break
                            }
                            else if (fauths[i].modular == 'workorder') {
                            pathRedirect = '/afterSale'
                            break
                            }
                            else if (fauths[i].modular == 'finance') {
                            pathRedirect = '/finance'
                            break
                            }
                            


                        }
                        if(!pathRedirect){
                            pathRedirect = '/announcement'
                        }
                        this.$router.replace({ 
                            path: pathRedirect,                
                        
                        })
                       
                        
                    }else{
                        this.$message.error(res.msg);
            }
                   
                })
            }
        }
    }
</script>

<style scoped>
    
    .ms-title{
        margin-bottom: 74px;
        text-align: center;
        font-size:30px;
        color: #3b93f3;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:560px;
        height: 520px;
        transform:translate(-50%,-50%);
        
        border-radius: 5px;
        background: rgba(255,255,255,.4);
        padding:10px;
    }
    
    .formBox{
        width: 100%;
        height: 100%;
        background: #FFF;
        border-radius: 5px;
        padding:40px;
    }
    .login-btn{
        margin-top: 70px;
        height: 60px;
        text-align: center;
        border-radius: 6px;
        
    }
    .login-btn button{
        width:100%;
        height: 60px;
        border-radius: 6px;
        font-size: 24px;
        background: #3b93f3;
        color:#fff;
    }
    .ms-login .el-form-item{
        height: 60px;  
        margin-bottom: 24px;  
        
    }
    
    .userNameIcon{
        display: inline-block;
        width: 26px;
        height: 26px;
        margin-top: 17px;
    }
</style>