<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <div class="content flex-center" style="display: flex; flex-direction: column">
      <h1 style="color: white"> Welcome to the testing system!</h1>
        <nuxt-link class="el-button el-button--success" style="color: white; text-decoration: none; margin-top: 3rem;" to="/main">
          <h3>Go to the testing</h3>
        </nuxt-link>
      </div>
    </el-col>


  </el-row>

</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>


</style>
