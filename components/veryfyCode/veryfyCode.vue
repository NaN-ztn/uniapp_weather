<template>
	<view style="display: flex;">
		<button style="padding:0 2px 0;margin: 0 0 0 10px; width: 100px;" type="primary" size="mini"
			@click="handleClick" :disabled="isSend">{{vbtnMessage}}</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	import {
		sendSmsCode
	} from '@/api/sendSmsCode.js'

	let vbtnMessage = ref('获取短信验证码')
	let isSend = ref(false)
	let vtime = ref(60)

	function handleClick() {
		isSend.value = true
		loopTiming()
		sendSmsCode()
	}

	function loopTiming() {
		setTimeout(() => {
			if (--vtime.value === 0) {
				vbtnMessage.value = '获取短信验证码'
				isSend.value = false
				vtime.value = 60
			} else {
				vbtnMessage.value = `${vtime.value}S`
				loopTiming()
			}
		}, 1000);
	}
</script>

<style lang="less">

</style>
