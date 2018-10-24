<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="el-fade-in-linear" mode="out-in">
                    <keep-alive>
                        <router-view :key="key"></router-view>
                    </keep-alive>
               </transition>
            </div>
        </div>
    </div>
</template>
<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from '../common/bus';
    export default {
        data(){
            return {
                collapse: false
            }
        },
        components:{
            vHead,vSidebar,vTags
        },
        created(){
           bus.$on('collapse', msg => {
                this.collapse = msg;
            })
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
