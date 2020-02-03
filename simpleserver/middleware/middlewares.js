
class Middlewares {

  handleError (err, res){
    console.log('h eeeeeeeeeeeeeee');
    // const { statusCode, message } = err;
    // res.status(statusCode).json({
    //   status: "error",
    //   statusCode,
    //   message
    // });
  };

  wrap(fn){
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(ex => {
         console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', ex); 
         res.send({
           error:ex.message
         });

      });
    }
  };

  wrap1(req, res, next){
    return (req, res, next) => {
      next();
      Promise.resolve(req, res, next).catch(ex => {
         console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', ex); 
         res.send({
           error:ex.message
         });

      });
    }
  };

  async errorHandler(err, req, res, next) {
    console.log('INTRAAAAAAAAAAAAAAAAAAAAAAAAAAA errorHandler');
    debugger;
    try {
      const r = await next(err, req, res, next).catch(ex => {
        console.log('333333333333333 ', ex);  
      });
      // res.send(r || {q:7});
    }
    catch (ex) {

      console.log('22222222222222 ', ex);
      res.send({
        err: 'f'
      });
    }

  }
}

module.exports = new Middlewares();
