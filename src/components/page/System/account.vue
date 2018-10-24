<template>
    <div class="account">
        <div class="bgWhite">
            <div class="applyBox">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="公司名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="所在区域">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form.name" type="number"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认申请</el-button>
                    
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
        
        

    </div>
    
</template>
<script>





export default {
  
  data () {
    return {
        form:{
            name:''
        }
    }
  },
  
  components:{
   
  },
  created(){
      
  },
  methods:{
    onSubmit(){

    }
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .account
        padding:10px 15px
        
        .applyBox
            width 30%
            padding:60px 20px
            min-height 700px
    
</style>