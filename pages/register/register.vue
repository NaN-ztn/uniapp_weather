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
		<uni-forms ref="registerForm" validate-trigger="bind">
			<uni-forms-item label="用户名" required name="userName">
				<uni-easyinput v-model="registerFormData.userName" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item label="密码" required name="passWord">
				<uni-easyinput type="password" v-model="registerFormData.passWord" placeholder="请输入密码" />
			</uni-forms-item>
			<uni-forms-item label="确认密码" required name="veryfyPassWord">
				<uni-easyinput type="password" v-model="registerFormData.veryPassWord" placeholder="请输确认密码" />
			</uni-forms-item>
			<uni-forms-item label="头像">
				<view class="avatar_item">
					<uni-file-picker ref="uploadComponent" :autoUpload="false" @success="handleSuccess"
						@select="selectAvatar" return-type="object" v-model="registerFormData.fileLists" limit="1"
						:imageStyles="imageStyles" @delete="handleDelete" file-mediatype="image">
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

	import {
		useStore
	} from 'vuex'

	import {
		onReady
	} from '@dcloudio/uni-app'

	import {
		register
	} from '@/api/regester.js'

	import {
		checkUser
	} from '@/api/checkUser.js'

	import {
		setAvatar
	} from '@/api/setAvatar.js'

	// 全局状态管理
	const store = useStore()
	// 基础表单数据
	let registerFormData = ref({
		userName: '',
		passWord: '',
		veryPassWord: '',
		fileLists: {},
		file: null
	})
	// 注册表单
	let registerForm = ref(null)
	// 上传控件
	let uploadComponent = ref(null)
	// 头像上传样式
	let imageStyles = ref({
		width: 80,
		height: 80,
		border: {
			radius: '50%'
		}
	})
	// 校验规则
	let rules = {
		passWord: {
			rules: [{
				required: true,
				errorMessage: '密码不能为空'
			}, {
				validateFunction: function(rule, value, data, callback) {
					let pwd = String(value);
					if (pwd.indexOf(" ") != -1) {
						callback("密码不能存在空格")
						return false
					}
					if (pwd.length < 6 || pwd.length > 18) {
						callback("密码长度需在6到18位之间")
						return false
					}
					return true
				}
			}]
		},
		veryfyPassWord: {
			rules: [{
				required: true,
				errorMessage: '确认密码不能为空'
			}, {
				validateFunction: function(rule, value, data, callback) {
					let vpwd = String(value);
					if (vpwd !== registerFormData.value.passWord) {
						callback("请输入正确密码")
						return false
					}
					return true
				}
			}, {

				validateFunction: function(rule, value, data, callback) {
					let pwd = String(value);
					if (pwd.indexOf(" ") != -1) {
						callback("密码不能存在空格")
						return false
					}
					if (pwd.length < 6 || pwd.length > 18) {
						callback("密码长度需在6到18位之间")
						return false
					}
					return true
				}

			}]
		},
		userName: {
			rules: [{
				required: true,
				errorMessage: '用户名不能为空'
			}, {
				validateFunction: function(rule, value, data, callback) {
					return checkUser(registerFormData.value.userName)
				}
			}],
			validateTrigger: "submit"
		}
	}

	onReady(() => {
		registerForm.value.setRules(rules)
	})

	// 注册
	async function handleSubmit() {
		registerForm.value.validate().then(async res => {
			let data = {
				username: registerFormData.value.userName,
				password: registerFormData.value.passWord,
			}
			let uniIdToken = await register(data)
			let avatar =
				'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-67fb10a5-3acc-48e5-855b-60b6e11be702/c10684aa-374b-436c-9737-52139328efca.png'
			if (registerFormData.value.file) {
				let [{
					url
				}] = await uploadComponent.value.upload()
				avatar = url
			}
			await setAvatar(avatar, uniIdToken)
			store.commit('login', {
				userName: registerFormData.value.userName,
				avatar,
				token: uniIdToken
			})
			uni.reLaunch({
				url: '../index/index',
			});
		}).catch(err => {
			return
		})
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
	// 处理上传文件删除
	function handleDelete(e) {
		registerFormData.value.file = null
	}
	// 处理上传成功回调
	function handleSuccess({
		tempFilePaths
	}) {
		// console.log(tempFilePaths);
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
		margin: 0 15px;
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
