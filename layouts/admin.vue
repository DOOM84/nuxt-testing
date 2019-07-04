<template>
    <div class="admin-layout-wrap">
        <el-container :style="{height: '100%'}">
            <el-header style="padding: 0; margin: 0;">
                <app-nav />
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <app-aside />
                </el-aside>
                <el-main>
                    <h2 style="text-align: center; padding: 15px;">Панель управління</h2>
                    <hr style="margin-bottom: 10px;">
                    <nuxt />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>




<script>
    import AppAside from '@/components/admin/Aside'
    import AppNav from '@/components/admin/Nav'
    export default {
        components: {AppAside, AppNav},
        /*computed: {
            error(){
                return  this.$store.getters.error
            }
        },*/
        watch: {
            error(value){
                this.$message.error(value.response.data.message);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .admin-layout-wrap{
        width: 100%;
        height: 100vh;
    }

</style>