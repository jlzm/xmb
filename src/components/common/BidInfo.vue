// 招投标信息
<template>
<div class="bidInfoBox" v-if="infoData">
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">项目名称：</div>
        <div class="floatLeft infoItemContent">{{infoData.projectname}}</div>
    </div>
    <!-- <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">客户名称：</div>
        <div class="floatLeft infoItemContent">中国能源建设集团湖南火电能源建设有限公司</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">区域：</div>
        <div class="floatLeft infoItemContent">湖南省 长沙市 天心区</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">详情地址：</div>
        <div class="floatLeft infoItemContent">雀圆路358号</div>
    </div> -->
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">投标状态：</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==0">投标中</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==1">未中标</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==2">已中标</div>
        <div class="floatLeft infoItemContent" v-if="infoData.state==3">未投标</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">投标预算金额：</div>
        <div class="floatLeft infoItemContent">{{infoData.bindsum?infoData.bindsum1+'元':'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">标书购买截止时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.binddocumenttime?infoData.binddocumenttime:'待填写'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">标书投递截止时间：</div>
        <div class="floatLeft infoItemContent">{{infoData.bindendtime?infoData.bindendtime:'待填写'}}</div>
    </div>
    <!-- <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">标书准备工作：</div>
        <div cla        ss="floatLeft infoItemContent"></div>
    </div> -->
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">标书购买：</div>
        <div class="floatLeft infoItemContent">{{infoData.binddocumentis==0?'准备中':'已完成'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">投标证书保证金缴纳：</div>
        <div class="floatLeft infoItemContent">{{infoData.bindsumis==0?'准备中':'已完成'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">商务标书：</div>
        <div class="floatLeft infoItemContent">{{infoData.businessbind==0?'准备中 ':'已完成'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">技术标书：</div>
        <div class="floatLeft infoItemContent">{{infoData.technologybindis==0?'准备中 ':'已完成'}}</div>
    </div>
    <div class="infoItem clearfix">
        <div class="floatLeft infoItemTitle">资质文件及授权：</div>
        <div class="floatLeft infoItemContent">{{infoData.authorizationis==0?'准备中 ':'已完成'}}</div>
    </div>
    
</div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['infoData'],
    created(){
        console.log(this.infoData)
    },
    methods:{
        
    },
    watch: {
        'infoData':function(newData,oldData){
            this.data = newData
            console.log(newData)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .bidInfoBox
        padding 20px
        .infoItem
            margin-bottom 15px
        .infoItemTitle
            width 140px
            line-height 25px
            text-align right 
            font-size 14px
            font-weight bold
        .infoItemContent
            width 374px
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
