<template>
	<view>
		<view class="cart-container" v-if="cart.length !== 0">
			<!-- 收货地址 -->
			<my-address></my-address>
			
			<!-- 购物车商品列表的标题区域 -->
			<view class="cart-title">
			  <uni-icons type="shop" size="18"></uni-icons>
			  <text class="cart-title-text">购物车</text>
			</view>
			
			<!-- 商品列表区域 -->
			<uni-swipe-action>
			  <block v-for="(goods, i) in cart" :key="i">
			    <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
			      <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
			    </uni-swipe-action-item>
			  </block>
			</uni-swipe-action>
			
			<!-- 结算区域 -->
			<view class="my-settle-container">
				<my-settle></my-settle>
			</view>
		</view>
		
		<!-- 空状态 -->
		<view class="empty-cart" v-else>
			<image src="/static/cart_empty@2x.png" class="empty-img"></image>
			<text class="tip-text">空空如也~</text>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('cart', ['cart']),
			...mapState('user', ['address']),
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		methods: {
			...mapMutations('cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			// 商品的勾选状态发生了变化
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			// 商品的数量发生了变化
			numberChangeHandler(e) {
				this.updateGoodsCount(e)
			},
			// 点击了滑动操作按钮
			swipeActionClickHandler(goods) {
			  this.removeGoodsById(goods.goods_id)
			},
		}
	}
</script>

<style lang="scss">
	.cart-container {
	  padding-bottom: 50px;
		
		.cart-title {
			  height: 40px;
			  display: flex;
			  align-items: center;
			  font-size: 14px;
			  padding-left: 5px;
			  border-bottom: 1px solid #efefef;
			  .cart-title-text {
			    margin-left: 10px;
			  }
			}
			
			.goods-item {
			  width: 750rpx;
			  box-sizing: border-box;
			  display: flex;
			  padding: 10px 5px;
			  border-bottom: 1px solid #f0f0f0;
			}
			
			.my-settle-container {
		  /* 底部固定定位 */
		  position: fixed;
		  bottom: 0;
		  left: 0;
		  /* 设置宽高和背景色 */
		  width: 100%;
		  height: 50px;
		  background-color: cyan;
		}
	}
	// 空状态
	.empty-cart {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding-top: 150px;
	
	  .empty-img {
	    width: 90px;
	    height: 90px;
	  }
	
	  .tip-text {
	    font-size: 12px;
	    color: gray;
	    margin-top: 15px;
	  }
	}
</style>
