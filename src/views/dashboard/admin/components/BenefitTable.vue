<template>
    <div>

        <el-row :gutter="20" class="filter-container">
            <el-col :span="8">
                <div class="block">
                    <span class="demonstration">按日期检索</span>
                    <el-date-picker
                        v-model="date_range"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
            </el-col>
            <el-col :span="1">
                <el-button style='margin:0 0 20px 20px;' type="primary" icon="document" @click="handleDownload">
                    {{$t('excel.export')}} excel
                </el-button>
            </el-col>
        </el-row>
        <el-table :data="log_list"  border height="250">
            <el-table-column prop="logDate" label="日期" width="150">
                <template slot-scope="scope">
                    {{scope.row.logDate}}
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="150">
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>
            <el-table-column prop="platform_name" label="平台" width="150" align="center">
                <template slot-scope="scope">
                    {{scope.row.platform_name}}
                </template>
            </el-table-column>
            <el-table-column prop="community_name" label="所在社区" width="150" align="center">
                <template slot-scope="scope">
                    {{scope.row.community_name}}
                </template>
            </el-table-column>
            <el-table-column
                prop="cashBenefit"
                label="提取佣金"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.cashBenefit}}
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import {getAsteroid,getCashLogs} from "@/api/cashlog";
    import {showMessage} from "@/utils/showmessage";
    import {getStorage} from "@/utils/auth";

    const moment = require ("moment");

    export default {
        data () {
            return {
                log_list: [],
                date_range: '',
                filename: "test",
            };
        },
        created () {
            const asteroid = getAsteroid ();
            const platform_id = getStorage ()._id;

            const today = moment ().format ('YYYY-MM-DD')
            let thisMonth = moment ().month ()
            let thisYear = moment ().year ()
            const beginOfThisMonth = moment ([thisYear, thisMonth]).format ('YYYY-MM-DD')

            let query = {logDate: {"$gte": beginOfThisMonth, "$lte": today}};

            getCashLogs(platform_id,query).then(response=>{
                if(response.code === 0) {
                    this.log_list = response.list
                }
            })
        },
        methods: {
            handleDownload() {
                import("@/vendor/Export2Excel").then(excel => {
                    const tHeader = [
                        "日期",
                        "用户名",
                        "平台",
                        "所在社区",
                        "提取佣金",
                    ];
                    const filterVal = [
                        "logDate",
                        "username",
                        "platform_name",
                        "community_name",
                        "cashBenefit"
                    ];
                    const list = this.log_list;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel({
                        header: tHeader,
                        data,
                        filename: this.filename,
                        autoWidth: this.autoWidth
                    });
                });
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v =>
                    filterVal.map(j => {
                        if (j === "cashBenefit") {
                            return parseFloat(v[j]);
                        } else {
                            return v[j];
                        }
                    })
                );
            },
            handleSearch () {
                const startDate = this.date_range[0]
                const endDate = this.date_range[1]
                const query = {
                    logDate:{"$gte":startDate,"$lte":endDate},
                }
                const platform_id = getStorage()._id;
                getCashLogs(platform_id,query).then(response=>{
                    console.log(response.list)
                    this.log_list = response.list
                })
            }
        }
    };
</script>
