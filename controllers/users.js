const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const User = require('../models/user');
const {
  BadRequest, Conflict, Unauthorized, NotFound,
} = require('../errors/index');

const userCheck = (user, res) => {
  if (user) {
    return res.send(user);
  }
  throw new NotFound('Пользователь по указанному _id не найден');
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((newUser) => res.send({
          email: newUser.email,
          name: newUser.name,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Пользователь с таким email уже существует!'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequest('Некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Ошибка! Неверный email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Ошибка! Неверный email или пароль');
          }

          const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '7d' });

          return res.send({ token });
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const editUser = (req, res, next) => {
  const { email, name } = req.body;
  const ownerId = req.user._id;

  User.findByIdAndUpdate(ownerId, { email, name }, { new: true, runValidators: true })
    .then((user) => userCheck(user, res))
    .catch((err) => {
      if (err.code === 11000) {
        next(new Conflict('Пользователь с таким email уже существует!'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  editUser,
};
