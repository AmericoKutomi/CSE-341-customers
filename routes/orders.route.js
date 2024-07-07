const router = require('express').Router();

const orderController = require('../controllers/orders.controller');
const validation = require('../middleware/validation/order.validation');

const { isAuthenticated } = require('../middleware/authenticate');

// GET list of orders
router.get('/', orderController.getAll);

// GET list of orders
router.get('/:id', orderController.getSingle);

// POST create a new order
router.post('/', isAuthenticated, validation.saveOrder, orderController.createOrder);

// PUT update an existing order
router.put('/:id', isAuthenticated, validation.saveOrder, orderController.updateOrder);

// DELETE delete an existing order
router.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = router;