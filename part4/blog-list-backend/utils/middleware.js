const morgan = require('morgan');

// MORGAN
morgan.token('data', request => {
  return JSON.stringify(request.body);
});
const morganLogger = () => {
  if (process.env.NODE_ENV === 'test') {
    return (request, response, next) => next();
  }
  return morgan(
    ':method :url :status :res[content-length] - :response-time ms :data'
  );
};

// UNKNOWN ENDPOINT
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

// TOKEN EXTRACTOR
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');

  authorization && authorization.toLowerCase().startsWith('bearer')
    ? (request.token = authorization.substring(7))
    : (request.token = null);

  next();
};

module.exports = {
  morganLogger,
  unknownEndpoint,
  tokenExtractor,
};
