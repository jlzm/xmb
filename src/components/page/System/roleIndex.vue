<template>
    <div class="wrapper">       
    <div class="content">
        <transition name="el-fade-in-linear" mode="out-in">
            <keep-alive>
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
    </div>
      
    </div>
</template>
<script>
    
    import bus from '../../common/bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            
        },
        created(){
           
        },
        computed: {
            key() {
                return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.el-submenu .el-menu
    border:0
        

</style>
