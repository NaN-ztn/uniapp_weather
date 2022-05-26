<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar">
		<uni-icons class="icon" type="back" size="28" @click="back"></uni-icons>
		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<uni-section title="登录" type="line" class="login">
		<view>
			<uni-forms ref=" loginForm">
				<uni-forms-item label="手机号" required>
					<uni-easyinput v-model="loginFormData.phoneNumber" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item label="密码" required>
					<uni-easyinput v-model="loginFormData.passWord" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<view>
				<button type="primary" @click="handleSubmit">登录</button>
				<button class="btn_visitor" @click="handleVisitor">游客访问</button>
			</view>
			<view class="register">
				<navigator animation-type="fade-in" animation-duration="200" url="/pages/register/register">
					点此注册账号
				</navigator>
			</view>
		</view>
	</uni-section>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	// //表单数据
	// let alignmentFormData = ref({
	// 	phoneNumber: '',
	// 	passWord: ''
	// })
	// 基础表单数据
	let loginFormData = ref({
		userName: '',
		passWord: ''
	})
	// 登录表单
	let loginForm = ref(null)

	// 登录
	function handleSubmit() {
		console.log('btn_login');
	}
	// 游客登录
	function handleVisitor() {
		console.log('btn_visitor');
	}
	// 返回
	function back() {
		uni.navigateBack({
			animationType: 'fade-out',
			animationDuration: 200
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
		justify-content:
			center;
		position: sticky;
		width: 100vw;
		transition-property: background-color;
		transition-duration: 0.3s;
		z-index: 3;
		top: var(--status-bar-height);

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

	.login {
		background-color: var(--bg-color) !important;
		margin: 30px 15px 0;
		padding-top: 10px;

		.btn_visitor {
			margin-top: 20px;
			background-color: #c7c7c7;
		}
	}

	.register {
		margin-top: 15px;
		display: flex;
		justify-content: center;
		font-size: 15px;
		color: #aeaeae;
	}

	.icon {
		position: absolute;
		left: 20px;
		top: 0;
		bottom: 0;
		display: flex;
		align-items: center;
	}
</style>
