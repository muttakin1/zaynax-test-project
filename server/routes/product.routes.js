import express from 'express'
import productCtrl from '../controllers/product.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()


router.route('/api/products')
  
  .get( productCtrl.read)

  // router.route('/api/products')
  // .post(productCtrl.create)

  router.route('/api/products/new/:userId')
  .post(productCtrl.create)

  router.route('/api/products/photo/:productId')
  .get(productCtrl.photo)


// router.route('/api/expenses/:expenseId')
//   // .get(authCtrl.requireSignin, expenseCtrl.read)
//   .put(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.update)
//   .delete(authCtrl.requireSignin, expenseCtrl.hasAuthorization, expenseCtrl.remove)

router.param('productId', productCtrl.productById)

// router.param('userId', userCtrl.userById)

export default router
