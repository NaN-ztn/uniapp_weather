<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar">
		<uni-icons class="icon" type="back" size="28" @click="back"></uni-icons>
		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<!-- 注册表单 -->
	<uni-section title="注册" type="line" class="register">
		<uni-forms ref="registerForm">
			<uni-forms-item label="手机号" required>
				<uni-easyinput v-model="registerFormData.phoneNumber" placeholder="请输入手机号" />
			</uni-forms-item>
			<uni-forms-item label="密码" required>
				<uni-easyinput v-model="registerFormData.passWord" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item label="验证码" required>
				<uni-easyinput v-model="registerFormData.veryCode" placeholder="请输入验证码" />
			</uni-forms-item>
			<uni-forms-item label="头像">
				<view class="avatar_item">
					<uni-file-picker @select="selectAvatar" return-type="object" v-model="registerFormData.fileLists"
						limit="1" :imageStyles="imageStyles" file-mediatype="image">
						选择</uni-file-picker>
				</view>
			</uni-forms-item>
		</uni-forms>
		<button type="primary" @click="handleSubmit">注册</button>
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
	let registerFormData = ref({
		phoneNumber: '',
		passWord: '',
		veryCode: '',
		fileLists: {},
		file: {}
	})
	// 注册表单
	let registerForm = ref(null)
	// 头像上传样式
	let imageStyles = ref({
		width: 80,
		height: 80,
		border: {
			radius: '50%'
		}
	})

	// 注册
	function handleSubmit() {
		console.log('btn_register');
		console.log(registerFormData.value);
	}
	// 返回
	function back() {
		uni.navigateBack({
			animationType: 'fade-out',
			animationDuration: 200
		})
	}
	// 选择头像获取文件信息
	function selectAvatar({
		tempFiles
	}) {
		registerFormData.value.file = tempFiles[0]
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

	.register {
		background-color: var(--bg-color) !important;
		margin: 30px 15px 0;
		padding-top: 10px;
	}

	.avatar_item {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
