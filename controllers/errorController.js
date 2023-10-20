const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Valoare duplicată a câmpurilor: ${value}.Vă rugăm să utilizați o altă valoare.`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Date de intrare invalide ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Token invalid. Vă rugăm să vă autentificați din nou.', 401);

const handleJWTExpiredError = () =>
  new AppError(
    'Tokenul dumneavoastră a expirat. Vă rugăm să vă autentificați din nou.',
    401
  );

const sendErrorDev = (err, req, res) => {
  //A)API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  //B) RENDERED WEBSITE
  console.log('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Ceva nu a mers bine!',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //A) API
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational, trusted error: send message to client.Trusted error adica stiu eroarea.Nu e una necunoscuta
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    //B) Programming or other unknown error: don't leak error details
    //1)Log error
    console.log('ERROR', err);

    //2)Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Ceva nu a mers bine',
    });
  }
  //B) RENDERED WEBSITE
  //A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err.message);
    return res.status(err.statusCode).render('error', {
      title: 'Ceva nu a mers bine!',
      msg: err.message,
    });
  }
  //B) Programming or other unknown error: don't leak error details
  //1)Log error
  console.log('ERROR', err);

  //2)Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Ceva nu a mers bine!',
    msg: 'Încercați din nou în câteva momente.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    //Merge si cu asta:
    //let error = { ...err };
    //error.message = err.message;
    //si cu asta:
    let error = Object.create(err);

    /*pt un id inexistent */
    if (error.name === 'CastError') err = handleCastErrorDB(error);
    /*pt duplicat pe o valoare*/
    if (error.code === 11000) err = handleDuplicateFieldsDB(error);
    /*eroare al validatori */
    if (error.name === 'ValidationError') err = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') err = handleJWTError();

    if (error.name === 'TokenExpiredError') err = handleJWTExpiredError();

    sendErrorProd(err, req, res);
  }
};
