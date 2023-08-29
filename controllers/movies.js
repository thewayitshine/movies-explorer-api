const Movie = require('../models/movie');
const { BadRequest, NotFound } = require('../errors/index');

const getMyMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  Movie.create({ ...req.body, owner: _id })
    .then((newMovie) => {
      res.send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;

  Movie.deleteOne({ _id })
    .then((movie) => {
      if (movie.deletedCount === 0) {
        throw new NotFound('Фильм с указанным _id не найден');
      }
      return res.send({ message: 'Фильм успешно удален' });
    })
    .catch(next);
};

module.exports = {
  getMyMovies,
  createMovie,
  deleteMovie,
};
