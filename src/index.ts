import express from 'express';
import mongoose from 'mongoose';
import auth from './middlewares/auth';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { errorLogger, accessLogger } from './middlewares/logger';
import config from './config';
import { createUser, login } from './controllers/users';
import errorHandler from './middlewares/errorHandler';

const app = express();

// подключаем базу данных
mongoose
  .connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// подключаем логер запросов
app.use(accessLogger);

// Роуты без авторизации
app.post('/signin', login);
app.post('/signup', createUser);

// Роуты с авторизацией
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

// подключаем логер ошибок
app.use(errorLogger);
// middleware для ошибок
app.use(errorHandler);
// запуск сервера
app.listen(config.port, () => {
  console.log(`Ссылка на сервер: http://${config.host}:${config.port}${config.basePath}`);
});
