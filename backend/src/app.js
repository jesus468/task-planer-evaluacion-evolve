const Url = 'http://localhost:3000/api/';
const express = require('express');
const tasksRoutes = require('./routes/taskRoutes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorMiddleware');
const cors = require('cors');


const app = express();
app.use(express.json());

app.use(cors());

app.use(notFoundHandler);
app.use(errorHandler);
