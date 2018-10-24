// 编辑栏组件
<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            stripe
            :v-loading="loading"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                v-for="(item_, index_) in columns"
                prop="projectname"
                :key="index_"
                :type ="item_.columnType?item_.columnType:''"
                :width = "item_.width"
                :align="item_.center"
                :fixed="item_.fixed"
                :label="item_.label">
                <template slot-scope="scope" v-if="item_.btn">
                    <el-tooltip v-for="(item, _index) in item_.btnArr" :key="_index" class="item" effect="dark" :content="item.content" placement="top-end">
                        <el-button @click="onDetails(scope.row,item.EventType)"  :type="item.styleType" :icon="item.icon" ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            multipleTable:[]
        }
    },
    props:{
        tableData: Array,
        columns: Array,   
        loading:{ type: Boolean, default:false}
    },
    created(){
       console.log(this.tableData)
    },
    methods:{
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('multipleSelection', val);
        },
       
    },
    watch:{
        'tableData':function(newData,oldData){
            this.data = newData
            console.log(newData,oldData)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    
</style>
