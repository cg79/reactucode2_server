
var todoRoutes = require('./route-todo');
var userRoutes = require('./route-user');
const middleware =require('../middleware/middlewares');

module.exports = function (app) {
    app.use('/user', userRoutes);
    app.use('/todo', todoRoutes);
};
