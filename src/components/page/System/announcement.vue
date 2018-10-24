<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <div class="floatLeft leftBox clearfix">
                    <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                        <el-form-item >
                            <el-input v-model="searchData.antistop" placeholder="请输入项目名称或客户名称"></el-input>
                        </el-form-item>
                       
                        <el-form-item>
                            <div class="leftBtn btn">
                        
                                <span class="btnTitle">查询</span>
                            </div>
                        </el-form-item>
                    </el-form>
                    
                </div>
                <div class="floatRight rightBox clearfix">
                    <div class="rightBtn btn" v-for="(item,index) in formulaList.right" :key="index"   @click="getFormulaBar(item.clickEvent)">
                        <i class="iconfont marR5" :class="[item.icon]"></i>
                        <span class="btnTitle">{{item.title}}</span>
                    </div> 
                </div>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10">
                <div class="pad20 bgWhite">
                    <!-- 投标文件开始 -->
                    <el-table
                        ref="multipleTable"
                        :data="tableData.list"
                        stripe
                        v-loading="loading"
                        align="center"
                        border
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        align="center"
                        width="55">
                        </el-table-column>
                   
                       
                        <el-table-column
                        prop="title"
                        label="公告标题"
                        
                        align="center"
                        show-overflow-tooltip>
                        
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="发布时间"
                        align="center"
                        width="180">
                        </el-table-column>
                        
                        <el-table-column
                        prop=""
                        label="发布人"
                        align="center"
                        width="140">
                         
                        </el-table-column>
                        <el-table-column
                        prop="starttime"
                        label="上线时间"
                        align="center"
                        width="180">
                   
                        </el-table-column>
                        <el-table-column
                        prop="endtime"
                        label="下线时间"
                        align="center"
                        width="180">
                        
                        </el-table-column>
                            
                       
                        <el-table-column
                        fixed="right"
                        label="操作"
                        width="280"
                        align="center">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" content="查看" placement="top-end">
                                    <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                    <el-button type="success" icon="el-icon-edit"  @click="_getProjectInfo(scope.row)" ></el-button>
                                </el-tooltip>

                                <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                    <el-button type="danger" icon="el-icon-delete" @click="deletetenderdocument(scope.row.id)"></el-button>
                                </el-tooltip>
                               
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 投标文件结束 -->

                </div>
                <!-- 分页 -->
                <div class="pagination" v-if="tableData">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    @current-change="pagingChange"
                    layout="prev, pager, next"
                    :total="tableData.total">
                    </el-pagination>
                </div>

               
            </div>
        </div>


        <el-dialog 
        :visible.sync="noticeVisible"
        width="60%"
        class=""
        fullscreen
        >
            <div class="noticeTitle">{{atNotice.title}}</div>
            <div class="noticeContent">{{atNotice.content}}</div>

        </el-dialog>
        
        <el-dialog 
        :title="compileType==0?'新建公告':'编辑公告'"
        :visible.sync="compileVisible"
        width="60%"
        class=""
        fullscreen
        >
        <div class="compileBox">
            <el-form  label-width="80px">
                <el-form-item label="公告标题" :show-message='false' :required='true'>
                    <el-input v-model="compileData.title"></el-input>
                </el-form-item>
                <el-form-item label="上线时间" :show-message='false' :required='true'>
                    <el-date-picker v-model="compileData.starttime" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="上线时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="下线时间" :show-message='false' :required='true'>
                     <el-date-picker v-model="compileData.endtime" value-format="yyyy-MM-dd HH:mm:ss"  type="datetime" placeholder="下线时间"></el-date-picker>
                </el-form-item>
            </el-form>
        </div>
            

        </el-dialog>

    </div>
    
</template>
<script>
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'

import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息



export default {
  
  data () {
    return {
        loading:false,
        searchData:{
            antistop:'',
            area:'',
            principal:''
        },
        tableData: [],
        multipleSelection: [],
        pageSize:10,
        noticeVisible:false,
        compileVisible:false,
        compileType:0,
        compileData:{
            endtime:'',
            starttime:'',
            title:''
        },
        atNotice:{},
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit'
                }

            ],
            right:[
                {
                    title:'新建',
                    clickEvent:'new',
                    icon:'icon-bianji'
                }
            ]
        }
    }
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created () {
      this.getnoticemanagelist(1)
  },
  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
        if(res=='new'){
            this.compileType = 0
            this.compileVisible = true
            
        }else if(res=='export'){
           
        }
    },

    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //分页
    pagingChange(val){
        
    },
    //获取列表数据
    getnoticemanagelist(page){
        this.loading = true
        let reqBody = {
            "api": "getnoticemanagelist",
            "companyid": sessionStorage.getItem('companyid'),
            "page":page,
            "pagesize":this.pageSize
        }

        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //查看详情
    onDetails(row){
        this.atNotice = row
        this.noticeVisible = true
    }
    
    
    
  }
  
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">     
    .bid
        width 100%
        padding 10px 15px
        overflow hidden
        .operationBox
            height 52px
            background-color #fff
            padding 10px
            margin-bottom 10px
        .btn
            height 32px
            line-height 32px
            font-size 12px
            padding 0 15px
            border-radius 3px
            color #fff
            background-color #00AC97
            cursor pointer
            min-width 80px
            text-align center
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
        .el-dialog
            padding 0 40px
    .border
        border-color:#00AC97
    
    
    .el-dialog__wrapper
        padding 20px 0
        .compileBox
            width 100%
        .noticeTitle
            font-size 18px
            font-weight bold
            text-align center
            margin-bottom 40px
        .el-date-editor
            width 100%
</style>