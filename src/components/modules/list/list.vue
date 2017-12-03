<template>

	<div class="list" >
		<img class="listImg" :src="data.url">
		<div>
			<div>{{ data.title }}</div>
			<div>{{ data.name }}</div>
		</div>

	</div>
</template>

<script>
import deData from "./list.json";
export default {
  props: {
    data: {
      type: Object,
      default() {
        return deData;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.list {
	display: flex;
  width: 750px;
  height: 200px;
  color: #7e57c2;
  background-color: #acf;
  .listImg {
	  width: 10%;
	}
}

</style>
