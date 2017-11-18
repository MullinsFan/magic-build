<template>
  <div>
    <h1>404</h1>
    <br>
    <p>您访问的页面不存在</p>
    <br>
    <a @click="back" href="javascript:;">返回上一页</a>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>


<style lang="less" scoped>
div {
  text-align: center;
}

h1 {
  margin-top: 250px;
  font-size: 40px;
  font-weight: 600;
}

p {
  font-size: 20px;
}

a {
  color: #42b983;
}
</style>

