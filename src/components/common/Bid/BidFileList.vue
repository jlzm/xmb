// 招投标信息
<template>
    <div class="BidFileList">
        <div class="tableTitleBox clearfix">
            <div class="floatLeft tableItem selectItem">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </div>
            <div class="floatLeft tableItem numItem">序号</div>
            <div class="floatLeft tableItem nameItem">文件名</div>
            <div class="floatLeft tableItem creatorItem">创建人</div>
            <div class="floatLeft tableItem timeItem">时间</div>
            <div class="floatLeft tableItem operationItem">操作</div>
        </div>
        <div class="tableItemBox clearfix"  v-for="(item,index) in fileList" :key="index">
            <div class="floatLeft tableItem selectItem">
                <el-checkbox-group v-model="checkedPitch" @change="handleCheckedCitiesChange">
                    <el-checkbox  :label="item" ></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="floatLeft tableItem numItem">1</div>
            <div class="floatLeft tableItem nameItem">文件名</div>
            <div class="floatLeft tableItem creatorItem">创建人</div>
            <div class="floatLeft tableItem timeItem">时间</div>
            <div class="floatLeft tableItem operationItem clearfix">
                <div class="operationBtn blueBtn">查看</div>
                <div class="operationBtn greenBtn">下载</div>
                <div class="operationBtn delBtn">删除</div>
            </div>
        </div>
        
    </div>
    
</template>

<script>

export default {
    data () {
        return {
            fileList:[1,2,3,4],
            checkAll: false,
            checkedPitch:[],
            isIndeterminate: false,
        }
    },
   
    created(){
           
    },
    methods:{
        handleCheckAllChange(val) {
            console.log(val)
        this.checkedPitch = val ? this.fileList : [];
        console.log(this.checkedPitch)
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.fileList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.fileList.length;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .BidFileList
        padding 15px 10px
        .tableTitleBox
            height 40px
            line-height 40px
            background-color #F5F5F5
            font-size 14px
            font-weight bold
            .operationItem
                font-size 14px
                font-weight bold
                
        .tableItemBox
            height 40px
            line-height 40px
            background-color #F5F5F5
            font-size 14px
        .tableItemBox:nth-of-type(even)
            background-color #fff
        .tableItem
            text-align center
        .numItem
            width 5%
        .nameItem
            width 45%
        .creatorItem
            width 8%
        .timeItem
            width 15%
        .operationItem
            width 20%
            font-size 0
            
            .operationBtn
                display inline-block
                font-size 12px
                line-height 20px
                height 20px
                vertical-align middle
                width 40px
                margin-right 5px
                text-align center
                color #fff
                border-radius 3px
                cursor pointer
            .operationBtn:last-child
                margin-right 0
            .blueBtn
                background-color #4C97FF
            .greenBtn
                background-color #00ac97
            .delBtn
                background-color #F1253D

        .selectItem
            width 7%
            .el-checkbox-group
                height 40px

</style>
