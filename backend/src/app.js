const Url = 'http://localhost:3000/api/';
const express = require('express');
const tasksRoutes = require('./routes/taskRoutes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(mongoSanitize());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones desde esta IP',
});

app.use('/api', apiLimiter);


app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app ;