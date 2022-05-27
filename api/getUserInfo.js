export function getUserInfo(token) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: 'getUserInfo',
			data: {
				token
			},
			success(e) {
				resolve(e.result)
			}
		})
	})
}
