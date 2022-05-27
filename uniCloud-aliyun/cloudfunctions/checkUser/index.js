'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const uniUsers = db.collection('uni-id-users')
	let params = event.params || {}
	let number = await uniUsers.where({
		username: params.username
	}).count()
	let isExist = number.total > 0
	//返回数据给客户端
	return {
		isExist
	}
};
