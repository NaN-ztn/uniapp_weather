<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
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
