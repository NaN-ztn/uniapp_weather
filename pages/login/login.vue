<template>
	<view class="status_bar">
		<!-- 这里是状态栏 -->
	</view>
	<view class="navgatorBar">
		<uni-icons class="icon" type="back" size="28" @click="back"></uni-icons>
		<image src="/static/favicon.png" mode="aspectFit"></image>
		<view class="title">天气查询</view>
	</view>
	<!-- 登录表单 -->
	<uni-section title="登录" type="line" class="login">
		<view>
			<uni-forms ref="loginForm" validateTrigger="bind">
				<uni-forms-item label="用户名" required name="userName">
					<uni-easyinput v-model="loginFormData.userName" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item label="密码" required name="passWord">
					<uni-easyinput type="password" v-model="loginFormData.passWord" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item label="验证码" required v-if="needCaptcha" name="veryfyCode">
					<view class="" style="display: flex;">
						<uni-easyinput v-model="loginFormData.veryfyCode" placeholder="请输入验证码" />
						<image :src="captchaBase64"
							style="display:flex;width: 130px; height: inherit;margin-left: 10px;"
							@click="captcha('refreshCaptcha')"></image>
					</view>
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

	import {
		useStore
	} from 'vuex'

	import {
		getDeviceUUID
	} from '@/utils/getDeviceUUID.js'

	import {
		onReady
	} from '@dcloudio/uni-app'

	// 全局状态管理
	const store = useStore()
	// 验证码配置
	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}

	// 基础表单数据
	let loginFormData = ref({
		userName: '',
		passWord: '',
		veryfyCode: ''
	})
	// 登录表单
	let loginForm = ref(null)
	// 是否需要验证码
	let needCaptcha = ref(false)
	// 验证码加载
	let captchaing = ref(false)
	// 验证码
	let captchaBase64 = ref('')
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
		userName: {
			rules: [{
				required: true,
				errorMessage: '用户名不能为空'
			}]
		},
		veryfyCode: {
			rules: [{
				required: true,
				errorMessage: '验证码不能为空'
			}]
		}
	}

	onReady(() => {
		loginForm.value.setRules(rules)
	})

	// 登录
	function handleSubmit() {
		loginForm.value.validate().then(res => {
			uni.showToast({
				icon: 'loading',
				title: "登录中"
			})
			const data = {
				username: loginFormData.value.userName,
				password: loginFormData.value.passWord,
				captcha: loginFormData.value.veryfyCode,
				...captchaOptions
			};
			uniCloud.callFunction({
				name: 'user-center',
				data: {
					action: 'login',
					params: data
				},
				success: (e) => {
					if (e.result.code == 0) {
						needCaptcha.value = false;
						uni.setStorageSync('uni-needCaptcha', needCaptcha.value)

						uni.setStorageSync('uni_id_token', e.result.token)
						uni.setStorageSync('username', e.result.username)
						uni.setStorageSync('login_type', 'online')
						uni.setStorageSync('uni_id_has_pwd', true)
						toMain(loginFormData.value.userName);
					} else {
						uni.hideToast()
						if (e.result.message !== "验证码不可为空") {
							uni.showModal({
								content: e.result.message,
								showCancel: false
							})
						}

						needCaptcha.value = e.result.needCaptcha;
						uni.setStorageSync('uni-needCaptcha', needCaptcha.value)
						if (needCaptcha.value) {
							captcha('createCaptcha')
						}
					}
				},
				fail: (e) => {
					uni.showModal({
						content: JSON.stringify(e),
						showCancel: false
					})
				}
			})
		}).catch(err => {
			return
		})
	}
	// 游客登录
	function handleVisitor() {
		uni.showToast({
			icon: 'error',
			title: "游客访问受限",
			success() {
				setTimeout(() => {
					uni.navigateTo({
						url: "../index/index",
						animationType: 'fade-in',
						animationDuration: 200
					})
				}, 1500)
			}
		})
	}
	// 返回
	function back() {
		uni.navigateBack({
			animationType: 'fade-out',
			animationDuration: 200
		})
	}
	// 登录跳转
	function toMain(userName) {
		console.log(userName);
		store.commit('login', userName)
		/**
		 * 强制登录时使用reLaunch方式跳转过来
		 * 返回首页也使用reLaunch方式
		 */
		uni.reLaunch({
			url: '../index/index',
		});
	}
	// 验证码逻辑
	async function captcha(action, args) {
		if (captchaing.value) return;

		// 验证不loading
		captchaing.value = true;

		let {
			result: res
		} = await uniCloud.callFunction({
			name: 'user-center',
			data: {
				action,
				params: {
					...captchaOptions,
					...args
				}
			}
		})
		captchaing.value = false;
		if (res.code === 0) {
			captchaBase64.value = res.captchaBase64
		} else {
			uni.showToast({
				icon: 'none',
				title: res.message,
				duration: 1000
			})
		}
		return res;
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
		margin: 0 15px;
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

	.login-type {
		margin-bottom: 15px;
		font-size: 13px;
		display: flex;
		justify-content: flex-end;
	}

	.login-type-btn {
		line-height: 30px;
		margin: 0px 15px;
	}

	.login-type-btn.act {
		color: #0FAEFF;
		border-bottom: solid 1px #0FAEFF;
	}
</style>
