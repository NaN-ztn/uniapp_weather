<template>
	<!-- 天气信息 -->
	<uni-section :title="info.province+' > '+info.city" type="circle" class="weatherInfo" v-show="isDataReady">
		<uni-card title="基础卡片" sub-title="副标题" extra="额外信息" padding="10px 0">
			<template v-slot:title>
				<!-- 市区 -->
				<view class="infoHead">
					<text class="t-icon icon-size" :class="tianqi"></text>
					<text>{{info.city}}</text>
					<view class="realTime">(实时)</view>
					<view class="line"></view>
				</view>
			</template>
			<!-- 天气详情 -->
			<view class="weather">
				{{ detailInfo.weather }}
			</view>
			<view class="temperature">
				<text>{{ detailInfo.temperature }}</text>
				<text class="sheshidu" style=""> ℃</text>
			</view>
			<view class="wind">
				<view class="">
					风力：{{ detailInfo.windpower }}
				</view>
				<view class="">
					风向：{{ detailInfo.winddirection }}
				</view>
				<view class="">
					空气湿度：{{ detailInfo.humidity }}%
				</view>
			</view>
		</uni-card>
	</uni-section>

	<uni-section :title="'近 4 日'+info.city+'天气预报'" type="circle" class="weatherInfo fade" v-show="isDataReady">
		<view class="weatherTable">
			<uni-table stripe emptyText="暂无更多数据">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="center">日期</uni-th>
					<uni-th align="center">早间天气</uni-th>
					<uni-th align="center">早间温度</uni-th>
					<uni-th align="center">夜间天气</uni-th>
					<uni-th align="center">夜间温度</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="item in detailInfo.featureMapData">
					<uni-td>{{item.date}}</uni-td>
					<uni-td>{{item.dayweather}}</uni-td>
					<uni-td>{{item.daytemp}} <text class="sheshidu" style=""> ℃</text></uni-td>
					<uni-td>{{item.nightweather}}</uni-td>
					<uni-td>{{item.nighttemp}} <text class="sheshidu" style=""> ℃</text></uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</uni-section>
	<uni-section :title="'近 4 日'+info.city+'气温趋势图'" type="circle" class="weatherInfo fade" v-show="isDataReady">
		<view class="charts-box" v-if="chartData">
			<qiun-data-charts type="line" :opts="{extra:{line:{type:'curve'}}}" :eopts="{seriesTemplate:{smooth:true}}"
				:chartData="chartData" :echartsH5="true" :echartsApp="true" />
		</view>
	</uni-section>
</template>

<script setup>
	import {
		onMounted,
		computed,
		ref
	} from 'vue'

	import {
		weatherToIcon
	} from "/utils/weatherToIcon.js"

	import {
		getWeather
	} from "/utils/getWeather.js"

	const props = defineProps({
		info: Object
	})

	let detailInfo = ref({})

	let isDataReady = ref(false)

	let chartData = ref(null)

	let seriesData1, seriesData2

	onMounted(async () => {
		uni.showLoading({
			title: '加载中'
		});

		let weatherInfo = await getWeather(props.info.adcode)

		detailInfo.value = {
			...weatherInfo[0],
			...weatherInfo[1]
		}

		seriesData1 = detailInfo.value.featureMapData.map(currentValue => currentValue.daytemp)
		seriesData2 = detailInfo.value.featureMapData.map(currentValue => currentValue.nighttemp)

		chartData.value = {
			categories: ['今天', '明天', '后天', '三天后'],
			series: [{
					name: '白天气温',
					data: seriesData1,
				},
				{
					name: '夜间气温',
					data: seriesData2,
				}
			]
		}

		uni.hideLoading();
		isDataReady.value = true

		console.log(detailInfo.value);
	})

	let tianqi = computed(() => 't-icon-' + weatherToIcon[detailInfo.value.weather])
</script>


<style lang="less" scoped>
	.icon-size {
		height: 80rpx;
		width: 80rpx;
		position: absolute;
		left: 30px;
		top: 0;
		bottom: 0;
		margin: auto;
		background-repeat: no-repeat;
	}

	.weatherInfo {
		margin-top: 15px;
		background-color: var(--bg-color);
	}

	.appear {
		opacity: 1;
	}

	.infoHead {
		text-align: center;
		font-weight: 500;
		font-size: 60rpx;
		padding-top: 20rpx;
		position: relative;

		.line {
			border-bottom: 1px #aaa solid;
		}

		.realTime {
			font-size: 30rpx;
			padding-bottom: 20rpx;
		}
	}

	.weather {
		margin-top: 30rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: 600;
	}

	.temperature {
		margin-top: 80rpx;
		text-align: center;
		font-size: 80rpx;
		position: relative;
		font-weight: 600;

		.sheshidu {
			padding-left: 10rpx;
			font-size: 30rpx;
			position: absolute;
			bottom: -10rpx;
			font-weight: 600;
		}
	}

	.wind {
		margin-top: 40rpx;
		font-size: 30rpx;
		text-align: center;
		display: grid;
		grid-template-rows: repeat(3, 80rpx);
		line-height: 80rpx;
	}


	.weatherTable {
		margin: 20px 15px;
		border: 1px solid #eff1f7;
		border-radius: 5px;
		overflow: hidden;
	}

	.charts-box {
		width: 100%;
		height: 300px;
	}
</style>
