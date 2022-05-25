import {
	key
} from "/utils/variable.js"

export function getLocation() {
	return new Promise((resolve, reject) => {

		function successH5(res) {
			const {
				province,
				city,
				adcode
			} = res.data

			resolve({
				province,
				city,
				adcode
			})
		}

		function successAPP(res) {
			const {
				province,
				city,
				district,
				street,
				streetNum
			} = res.address

			uni.request({
				url: `https://restapi.amap.com/v3/geocode/geo?address=${province+city+district+street+streetNum}&key=${key}`,
				method: 'GET',
				timeout: 6000,
				success: (res) => {
					const {
						adcode
					} = res.data.geocodes[0]

					resolve({
						province,
						city,
						adcode
					})
				},
				fail
			})
		}

		function fail() {
			uni.showToast({
				title: "定位失败",
				icon: "error"
			})
		}

		//#ifdef H5
		getLocationH5(successH5, fail)
		//#endif

		// #ifdef APP-PLUS
		getLocationApp(successAPP, successH5, fail)
		// #endif
	})

}

function getLocationH5(successH5, fail) {
	uni.request({
		url: `https://restapi.amap.com/v3/ip?key=${key}`,
		method: 'GET',
		timeout: 6000,
		success: successH5,
		fail
	})
}

function getLocationApp(successAPP, successH5, fail) {
	uni.getLocation({
		success: successAPP,
		fail: getLocationH5.bind(null, successH5, fail),
		geocode: true,
		type: "gcj02",
	})
}
