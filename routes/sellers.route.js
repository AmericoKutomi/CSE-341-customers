const router = require('express').Router();

const sellerController = require('../controllers/sellers.controller');
const validation = require('../middleware/validation/seller.validation');

const { isAuthenticated } = require('../middleware/authenticate');

// GET list of sellers
router.get('/', sellerController.getAll);

// GET list of sellers
router.get('/:id', sellerController.getSingle);

// POST create a new seller
router.post('/', isAuthenticated, validation.saveSeller, sellerController.createSeller);

// PUT update an existing seller
router.put('/:id', isAuthenticated, validation.saveSeller, sellerController.updateSeller);

// DELETE delete an existing seller
router.delete('/:id', isAuthenticated, sellerController.deleteSeller);

module.exports = router;