const router = require('express').Router();

const productController = require('../controllers/products.controller');
const validation = require('../middleware/validation/product.validation');

// GET list of products
router.get('/', productController.getAll);

// GET list of products
router.get('/:id', productController.getSingle);

// POST create a new product
router.post('/', validation.saveProduct, productController.createProduct);

// PUT update an existing product
router.put('/:id', validation.saveProduct, productController.updateProduct);

// DELETE delete an existing product
router.delete('/:id', productController.deleteProduct);

module.exports = router;