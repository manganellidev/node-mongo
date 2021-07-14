const { EndpointNotFoundException, UnexpectedException } = require('./exceptions');

const handlers = {
  ResourceNotFoundException: (err, req, res) => {
    const { status, error, errorDetail } = err;
    return res.status(status).json({ error, errorDetail });
  },
  UnexpectedException: (err, req, res) => {
    const genericError = new UnexpectedException();
    return res.status(genericError.status).json({ error: genericError.error });
  },
};

const logError = (req, err) => console.log(`${JSON.stringify(err.message)} ---***---***---`);

const handle = (err, req, res, next) => {
  logError(req, err);
  if (err.name in handlers) {
    return handlers[err.name](err, req, res);
  }
  return handlers.UnexpectedException(err, req, res);
};

const handleEndpointNotFound = (req, res) => {
  const { status, error } = new EndpointNotFoundException();
  logError(req, { message: error });
  return res.status(status).json({ error });
};

module.exports = {
  handleEndpointNotFound,
  handle,
};
