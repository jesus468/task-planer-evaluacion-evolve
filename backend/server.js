//importar rutas
// protectores 
//middlewares

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/usersRoutes');
const conn = require('./src/config/dataBase');
const useDB = require('./src/config/usersDB');
const port = 3000; 
const app = express();


//app.use(express.json());
app.use(cors());

// rutas 

app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);

//conectar base de datos
//conn();
//useDB();

app.listen(port , () => {
    console.log(`Server running on http://localhost:${port}`);
})