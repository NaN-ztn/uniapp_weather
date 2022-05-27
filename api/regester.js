export function register(data) {
	return new Promise((res, rej) => {
		uniCloud.callFunction({
			name: 'user-center',
			data: {
				action: 'register',
				params: data
			},
			success(e) {
				if (e.result.code === 0) {
					uni.showToast({
						title: '注册成功'
					});
					uni.setStorageSync('uni_id_token', e.result.token)
					uni.setStorageSync('username', e.result.username)
					res(e.result.token)
				} else {
					uni.showModal({
						content: JSON.stringify(e.result),
						showCancel: false
					})
					rej(e.result)
				}
			},
			fail(e) {
				uni.showModal({
					content: JSON.stringify(e),
					showCancel: false
				})
				rej(e.result)
			}
		})
	})
}
