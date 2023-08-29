const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');

const { getCurrentUser, editUser } = require('../controllers/users');
const { editUserValidation } = require('../middlewares/validation');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', celebrate(editUserValidation), editUser);

module.exports = usersRouter;
