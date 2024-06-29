const routes = require('express').Router();

const customersRoutes = require('./customers.route');
const productsRoutes = require('./products.route');

routes.use('/', require('./swagger'));

routes.use('/customers', customersRoutes);
routes.use('/products', productsRoutes);

module.exports = routes;
