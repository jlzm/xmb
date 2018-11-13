// 详情信息tab组件
<template>
    <div class="particularsTabBox clearfix">
        <div class="clearfix tabWrap">
            <div class="particularsTabItem particularsTabItemTitle">
                <i class="iconfont marR5" :class="[particularsTabList.icon]"></i>
                <span>{{particularsTabList.tabTitle}}</span>
            </div>
            <div v-for="(item,index) in particularsTabList.item" v-if="item.limits!=0" :key="index" class="particularsTabItem pointer" :class="[particularsTabList.tabActive==index?'activeTabItem':'']" @click="onCutTab(particularsTabList.tabType,index)">
                <i></i>
                <span>{{item.title}}</span>
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
    props: ['particularsTabList'],
    created(){
           
    },
    methods:{
        onCutTab(tabType,index){
            this.particularsTabList.tabActive=index
            this.$emit('returnCutTab', {tabType:tabType,index:index});
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .particularsTabBox
        border-bottom 1px solid #f4f4f4
        font-size 14px
        .particularsTabItemTitle
            font-weight bold
            span
                vertical-align middle
        .tabWrap
            margin-bottom -1px
            .particularsTabItem
                float left 
                height 40px
                line-height 40px
                padding 0 15px
                border-bottom 1px solid transparent
                border-left 1px solid transparent
                border-right 1px solid transparent
                &.activeTabItem
                    position relative
                    border-left 1px solid #f4f4f4
                    border-right 1px solid #f4f4f4
                    border-bottom 1px solid #fff
                    &:after
                        position absolute
                        content ''
                        top 0
                        left 0
                        width 100%
                        height 3px
                        background-color #4c97ff
            .pointer 
                padding 0 20px
</style>
