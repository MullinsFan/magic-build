<template>
  <div class="wrap">
    <div v-if = "show">
      <ul class="data">
        <li v-for="(item,index) in result" :key="index">
          <label>{{ item.title }} :</label>
          <input class="upimg" v-if="item.format == 'hotimg'" type='file' @change='upimg()'/>
          <input v-model="item.val" 
          placeholder="请填写" 
          v-if="!item.items && item.format != 'hotimg' && !item.area">
          <table class="areas" v-if = "item.area">
            <thead>
              <tr>
                <th style="flex:1">热区</th>
                <th style="flex:2">标题</th>
                <th style="flex:3">链接</th>
                <th style="flex:1">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(area,index) in item.area" :key="index">
                <td>{{'热区'+area.id+':'}}</td>
                <td><input type="text" v-model="area.title"></td>
                <td><input class="hotimgurl" type="text" v-model="area.url"></td>
                <td>
                  <input class="hotimgdelete" title="保存" type="submit" value="+" @click="saveHotimg(index)">
                  <input class="hotimgdelete" title="删除" type="submit" value="-" @click="deleteHotimg(index)">
                </td>
              </tr>
            </tbody>
            <input class="addhotimg" type="submit" value="添加热区" @click="addHotarea()">
          </table>
          <color-Picker v-model="item.val" v-if="item.format == 'color'"></color-Picker>
          <table v-if = "item.items">
              <tr>
                <th v-for="secItem in item.items.properties" @lick="addItems" >
                {{ secItem.title }}
                </th>
              </tr>

              <tr v-for="(secs,index) in secRes" :key="index">
                <td v-for="(secitem,index) in secs" :key="index">
                  <input v-model="secitem.val" placeholder="请填写" >
                </td>
              </tr>

              <i class="iconfont add" @click="addItems" >&#xe602;</i>
              <i class="iconfont del" @click="delItems" >&#xe612;</i>
            </table>
        </li>
      </ul>

      <button class="save" @click="handleSubmit">保存</button>
      <button class="clear" @click="clearData">清除本地数据</button>
    </div>
    
    
  </div>
</template>

<script>
import modules from "./modules";
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
      // res: null, //jsonschema
      result: null, //schema.properties
      once: true, //showtable调用次数
      secRes: [], //二级数据的数组
      secItems: [], //二级数组中的数组
      count: {}, //存储不同组件的count
      id: null, //不同组件的不同id
    };
  },
  components: {
    ...modules
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
      vm.id = vm.currentComponent.id
      //取出本地存储的组件相应的shcema文件
      vm.res = JSON.parse(localStorage.getItem(`'${name}'` + vm.id))
      if(vm.res == null) return false
      // localStorage.setItem(`'${name}'` + id, JSON.stringify(res))
      
      vm.result = vm.res.properties
      // vm.showTable()
      vm.secRes = JSON.parse(localStorage.getItem("table" + vm.id))
      if(vm.secRes == null) {
        for(let x in vm.result) {
          if(vm.result[x].type === "array") {
            //将二级数据转换成数组
            let sec = vm.result[x].items.properties
            let id = vm.id
            if(vm.count[id] === undefined) {
              vm.count[id] = vm.result[x].minItems
            }
            vm.secItems = []
            vm.secRes = []
            for(let y in sec) {
              let item = cloneDeep(sec[y])
              vm.secItems.push(item)
            }
            for(let m = 0; m < vm.count[id] ; m++) {
              let secItems = cloneDeep(vm.secItems)
              vm.secRes.push(secItems)
            }
          }
        }
      }

      return true
    },
  },
  methods: {
    ...mapActions([
      'setComponentsData'
    ]),
    delItems() {
      let id = this.id
      if(this.count[id] > 1) {
        this.count[id] --
        let secItems = cloneDeep(this.secItems)
        this.secRes.pop(secItems)
        localStorage.setItem("table" + this.id , JSON.stringify(this.secRes))
      }
    },
    handleSubmit() {
      console.log(this.result)
      const vm = this
      for(let x in vm.result) {
        if(vm.result[x].type === "array" && typeof vm.data[x] == "object") {
          //存储二级对象数据
          let item = vm.data[x]
          vm.data[x] = []
          for (let m = 0; m < vm.secRes.length; m++) {
            vm.data[x].push(item)
            for (let n = 0; n < vm.secItems.length; n++) {
              let name = vm.secItems[n].name
              // if(vm.secRes[m][n].val < 1) {
              //   alert("请填写" + vm.secRes[m][n].title)
              //   return ""
              // }
              vm.data[x][m][name] = vm.secRes[m][n].val
            }
          }
        }

        else {
          // if(vm.result[x].val < 1) {
          //   alert("请填写" + vm.result[x].title)
          //    return ""
          // }
          vm.data[x] = vm.result[x].val
        }    
      }
      vm.saveLocal()
      vm.setComponentsData({
        index: vm.currentComponent.index,
        data: vm.data
      })
    },
    saveLocal() {
      localStorage.setItem(`'${this.currentComponent.name}'` + this.id , JSON.stringify(this.res))
      localStorage.setItem("table" + this.id , JSON.stringify(this.secRes))
    },
    addItems() {
      let id = this.id
      this.count[id] ++
      let secItems = cloneDeep(this.secItems)
      this.secRes.push(secItems)
      this.saveLocal()
    },
    clearData() {
      localStorage.clear()
    },
    // 热区编辑
    getPath(fileQuery) {
        let imgSrc = '', imgArr = [], strSrc = '',data
        let file = fileQuery.files[0]
        console.log(file)
        let reader = new FileReader()
        let flag;
        let _this = this
        let _canvas = _this.data.canvas
        reader.onload = function(e){
          imgSrc = fileQuery.value
          imgArr = imgSrc.split('.')
          strSrc = imgArr[imgArr.length - 1].toLowerCase()
          flag = 0
          data = e.target.result
          // 图片格式正确
          if(strSrc.localeCompare('jpg') === 0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0) {
            _this.data.hotimg = data
            _this.data.title = ''
            _this.result.hotimg.val = data
            flag = 1
            //加载图片获取图片真实宽度和高度  
            let image = new Image()
            image.onload=function(){
              // 改变canvas和编辑区的宽高
              _canvas.width = image.width
              _this.result.width.val = image.width
              _this.result.height.val = image.height
              _canvas.height = image.height
            }
            image.src= data
            // 新图片插入
            if(_this.data.imgif) {
              _this.data.regions = []
            } else {
              // 图片开关
              _this.data.imgif = true
            }
          } else {
            throw new Error('File type Error! please image file upload..')
          }
        }
        if (file) {
          reader.readAsDataURL(file);
        } else {
          // 图片开关
          _this.data.imgif = false
          alert('请选择图片');
        }
    },
    // 上传图片
    upimg(){
        //以下即为完整客户端路径
        let iptfileupload = document.getElementsByClassName('upimg')[0]
        this.getPath(iptfileupload)
    },
    saveHotimg(index) {
      // 获取热区数量
      let _area =  this.result.areas.area[index]
      if(_area.url == ""){
        alert("请输入链接")
      } else if(_area.title == ""){
        alert("请输入标题")
      } else {
        // 把热区的标题和链接添加到热区上面
        console.log(_area.url)
        this.data.regions[index].href = _area.url
        console.log(this.data.regions[index].href)
        this.data.regions[index].title = _area.title
        // 改变热区编辑状态
        this.data.hot = false
        // 保存vuex
        this.saveLocal()
        this.setComponentsData({
        index: this.currentComponent.index,
        data: this.data
      })
      }
    },
    deleteHotimg(index){
      // 删除节点
      this.result.areas.area.splice(index,1)
      // 删除热区
      this.data.regions.splice(index,1)
      // 如果删除节点刚好是正在编辑节点则关闭热区编辑状态
      index = index + 1
      if(index == this.data.nowarea){
        this.data.nowarea--
        this.data.hot = false
      }
    },
    addHotarea(e) {
      if(!this.data.imgif) {
        alert('请先上传图片')
      } else {
        if(this.data.hot){
          alert("请先保存先前热区")
        } else {
          let _area = this.result.areas.area
          let newId = _area.length + 1
          // 在操作区创建一个新的热区
          let newArea = {
            "id": newId,
            "title": "",
            "url": "",
            "region": ""
          }
          // 插入热区到数组
          _area.splice(newId,0,newArea)
          // 在显示区创建一个新的热区
          let _region = this.data.regions
          let newRegion = {
            "id": this.data.nowarea,
            "title": "",
            "region": "",
            "href": ""
          }
          // 插入热区到数组
          this.data.regions.push(newRegion)
          //  改变光标
          this.data.hot = true
          // 改变热区数量
          this.data.nowarea = _area.length
        }
      }
    }
  }
};
</script>


<style lang="less" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 487523 */
  src: url('//at.alicdn.com/t/font_487523_v2i1buhqm730udi.eot');
  src: url('//at.alicdn.com/t/font_487523_v2i1buhqm730udi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_487523_v2i1buhqm730udi.woff') format('woff'),
  url('//at.alicdn.com/t/font_487523_v2i1buhqm730udi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_487523_v2i1buhqm730udi.svg#iconfont') format('svg');
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
  width: 360px;
  background-color: #ede7f6;
  color: #646065;
}
.data {
  margin: 24px;
  font-size: 12px;
  li {
    margin-bottom: 12px;
  }
  table,th,td {
    margin-top: 10px;
    text-align: center;
    input {
      width: 140px;
      border: none;
    }
  }
  th,td {
    border: 1px solid #646065; 
  }
  th {
    padding: 3px;
    color: #fff;
    font-weight: normal;
    background-color: #7e57c2;
  }
  >input {
    height: 18px;
    width: 100px;
    padding-left: 6px;
    border: 1px solid #DADADA;
    color: #646065;
    font-size: 12px;
  }
  //添加定位
  .add {
    position: relative;
    left: 40%;
    top: -4px;
    cursor: pointer;
  }
  .del {
    position: relative;
    left: 60%;
    top: -2px;
    cursor: pointer;
  }
  .upimg {
    border: none;
    width: 200px;
    input {
      border: none;
      background-color: red;
    }
  }
  .size {
    border: none;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    cursor: pointer;
  }
  .areas {
    display: flex;
    flex-direction: column;
    table-layout:fixed;
    align-items: center;
    tr {
      display: flex;
      justify-content: center;
      align-items: center;
      th,td {
        width: 74px;
        margin-top: 0px;
        line-height: 20px;
        padding: 0;
      }
      td:first-child,td:last-child {
        flex: 1;
      }
      td + td {
        flex: 2;
      }
      td + td + td {
        flex: 3;
      }
    }
    tbody {
      tr {
        td {
          input {
            width: 60px;
          }
          .hotimgurl {
            width: 80px;
          }
          .hotimgdelete {
            cursor: pointer;
            height: auto;
            width: auto;
            border-radius: 50%;
          }
        }
      }
    }
    .addhotimg {
      line-height: 20px;
      margin-top: 10px;
      background-color: #7e57c2;
      width: 30%;
      border-radius: 4px;
      cursor: pointer;
      color: #fff;
    }
  }
}
.save {
  width: 40px;
  margin-left: 24px;
  border: none;
  border-radius: 3px;
  background-color: #7e57c2;
  color: #fff;
  line-height: 24px;
}
.clear {
  width: 96px;
  margin-left: 6px;
  border: none;
  border-radius: 3px;
  background-color: #7e57c2;
  color: #fff;
  line-height: 24px;
}
</style>