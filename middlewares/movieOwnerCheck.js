const Movie = require('../models/movie');
const { Forbidden, NotFound } = require('../errors/index');

module.exports = (req, res, next) => {
  const { _id } = req.params;

  Movie.findById({ _id })
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с указанным _id не найден');
      }
      if (String(movie.owner) !== req.user._id) {
        throw new Forbidden('Чужие фильмы удалять нельзя!');
      }
      return next();
    })
    .catch(next);
};
