const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Products']
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('products').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }  
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Products']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to find a product.');
  }
  const productId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('products').find(productId).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  
const createProduct = async (req, res) => {
  //#swagger.tags=['Products']
  const product = {
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    sku: req.body.sku
  }
    const response = await mongodb.getDb().db().collection('products').insertOne(product);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating a product');     
    }
};
  
const updateProduct = async (req, res) => {
  //#swagger.tags=['Products']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid product id to update a product.');
  }
  const productId = new ObjectId(req.params.id);
  const product = {
    productName: req.body.productName,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    sku: req.body.sku
    }
  const response = await mongodb.getDb().db().collection('products').replaceOne({ _id: productId } ,product);

  if (response.modifiedCount > 0)     {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the product');     
  }

  };

  const deleteProduct = async (req, res) => {
  //#swagger.tags=['Products']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid product id to delete a product.');
    }
    const productId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('products').deleteOne({ _id: productId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting a product');     
    }
  };
  
module.exports = { getAll, getSingle, createProduct, updateProduct, deleteProduct };