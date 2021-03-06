// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3

import {
	createSSRApp
} from 'vue'

import App from './App.vue'

import store from './store/index.js'

export function createApp() {
	const app = createSSRApp(App).use(store)
	return {
		app
	}
}
// #endif
