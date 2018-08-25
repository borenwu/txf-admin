<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-form :model="inventoryForm" :rules="rules" ref="inventoryForm" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="inventoryForm.name"></el-input>
                </el-form-item>
                <el-form-item label="原产地" prop="origin">
                    <el-input v-model="inventoryForm.origin"></el-input>
                </el-form-item>
                <el-form-item label="类目" prop="category">
                    <el-select v-model="inventoryForm.category" placeholder="请选择一个类目">
                        <el-option label="新鲜蔬菜" value="新鲜蔬菜"></el-option>
                        <el-option label="肉禽蛋品" value="肉禽蛋品"></el-option>
                        <el-option label="精品水果" value="精品水果"></el-option>
                        <el-option label="速冻食品" value="速冻食品"></el-option>
                        <el-option label="酒水冲调" value="酒水冲调"></el-option>
                        <el-option label="休闲食品" value="休闲食品"></el-option>
                        <el-option label="休闲饮料" value="休闲饮料"></el-option>
                        <el-option label="粮油副食" value="粮油副食"></el-option>
                        <el-option label="海鲜水产" value="海鲜水产"></el-option>
                        <el-option label="其他种类" value="其他种类"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产品介绍" prop="description">
                    <el-input type="textarea" v-model="inventoryForm.description"></el-input>
                </el-form-item>

                <el-form-item label="单位" prop="unit">
                    <el-input v-model="inventoryForm.unit"></el-input>
                </el-form-item>

                <el-form-item label="库存量" prop="balance">
                    <el-input type="number" v-model="inventoryForm.balance"></el-input>
                </el-form-item>

                <el-form-item label="佣金比例" prop="benefitRate">
                    <el-select v-model="inventoryForm.benefitRate" placeholder="请选择佣金比">
                        <el-option label="10%" value="0.10"></el-option>
                        <el-option label="11%" value="0.11"></el-option>
                        <el-option label="12%" value="0.12"></el-option>
                        <el-option label="13%" value="0.13"></el-option>
                        <el-option label="14%" value="0.14"></el-option>
                        <el-option label="15%" value="0.15"></el-option>
                        <el-option label="16%" value="0.16"></el-option>
                        <el-option label="17%" value="0.17"></el-option>
                        <el-option label="18%" value="0.18"></el-option>
                        <el-option label="19%" value="0.19"></el-option>
                        <el-option label="20%" value="0.20"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产品头像图片" prop="thumb">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :auto-upload="true"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleThumbSuccess"
                        :file-list="thumbs"
                        list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="submitForm('inventoryForm')">立即创建</el-button>
                    <el-button @click="resetForm('inventoryForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="14" :offset="2">
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
                    :data="inventory_list"
                    stripe
                    border
                    max-height="500"
                    style="width: 100%">

                    <el-table-column
                        fixed
                        prop="name"
                        label="商品名称"
                        width="100">
                        <template slot-scope="scope">
                            {{scope.row.name}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="origin"
                        label="原产地"
                        width="120">
                        <template slot-scope="scope">
                            {{scope.row.origin}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="category"
                        label="类目"
                        width="120">
                        <template slot-scope="scope">
                            {{scope.row.category}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="description"
                        label="产品介绍"
                        width="300">
                        <template slot-scope="scope">
                            {{scope.row.description}}
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
                        prop="balance"
                        label="库存量"
                        width="80">
                        <template slot-scope="scope">
                            {{scope.row.balance}}
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
            title="修改商品"
            :visible.sync="dialogVisible"
            width="30%">

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </span>

            <el-form :model="inventory_row" :rules="rules" ref="inventory_row" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="inventory_row.name"></el-input>
                </el-form-item>
                <el-form-item label="原产地" prop="origin">
                    <el-input v-model="inventory_row.origin"></el-input>
                </el-form-item>
                <el-form-item label="类目" prop="category">
                    <el-select v-model="inventory_row.category" placeholder="请选择一个类目">
                        <el-option label="新鲜蔬菜" value="新鲜蔬菜"></el-option>
                        <el-option label="肉禽蛋品" value="肉禽蛋品"></el-option>
                        <el-option label="精品水果" value="精品水果"></el-option>
                        <el-option label="速冻食品" value="速冻食品"></el-option>
                        <el-option label="酒水冲调" value="酒水冲调"></el-option>
                        <el-option label="休闲食品" value="休闲食品"></el-option>
                        <el-option label="休闲饮料" value="休闲饮料"></el-option>
                        <el-option label="粮油副食" value="粮油副食"></el-option>
                        <el-option label="海鲜水产" value="海鲜水产"></el-option>
                        <el-option label="其他种类" value="其他种类"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="产品介绍" prop="description">
                    <el-input type="textarea" v-model="inventory_row.description"></el-input>
                </el-form-item>

                <el-form-item label="单位" prop="unit">
                    <el-input v-model="inventory_row.unit"></el-input>
                </el-form-item>

                <el-form-item label="库存量" prop="balance">
                    <el-input type="number" v-model="inventory_row.balance"></el-input>
                </el-form-item>

                <el-form-item label="佣金比例" prop="benefitRate">
                     <el-select v-model="inventory_row.benefitRate" placeholder="请选择佣金比">
                        <el-option label="10%" value="0.10"></el-option>
                        <el-option label="15%" value="0.15"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-row>
</template>

<script>
    import config from '@/api/config'
    import {getAsteroid, addInventory, findInventory, removeInventory, updateInventory, subscribeInventory} from "@/api/inventory";
    import {showMessage} from "@/utils/showmessage";
    import {getStorage} from "@/utils/auth";

    export default {
        components: {},
        data () {
            return {
                inventory_list: [],

                inventory_row: {},

                inventoryForm: {
                    name: '',
                    origin: '',
                    category: '',
                    description: '',
                    unit: '',
                    balance: 0.0,
                    benefitRate:0.0,
                    fileList:[]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    origin: [
                        {required: true, message: '请输入原产地', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    category: [
                        {required: true, message: '请选择一个类目', trigger: 'change'}
                    ],
                    description: [
                        {required: true, message: '请填写产品介绍', trigger: 'blur'}
                    ],
                    unit: [
                        {required: true, message: '请输入单位', trigger: 'blur'}
                    ],
                    balance: [
                        {required: true, message: '请输入一个数值', trigger: 'blur'}
                    ],
                },

                search: '',

                dialogVisible: false,

                thumbs: [],
                uploadUrl: `${config.host}/weapp/upload`,
            };
        },
        beforeCreate () {

        },
        created () {
            const asteroid = getAsteroid()
            const platform_id = getStorage ()._id

            asteroid.subscribe ("inventories.all", platform_id);

            console.log ("sub id: " + asteroid.subscribe ("inventories.all", platform_id).id)

            asteroid.ddp.on ("added", ({collection, id, fields}) => {
                console.log ('added')
                console.log (fields)
                let contains = this.inventory_list.includes ((item) => {
                    item.id === id
                })
                if (!contains) {
                    fields.id = id
                    this.inventory_list.push (fields)
                }
            });
            asteroid.ddp.on ("changed", ({collection, id, fields}) => {
                console.log ('changed')
                console.log (fields)
                let keys = Object.keys(fields)
                let contains = keys.includes('balance')
                if(contains){
                    console.log('contains balance')
                    let index = this.inventory_list.findIndex(item => {
                        return item.id == id;
                    });

                    if (index >= 0) {
                        fields.id = id;
                        let item = this.inventory_list[index];
                        item.balance = fields.balance;
                    }
                }else{
                    let index = this.inventory_list.findIndex((item) => {
                        return item.id == id
                    })
                    if (index >= 0) {
                        fields.id = id
                        let inventory = this.inventory_list[index]
                        for(let k in Object.keys(fields)) {
                            inventory[`${k}`] = fields[`${k}`]
                        }
                    }
                }

            });
            asteroid.ddp.on ("removed", ({collection, id}) => {
                console.log ('removed')
                this.inventory_list = this.inventory_list.filter(item => item.id !== id);
            });
        },
        beforeMount () {

        },
        mounted () {


        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate ((valid) => {
                    if (valid) {
                        this.inventoryForm.platform_id = getStorage ()._id
                        addInventory (this.inventoryForm).then (response => {
                            if (response.code === 0) {
                                showMessage ('商品添加成功', 'success')
                                this.resetForm ('inventoryForm')
                                this.inventoryForm.fileList = []
                                this.thumbs = []
                            }
                            if (response.code === -1) {
                                showMessage ('商品添加失败', 'error')
                            }
                        })
                    } else {
                        showMessage ('商品信息填写不合格', 'error')
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields ();
            },

            handleClick (row) {
                this.inventory_row = row
                this.dialogVisible = true
            },

            handleUpdate () {
                updateInventory (this.inventory_row).then (response => {
                    if (response.code === 0) {
                        showMessage ('商品修改成功', 'success')
                        // let updatedItem = data.data.item
                        // let index = this.item_list.findIndex ((item) => item.id === updatedItem.id)
                        // // this.item_list[index] = updatedItem
                        this.inventory_row = {}
                        this.dialogVisible = false
                    }
                    if (response.code === -1) {
                        showMessage ('商品修改失败', 'error')
                    }
                })
            },

            handleDelete (index, row) {
                let inventory_id = row.id
                removeInventory(inventory_id).then(response=>{
                    if (response.code === 0) {
                        showMessage ('商品删除成功', 'success')
                    }
                    if (response.code === -1) {
                        showMessage ('商品删除失败', 'error')
                    }
                })
            },

            handleClose (done) {
                this.$confirm ('确认关闭？')
                    .then (_ => {
                        done ();
                    })
                    .catch (_ => {
                    });
            },

            handleRemove (file, fileList) {
                // console.log(file, fileList);
            },
            handlePreview (file) {
                // console.log(file);
            },

            handleThumbSuccess (res) {
                let url = 'http://' + res.data.url
                let name = res.data.name
                let file = {name: name, url: url, type: 'thumb'}
                console.log(file)
                this.inventoryForm.fileList.push (file)
                this.thumbs.push (file)
            },

        }
    }
</script>
