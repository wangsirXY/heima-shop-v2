<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-box">
		  <uni-search-bar @input="input" :radius="100" cancelButton="none" placeholder="请输入要搜索的商品"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
		  <view class="history-title">
		    <text>搜索历史</text>
		    <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
		  </view>
		  <view class="history-list">
		    <uni-tag :text="item" v-for="(item, i) in historyList" :key="i" @click="gotoGoodsList(item)"></uni-tag>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				showSync: true,
				searchVal: "",
				// 延时器的 timerId
				timer: null,
				// 搜索关键词
				kw: '',
				// 搜索结果列表
				searchResults: [],
				// 搜索关键词的历史记录
				historyList: []
			};
		},
		onLoad() {
			// 从本地存储获取搜索历史记录
			this.historyList = JSON.parse(uni.getStorageSync('historyList') || '[]');
		},
		methods: {
			// input输入事件
			input(value) {
				clearTimeout(this.timeId)
				this.timeId = setTimeout(() => {
					this.keywords = value;
					if (this.keywords.trim() == '') return
					
					// unshift 会修改原数组historyList
					this.historyList.unshift(value);
					// 对数组historyList 去重
					this.historyList = Array.from(new Set(this.historyList));    
					// 本地存储 historyList
					uni.setStorageSync('historyList', JSON.stringify(this.historyList));
				}, 500)
			},
			// 搜索建议列表
			async getSearchList() {
			  // 判断关键词是否为空
			  if (this.kw === '') {
			    this.searchResults = []
			    return
			  }
			  // 发起请求，获取搜索建议列表
			  const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
			  if (res.meta.status !== 200) return uni.$showMsg()
			  this.searchResults = res.message
			},
			// 搜索建议点击事件
			gotoDetail(goods_id) {
			  uni.navigateTo({
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			  })
			},
			// 清空搜索历史记录
			cleanHistory() {
			  this.historyList = []
			  uni.setStorageSync('historyList', '[]')
			},
			// 搜索历史点击事件
			gotoGoodsList(kw) {
			  uni.navigateTo({
			    url: '/subpkg/goods_list/goods_list?query=' + kw
			  })
			}
		}
	}
</script>

<style lang="scss">
	.uni-searchbar {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  position: relative;
	  padding: 16rpx;
	  background-color: #c00000;
	}
	.search-box {
	  position: sticky;
	  top: 0;
	  z-index: 999;
	}
	// 搜索建议列表
	.sugg-list {
	  padding: 0 5px;
	
	  .sugg-item {
	    font-size: 12px;
	    padding: 13px 0;
	    border-bottom: 1px solid #efefef;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	
	    .goods-name {
	      white-space: nowrap;
	      overflow: hidden;
	      text-overflow: ellipsis;
	      margin-right: 3px;
	    }
	  }
	}
	// 搜索历史
	.history-box {
	  padding: 0 5px;
	
	  .history-title {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    height: 40px;
	    font-size: 13px;
	    border-bottom: 1px solid #efefef;
	  }
	
	  .history-list {
	    display: flex;
	    flex-wrap: wrap;
	
	    .uni-tag {
	      margin-top: 5px;
	      margin-right: 5px;
				background: #f4f4f4;
				color: #333;
				border: 1px solid #f4f4f4;
				border-radius: 6px;
				
	    }
	  }
	}
</style>
