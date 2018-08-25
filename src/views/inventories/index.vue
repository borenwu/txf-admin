<template>
    <div class="app-container tab-container">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="库存管理" name="first">
                <inventory-setting></inventory-setting>
            </el-tab-pane>
            <el-tab-pane label="近期开放" name="second">近期开放</el-tab-pane>
            <el-tab-pane label="近期开放" name="third">近期开放</el-tab-pane>
            <el-tab-pane label="近期开放" name="fourth">近期开放</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import InventorySetting from './components/InventorySetting'

    export default {
        data() {
            return {
                activeName: 'first'
            };
        },

        components:{
            InventorySetting
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>

<style scoped>
    .tab-container{
        margin: 30px;
    }
</style>

