const router = require('express').Router();

const productController = require('../controllers/products.controller');
const validation = require('../middleware/validation/product.validation');

const { isAuthenticated } = require('../middleware/authenticate');

// GET list of products
router.get('/', productController.getAll);

// GET list of products
router.get('/:id', productController.getSingle);

// POST create a new product
router.post('/', isAuthenticated, validation.saveProduct, productController.createProduct);

// PUT update an existing product
router.put('/:id', isAuthenticated, validation.saveProduct, productController.updateProduct);

// DELETE delete an existing product
router.delete('/:id', isAuthenticated, productController.deleteProduct);

module.exports = router;