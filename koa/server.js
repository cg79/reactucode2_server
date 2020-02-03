const Koa = require("koa");
const Router = require("koa-router");
const BodyParser = require("koa-bodyparser");
const logger = require('koa-logger');
const ObjectID = require("mongodb").ObjectID;

const app = new Koa();
const router = new Router();
const securedRouter = new Router();
const jwt = require("./jwt/jwt");

const lcPublicRoutes = require('./routes/routes.todo');

const mongo = require("./mongo/mongo");

mongo.connectToDB('ssssssss');

//app.use(jwt.errorHandler()).use(jwt.jwt());
securedRouter.use(jwt.errorHandler()).use(jwt.mainPrivateMiddleware());

// Use the bodyparser middlware
app.use(BodyParser());
app.use(logger());

router.use(lcPublicRoutes.routes());

router.post("/auth", async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    if (username === "user" && password === "pwd") {
        ctx.body = {
            token: jwt.issue({
                user: "user",
                role: "admin"
            })
        }
    } else {
        ctx.status = 401;
        ctx.body = {error: "Invalid login"}
    }
});

router.get("/", async function (ctx) {
    ctx.body = {message: "Hello World! =============="}
});

// securedRouter.get("/", async function (ctx) {
//     let name = ctx.request.query.name || "World";
//     ctx.body = {message: `Hello ${name}!`}
// });

securedRouter.post("/", async function (ctx) {
    let name = ctx.request.body.name || "World";
    ctx.body = {message: `Hello ${name}!`}
});

securedRouter.get("/people", async (ctx) => {
    throw new Error('something bad');
    const rrr = await mongo.db.collection('todo').find({}).toArray();
    return rrr;
});

// Get one
securedRouter.get("/people/:id", async (ctx) => {
    ctx.body = await ctx.app.people.findOne({"_id": ObjectID(ctx.params.id)});
});

// Create new person
securedRouter.post("/aaa", async (ctx) => {
    console.log(ctx.body);
    ctx.body = await ctx.app.people.insert(ctx.request.body);
});

// Update one
securedRouter.put("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.people.updateOne(documentQuery, valuesToUpdate);
});

// Delete one
securedRouter.delete("/people/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    ctx.body = await ctx.app.people.deleteOne(documentQuery);
});

app.use(router.routes()).use(router.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());
app.listen(3003);