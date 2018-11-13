// 编辑栏组件
<template>
    <div class="operationBox clearfix">
        <div class="floatLeft leftBox clearfix">
            <div class="leftBtn btn returnBtn" @click="returnPage">
                <i class="icon-fanhui1 iconfont marR5"></i>
                <span class="btnTitle">返回</span>
            </div>
            <div class="leftBtn btn" v-if="item.limits!=0&&item.limits" v-for="(item,index) in formulaList.left" :key="index" :class="item.bgColor"  @click="onFormulaBar(item.clickEvent)">
                <i class="iconfont marR5" :class="[item.icon]"></i>
                <span class="btnTitle">{{item.title}}</span>
            </div>
        </div>
        <div class="floatRight rightBox clearfix">
            <div class="rightBtn btn" v-if="item.limits!=0&&item.limits"  v-for="(item,index) in formulaList.right" :key="index" :class="item.bgColor"  @click="onFormulaBar(item.clickEvent)">
                <i class="iconfont marR5" :class="[item.icon]"></i>
                <span class="btnTitle">{{item.title}}</span>
            </div> 
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    props: ['formulaList'],
    created(){
           console.log(this.formulaList)
    },
    methods:{
        onFormulaBar(clickEvent){
            this.$emit('formulaBarRoutes', clickEvent);
        },
        returnPage(){
            
            this.$router.go(-1);//返回上一层
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .operationBox
        height 50px
        background-color #fff
        padding 10px
        margin-bottom 10px
        .btn
            height 30px
            line-height 30px
            font-size 12px
            padding 0 15px
            border-radius 3px
            color #fff
            background-color #00AC97
            cursor pointer
        .leftBtn
            float left
            margin-right 5px
        .rightBtn
            float left 
            margin-left 5px
        .returnBtn
            background-color #f4f4f4
            color #666
        .btnTitle
            vertical-align middle
        
</style>
