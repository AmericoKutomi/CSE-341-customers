const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Orders']
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('orders').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to find a order.');
  }
  const orderId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('orders').find(orderId).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  
const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  const order = {
    orderNumber: req.body.orderNumber,
    orderDate: req.body.orderDate,
    customer: req.body.customer,
    seller: req.body.seller,
    products: req.body.products,
  }
    const response = await mongodb.getDb().db().collection('orders').insertOne(order);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating a order');     
    }
};
  
const updateOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to update a order.');
  }
  const orderId = new ObjectId(req.params.id);
  const order = {
    orderNumber: req.body.orderNumber,
    orderDate: req.body.orderDate,
    customer: req.body.customer,
    seller: req.body.seller,
    products: req.body.products,
    }
  const response = await mongodb.getDb().db().collection('orders').replaceOne({ _id: orderId } ,order);

  if (response.modifiedCount > 0)     {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the order');     
  }

  };

  const deleteOrder = async (req, res) => {
  //#swagger.tags=['Orders']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid order id to delete a order.');
    }
    const orderId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('orders').deleteOne({ _id: orderId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting a order');     
    }
  };
  
module.exports = { getAll, getSingle, createOrder, updateOrder, deleteOrder };