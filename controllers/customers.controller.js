const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  //#swagger.tags=['Customers']
  mongodb.getDb().db().collection('customers').find().toArray((err, lists) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=['Customers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid customer id to find a customer.');
  }
  const customerId = new ObjectId(req.params.id);
  mongodb.getDb().db().collection('customers').find({ _id: customerId})
  .toArray((err, result) => {
    if (err) {
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]); 
  });
};
  

const createCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
  const customer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
    phone: req.body.phone,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip
  }
    const response = await mongodb.getDb().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating a customer');     
    }
};
  
const updateCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid customer id to update a customer.');
  }
  const customerId = new ObjectId(req.params.id);
  const customer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
      }
  const response = await mongodb.getDb().db().collection('customers').replaceOne({ _id: customerId } ,customer);

  if (response.modifiedCount > 0)     {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error ocurred while updating the customer');     
  }

  };

  const deleteCustomer = async (req, res) => {
  //#swagger.tags=['Customers']
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid customer id to delete a customer.');
    }
    const customerId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('customers').deleteOne({ _id: customerId});
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while deleting a customer');     
    }
  };
  
module.exports = { getAll, getSingle, createCustomer, updateCustomer, deleteCustomer };