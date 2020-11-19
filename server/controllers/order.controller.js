import Order from '../models/order.model';
import extend from 'lodash/extend';
import errorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
  
	const order = new Order(req.body);
    order.status = 'Pending';
    order.orderNumber=Math.floor(1000 + Math.random() * 9000);

    order.orderedBy = req.auth._id;
    
	try {
        await order.save();
        console.log("order saved");
		return res.status(200).json({
			message: 'order added...',
		});
	} catch (error) {
        console.log(error);
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};
const orderById = async (req, res, next, id) => {
	try {
		let order = await Order.findById(id);
		if (!order)
			return res.status('400').json({
				error: 'order not found',
			});
		req.order = order;
		next();
	} catch (error) {
		return res.status('400').json({
			error: 'Could not retrieve order',
		});
	}
};
const read = async (req, res) => {
	return res.json(req.order);
};

const list = async (req, res) => {
    
	try {
		let order = await Order.find();
		res.json(order);
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};
const update = async (req, res) => {
	try {
		let order = req.order;
		order = extend(order, req.body);
		order.updated = Date.now();
		await order.save();
		res.json(order);
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error),
		});
	}
};

export default {
	create,
	orderById,
	read,
	list,
	update,
	
};
