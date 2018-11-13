<template>
    <div class="clearfix">
        <div class="listBox ">
           
            <div class="contentBox clearfix">
                <div class="detailItem" v-for="(item,index) in purchaseArr" :key="index">
                    <div class="detailItemTitle clearfix marB15">采购明细（{{index+1}}） <div class="floatRight pointer" @click="delPurchaseArr(index)">删除</div></div>
                    <div>
                        <el-form :ref="purchaseArr[index]" :model="purchaseArr[index]" label-position="left" label-width="80px" >
                            <el-form-item label="采购项目" :show-message='false' :required='true'>
                                <el-select v-model="purchaseArr[index].pid" placeholder="请选择采购项目">
                                    <el-option :label="_item.projectname" :value="_item.id" v-for="(_item,_index) in projectList" :key="_index"></el-option>
                                
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购类别" :show-message='false' :required='true'>
                                <el-select v-model="purchaseArr[index].typeid1" placeholder="请选择采购类别">
                                    <el-option :label="item_.typename" :value="item_.id" v-for="(item_,index_) in purchaseTypeList" :key="index_"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购金额" :show-message='false' :required='true'>
                                <el-input v-model="purchaseArr[index].money" class="number" placeholder="请选择采购金额" type="number"></el-input>元
                            </el-form-item>
                        </el-form>
                    </div>
                </div>

                <div class="textCenter marB15">
                    <el-button type="primary" icon="el-icon-plus" @click="addPurchaseArr">添加明细</el-button>
                </div>

                <div class="clearfix marB15">
                    <div class="floatLeft addVoucherTitle">添加图片</div>
                    <div class="floatLeft addVoucherContent">
                        <el-upload
                        :action="imageUrl"
                        
                        multiple
                        list-type="picture-card"
                        :limit="9"
                        :on-exceed="handleExceed"
                        :on-remove = "handleRemoveImg"
                        :on-success="handleSuccessImg"
                     
                        >
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </div>
                </div>  
                <div class="clearfix marB15">
                    <div class="floatLeft addVoucherTitle">上传附件</div>
                    <div class="floatLeft addVoucherContent">
                        <el-upload
                        multiple
                        class="upload-demo"
                        :action="exportUrl"
                        :on-change="handleChange"
                        :on-remove = "handleRemove"
                        :file-list="fileList"
                        :on-success="handleSuccess"
                        >
                        <el-button size="small" type="primary">点击上传</el-button>
                        
                        </el-upload>
                    </div> 
                </div>  

                <div class="clearfix marB15">
                    <div class="floatLeft addVoucherTitle">备注信息</div>
                    <div class="floatLeft addVoucherContent">
                        <el-input type="textarea"  v-model="remark"  :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </div>
                </div>  

            </div>
             <span slot="footer" class="dialog-footer">
                <el-button @click="visible">取 消</el-button>
                <el-button type="primary" @click="addpurchase">确 定</el-button>
            </span>
        </div>
       
    </div>
</template>
<script>


import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

export default {
  
  data () {
    return {
        tabListIndex:0,
        purchaseArr:[
            {
                pid:'',
                typeid1:'',
                money:''
            }
            
        ],
        projectList:[],
        purchaseTypeList:[],
        fileList:[],
        addPurchaseData:{
            file:[],
            purchaseurl:'',
            remark:'',
            
        },
        remark:'',
        imageUrl:Session.exportUrl+'saveImage',
        exportUrl:Session.exportUrl+'saveFile',
        imagepc:'',
        multipleSelection: [],
    
        
    }
  },
  components:{
    
  },
  created () {
      this.getpurchaseprojectlist()
      this.getpurchasetypelist()
     
    
  },
  methods:{

    visible(){
        this.$emit('onVisible',false)
    },
  
   
    handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
    },
   
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //图片上传处理
    handleRemoveImg(file, fileList) {
        this.imagepc = ''
        console.log(fileList)
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                if(this.imagepc){
                    this.imagepc = this.imagepc+','+fileList[i].response.fileUrl
                }else{
                    this.imagepc  = fileList[i].response.fileUrl
                }
            }
        }
    },
    handleSuccessImg(response, file, fileList){
        if(file.response){
            if(this.imagepc){
                this.imagepc = this.imagepc+','+file.response.fileUrl
            }else{
                this.imagepc  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    handleExceed(files, fileList) {
        this.$message.warning(`最多选择9张图片`);
    },

    handleSuccess(response, file, fileList){
        console.log(fileList);
        let fileObj = {
            fileurl:response.fileUrl,
            filename:response.fileName,
            filesize:response.filesize
        }
        this.addPurchaseData.file.push(fileObj)
    },
    handleRemove(file, fileList) {
        console.log(fileList);
        this.addPurchaseData.file=[]
       
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                let fileObj = {
                    fileurl:fileList[i].response.fileUrl,
                    filename:fileList[i].response.fileName,
                    filesize:fileList[i].response.filesize
                }
                this.addPurchaseData.file.push(fileObj)

            }
        }
    },


    
   
    

    addPurchaseArr(){
        this.purchaseArr.push({
                pid:'',
                typeid1:'',
                money:''
            })
    },
    delPurchaseArr(idx){
        if(this.purchaseArr.length<=1){
            
            this.$message.error('最少需要一条明细')
            return false
        }
        this.purchaseArr.splice(idx,1)
        console.log(this.purchaseArr)
    },
    //采购项目列表
    getpurchaseprojectlist(){
        let reqBody = {
            "api": "getpurchaseprojectlist",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": ""
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.projectList = res.data
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //采购类别列表
    getpurchasetypelist(){
        let reqBody = {
            "api": "getpurchasetypelist",
            "companyid": sessionStorage.getItem('companyid'),
            
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.purchaseTypeList = res.data
                
            }else{
                this.$message.error(res.msg);
            }

        })
    },
    //新增
    addpurchase(){
        if(!this.purchaseArr[0].pid || !this.purchaseArr[0].typeid1 || !this.purchaseArr[0].money ){
            this.$message.error('请填写完整信息')
            return false
        }
        let reqBody =  {
            "api": "addpurchase",
            "purchase":this.purchaseArr,
            "passmanid": sessionStorage.getItem('userid'),
            "file":this.addPurchaseData.file,
            "purchaseurl": this.addPurchaseData.purchaseurl,
            "remark": this.remark,
            "companyid": sessionStorage.getItem('companyid'),
            "imagepc":this.imagepc
        }

        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('新建成功')
                this.$emit('newPurchase',true)
                
            }else{
                this.$message.error(res.msg);
            }

        })
    }
    
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .bid
        width 100%
        padding 10px 15px
        overflow hidden
        .contentBox
            width 700px
            border:1px soldi #ddd
            background-color #fff
            padding 20px
            font-size 14px
            .detailItem
                padding-bottom 10px
                margin-bottom 15px
                border-bottom 2px solid #ccc
                &:last-of-type
                    border-bottom 0
                .el-select
                    width 100%
                .pointer
                    color #409EFF
        .addVoucherTitle
            width 80px
        .addVoucherContent
            width 580px
        .projectInfoBox
            padding 20px
            .infoItem
                margin-bottom 15px
                .infoItemTitle
                    width 128px
                    line-height 25px
                    text-align right 
                    font-size 14px
                    font-weight bold
                .infoItemContent
                    width 386px
                    line-height 25px
                    font-size 14px
                    padding-left 20px
                .infoitemTextBox
                    min-height 100px
                    padding 10px
                    margin-top 20px
                    font-size 14px
                    background-color #f9f9f9
                
    .number 
        width 540px
        margin-right 20px
    .dialog-footer
        float right
</style>