const router = require('express').Router();

const customerController = require('../controllers/customers.controller');
const validation = require('../middleware/validation/customer.validation');

const { isAuthenticated } = require('../middleware/authenticate');

// GET list of customers
router.get('/', customerController.getAll);

// GET list of customers
router.get('/:id', customerController.getSingle);

// POST create a new customer
router.post('/', isAuthenticated, validation.saveCustomer, customerController.createCustomer);

// PUT update an existing customer
router.put('/:id', isAuthenticated, validation.saveCustomer, customerController.updateCustomer);

// DELETE delete an existing customer
router.delete('/:id', isAuthenticated, customerController.deleteCustomer);

module.exports = router;