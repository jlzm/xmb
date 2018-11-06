<template>
    <div class="bid">
        <div class="listBox">
            <div class="operationBox clearfix">
                <el-row>
                    <el-col :span="5">
                        <div class="clearfix">
                            <div  class="tabItem pointer" :class="tableIndex==3?'activeTabItem':''" @click="cutList(3)"><span >财务数据</span></div>
                            <div  class="tabItem pointer" :class="tableIndex==1?'activeTabItem':''" @click="cutList(1)"><span >支出列表</span></div>
                            <div  class="tabItem pointer" :class="tableIndex==2?'activeTabItem':''" @click="cutList(2)"><span >回款列表</span></div>
            
                        </div>
                    </el-col>
                    <el-col :span="19">
                        <div class="screenBox">
                            <el-form :inline="true"  class="demo-form-inline" :model="searchData">
                                <!-- <el-form-item>
                                    <div class="leftBtn btnst" :class="tableIndex==3?'actBtn':''" @click="cutList(3)">
                                        <span class="btnTitle">财务数据</span>
                                    </div>
                                </el-form-item>
                            <el-form-item>
                                    <div class="leftBtn btnst" :class="tableIndex==1?'actBtn':''"  @click="cutList(1)">
                                        <span class="btnTitle">支出列表</span>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <div class="leftBtn btnst" :class="tableIndex==2?'actBtn':''"  @click="cutList(2)">
                                        <span class="btnTitle">回款列表</span>
                                    </div>
                                </el-form-item> -->
                                
                                <el-form-item label="选择项目" v-if="tableIndex!=3">
                                    <el-select v-model="searchData.projectId" placeholder="请选择项目" popper-class="border">
                                        <el-option value="" label="所有项目"></el-option>
                                        <el-option :value="item.id" :label="item.projectname" v-for="(item,index) in  projectList" :key="index"></el-option>

                                        
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="选择类型" v-if="tableIndex!=3">
                                    <el-select v-model="searchData.sumsourceId" placeholder="请选择类型" popper-class="border">
                                        <el-option value="" label="所有类型"></el-option>
                                        <el-option :value="item.id" :label="item.typename" v-for="(item,index) in  sumsourceList" :key="index"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="" v-if="tableIndex!=3">
                                    <el-date-picker
                                    v-model="searchData.time"
                                    type="datetimerange"
                                    range-separator=""
                                
                                    :value-format="timeVal"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                                    </el-date-picker>
                                </el-form-item>
                                
                                <el-form-item v-if="tableIndex!=3">
                                    <div class="leftBtn btn" @click="getSearchData" >
                                
                                        <span class="btnTitle">查询</span>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="tableIndex!=3">
                                    <div class="leftBtn btn" v-if="jurisdiction.finance.add"  @click="newFinance">
                                
                                        <span class="btnTitle">{{tableIndex==1?'新建':'新建'}}</span>
                                    </div>
                                </el-form-item>
                                <el-form-item v-if="tableIndex!=3">
                                    <div class="leftBtn btn" v-if="jurisdiction.finance.query" @click="exportworkorder">
                                
                                        <span class="btnTitle">导出</span>
                                    </div>
                                </el-form-item>

                                
                            </el-form>
                            <div class="floatRight rightBox clearfix">
                                <div class="rightBtn btn" v-if="item.limits" v-for="(item,index) in formulaList.right" :key="index"   >
                                    <i class="iconfont marR5" :class="[item.icon]"></i>
                                    <span class="btnTitle">{{item.title}}</span>
                                </div> 
                            </div>
                        </div>
                    </el-col>
                
                </el-row>
            </div> 
            <div class="contentBox clearfix bgWhite padTb10"  v-if="tableIndex!=3">
                <div class="pad20 bgWhite" >
                    <div  v-if="tableIndex==1">
                        <!-- 投标文件开始 -->
                        <el-table
                            ref="multipleTable"
                            :data="tableData"
                            stripe
                            v-loading="loading"
                            align="center"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                            type="selection"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="projectname"
                            label="支出项目"
                            align="center"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="expendituretime"
                            label="支出时间"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="sum1"
                            label="支出金额"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="type"
                            label="支出类别"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="passman"
                            label="经手人"
                            align="center"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="remark"
                            label="备注"
                            align="center"
                            width="220">
                            </el-table-column>
                        
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="200"
                            align="center" v-if="jurisdiction.finance.query||jurisdiction.finance.save||jurisdiction.finance.twoquery">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                        <el-button @click="onDetails(scope.row)" v-if="jurisdiction.finance.query"  type="primary" icon="el-icon-view" ></el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                        <el-button type="success" icon="el-icon-edit-outline" v-if="jurisdiction.finance.save"   @click="onCompile(scope.row)" ></el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                        <el-button type="danger" icon="el-icon-delete" v-if="jurisdiction.finance.twoquery"   @click="onDelete(scope.row)" ></el-button>
                                    </el-tooltip>
                                    <!-- <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                        <el-button type="success" icon="el-icon-edit-outline"  @click="onAffirm(scope.row,'relieve')" ></el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                        <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                    </el-tooltip> -->
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 投标文件结束 -->
                    </div>
                    
                    <div v-if="tableIndex==2">
                        <!-- 投标文件开始 -->
                        <el-table
                            ref="multipleTable"
                            :data="tableData1"
                            stripe
                            v-loading="loading"
                            align="center"
                            border
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange" >
                            <el-table-column
                            type="selection"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            type="index"
                            label="序号"
                            width="50"
                            align="center">
                            </el-table-column>
                            <el-table-column
                            prop="projectname"
                            label="回款项目"
                            align="center"
                            show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                            prop="returnedtime"
                            label="回款时间"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="sum1"
                            label="回款金额"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="content"
                            label="回款内容"
                            align="center"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="passman"
                            label="经手人"
                            align="center"
                            width="120">
                            </el-table-column>
                            <el-table-column
                            prop="createtime"
                            label="创建时间"
                            align="center"
                            width="220">
                            </el-table-column>
                        
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="200"
                            align="center" v-if="jurisdiction.finance.query||jurisdiction.finance.save||jurisdiction.finance.remove">
                                <template slot-scope="scope">
                                    <el-tooltip class="item" effect="dark" content="用户详情" placement="top-end">
                                        <el-button @click="onDetails2(scope.row)"   v-if="jurisdiction.finance.query" type="primary" icon="el-icon-view" ></el-button>
                                    </el-tooltip>
                                    
                                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
                                        <el-button type="success" v-if="jurisdiction.finance.save" icon="el-icon-edit-outline"  @click="onCompile(scope.row)" ></el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                                        <el-button type="danger" v-if="jurisdiction.finance.remove" icon="el-icon-delete"  @click="onDelete(scope.row)" ></el-button>
                                    </el-tooltip>
                                   <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top-end" >
                                        <el-button type="danger" icon="el-icon-delete" @click="onAffirm(scope.row,'del')"></el-button>
                                    </el-tooltip> -->
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 投标文件结束 -->
                    </div>
                    
                    

                </div>
                
                <!-- 分页 -->
                <div class="pagination" v-if="tableIndex==1&&tableData[0]">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange"
                    :total="tableData[0].total">
                    </el-pagination>
                </div>
                <div class="pagination" v-if="tableIndex==2&&tableData1[0]">
                    <el-pagination 
                    background
                    :page-size="pageSize"
                    layout="prev, pager, next"
                    @current-change="pagingChange1"
                    :total="tableData1[0].total">
                    </el-pagination>
                </div>

               
            </div>
            <div v-if="tableIndex==3">
                <div >
                    <el-row :gutter="10">
                        <el-col :span="9">
                            <div class="financialItem" v-loading="loading2" v-if="moneyTrend.rows.length>0">
                                <div class="finance-content-r-c bgWhite">
                                    <div class="finance-content-title row marB15">
                                        <span class="fsize14 color333">收支趋势</span>   
                                    </div>
                                    <ve-line v-if="!loading2" :data="moneyTrend" :settings="chartSettings" :colors="colors"></ve-line>
                                </div>
                                
                            </div>
                            <div class="pad20" v-else >
                                <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                <div class="notText">暂无收支数据</div>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="financialItem"  v-loading="loading" v-if="capitalList.length>0">
                                <div class="finance-content-r-c bgWhite">
                                    <el-row class="finance-content-title">
                                        <el-col :span="12">
                                            <span class="fsize14 color333">资金明细</span>
                                        </el-col>
                                        <el-col :span="12" class="tar">
                                            <span class="fsize14 vam cp"  v-if="jurisdiction.finance.query" @click="fundMore">查看更多</span>
                                            <!-- <i class="finance-content-more-icon dib vam">
                                                <img v-lazy="'static/img/porjectAmount/more.png'" alt="">
                                            </i> -->
                                        </el-col>
                                    </el-row>
                                    <div class="finance-content-list-wrap">
                                        <div class="finance-content-item" v-for="(item, index) in capitalList" :key="index" :class="{bgF5:index%2==0}">
                                            <el-row>
                                                <el-col :span="12">
                                                <div class="finance-detail-title">
                                                    <span class="fsize14 marB5 color222">{{item.projectname}}</span>
                                                </div>

                                                </el-col>
                                                <el-col :span="12" class="tar">
                                                    <div class="finance-money-amount row" :class="[item.state==0? 'colorRed' : 'colorGreen']">
                                                        <span v-if="item.state==1" class="fsize16">+</span>
                                                        <span v-else class="fsize16">-</span>
                                                        <span class="fsize16">{{item.money1}}</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="row marT12">
                                                <el-col :span="12" class="row">   
                                                    <span class="fsize14 color999">{{item.time}}</span>
                                                    <span class="fsize14 color999">|</span>
                                                    <span class="fsize14 color999">{{item.name}}</span>
                                                </el-col>
                                                <el-col :span="12" class="tar">   
                                                    <span class="fsize14 color999">{{item.type}}</span>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pad20" v-else >
                                <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                <div class="notText">暂无资金明细</div>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="financialItem"  v-loading="loading1"  v-if="moneyStatistics.list">
                                <div class="finance-content-l-c bgWhite">
                                    <div class="finance-content-title row">
                                        <span class="fsize14 color333">数据统计</span>
                                        <el-switch
                                        style="display: block;float: right;"
                                        v-model="statisticsTitle.statisticsSwitch"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949"
                                        active-text="收入"
                                        inactive-text="支出"
                                        @change="switchChange">
                                        </el-switch>
                                    </div>
                                    <div class="finance-content-list-wrap">
                                        <div class="finance-outlay-total row">
                                            <span class="fsize16 color333">{{statisticsTitle.title}}：</span>
                                            <span class="fsize16 color333">￥{{moneyStatistics.moneysum}}</span>
                                        </div>
                                        <div class="finance-strip-items row">
                                            <div  class="finance-strip-item"  v-for="(item, index) in moneyStatistics.list" :key="index" @click="getMoreSelect(item)">
                                                <div :style="'width:'+item.percentage+'%'" class="finance-strip-bar dib fsize12 colorfff vam">
                                                    
                                                </div>
                                                <div class="finance-strip-item-text">
                                                    <div class="finance-strip-item-info fsize12 color333 vam tal col-lg-1 ">
                                                        <div>{{item.type}}</div>
                                                        <div class="marT8" :class="statisticsTitle.statisticsSwitch?'colorGreen':'colorRed'">￥{{item.money1}}</div>
                                                    </div>
                                                    
                                                    <div class="finance-strip-scale fsize12 color333 vam tal  floatRight">
                                                        
                                                        <span class="marL10  fsize12">{{item.percentage}}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="pad20" v-else >
                                <img class="notIcon"  v-lazy="{src:'static/img/notIcon.png'}" alt="">
                                <div class="notText">暂无数据统计</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        
        <el-dialog title="新建项目支出" :visible.sync="expendDialogVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="支出项目：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.projectid" placeholder="请选择支出项目">
                            
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出类别：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.typeid" placeholder="请选择支出类别">
                            <el-option
                            v-for="(item,index) in sumsourceList"
                            :key="index"
                            :label="item.typename"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出金额：" :show-message='false' :required='true'>
                        <el-input v-model="newExpend.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        :action="imageUrl"
                        :multiple='true'
                        :file-list="expendImagelist"
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newExpend.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="expendDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addExpendiTure">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="新建项目回款" :visible.sync="returnedDialogVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="回款项目：" :show-message='false' :required='true'>
                        <el-select v-model="newReturned.projectid" placeholder="请选择回款项目">
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="回款金额：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="回款内容：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.content" type="textarea" :autosize="{ minRows: 3, maxRows: 15}"></el-input>
                    </el-form-item>
                    <el-form-item label="回款时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newReturned.returnedtime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        :action="imageUrl"
                       
                        :multiple='true'
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newReturned.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="returnedDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addReturndMoney">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="编辑支出" :visible.sync="expendCompileVisible" width="40%">
            <div>
                <el-form :model="newExpend" label-width="140px">
                    <el-form-item label="支出项目：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.projectid" placeholder="请选择支出项目">
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出类别：" :show-message='false' :required='true'>
                        <el-select v-model="newExpend.typeid" placeholder="请选择支出类别">
                            <el-option
                            v-for="(item,index) in sumsourceList"
                            :key="index"
                            :label="item.typename"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支出金额：" :show-message='false' :required='true'>
                        <el-input v-model="newExpend.sum" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        :action="imageUrl"
                        ref='upload'
                        :on-success="compileSuccess"
                        :multiple='true'
                        list-type="picture-card"
                        :file-list="expendImagelist"
                        :data="uploadData"
                        :on-remove="compileRemoveImg">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newExpend.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="expendCompileVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateexpenditure">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑回款" :visible.sync="returnedCompileVisible" width="40%">
            <div>
                <el-form :model="newReturned" label-width="140px">
                    <el-form-item label="回款项目：" :show-message='false' :required='true'>
                        <el-select v-model="newReturned.projectid" placeholder="请选择支出项目">
                            <el-option
                            v-for="(item,index) in projectList"
                            :key="index"
                            :label="item.projectname"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                   
                    <el-form-item label="回款金额：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.sum" type="number" ></el-input>
                    </el-form-item>
                    <el-form-item label="回款内容：" :show-message='false' :required='true'>
                        <el-input v-model="newReturned.content" type="textarea" :autosize="{ minRows: 3, maxRows: 15}" ></el-input>
                    </el-form-item>
                    <el-form-item label="回款时间：" :show-message='false' :required='true'>
                        <el-date-picker
                        v-model="newReturned.returnedtime"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传凭证：">
                        <el-upload
                        :action="imageUrl"
                        :multiple='true'
                        list-type="picture-card"
                        :file-list="expendImagelist"
                        :data="uploadData"
                        :on-success="returnedSuccess"
                        :on-remove="returnedRemoveImg">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="备注信息：">
                        <el-input v-model="newReturned.remark" type="textarea" :autosize="{ minRows: 6, maxRows: 15}"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="returnedCompileVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatereturndmoney">确 定</el-button>
            </span>
        </el-dialog>

    </div>
    
</template>
<script>

import vParticularsTab from '../../common/ParticularsTab.vue';  //详情信息tab
import vProjectInfo from '../../common/ProjectInfo.vue';  //项目信息
import vBidInfo from '../../common/BidInfo.vue';  //招投标信息
import {Axios} from './../../../api/axios'
import {Session} from './../../../api/axios'



export default {
  
  data () {
    this.chartSettings = {
        metrics: ['收入', '支出' ,'结余'],
        dimension: ['日期'],
        area: true
      }
    this.colors = ['#1BE9BF','#FF7993', '#63C2FF',
    '#FF594C', '#37D983','#D7C6FA','#0071B6']
    return {
        loading:false,
        loading1:false,
        loading2:false,
        expendDialogVisible:false,
        returnedDialogVisible:false,
        expendCompileVisible:false,
        returnedCompileVisible:false,
        returnedImagelist:[],
        expendImagelist:[],
        capitalList:[],//资金明细外层列表
        moneyStatistics:{},//数据统计
        moneyTrend:{
          columns: ['日期', '收入', '支出', '结余'],
          rows: [
            
          ]
        },  //趋势图
        statisticsTitle:{
            title:'支出总额',
            statisticsSwitch:false,
        },
        
        expendiPage:1,
        returnedPage:1,
        imageUrl:Session.exportUrl+'saveImage',
        timeVal:'yyyy-MM-dd HH:mm:ss',
        searchData:{
            antistop:'',
            projectId:'',
            sumsourceId:'',
            principal:'',
            time:''
        },
        newExpend:{
            projectid:'',
            typeid:'',
            sum:'',
            remark:'',
            images:'',
            imagestwo:'',
            id:''
        },
        newReturned:{
            projectid:'',
            content:'',
            sum:'',
            remark:'',
            returnedtime:'',
            images:'',
            imagestwo:'',
            id:''
        },
        uploadData:{

        },
       
        sumsourceList:[],
        projectList:[],
        pageSize:10,
        tableIndex:3,
        tableData: [],
        tableData1: [],
        jurisdiction:JSON.parse(sessionStorage.getItem('jurisdiction')),
        limits:JSON.parse(sessionStorage.getItem('limits')),
        multipleSelection: [],
        formulaList:{ //编辑栏按钮数
            parent:'marketClue',
            left:[
                {
                    title:'编辑',
                    clickEvent:'compile',
                    icon:'icon-iconfontedit',
                    limits:JSON.parse(sessionStorage.getItem('jurisdiction')).finance.save
                }

            ],
            right:[
               
            ]
        },
        
    }
  },
  components:{
    vParticularsTab,vProjectInfo,vBidInfo
  },
  created () {
      this._getdetaillist()
      this._getemoneybyyear(0)
      this.getmoneytrend()
      //this.getExpendiTureList()  
      //this.getReturnedMoneyList()
      this._getSumsource()
      this._getPurchaseProjectList()

    
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
    handleSuccess(response, file, fileList){
        if(file.response){
            if(this.imagepc){
                this.imagepc = this.imagepc+','+file.response.fileUrl
            }else{
                this.imagepc  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
     //图片上传处理
    handleRemove(file, fileList) {
        this.imagepc = ''
        console.log(fileList)
        for(let i=0;i<fileList.length;i++){
            if(fileList[i].response){
                if(this.imagepc){
                    this.imagepc = this.imagepc+','+fileList[i].response.fileUrl
                }else{
                    this.imagepc  = fileList[i].response.fileUrl
                }
            }
        }
    },
    
    compileSuccess(response, file, fileList){
        if(file.response){
            if(this.newExpend.imagestwo){
                this.newExpend.imagestwo = this.newExpend.imagestwo+','+file.response.fileUrl
            }else{
                this.newExpend.imagestwo  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    //图片删除
    compileRemoveImg(file, fileList) {
        this.newExpend.images = ''
        this.newExpend.imagestwo = ''
        for(let i=0;i<fileList.length;i++){
            
            if(this.newExpend.imagestwo){
                if(fileList[i].response){
                    this.newExpend.imagestwo = this.newExpend.imagestwo+','+fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newExpend.imagestwo = this.newExpend.imagestwo+','+fileList[i].url
                }
            }else{
                if(fileList[i].response){
                    this.newExpend.imagestwo = fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newExpend.imagestwo = fileList[i].url
                }
            }
        }
        console.log(this.newExpend.imagestwo);
    },

    returnedSuccess(response, file, fileList){
        if(file.response){
            if(this.newReturned.imagestwo){
                this.newReturned.imagestwo = this.newReturned.imagestwo+','+file.response.fileUrl
            }else{
                this.newReturned.imagestwo  = file.response.fileUrl
            }
        }
        
        console.log(file)
    },
    //图片删除
    returnedRemoveImg(file, fileList) {
        this.newReturned.images = ''
        this.newReturned.imagestwo = ''
        for(let i=0;i<fileList.length;i++){
            
            if(this.newReturned.imagestwo){
                if(fileList[i].response){
                    this.newReturned.imagestwo = this.newReturned.imagestwo+','+fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newReturned.imagestwo = this.newReturned.imagestwo+','+fileList[i].url
                }
            }else{
                if(fileList[i].response){
                    this.newReturned.imagestwo = fileList[i].response.fileUrl
                }else if(fileList[i].status=='success'){
                    this.newReturned.imagestwo = fileList[i].url
                }
            }
        }
        console.log(this.newReturned.imagestwo);
    },
            
    
    //分页
    pagingChange(val){
        this.expendiPage = val
        this.getExpendiTureList(val)
    },
    //分页
    pagingChange1(val){
        this.returnedPage = val
        this.getReturnedMoneyList(val)
    },
    //切换列表
    cutList(tableIndex){
        this.expendiPage = 1
        this.returnedPage = 1
        if(tableIndex!=this.tableIndex&&tableIndex!=3){
            this.searchData={
                antistop:'',
                projectId:'',
                sumsourceId:'',
                principal:'',
                time:''
            }
            this.imagepc = ''
            this.tableIndex = tableIndex
            this.multipleSelection = []
            this.getExpendiTureList()  
            this.getReturnedMoneyList()
        }else{
             this.tableIndex = tableIndex
             this._getdetaillist()
             this._getemoneybyyear(0)
             this.getmoneytrend()
        }
        
        
    },
    onDetails(row){
        this.$router.push({ 
            path: 'financeDetails',                
            query:{
                id:row.id
            }
        })
    },
    onDetails2(row){
        this.$router.push({ 
            path: 'returnedDetails',                
            query:{
                id:row.id
            }
        })
    },
    //获取列表数据 -- 项目支出
    getExpendiTureList(){
        this.loading = true
        let searchData = {
            time:[
            '',
            ''
            ]
        }
        if(this.searchData.time&&this.searchData.time.length>1){
            searchData = this.searchData
        }
        console.log(this.searchData)
        let reqBody = {
            "api": "getexpenditurelist",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "workstatus":0,
            "limit":this.limits['finance'],
            "page":this.expendiPage,
            "pagesize":this.pageSize,
            "starttime": searchData.time[0],
            "endtime": searchData.time[1],
            "projectid": this.searchData.projectId,
            "type": "",
            "typeid":this.searchData.sumsourceId
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData = res.data
                
            }else{
                this.tableData = []
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取列表数据 -- 项目回款
    getReturnedMoneyList(){
        this.loading = true
        let searchData = {
            time:[
            '',
            ''
            ]
        }
        if(this.searchData.time&&this.searchData.time.length>1){
            searchData = this.searchData
        }
        let reqBody = {
            "api": "getreturnedmoneylist",
            "searchname": "",
            "companyid": sessionStorage.getItem('companyid'),
            "userid": sessionStorage.getItem('userid'),
            "workstatus":0,
            "limit":this.limits['finance'],
            "page":this.returnedPage,
            "pagesize":this.pageSize,
            "starttime": searchData.time[0],
            "endtime": searchData.time[1],
            "projectid": this.searchData.projectId,

           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.tableData1 = res.data
                
            }else{
                this.tableData1 = []
                this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
            
        })
    },
    //获取列表数据 -- 项目回款
    _getSumsource(){
        let reqBody = {
            "api": "getexpendituretype",
            "companyid": sessionStorage.getItem('companyid'),
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.sumsourceList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
    },
    //获取列表数据 -- 项目回款
    _getPurchaseProjectList(){
        let reqBody = {
            "api": "getpurchaseprojectlist",
            "companyid": sessionStorage.getItem('companyid'),
            "searchname": ""
           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.projectList = res.data
                
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
    },
    newFinance(){   
        if(this.tableIndex==1){ 
            this.expendImagelist = []
            this.newExpend={
                projectid:'',
                typeid:'',
                sum:'',
                remark:'',
                images:'',
                imagepc:''
            }
            this.expendDialogVisible = true
        }else {
            this.returnedImagelist = []
            this.newReturned={
                projectid:'',
                content:'',
                sum:'',
                remark:'',
                returnedtime:'',
                images:'',
                imagepc:''
            }
            
            this.returnedDialogVisible = true
            
        }
    },
    
   
    //新增回款
    addReturndMoney(){
        let newReturned = this.newReturned
        if(!newReturned.projectid || !newReturned.sum || !newReturned.content || !newReturned.returnedtime ){

            this.$message.error('请填写完整信息');
            return false
        }
        let reqBody = {
            "api": "addreturndmoney",
            "projectid": newReturned.projectid,
            "sum": newReturned.sum,
            "content": newReturned.content,
            "returnedtime": newReturned.returnedtime,
            "remark": newReturned.remark,
            "images": newReturned.images,
            "imagepc":this.imagepc,
            "passmanid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('新增成功')
                this.returnedDialogVisible = false
                this.newReturned={
                    projectid:'',
                    content:'',
                    sum:'',
                    remark:'',
                    returnedtime:'',
                    images:''
                }
                this.imagepc = ''
                this.getReturnedMoneyList(1)
                
            }else{
                this.$message.error(res.msg);
            } 
        })
    },
    //新增支出
    addExpendiTure(){
        let newExpend = this.newExpend
        if(!newExpend.projectid || !newExpend.sum || !newExpend.typeid  ){

            this.$message.error('请填写完整信息');
            return false
        }
        let reqBody = {
            "api": "addexpenditure",
            "projectid": newExpend.projectid,
            "sum": newExpend.sum,
            "typeid": newExpend.typeid,
            "remark": newExpend.remark,
            "images": newExpend.images,
            "imagepc":this.imagepc,
            "companyid": sessionStorage.getItem('companyid'),
            "passmanid":sessionStorage.getItem('userid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('新增成功');
                this.expendDialogVisible = false
                this.newExpend={
                    projectid:'',
                    typeid:'',
                    sum:'',
                    remark:'',
                    images:''
                }
                this.imagepc = ''
                this.getExpendiTureList(1) 
                
            }else{
                this.$message.error(res.msg);
            } 
        })
    },
    //导出
    exportworkorder(){
        console.log(this.multipleSelection)
        if(this.multipleSelection.length<1){
            this.$message.error('请选择需要导出的文件')
            return false
        }
        let ids = ''
        for(let i=0;i<this.multipleSelection.length;i++){
            if(ids){
                ids = ids + "," + this.multipleSelection[i].id
            }else{
                ids = this.multipleSelection[i].id
            }
        }
        if(this.tableIndex==1){
            window.open(Session.exportUrl+'exportexpenditure?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
        }else{
            window.open(Session.exportUrl+'exportreturnedmoney?companyid='+sessionStorage.getItem('companyid')+'&id='+ids)
        }
        
        
        
        
    },
    //查询
    getSearchData(){
        if(this.tableIndex==1){
             this.getExpendiTureList(1)  
      
        }else{
            this.getReturnedMoneyList(1)
        }
    },
    //编辑弹出
    onCompile(row){
        if(this.tableIndex==1){
            
            this._getExpenditureInfo(row.id)
        }else if(this.tableIndex==2){
            this._getReturnedMoneyInfo(row.id)
        }
    },
    //项目支出详情
    _getExpenditureInfo(id){
        let reqBody = {
            "api": "getexpenditureinfo",
            "id":id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let images = []
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.projectid,
                }
                this.expenditureInfo = res.data
                
                if( res.data.images){
                    this.imgList = res.data.images.split(',')
                    for(let i=0;i<this.imgList.length;i++){
                        images.push({
                            url:this.imgList[i]
                        })
                        console.log(this.imgList[i])
                        
                    }
                    this.expendImagelist = images
                }else{
                    this.expendImagelist = []
                }
                
                this.newExpend = {
                    projectid:res.data.projectid,
                    typeid:res.data.typeid,
                    sum:res.data.sum,
                    remark:res.data.remark,
                    images:'',
                    imagestwo:res.data.images,
                    id:id
                }
                this.expendCompileVisible = true
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    updateexpenditure(){
        let newExpend = this.newExpend
        if(!newExpend.projectid || !newExpend.sum || !newExpend.typeid  ){

            this.$message.error('请填写完整信息');
            return false
        }
        console.log(this.newExpend)
        let reqBody = {
            "api": "updateexpenditure",
            "projectid": this.newExpend.projectid,
            "sum": this.newExpend.sum,
            "typeid": this.newExpend.typeid,
            "remark": this.newExpend.remark,
            "images": this.newExpend.images,
            "imagestwo": this.newExpend.imagestwo,
            "id":this.newExpend.id,

           
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('修改成功')
                this.expendCompileVisible = false
                this.getExpendiTureList()
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
        
    },

    //项目回款详情
    _getReturnedMoneyInfo(id){
        let reqBody = {
            "api": "getreturnedmoneyinfo",
            "id":id,
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                let images = []
                this.uploadData = {
                    "companyid": sessionStorage.getItem('companyid'),
                    "projectid":res.data.projectid,
                }
                this.returnedMoneyInfo = res.data
               
                this.expendImagelist = images
                if( res.data.images){
                    this.imgList = res.data.images.split(',')
                    for(let i=0;i<this.imgList.length;i++){
                        images.push({
                            url:this.imgList[i]
                        })
                        console.log(this.imgList[i])
                        
                    }
                    this.expendImagelist = images
                }else{
                    this.expendImagelist = []
                }

                this.newReturned={
                    projectid:res.data.projectid,
                    content:res.data.content,
                    sum:res.data.sum,
                    remark:res.data.remark,
                    returnedtime:res.data.returnedtime,
                    images:'',
                    imagestwo:res.data.images,
                    id:id
                }
                this.returnedCompileVisible = true
            }else{
                this.$message.error(res.msg);
            }
        })
    },
    updatereturndmoney(){
         let newReturned = this.newReturned
        if(!newReturned.projectid || !newReturned.sum || !newReturned.content || !newReturned.returnedtime ){

            this.$message.error('请填写完整信息');
            return false
        }
        console.log(this.newReturned)
        let reqBody = {
            "api": "updatereturndmoney",
            "projectid": this.newReturned.projectid,
            "returndid":  this.newReturned.id,
            "sum": this.newReturned.sum,
            "returnedtime": this.newReturned.returnedtime,
            "content":this.newReturned.content,
            "remark": this.newReturned.remark,
            "imagestwo": this.newReturned.imagestwo,
            "images": this.newReturned.images

        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
                this.$message.success('修改成功')
                this.returnedCompileVisible = false
                this.getReturnedMoneyList()
            }else{
                this.$message.error(res.msg);
            }
          
            
        })
        
    },
    //删除
    onDelete(row){
        this.$confirm('是否确定删除该财务数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            let reqBody 
            if(this.tableIndex==1){
                reqBody = {
                    "api": "deleteexpenditure",
                    "id": row.id
                }
            }else if(this.tableIndex==2){
                reqBody = {
                    "api": "deletereturnedmoney",
                    "id": row.id
                }
            }
            Axios(reqBody,'index').then((res) => {
                console.log(res)
                if(res.state==10001){
                    this.$message.success('删除成功')
                    if(this.tableIndex==1){
                        this.getExpendiTureList()  
                    }else if(this.tableIndex==2){
                        this.getReturnedMoneyList()
                    }
                    
                }else{
                    this.$message.error(res.msg);
                }
            
                
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },
    _getdetaillist(){
        this.loading = true
        let reqBody = {
            "api": "getdetaillist",
            "page": 1,
            "pagesize":7,
            "companyid": sessionStorage.getItem('companyid'),


        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
               this.capitalList = res.data.list
            }else{
               
            }
            setTimeout(() => {
                this.loading = false
            }, 1000);
          
            
        })
    },
    _getemoneybyyear(state){
        this.loading1 = true
        let reqBody = {
            "api": "getemoneybyyear",
            "state": state,
            "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody,'index').then((res) => {
            console.log(res)
            if(res.state==10001){
               this.moneyStatistics = res.data
            }else{
                // this.$message.error(res.msg);
            }
            setTimeout(() => {
                this.loading1 = false
            }, 1000);
        })
        
    },
    getmoneytrend(){
        this.loading2 = true
        let reqBody = {
            "api": "getmoneytrend",
            "companyid": sessionStorage.getItem('companyid'),
        }
        Axios(reqBody,'','','getmoneytrend').then((res) => {
            console.log(res)
            if(res.state==10001){
                let getData = res.data
                let moneyTrend=[];
               
                for(let i=0;i<getData.length;i++){
                    let analysis = {
                        '日期':getData[i].yearmonth,
                        "收入":getData[i].rmoney1.replace(/,/g,''),
                        '支出':getData[i].emoney1.replace(/,/g,''),
                        "结余":getData[i].remoney1.replace(/,/g,''),
                        
                    }
                   
                    moneyTrend.push(analysis)
                }
               this.moneyTrend.rows = moneyTrend
               
            }else{
                
            }
            setTimeout(() => {
                this.loading2 = false
            }, 1000);
        })
    },
    switchChange(val){
      
        let state = 0
        let title = '支出总额'
        if(val){
            state = 1
            title = '收入总额'
        }
        this.statisticsTitle.title = title
        this._getemoneybyyear(state)
    },
    fundMore(){
        this.$router.push({ 
            path: 'fundMore',                
        })
    },
    getMoreSelect(row){
        if(this.jurisdiction.finance.query){
            let sType = this.statisticsTitle.statisticsSwitch?'1':'0'
            this.$router.push({ 
                path: 'statisticsMore',                
                query:{
                    sType:sType,
                    state:row.state,
                    typeid:row.typeid
                }
            })
          
        }
        
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
            background-color #fff
            color #666
            margin-bottom 10px
            .tabItem
                float left 
                height 52px
                line-height 52px
                padding 0 15px
                border-bottom 1px solid transparent
                border-left 1px solid transparent
                border-right 1px solid transparent
                font-size 14px
                &.activeTabItem
                    position relative
                    border-left 1px solid #f4f4f4
                    border-right 1px solid #f4f4f4
                    border-bottom 1px solid #fff
                    &:after
                        position absolute
                        content ''
                        top 0
                        left 0
                        width 100%
                        height 3px
                        background-color #4c97ff
            .screenBox
                padding 10px 0
                .el-form-item
                    margin-bottom: 0
                .el-input
                    vertical-align: top
        .btn
            height 32px
            line-height 30px
            font-size 12px
            padding 0 15px
            border-radius 3px
            border 1px solid #00AC97
            color #fff
            background-color #00AC97
            cursor pointer
            min-width 80px
            text-align center
        .btnst
            height 32px
            line-height 30px
            font-size 12px
            padding 0 15px
            border-radius 3px
            border 1px solid #00AC97
            color #00ac97
            cursor pointer
            min-width 80px
            text-align center
        .actBtn
            color #fff
            background-color #00AC97
            
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
        .el-select,.el-date-editor
            width 100%
    .border
        border-color:#00AC97
    .line
        text-align center
    .financialItem
        background-color #fff
        width 100%
        height 700px
        .finance-content-wrap
        // 公共样式
        .finance-content-title
            padding 15px 0
            border-bottom 1px solid #ededed
        .finance-content-list-wrap
            padding 20px 0 20px
            // 公共样式结束
        .finance-content-r-c,.finance-content-l-c
            padding 0 20px
            .finance-content-more-icon
                height 14px
                width 14px
            .finance-content-item
                border 1px solid #f2f2f2
                padding 20px 10px
        .finance-strip-items
            
            margin-top 30px
            .finance-strip-item
                position relative
                margin-bottom 20px
                height 42px
                .finance-strip-bar
                    position relative
                    background #d8e9fd
                    border-radius 3px
                    padding 5px
                    height 42px
                    
            .finance-strip-item-text
                position absolute
                top 0
                left 0
                height 42px
                width 100%
                z-index 10
                cursor pointer
                .finance-strip-scale
                    width 14%
                    line-height 42px
                .finance-strip-item-info
                    width 85%
                    height 42px
                    color #666
                    font-size 12px
                    padding 5px 10px
        .lineHeight42
            line-height 42px
        .bgF5
            background-color #f5f5f5
        .colorRed
            color #FF4949
        .colorGreen
            color #13CE66
.notIcon
    margin: 40px auto
</style>