<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <div class="content flex-center" style="display: flex; flex-direction: column">
      <h1 style="color: white">{{getLang(location, 'welcome')}}</h1>
        <nuxt-link class="el-button el-button--success" style="color: white; text-decoration: none; margin-top: 3rem;" to="/main">
          <h3>{{getLang(location, 'toTest')}}</h3>
        </nuxt-link>
      </div>
    </el-col>


  </el-row>

</template>

<script>

export default {
  head(){
    return {
      title: this.getLang(this.location, 'welcome')
    }
  },
}
</script>

<style lang="scss" scoped>


</style>
