//导航栏组件
<template>
    <div class="sidebar">
        <!-- :default-active="onRoutes" -->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes"   :collapse="collapse" background-color="#222d32"
            text-color="#bfcbd9" unique-opened>  
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <router-link  v-for="(subItem,i) in item.subs" :to="subItem.index" :key="subItem.index">
                        <el-menu-item :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
                <template v-else>
                    <router-link :to="item.index" :key="item.index">
                    <el-menu-item :index="item.index" :key="item.index">
                        <i class="iconfont" :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                    </router-link>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
    import bus from '../common/bus';
    export default {
        data () {
            return {
                collapse: false,
                // items: [
                //             {
                //                 icon: 'icon-047stack',
                //                 index: '2',
                //                 title: '项目管理',
                //                 subs: [
                //                     {
                //                         index: 'marketClue',
                //                         title: '销售线索'
                //                     },
                //                     {
                //                         index: 'bid',
                //                         title: '招投标阶段'
                //                     },
                //                     {
                //                         index: 'marketAnalyze',
                //                         title: '销售分析'
                //                     },
                //                     {
                //                         index: 'project',
                //                         title: '项目管理'
                //                     },
                //                     {
                //                         index: 'schedule',
                //                         title: '进度管理'
                //                     },
                //                     {
                //                         index: 'document',
                //                         title: '文档管理'
                //                     },
                //                     {
                //                         index: 'purchase',
                //                         title: '采购管理'
                //                     },
                //                     {
                //                         index: 'afterSale',
                //                         title: '售后工单'
                //                     },
                //                     { 
                //                         index: 'finance',
                //                         title: '财务分析'
                //                     }
                //                 ]
                //             },
                //             {
                //                 icon: 'icon-daiban',
                //                 index: '0',
                //                 title: '待办',
                //                 subs:[
                //                     {
                //                         index: 'backlog',
                //                         title: '我的待办'
                //                     },
                //                     {
                //                         index: 'emit',
                //                         title: '我发出的'
                //                     },
                //                     {
                //                         index: 'conference',
                //                         title: '会议纪要'
                //                     },
                                    
                //                 ]
                //             },
                //             {
                //                 icon: 'icon-daiban',
                //                 index: '5',
                //                 title: '基础数据管理',
                //                 subs:[
                //                     {
                //                         index: 'purchaseType',
                //                         title: '采购类别'
                //                     },
                //                     {
                //                         index: 'folder',
                //                         title: '文件夹'
                //                     },
                //                     {
                //                         index: 'expenditure',
                //                         title: '支出类别'
                //                     },
                //                   {
                //                         index: 'sourceOfFunds',
                //                         title: '资金来源'
                //                     },
                //                     {
                //                         index: 'meetingType',
                //                         title: '会议类型'
                //                     },
                //                   {
                //                         index: 'customerManagement',
                //                         title: '客户管理'
                //                     },
                                    
                                    
                //                 ]
                //             },
                //             {
                //                 icon: 'icon-shezhi',
                //                 index: '1',
                //                 title: '系统设置',
                //                 subs:[
                //                     {
                //                         index: 'addressBook',
                //                         title: '企业通讯录'
                //                     },
                //                     {
                //                         index: 'role',
                //                         title: '角色管理'
                //                     },
                //                     {
                //                         index: 'account',
                //                         title: '申请账号'
                //                     },
                                    
                                    
                //                 ]
                //             },
                            
                //         ],
                items:[
                    {
                        icon: 'icon-047stack',
                        index: '2',
                        title: '项目管理',
                        subs: [
                            
                        ]
                    },
                    {
                        icon: 'icon-daiban',
                        index: '0',
                        title: '待办',
                        subs:[
                            {
                                index: 'backlog',
                                title: '我的待办'
                            },
                            {
                                index: 'emit',
                                title: '我发出的'
                            },
                            {
                                index: 'conference',
                                title: '会议纪要'
                            },
                            
                        ]
                    },
                    {
                            icon: 'icon-daiban',
                            index: '5',
                            title: '基础数据管理',
                            subs:[
                                

                            ]
                         },
                    {
                        icon: 'icon-shezhi',
                        index: '1',
                        title: '系统设置',
                        subs:[
                           
                            {
                                index: 'announcement',
                                title: '企业通知公告'
                            },
                            
                        ]
                    },
                ]
            }
        },
        computed:{
            
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.setItems()
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
            
            },
            setItems(){
                if(!sessionStorage.getItem('fauths')){
                    return false
                }
                let fauths = sessionStorage.getItem('fauths')
                fauths = JSON.parse(fauths)
                for(let i=0;i<fauths.length;i++){
                    if(fauths[i].modular=='database'){
                         this.items[2] = {
                            icon: 'icon-daiban',
                            index: '5',
                            title: '基础数据管理',
                            subs:[
                                {
                                    index: 'purchaseType',
                                    title: '采购类别'
                                },
                                {
                                    index: 'folder',
                                    title: '文件夹'
                                },
                                {
                                    index: 'expenditure',
                                    title: '支出类别'
                                },
                            {
                                    index: 'sourceOfFunds',
                                    title: '资金来源'
                                },
                                {
                                    index: 'meetingType',
                                    title: '会议类型'
                                },
                            {
                                    index: 'customerManagement',
                                    title: '客户管理'
                                },

                            ]
                         }
                    }else if(fauths[i].modular=='role'){
                        this.items[3].subs.push({
                            index: 'role',
                            title: '角色管理'
                        })
                    }else if(fauths[i].modular=='deptemp'){
                        this.items[3].subs.unshift({
                            index: 'addressBook',
                            title: '企业通讯录'
                        })
                    }else{
                        if(fauths[i].modular=='sellthreacd'){
                            this.items[0].subs.push({
                                index: 'marketClue',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='bin'){
                            this.items[0].subs.push({
                                index: 'bid',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='sellanalysis'){
                            this.items[0].subs.push({
                                index: 'marketAnalyze',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='project'){
                            this.items[0].subs.push({
                                index: 'project',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='rate'){
                            this.items[0].subs.push({
                                index: 'schedule',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='file'){
                            this.items[0].subs.push({
                                index: 'document',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='purchase'){
                            this.items[0].subs.push({
                                index: 'purchase',
                                title: fauths[i].authname
                            })
                        }else if(fauths[i].modular=='workorder'){
                            this.items[0].subs.push(
                                {
                                    index: 'afterSale',
                                    title: fauths[i].authname
                                }
                            ) 
                        }else if(fauths[i].modular=='finance'){
                            this.items[0].subs.push(
                                {
                                    index: 'finance',
                                    title: fauths[i].authname
                                }
                            ) 
                        }
                    }
                }
                
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.el-submenu .el-menu
    border:0
.sidebar 
    display: block
    position: absolute
    left: 0
    top: 52px
    width: 200px
    bottom: 0
    background-color: #222d32
</style>