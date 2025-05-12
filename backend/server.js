
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/usersRoutes');
const conn = require('./src/config/dataBase');
const useDB = require('./src/config/usersDB');
const verifyToken = require('./src/middlewares/authMiddleware');
const { verify } = require('crypto');
const port = 3000; 
const app = express();

app.use(cors());
app.use(express.json());

// rutas 
app.use('/api/tasks', taskRoutes);
app.use('/api/user',  userRoutes);

app.listen(port , () => {
    console.log(`Server running on http://localhost:${port}`);
})