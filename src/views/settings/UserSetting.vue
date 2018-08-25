<template>
<div class="app-container tab-container">
   <el-row :gutter="20">
        <el-col :span="8">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">

                <el-tooltip class="item" effect="dark" content="必选" placement="bottom">
                    <el-form-item label="社区" prop="community">
                        <el-select v-model="selectedCommunity" placeholder="请选择" value-key="_id">
                            <el-option
                                v-for="community in community_list"
                                :key="community._id"
                                :label="community.community_name"
                                :value="community">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-tooltip>


                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')">立即创建</el-button>
                    <el-button @click="resetForm('userForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="14" :offset="2">
            <el-row :gutter="20" class="filter-container">
                <el-col :span="14">
                    <el-input v-model="search" placeholder="输入用户名称进行搜索"/>
                </el-col>
                <el-col :span="10">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-table
                    :data="user_list"
                    stripe
                    border
                    max-height="500"
                    style="width: 100%">

                    <el-table-column
                        prop="username"
                        label="用户名"
                        width="200">
                    </el-table-column>

                    <el-table-column
                        prop="community_name"
                        label="所在社区"
                        width="200">
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
            title="修改用户佣金"
            :visible.sync="dialogVisible"
            width="30%">

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </span>

            <el-form :model="user_row" :rules="rules" ref="user_row" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="user_name">
                    <el-input v-model="user_row.username"></el-input>
                </el-form-item>

                <el-form-item label="佣金" prop="user_benefit">
                    <el-input v-model="userBenefit"></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-row>
</div>
   
</template>

<script>
import {
  getAsteroid,
  addLeader,
  removeLeader,
  findLeader,
  updateLeader,
  getCommunityList
} from "@/api/leader";
import { showMessage } from "@/utils/showmessage";
import { getStorage } from "@/utils/auth";

export default {
  components: {},
  data() {
    return {
      selectedCommunity: {},

      community_list: [],

      user_roles: {
        admin: "超级管理员",
        leader: "社区管理员"
      },

      user_list: [],

      user_row: {},

      userBenefit: 0.0,

      userForm: {
        username: "",
        password: "",
        role: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入一个密码", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ]
      },

      search: "",

      dialogVisible: false
    };
  },

  created() {
    const asteroid = getAsteroid();
    const platform_id = getStorage()._id;

    asteroid.subscribe("leaders.all", platform_id);

    console.log(
      "leader sub id: " + asteroid.subscribe("leaders.all", platform_id).id
    );

    asteroid.ddp.on("added", ({ collection, id, fields }) => {
      console.log("added");
      console.log(fields);
      let contians = this.user_list.includes(item => {
        item.id === id;
      });
      if (!contians) {
        fields.id = id;
        this.user_list.push(fields);
      }
    });
    asteroid.ddp.on("changed", ({ collection, id, fields }) => {
      console.log("changed");
      console.log(fields);
      let index = this.user_list.findIndex(item => {
        return item.id == id;
      });
      console.log(index);
      if (index >= 0) {
        fields.id = id;
        let user = this.user_list[index];
        user.profile.benefit = fields.profile.benefit;
      }
    });
    asteroid.ddp.on("removed", ({ collection, id }) => {
      console.log("removed");
      this.user_list = this.user_list.filter(item => item.id !== id);
    });

    getCommunityList(platform_id).then(response => {
      if (response.code === 0) {
        this.community_list = response.list;
      }
    });
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userForm.platform_id = getStorage()._id;
          this.userForm.platform_name = getStorage().platform_name;
          this.userForm.role = "leader";
          this.userForm.community_id = this.selectedCommunity._id;
          this.userForm.community_name = this.selectedCommunity.community_name;
          this.userForm.pickups = this.selectedCommunity.pickups;
          addLeader(this.userForm)
            .then(response => {
              if (response.code === 0) {
                showMessage("用户添加成功", "success");
                this.resetForm("userForm");
                this.userForm.username = "";
              }
              if (response.code === -1) {
                showMessage("用户添加失败", "error");
              }
            })
            .catch(err => {
              if (err.error == 403) {
                showMessage("用户名已存在，请换个名字", "error");
              }
            });
        } else {
          showMessage("用户信息填写不合格", "error");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleClick(row) {
      this.user_row = row;
      this.userBenefit = row.profile.benefit;
      this.dialogVisible = true;
    },

    handleUpdate() {
      this.user_row.benefit = this.userBenefit;
      updateLeader(this.user_row).then(response => {
        if (response.code === 0) {
          showMessage("用户修改成功", "success");
          this.dialogVisible = false;
          this.user_row = {};
        }
        if (response.code === -1) {
          showMessage("用户修改失败", "error");
        }
      });
    },

    handleDelete(index, row) {
      removeLeader(row.id).then(response => {
        if (response.code === 0) {
          showMessage("用户删除成功", "success");
        }
        if (response.code === -1) {
          showMessage("用户删除失败", "error");
        }
      });
    }
  }
};
</script>
