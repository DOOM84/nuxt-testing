<template>
  <el-container>
    <el-header style="padding: 0;">
      <app-navigation />
    </el-header>
    <el-main class="bg">
      <nuxt />
    </el-main>
    <el-footer style="background: #545c64; align-items: center;
    display: flex;
    justify-content: center; color: white">{{getLang(location, 'app_name')}} &copy; {{ new Date().getFullYear() }}</el-footer>
  </el-container>
</template>

<script>
  import AppNavigation from '@/components/main/Navigation'
  export default {
    components: {AppNavigation},
    /*watch: {
      $route () {
        console.log('route changed', this.$auth.getToken('local'))
      }
    }*/
  }
</script>

<style lang="scss">



</style>
