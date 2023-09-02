const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');

const config = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const errorController = require('./middlewares/errorController');
const { NotFound } = require('./errors/index');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(config.bitfilmsdb);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(requestLogger);

app.use(cors());

app.use(limiter);

app.use(router);

app.use(() => {
  throw (new NotFound('Маршрут не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorController);

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
