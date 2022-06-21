import { mapGetters } from 'vuex'

// 导出一个 mixin 对象
export default {
  computed: {
    ...mapGetters('cart', ['total']),
  },
  watch: {
    total() {
      this.setBadge()
    },
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      uni.setTabBarBadge({
        index: 2,
        text: `${this.total}`
      })
    },
  },
}