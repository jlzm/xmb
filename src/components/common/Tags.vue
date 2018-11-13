//标签栏组件
<template>
    <div class="tags" v-if="showTags">
        <ul class="clearfix">
            <li class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item)}" :key="index">
                <router-link :to="item.path" class="tags-li-title">
                    {{item.title}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                    <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tagsList: []
            }
        },
        methods: {
            isActive(tagsItem) {
                
                return tagsItem.page.page === this.$route.meta.page;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];

                if (item) {
                    delItem.path === this.$route.path && this.$router.push(item.path);
                }else{
                    this.getPathRedirect()
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.getPathRedirect()
            },
            // 关闭其他标签
            closeOther(){ 
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.path;
                })
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                
                if(!route.meta.tags){
                    const isExist = this.tagsList.some(item => {
                        return item.path === '/'+route.meta.page;
                    })
                    
                    // !isExist && this.tagsList.unshift({
                    //     title: route.meta.title,
                    //     path: route.path,
                    //     page: route.meta
                    // })
                    return false
                }
                const isExist = this.tagsList.some(item => {
                    return item.path === route.path;
                })
                
                !isExist && this.tagsList.unshift({
                    title: route.meta.title,
                    path: route.path,
                    page: route.meta
                })
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            },
            getPathRedirect(){
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
                            pathRedirect = '/addressBook'
                        }
                        this.$router.replace({ 
                            path: pathRedirect,                
                        
                        })
                       
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                
                this.setTags(newValue);

            }
        },
        created(){
            this.setTags(this.$route);
        }
    }

</script>


<style>
    .tags {
        margin-top: 10px;
        padding-left: 10px;
        position: relative;
        
        overflow: hidden;
        padding-right: 120px;
        border-bottom:2px solid #4C97FF;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 36px;
        overflow: hidden;
    }

    .tags-li {
        float: left;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        font-size: 14px;
        overflow: hidden;
        cursor: pointer;
        height: 36px;
        line-height: 36px;
        margin-right: 2px;
        background: #CCCCCC;
        padding: 0 16px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
        background-color: #4C97FF;
    }

    .tags-li-title {
        float: left;
        
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
        height: 36px;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 36px;
        /* background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1); */
        z-index: 10;
    }
    .tags-li-icon{
       font-size: 16px;
    }
    .tags .el-dropdown{
        width: 100%;
    }
    .tags .el-button{
        width: 100%;
        height: 36px;
    }

</style>
