<template>

	<div class="list" >
		<img class="listImg" src="url">
		<div>
			<div>{{ data.title }}</div>
			<div>{{ data.cnotent }}</div>
		</div>

	</div>
</template>

<script>
export default {
	props: {
		type: Object,
		data: {
			default () {
				return {
					url:'',
					title: "list",
					cnotent: "ffffffffffffff"
				}
			}
		}
	}
	
}
</script>

<style lang="less" scoped>
.list {
	display: flex;
  width: 750px;
  height: 64px;
  color: #7e57c2;
  background-color: #acf;
  .listImg {
	  width: 10%;
	}
}

</style>
