const Url = 'http://localhost:3000/api/';
const express = require('express');
const tasksRoutes = require('./routes/taskRoutes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorMiddleware');


const app = express();

/*
app.use('/api/tasks', tasksRoutes);
*/


app.use(notFoundHandler);
app.use(errorHandler);
