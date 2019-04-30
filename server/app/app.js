import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// app.use('/', indexRouter);

module.exports = app;
