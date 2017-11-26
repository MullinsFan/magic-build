<template>
	<div class="preComponent">
		<div class="header">
	    <h1>Magic Build 页面搭建助手</h1>
	    <input type="submit" name="" value="Publish" 
	    @click.prevent="publish">
	  </div>
		<div class="mobile">
      <div class="container">
       <div 
        v-for="(item,index) in componentsList"
        :is="item.name"
				:key="item.name"
        ></div>
      </div>
    </div>
	</div>
</template>

<script>
import modules from "../components/modules";
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
	data () {
		return {
			componentsList: []
		}
	},

	created () {
		this.componentsList = this.pageData.preComponentList
	},

	methods: {
		publish () {
			console.log("list:", this.componentsList)
			let componentListId = Date.parse(new Date());
			console.log("componentListId: ",componentListId + "  " + new Date());
			let reqData = this.componentsList
			console.log("reqData:", reqData);
			let url = '?id=' + componentListId + '&data=' + reqData;
			let resUrl = '';
			axios.post(url)
			.then((res) => {
				console.log("res", res.data);
				this.resUrl = res.data.url;
			})
			.catch((err) => {

			})
			// 返回发布后的网页地址
			// 跳转新blank
			console.log('test')
		}
	},
	computed: {
    ...mapGetters([
      'pageData'
    ]),
  },
	components: {
    ...modules
  }
}

</script>

<style lang="less" scoped>
.preComponent {
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
	.mobile {
	  margin: 25px auto 0;
	  height: 540px;
	  padding: 102px 25px 159px 23px;
	  width: 337px;
	  background: url("~@/assets/image/bgiphone.png") no-repeat;
	  .container {
	    border: 1px #ccc solid;
	    width: 750px;
	    height: 1255px;
	    transform: scale(0.448, 0.448) translate(-463px, -774px);
	    overflow-y: scroll;
	    &::-webkit-scrollbar {
	      width: 5px;
	      height: 5px;
	      box-sizing: border-box;
	    }
	    &::-webkit-scrollbar-thumb {
	      background-color: #e7e7e7;
	      border: 1px solid rgba(0, 0, 0, 0.1);
	      -webkit-border-radius: 5px;
	    }
	    /*
	    悬浮时
	    */
	    &::-webkit-scrollbar-thumb:hover {
	      background-color: #f6f6f6;
	      border: 1px solid rgba(0, 0, 0, 0.1);
	    }
	    /*
	    滚动条空白处的样式
	    */
	    &::-webkit-scrollbar-track-piece {
	      background-color: rgba(0, 0, 0, 0.05);
	      -webkit-border-radius: 5px;
	    }
	  }
	}
}
</style>
