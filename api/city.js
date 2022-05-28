export function addCity(username, province, city, adcode) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: "addCity",
			data: {
				username,
				province,
				city,
				adcode
			},
			success(e) {
				resolve(e.result)
			}
		})
	})
}

export function getCity(username) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: "getCity",
			data: {
				username
			},
			success(e) {
				resolve(e.result)
			}
		})
	})
}

export function deleteCity(_id) {
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name: "deleteCity",
			data: {
				_id
			},
			success(e) {
				resolve(e.result)
			}
		})
	})
}
