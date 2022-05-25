<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar" :class="{ active: headerScroll }">
		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<view class="layout">

		<!-- 天气信息 -->
		<weatherInfo :info="info" v-if="info"></weatherInfo>

	</view>
</template>


<script setup>
	import {
		ref,
		onMounted,
	} from 'vue'

	import {
		onPageScroll
	} from '@dcloudio/uni-app'

	import {
		getLocation
	} from '/utils/getLocation.js'


	// 导航栏显示
	let headerScroll = ref(false)
	// 位置信息 
	let info = ref(null)

	onMounted(async () => {
		const location = await getLocation()
		if (location.adcode.length) {
			info.value = location
		} else {
			uni.showToast({
				title: "暂不支持该地区",
				icon: 'error'
			})
		}
	})


	// 页面滚动事件
	onPageScroll((res) => {
		headerScroll.value = res.scrollTop > 10 ? true : false
	})
</script>

<style lang="less" scoped>
	.status_bar {
		background-color: var(--bg-color);
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		z-index: 3;
	}

	.navgatorBar {
		background-color: var(--bg-color);
		display: flex;
		justify-content: center;
		position: sticky;
		width: 100vw;
		transition-property: background-color;
		transition-duration: 0.3s;
		z-index: 3;
		top: var(--status-bar-height);

		&.active {
			background-color: #888;
		}

		image {
			width: 3em;
			height: 3em;
		}

		.title {
			font-size: 20px;
			text-align: center;
			align-self: center;
			display: inline-block;
		}
	}

	.layout {
		background-color: var(--bg-color);
		padding-bottom: 50px;
		overflow: hidden;
		/* #ifndef H5 */
		padding-top: 45rpx;
		/* #endif */
	}
</style>
