export default {
  // 开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的 mutations 方法
  mutations: {
		// 加入购物车
		addToCart(state, goods) {
			const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)

			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			
			this.commit('cart/saveToStorage')
		},
		// 计算购物车商品数量
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		// 持久化存储
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		// 更新购物车中商品的勾选状态
		updateGoodsState(state, goods) {
		  // 根据 goods_id 查询购物车中对应商品的信息对象
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
		  // 有对应的商品信息对象
		  if (findResult) {
		    // 更新对应商品的勾选状态
		    findResult.goods_state = goods.goods_state
		    this.commit('cart/saveToStorage')
		  }
		},
		// 更新购物车中商品的数量
		updateGoodsCount(state, goods) {
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
		  if(findResult) {
		    findResult.goods_count = goods.goods_count
		    this.commit('cart/saveToStorage')
		  }
		},
		// 根据 Id 从购物车中删除对应的商品信息
		removeGoodsById(state, goods_id) {
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  this.commit('cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
		  state.cart.forEach(x => x.goods_state = newState)
		  this.commit('cart/saveToStorage')
		}
	},

  // 模块的 getters 属性
  getters: {
		// 统计购物车中商品的总数量
		total(state) {
			let c = 0
			// 循环统计商品的数量，累加到变量 c 中
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		// 统计已勾选商品的总数量
		checkedCount(state) {
		  return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选的商品的总价
		checkedGoodsAmount(state) {
		  return state.cart.filter(x => x.goods_state)
		                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
		                   .toFixed(2)
		}
	},
}