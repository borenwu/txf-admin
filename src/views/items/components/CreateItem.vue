<template>
    <el-row :gutter="20">
        <el-col :lg="12">
            <el-form :model="itemForm" :rules="rules" ref="itemForm" label-width="100px" class="demo-ruleForm">
                <el-tooltip class="item" effect="dark" content="必选" placement="bottom">
                    <el-form-item label="商品">
                        <el-select v-model="selectedInventory" value-key="_id" placeholder="请选择">
                            <el-option
                                v-for="inventory in inventory_list"
                                :key="inventory._id"
                                :label="inventory.description"
                                :value="inventory">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-tooltip>

                <el-form-item label="订单标题" prop="title">
                    <el-input v-model="itemForm.title"></el-input>
                </el-form-item>

                <el-form-item label="订单描述" prop="description">
                    <el-input v-model="itemForm.description" type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="市场价" prop="market_price">
                    <el-input type="number" v-model="itemForm.market_price"></el-input>
                </el-form-item>

                <el-form-item label="促销价" prop="sale_price">
                    <el-input type="number" v-model="itemForm.sale_price"></el-input>
                </el-form-item>


                <el-tooltip class="item" effect="dark" content="商品单位" placement="bottom">
                    <el-form-item label="单位" prop="unit">
                        <el-input v-model="selectedInventory.unit"></el-input>
                    </el-form-item>
                </el-tooltip>


                <el-tooltip class="item" effect="dark" content="如果产品需要重新包装，请填写详细规格" placement="bottom">
                    <el-form-item label="规格" prop="spec">
                        <el-input v-model="itemForm.spec"></el-input>
                    </el-form-item>
                </el-tooltip>


                <el-form-item label="拼团素材图片" prob="images">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :auto-upload="true"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleImageSuccess"
                        :file-list="images"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="拼团促销日期">
                    <el-date-picker
                        v-model="date_range"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

             
                <el-form-item label="拼团促销社区">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox v-for="community in community_names" :key="community" :label="community"  @change="handleCheckedCitiesChange" border>
                            {{community}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('itemForm')">立即创建</el-button>
                    <el-button @click="resetForm('itemForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :lg="12">
            <el-row :gutter="20" class="filter-container">
                <el-col :span="14">
                    <el-input v-model="search" placeholder="输入商品名称进行搜索"/>
                </el-col>
                <el-col :span="10">
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>

            <el-row>
                <el-table
                    :data="item_list"
                    stripe
                    border
                    max-height="500"
                    style="width: 100%">

                    <el-table-column
                        fixed
                        prop="title"
                        label="订单标题"
                        width="160">
                        <template slot-scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>


                    <el-table-column
                        prop="market_price"
                        label="市场价"
                        width="80">
                        <template slot-scope="scope">
                            {{scope.row.market_price}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="sale_price"
                        label="促销价"
                        width="80">
                        <template slot-scope="scope">
                            {{scope.row.sale_price}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="unit"
                        label="单位"
                        width="80">
                        <template slot-scope="scope">
                            {{scope.row.unit}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="spec"
                        label="规格"
                        width="130">
                        <template slot-scope="scope">
                            {{scope.row.spec}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="open_date"
                        label="开始日期"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.open_date}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="close_date"
                        label="结束日期"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.close_date}}
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
                                @click="handleClick(scope.row)">详情
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
            title="拼团详情"
            :visible.sync="dialogVisible"
            width="30%">

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>

            <el-form :model="item_row" ref="item_row" label-width="100px" class="demo-ruleForm">
                <el-form-item label="订单标题" prop="title">
                    <el-input v-model="item_row.title" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="订单描述" prop="description">
                    <el-input v-model="item_row.description" type="textarea" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="市场价" prop="market_price">
                    <el-input type="number" v-model="item_row.market_price" readonly="readonly"></el-input>
                </el-form-item>

                <el-form-item label="促销价" prop="sale_price">
                    <el-input type="number" v-model="item_row.sale_price" readonly="readonly"></el-input>
                </el-form-item>


                <el-form-item label="单位" prop="unit">
                    <el-input v-model="item_row.unit" readonly="readonly"></el-input>
                </el-form-item>


                <el-form-item label="规格" prop="spec">
                    <el-input v-model="item_row.spec" readonly="readonly"></el-input>
                </el-form-item>


                <el-form-item label="拼团素材">
                    <el-carousel trigger="click" height="150px">
                        <el-carousel-item v-for="item in image_list" :key="item.id">
                            <img :src="item.url" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
import config from "@/api/config";
import {
  getAsteroid,
  getInventoryList,
  getCommunityList,
  addItem,
  removeItem
} from "@/api/item";
import { showMessage } from "@/utils/showmessage";
import { getStorage } from "@/utils/auth";

export default {
  components: {},
  data() {
    return {
      inventory_list: [],

      selectedInventory: {},

      item_row: {},

      itemForm: {
        title: "",
        description: "",
        market_price: 0.0,
        sale_price: 0.0,
        unit: "",
        spec: "",
        open_date: "",
        close_date: "",
        fileList: []
      },

      item_list: [],

      uploadUrl: `${config.host}/weapp/upload`,

      image_list: [],

      images: [],

      date_range: "",

      rules: {
        description: [
          { required: true, message: "请填写订单描述", trigger: "blur" }
        ],
        balance: [
          { required: true, message: "请输入一个数值", trigger: "blur" }
        ],
        sale_price: [{ required: true }]
      },

      search: "",

      dialogVisible: false,

      titles: ["备选社区", "选中社区"],

      communities: [],

      community_names:[],

      community_data: [],

      checkList: [],

      checkAll: false,

      isIndeterminate: true
    };
  },
  created() {
    const asteroid = getAsteroid();
    const platform_id = getStorage()._id;

    asteroid.subscribe("items.all", platform_id);

    asteroid.ddp.on("added", ({ collection, id, fields }) => {
      let contians = this.item_list.includes(item => {
        item.id === id;
      });
      if (!contians) {
        fields.id = id;
        this.item_list.push(fields);
      }
    });
    asteroid.ddp.on("changed", ({ collection, id, fields }) => {
      let index = this.item_list.findIndex(item => {
        return item.id == id;
      });
      console.log(index);
      if (index >= 0) {
        fields.id = id;
        let item = this.item_list[index];
        for (let k in Object.keys(fields)) {
          item[`${k}`] = fields[`${k}`];
        }
      }
    });
    asteroid.ddp.on("removed", ({ collection, id }) => {
      this.item_list = this.item_list.filter(item => item.id !== id);
    });

    getInventoryList(platform_id).then(response => {
      console.log(response);
      if (response.code === 0) {
        this.inventory_list = response.list;
      }
    });

    getCommunityList(platform_id).then(response => {
      console.log(response);
      if (response.code === 0) {
        let communities = response.list;
        this.communities = communities;
        this.communities.forEach(item => this.community_names.push(item.community_name))
      }
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.itemForm.inventory_id = this.selectedInventory._id;
          this.itemForm.inventory_name = this.selectedInventory.name;
          this.itemForm.inventory_description = this.selectedInventory.description;
          this.itemForm.inventory_thumbs = this.selectedInventory.fileList;
          this.itemForm.platform_id = getStorage()._id;
          this.itemForm.unit = this.selectedInventory.unit;
          this.itemForm.open_date = this.date_range[0];
          this.itemForm.close_date = this.date_range[1];

          for (let i = 0; i < this.checkList.length; i++) {
            for (let j = 0; j < this.communities.length; j++) {
              if (this.checkList[i] == this.communities[j].community_name) {
                this.community_data.push(this.communities[j]);
              }
            }
          }

          this.itemForm.communities = this.community_data;
          console.log(this.itemForm);

          addItem(this.itemForm).then(response => {
            if (response.code === 0) {
              showMessage("商品添加成功", "success");
              this.resetForm("itemForm");
              this.itemForm.fileList = [];
              this.images = [];
              this.community_data = [];
              this.checkList = [];
            }
            if (response.code === -1) {
              showMessage("商品添加失败", "error");
            }
          });
        } else {
          showMessage("商品信息填写不合格", "error");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleCheckAllChange(val) {
      this.checkList = val ? this.community_names : [];
      this.isIndeterminate = false;
    },

    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.community_names.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.community_names.length;
    },

    handleClick(row) {
      this.item_row = row;
      this.dialogVisible = true;
      this.image_list = this.item_row.fileList;
    },

    handleDelete(index, row) {
      const item_id = row.id;
      removeItem(item_id).then(response => {
        if (response.code === 0) {
          showMessage("商品删除成功", "success");
        }
        if (response.code === -1) {
          showMessage("商品删除失败", "error");
        }
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },

    handleImageSuccess(res) {
      let url = "http://" + res.data.url;
      let name = res.data.name;
      let file = { name: name, url: url, type: "image" };
      this.itemForm.fileList.push(file);
      this.images.push(file);
    }
  }
};
</script>

<style>
img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
