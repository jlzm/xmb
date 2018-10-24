// 项目信息
<template>
<div class="projectInfoBox" v-if="infoData">
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目名称：</div>
        <div class="floatLeft infoItemContent">{{infoData.projectname}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">客户名称：</div>
        <div class="floatLeft infoItemContent">{{infoData.custmername}}</div>
    </div>
    <!-- <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">区域：</div>
        <div class="floatLeft infoItemContent">湖南省 长沙市 天心区</div>
    </div> -->
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">详情地址：</div>
        <div class="floatLeft infoItemContent">{{infoData.addressd}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目预算：</div>
        <div class="floatLeft infoItemContent">{{infoData.estimatedsum}}元</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">资金来源：</div>
        <div class="floatLeft infoItemContent">{{infoData.sumsource}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">预计招投标时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.estimatedtime}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">联系人：</div>
        <div class="floatLeft infoItemContent">{{infoData.linkman}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">联系电话：</div>
        <div class="floatLeft infoItemContent">{{infoData.linkmanphone}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目负责人：</div>
        <div class="floatLeft infoItemContent">{{infoData.staffname}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目状态：</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==0&&!bidType">跟进中</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==3&&!bidType">取消跟进</div>

        <div class="floatLeft infoItemContent" v-if="binState==0&&bidType">投标中</div>
        <div class="floatLeft infoItemContent" v-if="binState==1&&bidType">未中标</div>
        <div class="floatLeft infoItemContent" v-if="binState==2&&bidType">已中标</div>
        <div class="floatLeft infoItemContent" v-if="binState==3&&bidType">未投标</div>
       
       
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目概况：</div>
        <div class="floatLeft infoitemTextBox">{{infoData.projectdesc}}</div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['infoData','bidType','binState'],
    created(){
        
    },
    methods:{
        
    },
    watch: {
        'infoData':function(newData,oldData){
            this.data = newData
        },
        'binState':function(newData,oldData){
            this.data = newData
        }
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
