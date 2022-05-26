<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar" :class="{ active: headerScroll }">
		<view class="addCity">
			<uni-icons class="icon" type="list" @click="showDrawer" size="28"></uni-icons>
			<!-- 抽屉 -->
			<uni-drawer class="drawer" ref="showLeft" mode="left" :width="320">
				<view class="drawerHead">
					<uni-icons type="back" @click="closeDrawer" size="28"></uni-icons>
					<uni-icons type="plusempty" @click="showDialog" size="28"></uni-icons>
				</view>
				<!-- 列表 -->
				<uni-list>
					<uni-list-item>
						<template #header>
							<uni-icons type="location-filled" size="28" color="green"></uni-icons>
							<text style="padding: 5px 0 0 5px;">列表文字</text>
						</template>
						<template #footer>
							<uni-icons type="close" size="28" color="darkred"></uni-icons>
						</template>
					</uni-list-item>
				</uni-list>
			</uni-drawer>
		</view>

		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<view class="layout">
		<!-- 天气信息 -->
		<weatherInfo :info="info" v-if="info"></weatherInfo>
	</view>
	<!-- 弹出层 -->
	<uni-popup ref="dialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" title="查询城市" @close="clseDialog" @confirm="confirmDialog"
			:before-close="true">
			<uni-data-picker placeholder="请选择查询地区" popup-title="查询地区" :localdata="cascadeData" v-model="currentData"
				:map="{value:'value',text:'label'}">
			</uni-data-picker>
		</uni-popup-dialog>
	</uni-popup>
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

	import {
		provinceAndCityData
	} from 'element-china-area-data'

	// 导航栏显示
	let headerScroll = ref(false)
	// 位置信息 
	let info = ref(null)
	// 左侧添加抽屉控件
	let showLeft = ref(null)
	// 对话框控件
	let dialog = ref(null)
	// 级联数据
	let cascadeData = ref(provinceAndCityData)
	// 级联所选数据
	let currentData = ref()

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

	// 打开窗口
	function showDrawer() {
		showLeft.value.open()
	}
	// 关闭窗口 
	function closeDrawer() {
		showLeft.value.close()
	}
	// 打开窗口
	function showDialog() {
		dialog.value.open()
	}
	// 对话框确认
	function confirmDialog() {
		if (!currentData.value) {
			uni.showToast({
				title: "查询地区不能为空",
				icon: 'none'
			})
			return
		}
		if (currentData.value.startsWith('7')) {
			uni.showToast({
				title: "台湾地区暂不支持查询",
				icon: 'none'
			})
			currentData.value = ""
		}
	}
	// 对话框取消
	function clseDialog() {
		currentData.value = ""
		dialog.value.close()
	}
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
		transition-property: all;
		transition-duration: 0.3s;
		z-index: 3;
		top: var(--status-bar-height);

		&.active {
			background-color: #ddd;
			box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.3);
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

	.addCity {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 20rpx;

		.icon {
			margin: auto;
		}
	}

	.drawerHead {
		padding: 10px;
		display: flex;
		justify-content: space-between;
	}

	:deep(.uni-data-tree) {
		width: 100%;
	}
</style>
