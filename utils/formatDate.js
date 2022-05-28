export function formatDate(date) {
	let yyyy = date.getFullYear()
	let MM = date.getMonth() + 1
	let DD = date.getDate()
	let hh = date.getHours()
	let mm = date.getMinutes()
	let ss = date.getSeconds()

	MM = MM > 9 ? MM : '0' + MM
	DD = DD > 9 ? DD : '0' + DD
	hh = hh > 9 ? hh : '0' + hh
	mm = mm > 9 ? mm : '0' + mm
	ss = ss > 9 ? ss : '0' + ss

	return `${yyyy}/${MM}/${DD} ${hh}:${mm}:${ss}`
}
