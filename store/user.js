export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
  }),
	
  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('user/saveAddressToStorage')
    },
    // address 持久化存储到本地
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
  },

  // 数据包装器
  getters: {
		// 收货详细地址的计算属性
		addstr(state) {
			if (!state.address.provinceName) return ''
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		},
	},
}