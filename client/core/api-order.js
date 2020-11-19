const create = async (order, t) => {
	try {
		let response = await fetch('/api/order', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + t,
			},
			body: JSON.stringify(order),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};

const list = async (signal) => {
	try {
		let response = await fetch('/api/order', {
			method: 'GET',
			signal: signal,
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
const updateOrderById = async (params, credentials, order) => {
	console.log("api");
	try {
		let response = await fetch('/api/order/' + params, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + credentials,
			},
			body: JSON.stringify(order),
		});
		return await response.json();
	} catch (err) {
		console.log(err);
	}
};
  

export { create,list,updateOrderById};
