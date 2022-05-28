'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		username
	} = event

	const collection = db.collection('city_list');

	let res = await collection.field({
		province: true,
		city: true,
		adcode: true
	}).where({
		username
	}).get()

	//返回数据给客户端
	return res.data
};
