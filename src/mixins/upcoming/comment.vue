<script>
import { Axios } from "./../../api/axios";
import { Session } from "./../../api/axios";

export default {
    data() {
        return {
            defaultProps: {
                label: "treeName",
                children: "userlist",
                isLeaf: "leaf"
            },
            dialogVisible: false,
            loading: false,
            show: false,
            toDoList: [],
            backlogDetail: {},
            backlogRemark: "",
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            },
            searchData: {
                antistop: ""
            },
            pageSize: 5,
            multipleSelection: [],
            dialogTitle: null,
            // 搜索
            starttime: '',
            endtime: ''
        };
    },
    methods: {
        pickerOptions0() {

        },
        pickerOptions1() {

        },
        // 选择人员
        handleCheckChange(data, checkedNodes) {
            console.log(checkedNodes);
            let currentNode = checkedNodes.checkedNodes;
            let _newTaskuser = {
                name: "",
                id: ""
            };
            if (currentNode) {
                currentNode.forEach(item => {
                    if (!item.userlist) {
                        if(_newTaskuser.name) {
                            _newTaskuser.name += `,${item.staffname}`;
                            _newTaskuser.id += `,${item.userid}`;
                        } else {
                            _newTaskuser.name = `${item.staffname}`;
                            _newTaskuser.id = `${item.userid}`;
                        }
                    }
                });
            }
            this.taskuserName = _newTaskuser.name;
            this.taskuserId = _newTaskuser.id;
        },

        // 获取所有部门和对应人员
        getDepartList(reqBody, participantsList) {
          return  Axios(reqBody, "user")
                .then(res => {
                    let treeId = 0;
                    console.log(res.data);
                    if (res.state == 10001) {
                        this.departList = res.data.dept;
                    } else {
                        if (res.state == 10002) {
                            this.toDoList = [];
                        }
                        this.$message.error(res.msg);
                    }
                    
                    this.departList.forEach(deap => {
                    // 自定义对象属性
                        deap.treeName = deap.deptname + ` (${deap.deptnumber}人)`;
                        deap.treeId = ++treeId;
                        if (deap.deptnumber == 0) {
                            deap.disabled = true;
                        }
                        if (deap.userlist) {
                            deap.userlist.forEach(user => {
                                // 自定义对象属性
                                user.treeName = user.staffname;
                                user.treeId = ++treeId;
                            });
                            
                        }
                    });
                    if(participantsList) {
                        this.reselection(this.departList, participantsList)
                }
                }).then(res => {
                    // 待数据加载完毕，打开新建弹出层
                    this.dialogVisible = true;
                    console.log('this.departList:', this.departList);
                    // this.addCheckid();
                })
        },

        // 回选
        reselection(mainObj, filterObj) {
            this.checkedDeparList = [];
            mainObj.forEach(main1 => {
                        if(main1.userlist) {
                            main1.userlist.forEach(main2 => {
                                filterObj.forEach(filter1 => {
                                    if(main2.userid == filter1.userid) {
                                        // this.expandedDeparList = main2.treeId;
                                        this.checkedDeparList.push(main2.treeId);
                                    }
                                })
                            })
                        }
                    })

                    console.log('this.checkedDeparList:', this.checkedDeparList);
        },

        loadNode(node, resolve) {
            setTimeout(() => {
                //   var data;
                //   resolve(data);
            }, 500);
        },
        //New新建结束

        getFormulaBar(res) {
            console.log(res);
        },

        getCutTab(res) {
            console.log(res);
        },

        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        onDetails(row) {
            this.$router.push({
                path: "bidDetails",
                query: {
                    tabType: "accountInfo"
                }
            });
        },

        //获取列表数据
        getToDoList(reqBody) {
            this.loading = true;
            Axios(reqBody, "user")
                .then(res => {
                    console.log('res:', res);
                    
                    if (res.state == 10001) {
                        this.toDoList = res.data;
                    } else {
                        if (res.state == 10002) {
                            this.toDoList = [];
                        }
                        this.$message.error(res.msg);
                    }
                })
                .then(res => {
                    setTimeout(() => {
                        this.loading = false;
                    }, 2000);
                })
        },

        // 获取待办详情
        toDoDetail(reqBody, show) {
            Axios(reqBody, "user").then(res => {
                console.log(res);
                if (res.state == 10001) {
                    if (!show) {
                        this.show = true;
                    }

                    this.backlogDetail = res.data;
                    console.log("this.backlogDetail:", this.backlogDetail);
                } else {
                    if (res.state == 10002) {
                    }
                    this.$message.error(res.msg);
                }
            });
        },

        //发送评论
        onRecordAdd(reqBody, taskid) {
            return Axios(reqBody, "user").then(res => {
                console.log(res);
                if (res.state == 10001) {
                    this.$message.success("评论成功");
                    this.backlogRemark = "";
                    // this.getToDoList(1, reqBody);
                    // this.toDoDetail(taskid, true);
                } else {
                    if (res.state == 10002) {
                    }
                    this.$message.error(res.msg);
                }
            });
        },

        // 删除待办
        deleteToDo(reqBody) {
           return Axios(reqBody, 'user').then(res => {
               console.log('res:', res);
               if(res.state == 10001) {
                   this.$message.success('删除成功');
               } else {
                   this.$message.error(res.msg);
               }
            })
        },

        //创建、编辑待办
        establish(reqBody, taskId) {
            if (
                !this.newIssue.taskdescribe ||
                !this.newIssue.flag ||
                !this.taskuserId ||
                !this.newIssue.endtime
            ) {
                this.$message.error("请填写完整信息");
                return false;
            }

            return Axios(reqBody, "user").then(res => {
                console.log(res);
                if (res.state == 10001) {
                    if(!taskId) {
                        this.$message.success("新建成功");
                    } else {
                        this.$message.success("修改成功");
                    }
                    
                    this.dialogVisible = false;
                    this.taskuserId = "";
                    this.taskuserName = "";
                    this.newIssue.taskname = "";
                    this.newIssue.taskdescribe = "";
                    this.newIssue.flag = "";
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        //编辑相关
        editBacklog() {
            this.show = false;
            this.dialogVisible = true;
            this.getCurrentBacklog();
        }
    }
};
</script>