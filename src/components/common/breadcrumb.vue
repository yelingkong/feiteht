<template>
  <div class="breadcrumb">

    <el-breadcrumb
      separator="/"
      style="padding: 25px;"
    >
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in $route.meta"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>

  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.breadcrumb {
  height: 60px;
  background: 100%;
  background: #ccc;
}
</style>