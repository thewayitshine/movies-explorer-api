const moviesRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const movieOwnerCheck = require('../middlewares/movieOwnerCheck');

moviesRouter.get('/', getMyMovies);
moviesRouter.post('/', celebrate(createMovieValidation), createMovie);
moviesRouter.delete('/:_id', celebrate(deleteMovieValidation), movieOwnerCheck, deleteMovie);

module.exports = moviesRouter;
