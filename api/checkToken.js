export function checkToken(token) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: 'checkToken',
			data: {
				token
			},
			success(e) {
				resolve(e.result)
			}
		})
	})
}
