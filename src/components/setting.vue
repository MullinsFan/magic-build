<template>
  <div class="wrap">设置
    <div v-if = "show">
      <ul class="data">
        <li v-for="(item,index) in result" :key="index">
          <label>{{ item.title }}:</label>
          <input v-model="item.val" type="" name="" v-if="!item.items">
          <table v-if="item.items">
              <tr>
                <th v-for="secItem in item.items.properties">
                {{ secItem.title }}
                </th>
              </tr>
              <tr>
                <td v-for="(secItem,index) in item.items.properties" :key="index">
                  <input v-model="secItem.val" type="" name="item.name"  v-if="!secItem.items">
                </td>
              </tr>
            </table>
        </li>
      </ul>
    </div>

    <button @click="handleSubmit">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: this.$store.state.currentComponent,
      result: null,
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
      this.result = res.properties
      
      return true
    }
  },
  methods: {
    handleSubmit() {
      const vm = this
      for(let x in vm.result) {
        vm.data[x] = vm.result[x].val
          console.log("items",vm.data[x])
      }
      console.log(vm.data)
      vm.$store.commit("SET_COMPONENTS_DATA", {
        index: vm.currentComponent.index,
        data: vm.data
      });
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
  table,th,td {
    margin-top: 10px;
    text-align: center;
  }
  th,td {
    border: 1px solid #000; 
  }
  th {
    padding: 3px;
  }
  input {
    padding-left: 8px;
  }
}
</style>