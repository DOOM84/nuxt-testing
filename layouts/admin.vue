<template>
    <div v-if="showAdm" class="admin-layout-wrap">
        <el-container :style="{height: '100%'}">
            <el-header style="padding: 0; margin: 0;">
                <app-nav />
            </el-header>
            <el-container>
                <transition name="slide-fade">
                <el-aside v-if="showAside" width="250px">
                    <app-aside />
                </el-aside>
                </transition>
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
        watch: {
            error(value){
                this.$message.error(value.response.data.message);
            }
        },
        computed: {
          showAdm(){
             return this.$store.state.auth.isAdmin === 1 ? this.$store.state.auth.isAdmin : false
          },
            showAside(){
                return this.$store.state.aside
            }
        },
        beforeMount() {
            if (this.$store.state.auth.isAdmin !== 1) this.$router.push('/404')
        }
    }

</script>

<style lang="scss" scoped>
    .admin-layout-wrap{
        width: 100%;
        height: 100vh;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active до версии 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>