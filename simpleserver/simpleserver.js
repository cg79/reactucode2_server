const express = require('express')
const app = express()
var cors = require('cors');
const bodyParser = require('body-parser');
const port = 3002;
const mongo = require('./mongo/mongo');
const middlewares = require('./middleware/middlewares');

const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

const init = async () => {
  mongo.connectToDB('ssssssss').then(v => {
    app.db = v;
  });
}

init();
debugger;
// mongo.connectToDB('ucode');

app.use(bodyParser.json());

app.use(function (err, req, res, next){
 console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
});

require('./routes/routes')(app);

/////////////////////////////////////////////////////////////////////////////////

let alldata = {};
app.get('/test', middlewares.wrap(async (req, res) => {
  debugger;
  throw new Error('dddddddd');
  res.send({ a: 1 })
}));

app.get('/test1', async (req, res) => {
  debugger;
  throw new Error('dddddddd');
  res.send({ a: 1 })
});

app.post('/addproduct', (req, res) => {
  const { body } = req;
  console.log('Got body:', body);
  app.db.collection('product').insertOne(body);
  res.send({ success: 13 });
});
app.post('/a', (req, res) => {
  const { body } = req;
  console.log('Got body:', body);

  const promise = app.db.collection(body.docname).insertOne(body.data);
  promise.then(v => {
    res.send(v);
  })
});

app.post('/caut', (req, res) => {
  const { body } = req;
  console.log('Got body:', body);

  debugger;
  const promise = app.db.collection(body.docname).find({
    methodname: body.text
  }).toArray();
  promise.then(v => {
    res.send(v);
  })
});

app.post('/modif', (req, res) => {
  const { body } = req;
  console.log('Got body:', body);

  debugger;
  const promise = app.db.collection(body.docname).update
    (
      {
        _id: ObjectId(body.id)
      },
      {
        methodname: body.text
      });
  promise.then(v => {
    res.send(v);
  })
});

app.post('/del', (req, res) => {
  const { body } = req;
  console.log('Got body:', body);

  debugger;
  const promise = app.db.collection(body.docname).removeOne
    (
      {
        _id: ObjectId(body.id)
      });
  promise.then(v => {
    res.send(v);
  })
});

app.get('/devicedata', (req, res) => {
  const p = req.query;
  debugger;

  alldata = {
    ...alldata,
    ...p
  }
  console.log(alldata);
  app.db.collection('test').insertOne(p);
  // read from db
  const myprod = app.db.collection('test').find({ userid: '4' }).toArray();

  myprod.then(v => {
    console.log('yyyyyyyyyyyyyyyyyyyy');
    setTimeout(() => {
      res.send({ data: 'device dsssssssssssssata', x: 1, products: v });
    }, 2000);

  });
  console.log('xxxxxxxxxxxxxxx');
  //res.send({ data: 'device dsssssssssssssata', x: 1, products: myprod });

});

app.get('/carla', (req, res) => {
  res.send({ data: 'device dsssssssssssssata' });
  //res.send({ data: 'device dsssssssssssssata', x: 1, products: myprod });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))