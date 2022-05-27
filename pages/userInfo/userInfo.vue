<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar">
		<uni-icons class="icon" type="back" size="28" @click="back"></uni-icons>
		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<!-- 用户信息 -->
	<view class="info">
		<!-- 头像 -->
		<image :src="$store.state.avatar" mode="" class="avatar"></image>
		<uni-section title="个人信息" type="line" class="detail">
			<uni-list class="list">
				<uni-list-item title="用户名" class="item">
					<template #body>
						<view style="padding-left:50rpx ;width:300rpx;">
							用户名：
						</view>
						<view>{{$store.state.userName}}</view>
					</template>
				</uni-list-item>
				<uni-list-item title="注册时间" class="item">
					<template #body>
						<view style="padding-left:50rpx ;width:300rpx;">
							注册时间：
						</view>
						<view>{{registerDate}}</view>
					</template>
				</uni-list-item>
				<uni-list-item title="上次登录时间" class="item">
					<template #body>
						<view style="padding-left:50rpx ;width:300rpx;">
							上次登录时间：
						</view>
						<view>{{lastLoginDate}}</view>
					</template>
				</uni-list-item>
			</uni-list>
		</uni-section>
	</view>
	<button @click="logOut" style="width: 200px;" type="warn">注销</button>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	import {
		useStore
	} from 'vuex'

	import {
		getUserInfo
	} from '@/api/getUserInfo.js'

	// 全局状态管理
	let store = useStore()
	// 注册时间
	let registerDate = ref()
	// 上次登录时间
	let lastLoginDate = ref()

	onMounted(async () => {
		if (store.state.registerDate === "" && store.state.lastLoginDate === "") {
			let res = await getUserInfo(store.state.token)
			registerDate.value = new Date(res.register_date).toLocaleString()
			if (res.last_login_date)
				lastLoginDate.value = new Date(res.last_login_date).toLocaleString()
			else lastLoginDate.value = '无'
			store.commit('setTime', {
				registerDate: registerDate.value,
				lastLoginDate: lastLoginDate.value
			})
		} else {
			registerDate.value = store.state.registerDate
			lastLoginDate.value = store.state.lastLoginDate
		}
	})

	// 回退
	function back() {
		uni.navigateBack({
			animationType: 'fade-out',
			animationDuration: 200
		})
	}
	// 登出
	function logOut() {
		uniCloud.callFunction({
			name: 'user-center',
			data: {
				action: 'logout'
			},
			success: (e) => {
				if (e.result.code == 0) {
					store.commit('logout')
					uni.removeStorageSync('uni_id_token')
					uni.removeStorageSync('username')
					uni.removeStorageSync('uni_id_has_pwd')
					uni.removeStorageSync('avatar')
					uni.reLaunch({
						url: '../login/login',
					});
				} else {
					uni.showModal({
						content: e.result.msg,
						showCancel: false
					})
				}
			},
			fail: (e) => {
				uni.showModal({
					content: JSON.stringify(e),
					showCancel: false
				})
			}
		})

	}
</script>

<style lang="less">
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
		z-index: 3;
		top: var(--status-bar-height);
		padding: 5px 0;

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

	.icon {
		position: absolute;
		left: 15px;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
	}

	.info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 80rpx;

		.avatar {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 1px solid #999;
		}

		.detail {
			width: 100%;
			box-sizing: border-box;
			background-color: var(--bg-color) !important;
			padding: 15px 0;

			.item {
				background-color: var(--bg-color) !important;
			}
		}
	}
</style>
