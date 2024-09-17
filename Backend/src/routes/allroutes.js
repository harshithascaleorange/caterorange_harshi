const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController');
const auth = require('../middleware/auth.js');
const logger = require('../config/logger');
const client = require('../config/db.js');

router.post('/customer/login',customerController.login)
router.post('/customer/register',customerController.register)
router.post('/customer/forgotPassword',customerController.forgotPassword);
router.post('/customer/google_auth',customerController.google_auth);
router.get('/customer/info',auth,customerController.customer_info);
router.get('/customer/corporate/categories', customerController.GetCorporateCategory);
router.post('/customer/cart/corporate',auth,customerController.add_Corporate_Cart)
router.get('/customer/getCorporateCarts',customerController.getCorporateCart)
router.get('/customer/getCustomerDetails', auth, customerController.getCustomerDetails)
router.post('/customer/corporateOrderDetails', auth,customerController.addCorporateOrderDetails);
router.get('/customer/corporate/myorders',auth,customerController.getOrderDetails);

module.exports= router;