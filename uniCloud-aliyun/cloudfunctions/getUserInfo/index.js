'use strict';
const uniID = require('uni-id')
exports.main = async function(event, context) {
	const {
		token
	} = event
	const res = await uniID.checkToken(token)
	return res.userInfo
}
