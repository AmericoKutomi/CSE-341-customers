const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Sellers']
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('sellers').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Sellers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid seller id to find a seller.');
  }
  const sellerId = new ObjectId(req.params.id);
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('sellers').find(sellerId).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
  
const createSeller = async (req, res) => {
  //#swagger.tags=['Sellers']
  const seller = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    fixedSalary: req.body.fixedSalary,
    commissionRate: req.body.commissionRate
  }
    const response = await mongodb.getDb().db().collection('sellers').insertOne(seller);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating a seller');     
    }
};
  
const updateSeller = async (req, res) => {
  //#swagger.tags=['Sellers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid seller id to update a seller.');
  }
  const sellerId = new ObjectId(req.params.id);
  const seller = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    fixedSalary: req.body.fixedSalary,
    commissionRate: req.body.commissionRate
    }
  const response = await mongodb.getDb().db().collection('sellers').replaceOne({ _id: sellerId } ,seller);

  if (response.modifiedCount > 0)     {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the seller');     
  }

  };

  const deleteSeller = async (req, res) => {
  //#swagger.tags=['Sellers']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid seller id to delete a seller.');
    }
    const sellerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('sellers').deleteOne({ _id: sellerId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting a seller');     
    }
  };
  
module.exports = { getAll, getSingle, createSeller, updateSeller, deleteSeller };