<template>
    <div>
        <!-- 标题Tab开始 -->
                        <v-particularsTab :particularsTabList="rightTabList" @returnCutTab="getCutTab"></v-particularsTab>
                        <!-- 标题Tab结束 -->
                        <div class="pad10">

                            <!-- 跟进记录开始 -->
                            <div v-show="tabListIndex==0" class="invitationBox">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                 
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 跟进记录结束 -->

                            <!-- 投标准备开始 -->
                            <div v-show="tabListIndex==1" class="invitationBox">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="工作内容"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成状态"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="完成时间"
                                    align="center"
                                    width="200">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 投标准备结束 -->

                            <!-- 招标文件开始 -->
                            <div v-show="tabListIndex==2" class="invitationBox">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 招标文件结束 -->

                            <!-- 投标文件开始 -->
                            <div v-show="tabListIndex==3" class="bidBox">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                  
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <!-- 投标文件结束 -->

                        

                        </div>    
    </div>    
</template>

<template>
    <div>
        <el-tabs type="border-card"  v-model="tabListIndex">
                            <el-tab-pane disabled name="-1">
                                <span slot="label"><i class="el-icon-date"></i> 关联数据</span>
                            </el-tab-pane>
                            <!-- 跟进记录开始 -->
                            <el-tab-pane label="跟进记录" name="0">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                 
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!-- 跟进记录结束 -->

                            <!-- 投标准备开始 -->
                            <el-tab-pane label="投标准备" name="1">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="工作内容"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成状态"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="完成时间"
                                    align="center"
                                    width="200">
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="完成人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!-- 投标准备结束 -->

                            <!-- 招标文件开始 -->
                            <el-tab-pane label="招标文件" name="2">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                 
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!-- 招标文件结束 -->

                            <!-- 投标文件开始 -->
                            <el-tab-pane label="投标文件" name="3">
                                <el-table
                                    ref="multipleTable"
                                    :data="tableData3"
                                    stripe
                                    align="center"
                                    tooltip-effect="dark"
                                    style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                 
                                    <el-table-column
                                    type="index"
                                    label="序号"
                                    width="100"
                                    align="center">
                                    </el-table-column>
                                    <el-table-column
                                    prop="date"
                                    label="文件名"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    prop="name"
                                    label="创建人"
                                    align="center"
                                    width="120">
                                    </el-table-column>
                                    <el-table-column
                                    prop="address"
                                    label="地址"
                                    align="center"
                                    show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                    fixed="right"
                                    label="操作"
                                    width="200"
                                    align="center">
                                        <template slot-scope="scope">
                                            <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                                <el-button @click="onDetails(scope.row)" type="primary" icon="el-icon-view" ></el-button>
                                            </el-tooltip>
                                            
                                            <el-tooltip class="item" effect="dark" content="解除冻结" placement="top-end">
                                                <el-button type="success" icon="el-icon-upload2"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                                <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-tab-pane>
                            <!-- 投标文件结束 -->
                        </el-tabs>
    </div>
</template>

