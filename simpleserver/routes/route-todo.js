
var express = require('express');
var router = express.Router();
const mongo = require('../mongo/mongo');
const collectionName = "todo";

const ObjectId = require('mongodb').ObjectId;

router.get('/', function (req, res) {
  const promise = mongo.db.collection(collectionName).find({}).toArray();
  promise.then(v => {
    res.send(v);
  })
})

router.post('/', function (req, res) {
  const { body } = req;
  console.log(mongo);
  const promise = mongo.db.collection(collectionName).insertOne(body);
  promise.then(v => {
    res.send(v);
  })
})

router.patch('/', (req, res) => {
  console.log('patchhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh');
  const { body } = req;

  console.log(body);

  const set = {
    $set: {
      name: body.name
    }
  };

  const promise = mongo.db.collection(collectionName).update(
    {
      _id: ObjectId(body._id)
    },
    set);

  promise.then(v => {
    res.send(v);
  })
})

router.delete('/', (req, res) => {
  const { body } = req;
  console.log (body);
  const promise = mongo.db.collection(collectionName).removeOne(
    {
      id:body.id
    });
  promise.then(v => {
    res.send(v);
  })
})

module.exports = router;