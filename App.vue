<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import {
		checkToken
	} from '@/api/checkToken.js'
	export default {
		onLaunch: async function() {
			console.log('App Launch');
			let uniIdToken = uni.getStorageSync('uni_id_token')
			let res = await checkToken(uniIdToken)
			if (res) {
				this.login({
					userName: uni.getStorageSync('username'),
					avatar: uni.getStorageSync('avatar'),
					token: uniIdToken
				})
				uni.navigateTo({
					url: "../index/index"
				})
			} else {
				uni.navigateTo({
					url: "../login/login"
				})
			}
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations(['login', 'setUniverifyErrorMsg', 'setHideUniverify']),
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import './styles/iconfont/iconfont-weapp-icon.css';


	:root {
		--bg-color: #f7f8fa;
	}

	/* #ifndef APP-NVUE */
	// 设置整个项目的背景色
	page {
		background-color: var(--bg-color);
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
