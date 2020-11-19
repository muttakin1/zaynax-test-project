import express from 'express';
import orderCtrl from '../controllers/order.controller';
import authCtrl from '../controllers/auth.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router
	.route('/api/order')
	.post(authCtrl.requireSignin,orderCtrl.create)
	.get(orderCtrl.list);
	
router
	.route('/api/order/:orderId')
	.get(orderCtrl.read)
	.put(authCtrl.requireSignin, orderCtrl.update)
    
router.param('orderId', orderCtrl.orderById);
router.param('userId', userCtrl.userByID);


export default router;