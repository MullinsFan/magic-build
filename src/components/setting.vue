<template>
  <div class="wrap">设置
    <div v-if = "show">
      <ul class="data">
        <li v-for="(item,index) in result" :key="index">
          <label>{{ item.title }}:</label>
          <input v-model="item.val" type="" name="" v-if="!item.items">
          <table v-if="item.items">
              <tr>
                <th v-for="secItem in item.items.properties" @lick="addItems" >
                {{ secItem.title }}
                </th>
              </tr>

              <tr v-for="(secs,index) in secRes" :key="index">
                <td v-for="(secitem,index) in secs" :key="index">
                  <input v-model="secitem.val" type="" name=""  v-if="!secitem.items">
                </td>
              </tr>

              <i class="iconfont add" @click="addItems" >&#xe602;</i>
            </table>
        </li>
      </ul>
    </div>

    <button @click="handleSubmit">保存</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
//深拷贝函数
function cloneDeep(obj) {
  var copy;

  // Handle the 3 simple types, and null or undefined
  if (null == obj || "object" != typeof obj) return obj;

  // Handle Date
  if (obj instanceof Date) {
    copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  // Handle Array
  if (obj instanceof Array) {
    copy = [];
    for (var i = 0, len = obj.length; i < len; i++) {
      copy[i] = cloneDeep(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    copy = {};
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = cloneDeep(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}
export default {
  data() {
    return {
      result: null,
      once: true,
      secRes: [],
      secItems: [],
      count: null,
    };
  },
  computed: {
    ...mapGetters([
      'currentComponent',
      'pageData'
    ]),
    data() {
      let { index } = this.currentComponent;
      if (index === undefined) return "";
      return this.pageData.preComponentList[index].data;
    },
    show() {
      const vm = this
      let name = vm.currentComponent.name
      //取出本地存储的组件相应的shcema文件
      let res = JSON.parse(localStorage.getItem(`'${name}'`))
      if(res == null) return false

      vm.result = res.properties
      if(vm.once) {
        for(let x in vm.result) {
          if(vm.result[x].type === "array") {
            //将二级数据转换成数组
            let sec = vm.result[x].items.properties
            vm.count = vm.result[x].minItems
            for(let y in sec) {
              let item = cloneDeep(sec[y])
              vm.secItems.push(item)
            }
            for(let m = 0; m < vm.count ; m++) {
              let secItems = cloneDeep(vm.secItems)
              vm.secRes.push(secItems)
            }
          }
        }
        vm.once = false
      }

      return true
    }
  },
  methods: {
    ...mapActions([
      'setComponentsData'
    ]),
    addItems() {
      const vm = this
      vm.count = vm.count + 1
      vm.secRes = []
      for(let m = 0; m < vm.count ; m++) {
        let secItems = cloneDeep(vm.secItems)
        vm.secRes.push(secItems)
      }
    },
    handleSubmit() {
      const vm = this
      for(let x in vm.result) {
        console.log("x",x,typeof vm.data[x])
        if(vm.result[x].type === "array" && typeof vm.data[x] == "object") {
          //存储二级对象数据
          let item = vm.data[x]
          vm.data[x] = []
          for (let m = 0; m < vm.secRes.length; m++) {
            vm.data[x].push(item)
            for (let n = 0; n < vm.secItems.length; n++) {
              let name = vm.secItems[n].name
              if(typeof vm.secRes[m][n].val === "undefined") {
                alert("请填写" + vm.secRes[m][n].title)
                return ""
              }
              vm.data[x][m][name] = vm.secRes[m][n].val
            }
          }
        }

        else {
          if(typeof vm.result[x].val === "undefined") {
            alert("请填写" + vm.result[x].title)
                return ""
          }
          vm.data[x] = vm.result[x].val
          console.log("y",x,typeof vm.data[x])
        }    
      }

      vm.setComponentsData({
        index: vm.currentComponent.index,
        data: vm.data
      });
    }
  }
};
</script>


<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 487135 */
  src: url('//at.alicdn.com/t/font_487135_jh39b4ymp3xlayvi.eot');
  src: url('//at.alicdn.com/t/font_487135_jh39b4ymp3xlayvi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_487135_jh39b4ymp3xlayvi.woff') format('woff'),
  url('//at.alicdn.com/t/font_487135_jh39b4ymp3xlayvi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_487135_jh39b4ymp3xlayvi.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
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
  //添加定位
  .add {
    position: relative;
    left: 50%;
    top: -4px;
    cursor: pointer;
  }
}
</style>