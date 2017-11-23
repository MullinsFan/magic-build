<template>
  <div class="header">
    <h1>Magic Build 页面搭建助手</h1>
    <input type="submit" name="" value="prePublish" 
    @click.prevent="prePublish">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      page: this.$store.state.pageData.components
    };
  },
  methods: {
    prePublish () {
      console.log(this.page)
      let url = '/previewPage'
      this.$router.push({
        path: url
      })
    }
  },
  computed: {
    ...mapGetters([
      'pageData'
    ]),
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 64px;
  line-height: 64px;
  color: #fff;
  background-color: #7e57c2;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.117647);
  h1 {
    width: 80%;
    font-size: 26px;
    text-indent: 4em;
  }
  input {
    width: 100px;
    height: 40px;
    color: #000;
    background-color: #ede7f6;
    text-align: center;
    border: none;
    border-radius: 7px;
    outline: none;
    margin-left: 100px;
    &:hover {
      background-color: #c0abe4;
      cursor: pointer;
    }
  }
}
</style>
