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
        <el-menu-item>
            <el-button size="mini" :type="$store.state.aside ? 'success' : 'primary'" @click="$store.commit('SET_ASIDE')">Меню</el-button>
        </el-menu-item>
        <template style="float: right">
            <el-menu-item style="float: right;" @click="logout"><i style="color: white" class="el-icon-switch-button"></i>Logout</el-menu-item>
            <el-menu-item style="float: right;">Welcome, {{$auth.user.name}}</el-menu-item>

        </template>
    </el-menu>
</template>

<script>
    export default {
        methods: {
            logout(){
                this.$auth.logout()
            }
        }


    }
</script>

<style scoped>

</style>