<template>
    <div class="dashboard">
        <div class="headData">
            <el-row :gutter="15">
                <el-col :span="6">
                    <div class="grid-content">
                        <div class="gridTitle">本月销售线索数量</div>
                        <div class="gridText"><v-countup start-value="0" end-value="600"></v-countup><span class="fsize16 marL5">笔</span></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="gridTitle">本月销售线索金额</div>
                        <div class="gridText"><v-countup start-value="0" end-value="600"></v-countup><span class="fsize16 marL5">元</span></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="gridTitle">本月招投标项目数量</div>
                        <div class="gridText"><v-countup start-value="0" end-value="600"></v-countup><span class="fsize16 marL5">笔</span></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <div class="gridTitle">本月招投标项目金额</div>
                        <div class="gridText"><v-countup start-value="0" end-value="600"></v-countup><span class="fsize16 marL5">元</span></div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="navList">
            <div class="navTitle">常用功能</div>
            <div class="iconList clearfix">
                <div class="iconItem">
                    <div class="icon"></div>
                    <div>销售线索</div>
                </div>
                <div class="iconItem">
                    <div class="icon"></div>
                    <div>销售线索</div>
                </div>
                <div class="iconItem">
                    <div class="icon"></div>
                    <div>销售线索</div>
                </div>
                <div class="iconItem">
                    <div class="icon"></div>
                    <div>销售线索</div>
                </div>
                <div class="iconItem">
                    <div class="icon"></div>
                    <div>销售线索</div>
                </div>
            </div>
        </div>

        <div class="backlogList">
            <div class="backlogTitle">待办事项</div>
            <!-- 待办事项列表 -->
            <div class="padTb20">
                <el-table
                ref="multipleTable"
                :data="tableData3"
                stripe
                align="center"
            
                tooltip-effect="dark"
                style="width: 100%"
                >
                    
                    <el-table-column
                    type="index"
                    label="序号"
                    width="120"
                    align="center">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="主题"
                   
                    width="240">
                    </el-table-column>
                    <el-table-column
                    prop="date"
                    label="内容"
                    
                    align="center"
                    show-overflow-tooltip>
                    </el-table-column>
                    
                   
                    <el-table-column
                    prop="name"
                    label="项目负责人"
                    align="center"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="创建时间"
                    align="center"
                    width="220">
                    </el-table-column>
                    
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  
  data () {
    return {
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
    }
  },
  created(){
        sessionStorage.setItem('userid',2)
        sessionStorage.setItem('companyid',1)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .dashboard
        .headData
            padding 15px
            background-color #fff
            margin-bottom 15px
            .grid-content 
                border-radius 4px
                padding 40px 20px
                height 180px
                background-color #d3dce6
                color #fff
                .gridTitle
                    margin-bottom 40px
                    font-size 18px
                .gridText
                    font-size 40px
        .navList
            padding 20px
            background-color #fff
            margin-bottom 15px
            .navTitle
                color #666
            .iconItem
                float left
                color:#666
                font-size 12px
                padding 15px 0
                margin-right 80px
                div
                    text-align center
                .icon
                    width 100px
                    height 100px
                    margin-bottom 20px
                    background-color #87cbf1
        .backlogList
            padding 20px
            background-color #fff
            .backlogTitle
                color #666
  
  
</style>
