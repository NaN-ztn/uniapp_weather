export function checkUser(username) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: 'checkUser',
			data: {
				params: {
					username
				}
			},
			success(e) {
				if (e.result.isExist) {
					reject(new Error("用户名已存在"))
				} else {
					resolve(true)
				}
			}
		})
	})
}
