import {
	createStore
} from 'vuex'

const store = createStore({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		avatar: "",
		token: "",
		univerifyErrorMsg: "",
		hideUniverify: true
	},
	mutations: {
		login(state, payload) {
			const {
				userName,
				avatar,
				token
			} = payload

			state.userName = userName || '新用户';
			state.avatar = avatar
			state.token = token
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		setUniverifyErrorMsg(state, payload = '') {
			state.univerifyErrorMsg = payload
		},
		setHideUniverify(state, payload = false) {
			state.hideUniverify = payload
		}
	}
})

export default store
