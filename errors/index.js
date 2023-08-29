const BadRequest = require('./badRequestError');
const Conflict = require('./conflictError');
const Forbidden = require('./forbiddenError');
const NotFound = require('./notFoundError');
const Unauthorized = require('./unauthorizedError');

module.exports = {
  BadRequest,
  Conflict,
  Forbidden,
  NotFound,
  Unauthorized,
};
