const logger = require('./logger');

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  if (error.name === 'CastError' && error.message.includes('ObjectId')) {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token ' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' });
  } else if (error.name === 'Error') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

module.exports = { errorHandler };
