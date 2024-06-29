const validator = require('./validate');

const saveProduct = (req, res, next) => {
  const validationRule = {
    productName: 'required|string',
    description: 'required|string',
    price: 'required|numeric',
    category: 'required|string',
    sku: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
    saveProduct
};