<template>
        <el-menu
                mode="horizontal"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
                style="z-index: 100; position: fixed; width: 100%;"
        >

            <el-menu-item index="/"><h2>Testing System</h2></el-menu-item>
            <el-menu-item> DOOM</el-menu-item>
                <el-menu
                        mode="horizontal"
                        class="cont-right"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router
                        :default-active="$route.path"
                        >
                    <el-submenu index="1">
                        <template slot="title">Stats</template>
                        <el-menu-item>Level: Intermediate</el-menu-item>
                        <el-menu-item index="/stats">My statistics</el-menu-item>
                        <el-menu-item index="/group">My group statistics</el-menu-item>
                    </el-submenu>

                    <el-menu-item index="/login">Login</el-menu-item>
            <el-menu-item index="/signup">Sign up</el-menu-item>
                    <el-menu-item index="/logout">Logout</el-menu-item>

                    <img style="padding-top: 5px; margin-left: 20px; padding-right: 5px;" height="30px" src="/uk.png">


                    <img style="padding-top: 5px; margin-right: 20px;" height="30px" src="/ukr.png">

                </el-menu>

        </el-menu>


</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
    .cont-right {
        display: flex;
        float: right;
        padding-top: 0.8rem;
    }


</style>