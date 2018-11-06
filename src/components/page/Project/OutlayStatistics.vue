<template>
    <div class="bid">
        <div class="listBox">
            <v-formulaBar :formulaList="formulaList">
                </v-formulaBar> 
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
                        >
                        <el-table-column
                        type="index"
                        label="序号"
                        width="50"
                        align="center">
                        </el-table-column>
                       
                        <el-table-column
                        prop="fsum1"
                        label="金额"
                        align="center"
                        show-overflow-tooltip
                        >
                        <template slot-scope="scope">
                            <span>{{scope.row.type==1?'￥'+scope.row.fsum1:'￥-'+scope.row.fsum1}}</span>
                            </template>
                        </el-table-column>
                        
                        <el-table-column
                        prop="passman"
                        label="操作人"
                        align="center"
                        width="200">
                            
                        </el-table-column>
                        <el-table-column
                        prop="expendituretime"
                        label="时间"
                        align="center"
                        width="200">
                            
                        </el-table-column>
                        <el-table-column
                        prop="remark"
                        label="类型"
                        align="center"
                        width="200">
                        </el-table-column>

                        <el-table-column
                        prop="type"
                        label="资金状态"
                        align="center"
                        width="200">
                            <template slot-scope="scope">
                                <span>{{scope.row.type==1?'回款':'支出'}}</span>
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
        

    </div>
</template>


<script>

import vFormulaBar from '../../common/FormulaBar.vue';   //编辑栏
import {Axios} from './../../../api/axios';


export default {
  
  data () {
    return {
        loading:false,
        page:1,
        tableData: [],
        pageSize:10,
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        limits:JSON.parse(sessionStorage.getItem('limits')),
       formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
              
            ],
            right:[
           
            ]
        },
        
    }
  },
  components:{
    vFormulaBar
  },
  created () {
         
        
  },

  mounted() {
    this._getdetaillist()
  },

  methods:{
    //FormulaBar组件按钮事件
    getFormulaBar(res){
        console.log(res)
    },
    //Tab 切换事件
    getCutTab(res){
        console.log(res)
    },
    //表格全选事件
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //分页
    pagingChange(val){
        this.page = val
        this._getdetaillist()
    },
   
  
    _getdetaillist(){
        this.loading = true
        let reqBody = {
            "api": "getexpenditurelist",
            "page": this.page,
            "pagesize":this.pageSize,
            "companyid": sessionStorage.getItem('companyid'),
            "projectid": `${this.$route.query.projectid}`,
            "typeid": `${this.$route.query.typeid}`,
            "state": `${this.$route.query.state}`
        }
        Axios(reqBody, 'project').then((res) => {
            console.log('详情', res)
            if(res.state==10001){
               this.tableData = res.data;
            //    if(this.tableData.getexpenditurelist) {

            //        this.tableData.getexpenditurelist.forEach(item => {
            //            item.state = this.$route.query.state;
            //        });
            //    }
            }else{
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
          
            
        })
    },
    
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
    .border
        border-color:#00AC97
</style>