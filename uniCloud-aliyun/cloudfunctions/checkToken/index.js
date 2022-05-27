'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	// console.log(event)
	const {
		token
	} = event
	const payload = await uniID.checkToken(token)
	let res = payload.code === 0 ? true : false
	return res
}
