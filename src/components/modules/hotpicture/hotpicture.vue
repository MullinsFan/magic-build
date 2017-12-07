<template>
  <div class="hotpicture">
    <img usemap="#planetmap" 
    :class="{planetmap:data.hot}" 
    @change="imgSize($event)" 
    v-if="data.hotimg" 
    :style="{width: data.width + 'px',height: data.height + 'px'}" 
    :src="data.hotimg" 
    alt="需要的图片">
    <img usemap="#planetmap" v-else 
    :style="{width: data.width + 'px',height: data.height + 'px'}" :src="data.url" alt="需要的图片">
    <map v-if="data.regions" name="planetmap" id="planetmap">
      <area 
        v-for="(item,index) in data.regions" 
        :key="index" 
        shape="polygon" 
        :coords="item.region" 
        :href="item.href" 
        :alt="item.id" 
        :title="item.title">
    </map>
    <canvas @click="addhotimg($event)" :width="data.canvas.width" :height="data.canvas.height" v-if="data.hot" id="tutorial">该浏览器不支持</canvas>
    <p v-if="data.title">{{data.title}}</p>
  </div>
</template>

<script>
import deData from './hotpicture.json'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return deData;
      }
    }
  },
  methods: {
    // 函数缓存
    getElementsa(name) {
      if(!this.getElementsa.cache) {
        this.getElementsa.cache = {}
      }
      return this.getElementsa.cache[name] = this.getElementsa.cache[name] || document.getElementById(name)
    },
    // 添加热区坐标  有bug
    haha(lala,e) {
      let heihei = e.offsetX + ',' + e.offsetY
      return lala == "" ? heihei : lala + ',' + heihei
    },
    // 点击添加热区
    addhotimg(e) {
      let _this = this
      // 获取canvas元素
      let canvas = _this.getElementsa("tutorial")
      // 获取热区的角标
      let _index = _this.data.nowarea - 1
        // 获取鼠标相对于图片左上角的位置
      // 如果处于热编辑阶段
      if(_this.data.hot){
        // 添加热区坐标
        let _region = _this.data.regions
        let index = _region.length - 1
      _region[index].region = _this.haha(_region[index].region,e)
        // console.log("_region[index].region,e",e)
        // if(_region[index].region == "") {
        //   _this.data.regions[index].region = e.offsetX + ',' + e.offsetY
        // } else {
        //   _this.data.regions[index].region = _region[index].region + ',' + e.offsetX + ',' + e.offsetY
        // }
        // 绘制canvas图形 
        (function draw() {
          // 检测浏览器是否支持canvas元素
          if (canvas.getContext){
            // 获取热区坐标
            let _region = _this.data.regions[_index].region
            // 将坐标变成数组
            let _regionA = _region.split(",")
            // 获取坐标点的数量
            let _length = _regionA.length/2
            // 创建一个canvas画布
            let ctx = canvas.getContext('2d')
            // 清空先前图形
            ctx.clearRect(0, 0, _this.data.canvas.width, _this.data.canvas.height)
            ctx.fillStyle = "rgba(200,0,0,0.4)"
            ctx.beginPath()
            ctx.moveTo(_regionA[0],_regionA[1])
            if(_length == 2) {
              ctx.lineTo(_regionA[2],_regionA[3])
              ctx.stroke()
            } else if(_length != 1) {
              for(let i = 2; i<=_region.length;i=i+2){
                ctx.lineTo(_regionA[i],_regionA[i+1])
              }
              ctx.fill()
            }
          }
        })()
      }
    }
  }
};
</script>

<style lang="less" scoped>
.hotpicture {
  color: #7e57c2;
  margin-top: 4px;
  font-size: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    text-align: center;
  }
  p {
    margin: 6%;
  }
  .planetmap {
    cursor: crosshair;
  }
  canvas {
    position: absolute;
    top: 0;
    cursor: crosshair;
  }
}
</style>