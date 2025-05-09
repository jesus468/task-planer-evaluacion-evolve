//importar rutas
// protectores 
//middlewares

const express = require('express');
const cors = require('cors');
const taskRoutes = require('./src/routes/taskRoutes');
const connectDB = require('./src/config/dataBase');
const port = 3000; 
const app = express();


app.use(express.json());
app.use(cors());

// rutas 

app.use('/api/tasks', taskRoutes);

//conectar base de datos
connectDB();

app.listen(port , () => {
    console.log(`Server running on http://localhost:${port}`);
})