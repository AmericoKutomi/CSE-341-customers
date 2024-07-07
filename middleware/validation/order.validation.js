const validator = require('./validate');

const saveOrder = (req, res, next) => {
  const validationRule = {
    orderNumber: 'required|string',
    orderDate: 'required|date', 
    customer: 'required|string', 
    seller:  'required|string', 
    products: 'required|array',
    'products.*.id': 'required|string'
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
    saveOrder
};