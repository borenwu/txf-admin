<template>
    <div>
        <el-button style='margin:0 0 20px 20px;' type="primary" icon="document" @click="handleDownload">
            {{$t('excel.export')}} excel
        </el-button>
        <el-row :gutter="20" class="filter-container">
            <el-col :span="12">
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
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
            </el-col>
        </el-row>

        <el-table
            :data="orders"
            stripe
            border
            max-height="500"
            style="width: 100%">

            <el-table-column
                fixed
                prop="orderDate"
                label="订单时间"
                width="160">
                <template slot-scope="scope">
                    {{scope.row.orderDate}}
                </template>
            </el-table-column>

            <el-table-column
                prop="community_name"
                label="社区名称"
                width="100">
                <template slot-scope="scope">
                    {{scope.row.community_name}}
                </template>
            </el-table-column>

            <el-table-column
                prop="item_title"
                label="商品名称"
                width="160">
                <template slot-scope="scope">
                    {{scope.row.item_title}}
                </template>
            </el-table-column>

            <el-table-column
                prop="name"
                label="客户"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>

            <el-table-column
                prop="wechat"
                label="微信用户名"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.wechat}}
                </template>
            </el-table-column>

            <el-table-column
                prop="phone"
                label="电话"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.phone}}
                </template>
            </el-table-column>

            <el-table-column
                prop="address"
                label="地址"
                width="200">
                <template slot-scope="scope">
                    {{scope.row.address}}
                </template>
            </el-table-column>

            <el-table-column
                prop="sale_price"
                label="单价"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.sale_price}}
                </template>
            </el-table-column>

            <el-table-column
                prop="num"
                label="订单量"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.num}}
                </template>
            </el-table-column>

            <el-table-column
                prop="morePrice"
                label="销售额"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.morePrice}}
                </template>
            </el-table-column>

            <el-table-column
                prop="pickMethod"
                label="配送方式"
                width="120">
                <template slot-scope="scope">
                    {{scope.row.pickMethod}}
                </template>
            </el-table-column>

            <el-table-column
                fixed="right"
                prop="deliver"
                label="订单状态"
                width="300">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.deliver | statusFilter">{{scope.row.deliver ? '已交付' : '未交付'}}</el-tag>
                </template>
            </el-table-column>


        </el-table>
    </div>

</template>

<script>
    import {getOrderList} from "@/api/statistic";
    import {getStorage} from "@/utils/auth";
    const moment = require('moment')

    export default {
        props: ["orderList", "communityid","community_name"],

        watch: {
            orderList: function (newValue, oldValue) {
                this.orders = newValue.filter (
                    item => item.community_id === this.communityid
                );
            }
        },

        created () {
            this.cid = this.communityid;
            this.loading = true;
            this.orders = this.orderList.filter (
                item => item.community_id === this.communityid
            );
            this.loading = false;
        },
        data () {
            return {
                cid: "",
                orders: [],
                loading: false,
                autoWidth: true,
                date_range: ""
            };
        },
        filters: {
            statusFilter (status) {
                const statusMap = {
                    true: "success",
                    false: "danger"
                };
                return statusMap[status];
            }
        },
        methods: {
            handleDownload () {
                import("@/vendor/Export2Excel").then (excel => {
                    const tHeader = [
                        "订单时间",
                        "社区名称",
                        "商品名称",
                        "客户",
                        "微信用户名",
                        "电话",
                        "地址",
                        "单价",
                        "订单量",
                        "销售额"
                    ];
                    const filterVal = [
                        "orderDate",
                        "community_name",
                        "item_title",
                        "name",
                        "wechat",
                        "phone",
                        "address",
                        "sale_price",
                        "num",
                        "morePrice"
                    ];
                    const list = this.orders;
                    const data = this.formatJson (filterVal, list);
                    const filename = this.community_name + '-' + moment().format('YYYYMMDD')
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
            handleSearch () {
                const startDate = this.date_range[0] + " " + "00:00:00"
                const endDate = this.date_range[1] + " " + "23:59:59"
                const query = {
                    orderDate: {"$gte": startDate, "$lte": endDate},
                    community_id: this.cid
                }
                const platform_id = getStorage ()._id;
                getOrderList (platform_id, query).then (response => {
                    let list = response.list
                    list.forEach(item=>{
                        item.wechat = item.wechatUser.nickName
                    })
                    this.orders = list
                })
            }
        }
    };
</script>

