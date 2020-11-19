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
  

export { create,list};
