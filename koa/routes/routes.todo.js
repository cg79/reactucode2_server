const router = require('koa-router')();
const jwtMiddleware = require("../jwt/jwt");
const mongo = require('../mongo/mongo');

router
  .prefix('/api/todo')
  .use(jwtMiddleware.probablyMiddleware())
  .post("/", async function (ctx) {
   console.log("ruta news");

    const body = ctx.request.body;
    const result = await mongo.db.collection('todo').insert(body);
    return result.insertedIds;
  })

module.exports = router;
