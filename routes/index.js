const routes = require('express').Router();

const passport = require('passport');
const customersRoutes = require('./customers.route');
const productsRoutes = require('./products.route');
const sellersRoutes = require('./sellers.route');
const ordersRoutes = require('./orders.route');

routes.use('/', require('./swagger'));

routes.use('/customers', customersRoutes);
routes.use('/products', productsRoutes);
routes.use('/sellers', sellersRoutes);
routes.use('/orders', ordersRoutes);

routes.get('/login', passport.authenticate('github', (req, res) => {} ));

routes.get('/logout', (req, res, next) => {
  req.logout(function(err) { 
    if (err) { return next(err); }
    res.redirect('/');
    });
});   

module.exports = routes;
