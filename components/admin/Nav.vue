<template>
    <el-menu
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
            style="z-index: 100; position: fixed; width: 100%; "
    >
        <el-menu-item index="/" style=""><h2>{{getLang(location, 'app_name')}}</h2></el-menu-item>
        <template style="float: right">
            <el-menu-item style="float: right;"><i style="color: white" class="el-icon-switch-button"></i>Logout</el-menu-item>
            <el-menu-item style="float: right;">Welcome, Тищенко Артем Юрьевич</el-menu-item>

        </template>
    </el-menu>
</template>

<script>
    export default {

    }
</script>

<style scoped>

</style>