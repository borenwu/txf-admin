<template>
    <div class="app-container tab-container">
        <el-row :gutter="8">
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}"
                    style="padding-right:8px;margin-bottom:30px;">
                <div class="block">
                    <span class="demonstration">请选择时间段</span>

                    <el-date-picker
                        v-model="date_range"
                        type="daterange"
                        range-separator="至 "
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>

                </div>
                <br>
                <span class="demonstration">这个时间段的总销售额：{{sum}}</span>
            </el-col>
        </el-row>

        <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>各社区销售额</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="document"
                                   @click="handleDownload1">
                            {{$t('excel.export')}} excel
                        </el-button>
                    </div>
                    <div>
                        <el-table
                            :data="sales_stat"
                            stripe
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="community"
                                label="社区"
                                >
                                <template slot-scope="scope">
                                    {{scope.row._id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="total"
                                label="销售额"
                                >
                                <template slot-scope="scope">
                                    {{scope.row.total}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>

            </el-col>

            <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>各开团项目销量</span>
                        <el-button style="float: right; padding: 3px 0" type="text" icon="document"
                                   @click="handleDownload2">
                            {{$t('excel.export')}} excel
                        </el-button>
                    </div>
                    <div>
                        <el-table
                            :data="item_num_stat"
                            stripe
                            border
                            style="width: 100%">
                            <el-table-column
                                prop="item_title"
                                label="开团项目"
                            >
                                <template slot-scope="scope">
                                    {{scope.row._id}}
                                </template>
                            </el-table-column>

                            <el-table-column
                                prop="total"
                                label="销量"
                            >
                                <template slot-scope="scope">
                                    {{scope.row.total}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>

            </el-col>
        </el-row>

    </div>
</template>

<script>
    import config from "@/api/config";
    import {getAsteroid, getSoFarSales, getItemStat, getItemTitle} from "@/api/statistic";
    import {showMessage} from "@/utils/showmessage";
    import {getStorage} from "@/utils/auth";

    const moment = require("moment");

    export default {
        data() {
            return {
                date_range: "",
                sales_stat: [],
                item_num_stat: [],
                sum: 0,
                platform_id: ''
            };
        },

        created() {
            // const asteroid = getAsteroid();
            this.platform_id = getStorage()._id;
        },

        methods: {
            handleSearch() {
                const startDate = this.date_range[0] + " " + "00:00:00"
                const endDate = this.date_range[1] + " " + "23:59:59"
                getSoFarSales(this.platform_id, startDate, endDate).then(response => {
                    if (response.code == 0) {
                        let sum = 0
                        let result = response.result
                        this.sales_stat = result
                        this.sales_stat.forEach(item=>{
                            sum = sum + item.total
                        })
                        this.sum = sum
                    }

                })
                getItemStat(this.platform_id, startDate, endDate).then(response => {
                    if (response.code == 0) {
                        let result = response.result
                        this.item_num_stat = result
                    }
                })


            },

            handleDownload1() {
                import("@/vendor/Export2Excel").then (excel => {
                    const tHeader = [
                        "社区名称",
                        "销售额"
                    ];
                    const filterVal = [
                        "_id",
                        "total"
                    ];
                    const list = this.sales_stat;
                    const data = this.formatJson (filterVal, list);
                    const filename = "各社区销售额汇总" + '-' + this.date_range[0] + '-' + this.date_range[1]
                    excel.export_json_to_excel ({
                        header: tHeader,
                        data,
                        filename: filename,
                        autoWidth: this.autoWidth
                    });
                });
            },

            handleDownload2() {
                import("@/vendor/Export2Excel").then (excel => {
                    const tHeader = [
                        "开团项目",
                        "销量"
                    ];
                    const filterVal = [
                        "_id",
                        "total"
                    ];
                    const list = this.item_num_stat;
                    const data = this.formatJson (filterVal, list);
                    const filename = "开团项目销量汇总" + '-' + this.date_range[0] + '-' + this.date_range[1]
                    excel.export_json_to_excel ({
                        header: tHeader,
                        data,
                        filename: filename,
                        autoWidth: this.autoWidth
                    });
                });
            },

            formatJson (filterVal, jsonData) {
                return jsonData.map (v =>
                    filterVal.map (j => {
                        if (j === "sale_price" || j === "num" || j === "morePrice") {
                            return parseFloat (v[j]);
                        } else {
                            return v[j];
                        }
                    })
                );
            },
        }
    };
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        /*width: 480px;*/
        margin-left: 5px;
    }
</style>
