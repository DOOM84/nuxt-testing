<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <div class="content flex-center" style="display: flex; flex-direction: column">
      <h1 style="color: white"> Welcome to the testing system!</h1><br>
        <nuxt-link style="color: white; text-decoration: none;" to="/main">
          <el-button type="success">
            Go to testing
          </el-button>
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
