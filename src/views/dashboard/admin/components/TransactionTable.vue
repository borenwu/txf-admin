<template>
    <el-table :data="user_list" style="width: 100%;padding-top: 15px;" height="250">
        <el-table-column prop="username" label="用户名" width="150">
            <template slot-scope="scope">
                {{scope.row.username}}
            </template>
        </el-table-column>
        <el-table-column prop="community_name" label="平台" width="150" align="center">
            <template slot-scope="scope">
                {{scope.row.profile.platform_name}}
            </template>
        </el-table-column>
        <el-table-column prop="community_name" label="所在社区" width="150" align="center">
            <template slot-scope="scope">
                {{scope.row.profile.community_name}}
            </template>
        </el-table-column>
        <el-table-column
            prop="benefit"
            label="佣金"
            width="200">
            <template slot-scope="scope">
                {{scope.row.profile.benefit}}
            </template>
        </el-table-column>
        <el-table-column
            label="操作"
            width="150"
        >
            <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" content="在月底结算时点击，如果佣金到账，请点击按钮" placement="top">
                    <el-button type="primary" plain @click="handleClick(scope.row)">发放佣金</el-button>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getAsteroid, cashBenefit} from "@/api/leader";
    import {showMessage} from "@/utils/showmessage";
    import {getStorage} from "@/utils/auth";

    const moment = require ("moment");

    export default {
        data () {
            return {
                user_list: [],
                visible: false
            };
        },
        filters: {
            statusFilter (status) {
                const statusMap = {
                    success: "success",
                    pending: "danger"
                };
                return statusMap[status];
            }
        },
        created () {
            const asteroid = getAsteroid ();
            const platform_id = getStorage ()._id;

            asteroid.subscribe ("leaders.all", platform_id);

            console.log (
                "leader sub id: " + asteroid.subscribe ("leaders.all", platform_id).id
            );

            asteroid.ddp.on ("added", ({collection, id, fields}) => {
                console.log ("added");
                console.log (fields);
                let contians = this.user_list.includes (item => {
                    item.id === id;
                });
                if (!contians) {
                    fields.id = id;
                    this.user_list.push (fields);
                }
            });
            asteroid.ddp.on ("changed", ({collection, id, fields}) => {
                console.log ("changed");
                console.log (fields);
                let index = this.user_list.findIndex (item => {
                    return item.id == id;
                });
                console.log (index);
                if (index >= 0) {
                    fields.id = id;
                    let user = this.user_list[index];
                    user.profile.benefit = fields.profile.benefit;
                }
            });
            asteroid.ddp.on ("removed", ({collection, id}) => {
                console.log ("removed");
                this.user_list = this.user_list.filter (item => item.id !== id);
            });
        },
        methods: {
            handleClick (row) {
                console.log (row);
                let logDate = moment ().format ("YYYY-MM-DD");
                let log = {
                    logDate: logDate,
                    userID: row.id,
                    username: row.username,
                    platform_id: row.profile.platform_id,
                    platform_name: row.profile.platform_name,
                    community_id: row.profile.community_id,
                    community_name: row.profile.community_name,
                    cashBenefit: row.profile.benefit
                };
                cashBenefit (log).then (response => {
                    console.log (response);
                });
                this.visible = false;
            }
        }
    };
</script>
