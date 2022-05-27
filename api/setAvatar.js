export function setAvatar(avatar, uniIdToken) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: 'setAvatar',
			data: {
				avatar,
				uniIdToken
			},
			success(e) {
				if (e.result.code === 0) {
					resolve('头像设置成功')
				} else {
					reject(e.result.message)
				}
			}
		})
	})
}
