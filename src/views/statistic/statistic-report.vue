<template>
    <div class="app-container tab-container">
        <el-tabs style='margin-top:15px;' v-model="activeName" type="border-card">
          <el-tab-pane v-for="(item) in community_list" :label="item.community_name" :key='item._id' :name="item.community_name">
            <keep-alive>
              <sta-table v-if='activeName==item.community_name' :communityid=item._id :orderList="order_list" :community_name=item.community_name></sta-table>
            </keep-alive>
          </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import config from "@/api/config";
import { getAsteroid, getCommunityList, getOrderList } from "@/api/statistic";
import { showMessage } from "@/utils/showmessage";
import { getStorage } from "@/utils/auth";
import StaTable from "./components/StaTable";
const moment = require('moment')

export default {
  data() {
    return {
      activeName: "first",

      community_list: [],

      activeName: "",

      order_list: []
    };
  },

  components: {
    "sta-table": () => import("./components/StaTable")
  },

  created() {
    const asteroid = getAsteroid();
    const platform_id = getStorage()._id;

    const today = moment().format('YYYY-MM-DD HH:mm:ss')
    let thisMonth = moment().month()
    let thisYear = moment().year()
    const beginOfThisMonth = moment([thisYear, thisMonth,1,0,0,0]).format('YYYY-MM-DD HH:mm:ss')
    console.log(beginOfThisMonth)
    console.log(today)

    let query = {orderDate: { "$gte": beginOfThisMonth, "$lte": today } };
    asteroid.subscribe("orders.all", platform_id, query);

    asteroid.ddp.on("added", ({ collection, id, fields }) => {
      console.log('added')
      let contians = this.order_list.includes(item => {
        item.id === id;
      });
      if (!contians) {
        fields.id = id;
        fields.wechat = fields.wechatUser.nickName;
        this.order_list.push(fields);
      }
    });
    asteroid.ddp.on("changed", ({ collection, id, fields }) => {
      let index = this.order_list.findIndex(item => {
        return item.id == id;
      });

      if (index >= 0) {
        fields.id = id;
        let item = this.order_list[index];
        item.deliver = true;
      }
    });
    asteroid.ddp.on("removed", ({ collection, id }) => {
      this.order_list = this.order_list.filter(item => item.id !== id);
    });

    getCommunityList(platform_id).then(response => {
      if (response.code === 0) {
        let communities = response.list;
        this.community_list = communities;
      }
    });

    // getOrderList(platform_id).then(response => {

    //   if (response.code === 0) {
    //     let orders = response.list;
    //     this.order_list2 = orders;
    //   }
    // });
  },

  methods: {
    handleClick(tab, event) {}
  }
};
</script>

