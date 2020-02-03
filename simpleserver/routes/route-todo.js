
var express = require('express');
var router = express.Router();
const mongo = require('../mongo/mongo');
const collectionName = "todo";

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
  const { body } = req;

  const set = {
    $set: {
      methodname: body.text
    }
  };

  const promise = mongo.db.collection(collectionName).update(
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
  const promise = mongo.db.collection(collectionName).removeOne(
    {
      _id: ObjectId(body.id)
    });
  promise.then(v => {
    res.send(v);
  })
})

module.exports = router;