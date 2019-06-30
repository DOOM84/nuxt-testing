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

            <el-menu-item v-if="$auth.loggedIn"> {{$auth.user.name}}</el-menu-item>

            <template v-if="started">
                <el-menu-item><i style="color: white" class="el-icon-check"></i>: {{answers}}</el-menu-item>
                <el-menu-item><i style="color: white" class="el-icon-timer"></i>{{minutes}} : {{seconds}}</el-menu-item>
            </template>

                <el-menu
                        mode="horizontal"
                        class="cont-right"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router
                        :default-active="$route.path"
                        >
            <template v-if="$auth.loggedIn">
                    <el-submenu index="1">
                        <template slot="title">Stats</template>
                        <el-menu-item>Level: {{$auth.user.level}}</el-menu-item>
                        <el-menu-item index="/stats">My statistics</el-menu-item>
                        <el-menu-item index="/group">My group statistics</el-menu-item>
                    </el-submenu>
                <div class="menu-item">
                    <a  href="#" @click.prevent="logout">Logout</a>
                </div>
                </template>

             <template v-else>
                    <el-menu-item index="/login">Login</el-menu-item>
                    <el-menu-item index="/signup">Sign up</el-menu-item>
                    </template>

                    <img style="padding-top: 5px; margin-left: 20px; padding-right: 5px;" height="30px" src="/uk.png">


                    <img style="padding-top: 5px; margin-right: 20px;" height="30px" src="/ukr.png">

             </el-menu>

        </el-menu>


</template>

<script>
    export default {
        computed: {
            answers(){
                return this.$store.getters['test/answers'].length
            },
            minutes(){
                return this.$store.getters['timer/minutes']
            },
            seconds(){
                return this.$store.getters['timer/seconds']
            },
            started(){
                return this.$store.getters['timer/started']
            },
        },
        methods: {
            logout(){
                this.$auth.logout()
            },

            /* async fetchUser(){
                 await this.$auth.fetchUser()
            }*/


        }
    }
</script>

<style lang="scss" scoped>
    .cont-right {
        display: flex;
        float: right;
        padding-top: 0.8rem;
    }

    .menu-item{
        float: none;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        color: #909399;
        font-size: 14px;

    }
    .menu-item a:hover{
        //background-color: #303133;
        //opacity: 0.5;
        background-color: rgba(48, 49, 51, 0.5);
    }
    .menu-item a{
        float: none;
        height: 36px;
        line-height: 36px;
        padding: 10px;
        color: white;
        font-size: 14px;
        text-decoration: none;
    }

</style>