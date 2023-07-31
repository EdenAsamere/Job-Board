const {constants} = require('../constants')
function errorHandler (err,req,res,next) {
    const statusCode = res.status(500).statusCode;
    console.log(err.statusCode);
    switch (statusCode){
        case constants.VALIDATION_ERROR:
            res.json({title:"Validation Failed", 
            message : err.message, 
            stackTrace: err.stack,});
            break;
        case constants.NOT_FOUND:
            res.json({title:"Not found",
            message : err.message,
            stackTrace:err.stack });
            break;
        case constants.UNAUTHORIZED:
            res.json({title:"Unauthorized access",
            message : err.message,
            stackTrace:err.stack });
            break;
        case constants.FORBIDDEN:
            res.json({title:"FORBIDDEN",
            message : err.message,
            stackTrace:err.stack });
            break;
        case constants.SERVER_ERROR:
            res.json({title:"SERVER ERROR",
            message : err.message,
            stackTrace:err.stack });
            break;

        default:
            console.log('no errors')
            break;
    }
    next();

    };
    

module.exports = errorHandler;