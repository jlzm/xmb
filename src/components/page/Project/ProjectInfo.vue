// 项目信息
<template>
<div class="projectInfoBox" v-if="infoData" >
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目名称：</div>
        <div class="floatLeft infoItemContent">{{infoData.projectname}}</div>
    </div>

    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">合同签订时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.bargaintime1?infoData.bargaintime1:'待填写'}}</div>
    </div>

    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目启动时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.projectstarttime1?infoData.projectstarttime1:'待填写'}}</div>
    </div>

    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">约定完工时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.appointedtime1?infoData.appointedtime1:'待填写'}}</div>
    </div>

    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">合同签订金额：</div>
        <div class="floatLeft infoItemContent">{{infoData.bargainsum?infoData.bargainsum+'元':'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">应收总金额：</div>
        <div class="floatLeft infoItemContent">{{infoData.returnedmoney?infoData.returnedmoney+'元':'待填写'}}</div>
    </div>

    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">客户名称：</div>
        <div class="floatLeft infoItemContent">{{infoData.custmername?infoData.custmername:'待填写'}}</div>
    </div>
    
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">详情地址：</div>
        <div class="floatLeft infoItemContent">{{infoData.addressd?infoData.addressd:'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">联系人：</div>
        <div class="floatLeft infoItemContent">{{infoData.linkman?infoData.linkman:'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">联系电话：</div>
        <div class="floatLeft infoItemContent">{{infoData.linkmanphone?infoData.linkmanphone:'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目经理：</div>
        <div class="floatLeft infoItemContent">{{infoData.staffname?infoData.staffname:'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目组成员：</div>
        <div class="floatLeft infoItemContent"> <span v-if="servicelist.length>0" v-for="(item,index) in servicelist" :key="index">{{item.staffname}}<span v-if="index!=servicelist.length-1">，</span></span> <span v-if="servicelist<=0">待填写</span></div>
    </div>
    
    <div class="infoItem clearfix">
        <div class="infoItemTitle floatLeft">项目概况：</div>
        <div class="infoitemTextBox floatLeft">{{infoData.describe?infoData.describe:'待填写'}}</div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['infoData','servicelist'],
    created(){
        
    },
    methods:{
        
    },
    watch: {
        'infoData':function(newData,oldData){
            this.data = newData
            
        },
        'servicelist':function(newData,oldData){
            this.data = newData
            
        },
        
    }   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
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
            width 366px
            min-height 140px
            line-height 25px
            margin-left 20px
            font-size 14px
    
</style>
