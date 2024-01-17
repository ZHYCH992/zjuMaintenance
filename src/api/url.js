let context;
console.log(import.meta.env.MODE);
import.meta.env.MODE === 'development' ? (context = '/api') : (context = '');
const url = {
	token: `${context}/repair_system/_web/_apps/repairPlatform/repairMsgApi/getLoginUser.rst`,
	deleteRecord: `${context}/repair_system/_web/_apps/repairPlatform/repairMsgApi/repair.rst`,
	sendRecord: `${context}/repair_system/_web/_apps/repairPlatform/repairMsgApi/create.rst`,
	queryRecord: `${context}/repair_system/_web/_apps/repairPlatform/repairMsgApi/repairMsgs.rst`,
};

function getToken(parameters = {}) {
	return {
		url: url.token,
		method: 'get',
		data: parameters,
	};
}
function queryRecord(parameters = {}) {
	return {
		url: url.queryRecord,
		method: 'post',
		data: parameters,
	};
}
function sendRecord(parameters = {}) {
	return {
		url: url.sendRecord,
		method: 'post',
		data: parameters,
	};
}
function deleteRecord(parameters = {}) {
	return {
		url: url.deleteRecord,
		method: 'post',
		data: parameters,
	};
}

export { deleteRecord, getToken, queryRecord, sendRecord };
