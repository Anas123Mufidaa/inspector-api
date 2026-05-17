const response = require('../utils/response.js');

const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode ?? 500;
  const message    = statusCode === 500 ? 'Terjadi kesalahan pada server' : err.message;
  if (statusCode === 500) console.error(err);
  return response(res, statusCode, message);
};

module.exports = errorMiddleware;