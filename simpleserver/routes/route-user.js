
const express = require('express');
const router = express.Router();
const mongo = require('../mongo/mongo');
const ObjectId = require('mongodb').ObjectId;

// router.get('/', function async (req, res, next) {
//   try{
//     res.send('USERS');
//   }
//   catch(ex) {
//     next(ex);
//   }
  
// })

router.get('/', function (req, res) {
  res.send('About users');
})

router.post('/', function (req, res) {
  const { body } = req;
  const {proxy, data} = body;

  const proxy = body.proxy;
  const method = proxy.method || 'insert';

  genericService[method](data);

  console.log(mongo);
  const promise = mongo.db.collection('user').insertOne(body);
  promise.then(v => {
    res.send(v);
  })
})

router.patch('/', (req, res) => {
  const { body } = req;

  const set = {
    $set: {
      methodname: body.text
    }
  };

  const promise = mongo.db.collection('user').update(
    {
      _id: ObjectId(body.id)
    },
    set);

  promise.then(v => {
    res.send(v);
  })
})

router.delete('/', (req, res) => {
  const { body } = req;
  const promise = mongo.db.collection('user').removeOne(
    {
      _id: ObjectId(body.id)
    });
  promise.then(v => {
    res.send(v);
  })
})

module.exports = router;