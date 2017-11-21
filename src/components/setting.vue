<template>
  <div class="wrap">设置
    <h1>{{data.name}}</h1>
    <input v-model="data.name" placeholder="edit me">
    <div v-if = "show">
      <ul class="data">
        <li v-for="item in result">
          <label>{{ item.title }}:</label>
          <input type="" name="" v-if="!item.items">
          <table v-if="item.items">
              <tr>
                <th v-for="secItem in item.items.properties">{{ secItem.title }}</th>
              </tr>
              <tr>
                <td v-for="secItem in item.items.properties">
                  <input type="" name="item.name"  v-if="!secItem.items">
                </td>
              </tr>
            </table>
        </li>
      </ul>
    </div>
    <!-- <table v-if = "show">
        <tr>
          <th v-for="item in result">{{ item.title }}</th>
        </tr>
        <tr>
          <td v-for="item in result">
           <input type="" name="" v-if="!item.items">
           <table v-if="item.items">
              <tr>
                <th v-for="secItem in item.items.properties">{{ secItem.title }}</th>
              </tr>
              <tr>
                <td v-for="secItem in item.items.properties">
                  <input type="" name="item.name"  v-if="!secItem.items">
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table> -->

    <button @click="handleSubmit">保存</button>
  </div>
</template>

<script>
export default {

  data() {
    return {
      currentComponent: this.$store.state.currentComponent,
      result: null
    };
  },
  computed: {
    data() {
      let { index } = this.currentComponent;
      if (index === undefined) return "";
      return this.$store.state.pageData.components[index].data;
    },
    show() {
      name = this.currentComponent.name
      //取出本地存储的组件相应的shcema文件
      let res = JSON.parse(localStorage.getItem('\'' + name +'\''))
      if(res == null) return false
      else {
        this.result = res.properties
        return true
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$store.commit("SET_COMPONENTS_DATA", {
        index: this.currentComponent.index,
        data: this.data
      });
      // 存localstorage
    }
  }
};
</script>


<style lang="less" scoped>
.wrap {
  position: relative;
  width: 380px;
  background-color: #ede7f6;
}
.data {
  margin: 24px;
  font-size: 14px;
  li {
    margin-bottom: 8px;
  }
  table {
    border: 1px solid #000; 
    margin-top: 10px;
    text-align: center;
  }
  th {
    padding: 2px;
  }
}
</style>
