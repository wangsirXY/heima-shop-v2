<template>
	<view>
		商品详情页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				query: {}
			};
		},
		onLoad(options) {
			// 接收参数
			this.query = options
			// 动态设置当前商品标题
			uni.setNavigationBarTitle({
				title: options.goods_id
			})
		}
	}
</script>

<style lang="scss">

</style>
