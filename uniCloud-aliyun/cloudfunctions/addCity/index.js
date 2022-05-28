'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	//event为客户端上传的参数
	// console.log('event : ', event)
	const {
		username,
		province,
		city,
		adcode
	} = event

	const collection = db.collection('city_list');

	let countNumber = await collection.where({
		username,
		province,
		city,
		adcode
	}).count()

	// console.log(countNumber);

	if (countNumber.total > 0) {
		return {
			success: false,
			message: '已有该城市'
		}
	}

	let res = await collection.add({
		username,
		province,
		city,
		adcode
	})


	//返回数据给客户端
	return {
		id: res.id,
		success: true,
		message: '添加成功'
	}
};
