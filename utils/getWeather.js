import {
	key
} from "@/utils/variable.js"

export function getWeather(adcode) {
	function fail() {
		uni.showToast({
			title: "定位失败",
			icon: "error"
		})
	}

	let p1Resolve
	let p1 = new Promise((resolve, reject) => {
		p1Resolve = resolve
	})

	let p2Resolve
	let p2 = new Promise((resolve, reject) => {
		p2Resolve = resolve
	})

	function success1(res) {
		const {
			weather,
			temperature,
			winddirection,
			windpower,
			humidity,
			reporttime
		} = res.data.lives[0]
		p1Resolve({
			weather,
			temperature,
			winddirection,
			windpower,
			humidity,
			reporttime
		})
	}

	function success2(res) {
		let data = {}
		data.featureMapData = res.data.forecasts[0].casts;
		p2Resolve(data)
	}


	uni.request({
		url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${key}&extensions=base`,
		method: "GET",
		timeout: 6000,
		success: success1,
		fail
	})

	uni.request({
		url: `https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=${key}&extensions=all`,
		method: "GET",
		timeout: 6000,
		success: success2,
		fail
	})
	return Promise.all([p1, p2])
}
