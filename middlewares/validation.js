const { Joi } = require('celebrate');

const { urlReg } = require('../utils/constants');

const createUserValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
};

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const editUserValidation = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
};

const createMovieValidation = {
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(urlReg).required(),
    trailerLink: Joi.string().regex(urlReg).required(),
    thumbnail: Joi.string().regex(urlReg).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object({
    _id: Joi.string().hex().length(24),
  }),
};

module.exports = {
  createUserValidation,
  loginValidation,
  editUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
