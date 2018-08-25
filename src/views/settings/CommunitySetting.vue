<template>
<div class="app-container tab-container">
      <el-row :gutter="20">
        <el-col :span="8">
            <el-form :model="communityForm" :rules="rules" ref="communityForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="社区名称" prop="community_name">
                    <el-input v-model="communityForm.community_name"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-input v-model="communityForm.province"></el-input>
                </el-form-item>


                <el-form-item label="城市" prop="city">
                    <el-input v-model="communityForm.city"></el-input>
                </el-form-item>

                <el-form-item label="社区介绍" prop="description">
                    <el-input type="textarea" v-model="communityForm.description"></el-input>
                </el-form-item>

                <el-form-item label="添加自提点">
                    <el-row>
                        <el-col :span="12"><el-input v-model="pickup"></el-input></el-col>
                        <el-col :span="8" :offset="4"><el-button type="primary" icon="el-icon-plus" circle @click="addPickup"></el-button></el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="自提点" prop="description">
                    <el-tag
                        v-for="pick in communityForm.pickups"
                        :key="pick"
                        closable
                        @close="handleClose(pick)"
                        type="warning">
                        {{pick}}
                    </el-tag>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('communityForm')">立即创建</el-button>
                    <el-button @click="resetForm('communityForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="14" :offset="2">
            <el-row :gutter="20" class="filter-container">
                <el-col :span="14">
                    <el-input v-model="search" placeholder="输入社区名称进行搜索"/>
                </el-col>
                <el-col :span="10">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-table
                    :data="community_list"
                    stripe
                    border
                    max-height="500"
                    style="width: 100%">

                    <el-table-column
                        fixed
                        prop="community_name"
                        label="社区名称"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.community_name}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="province"
                        label="省份"
                        width="120">
                        <template slot-scope="scope">
                            {{scope.row.province}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="city"
                        label="城市"
                        width="120">
                        <template slot-scope="scope">
                            {{scope.row.city}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="description"
                        label="社区介绍"
                        width="300">
                        <template slot-scope="scope">
                            {{scope.row.description}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="操作"
                        fixed="right"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleClick(scope.row)">编辑
                            </el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-col>

        <el-dialog
            title="修改社区"
            :visible.sync="dialogVisible"
            width="30%">

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </span>

            <el-form :model="community_row" :rules="rules" ref="community_row" label-width="100px" class="demo-ruleForm">
                <el-form-item label="社区名称" prop="community_name">
                    <el-input v-model="community_row.community_name"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-input v-model="community_row.province"></el-input>
                </el-form-item>

                <el-form-item label="城市" prop="city">
                    <el-input v-model="community_row.city"></el-input>
                </el-form-item>

                <el-form-item label="社区介绍" prop="description">
                    <el-input type="textarea" v-model="community_row.description"></el-input>
                </el-form-item>

            </el-form>
        </el-dialog>
    </el-row>
</div>
  
</template>

<script>
import config from "@/api/config";
import {
  getAsteroid,
  addCommunity,
  findCommunity,
  removeCommunity,
  updateCommunity
} from "@/api/community";
import { showMessage } from "@/utils/showmessage";
import { getStorage } from "@/utils/auth";

export default {
  components: {},
  data() {
    return {
      community_list: [],

      community_row: {},

      pickup: "",

      communityForm: {
        community_name: "",
        province: "",
        city: "",
        description: "",
        pickups: []
      },
      rules: {
        community_name: [
          { required: true, message: "请输入社区名称", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请输入省份", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],

        description: [
          { required: true, message: "请填写社区介绍", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }]
      },

      search: "",

      dialogVisible: false
    };
  },
  created() {
    const asteroid = getAsteroid();
    const platform_id = getStorage()._id;

    asteroid.subscribe("communitis.all", platform_id);

    console.log(
      "sub id: " + asteroid.subscribe("communitis.all", platform_id).id
    );

    asteroid.ddp.on("added", ({ collection, id, fields }) => {
      console.log("added");
      console.log(fields);
      let contians = this.community_list.includes(item => {
        item.id === id;
      });
      if (!contians) {
        fields.id = id;
        this.community_list.push(fields);
      }
    });
    asteroid.ddp.on("changed", ({ collection, id, fields }) => {
      console.log("changed");
      console.log(fields);
      let index = this.community_list.findIndex(item => {
        return item.id == id;
      });
      console.log(index);
      if (index >= 0) {
        fields.id = id;
        let inventory = this.community_list[index];
        for (let k in Object.keys(fields)) {
          inventory[`${k}`] = fields[`${k}`];
        }
      }
    });
    asteroid.ddp.on("removed", ({ collection, id }) => {
      console.log("removed");
      this.community_list = this.community_list.filter(item => item.id !== id);
    });
  },
  methods: {
    addPickup() {
      if (this.pickup != "") {
        this.communityForm.pickups.push(this.pickup);
        this.pickup = "";
      }
    },

    handleClose(tag) {
      this.communityForm.pickups.splice(
        this.communityForm.pickups.indexOf(tag),
        1
      );
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.communityForm.platform_id = getStorage()._id;
          addCommunity(this.communityForm).then(response => {
            if (response.code === 0) {
              showMessage("社区添加成功", "success");
              this.resetForm("communityForm");
              this.communityForm.pickups = [];
            }
            if (response.code === -1) {
              showMessage("社区添加失败", "error");
            }
          });
        } else {
          showMessage("社区信息填写不合格", "error");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleClick(row) {
      this.community_row = row;
      this.dialogVisible = true;
    },

    handleUpdate() {
      updateCommunity(this.community_row).then(response => {
        if (response.code === 0) {
          showMessage("社区修改成功", "success");
          // let updatedItem = data.data.community
          // let index = this.community_list.findIndex((item) => item.id === updatedItem.id)
          // this.community_list.splice(index, 1, updatedItem)
          // // this.community_list[index] = updatedItem
          this.community_row = {};
          this.dialogVisible = false;
        }
        if (response.code === -1) {
          showMessage("社区修改失败", "error");
        }
      });
    },

    handleDelete(index, row) {
      let community_id = row.id;
      removeCommunity(community_id).then(response => {
        if (response.code === 0) {
          showMessage("社区删除成功", "success");
        }
        if (response.code === -1) {
          showMessage("社区删除失败", "error");
        }
      });
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
