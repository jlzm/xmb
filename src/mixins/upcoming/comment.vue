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
            pageSize: 4,
            multipleSelection: [],
            formulaList: {
                //编辑栏按钮数
                parent: "marketClue",
                left: [
                    {
                        title: "编辑",
                        clickEvent: "compile",
                        icon: "icon-iconfontedit"
                    }
                ],
                right: [
                    {
                        title: "新建",
                        clickEvent: "changeState",
                        icon: "icon-bianji"
                    }
                ]
            },

            dialogTitle: null
        };
    },
    methods: {

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
        getDepartList(reqBody) {
            Axios(reqBody, "user")
                .then(res => {
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
                        deap.treeName =
                            deap.deptname + ` (${deap.deptnumber}人)`;
                        if (deap.deptnumber == 0) {
                            deap.disabled = true;
                        }
                        if (deap.userlist) {
                            let userId = 0;
                            deap.userlist.forEach(user => {
                                // console.log('user:', user);
                                user.treeName = user.staffname;
                            });
                        }
                    });
                    // console.log('this.departList:', this.departList);
                    // this.addCheckid();
                })
                .then(res => {
                    // 待数据加载完毕，打开新建弹出层
                    this.dialogVisible = true;
                    // this.setCheckedNodes();
                    // this.loading = false;
                });
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
                    console.log(res);
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
                        this.show = !this.show;
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

        //创建待办
        establish(reqBody) {
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
                    this.$message.success("新建成功");
                    this.dialogVisible = false;
                    this.taskuserId = "";
                    this.taskuserName = "";
                    this.newIssue.taskname = "";
                    this.newIssue.taskdescribe = "";
                    this.newIssue.flag = "";
                    // this.getToDoList(1, reqBody);
                } else {
                    this.$message.error(res.msg);
                }
            });
        },

        //编辑相关
        editBacklog() {
            this.show = false;
            this.dialogTitle = "编辑待办";
            this.dialogVisible = true;

            this.getCurrentBacklog();
        }
    }
};
</script>