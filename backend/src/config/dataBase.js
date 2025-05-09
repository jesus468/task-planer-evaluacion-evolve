const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://enmanueljesusjv:nhAbZk2ppNfjL7bR@cluster0.ytimgra.mongodb.net/TaskPlanner?retryWrites=true&w=majority&appName=Cluster0`)
        console.log(`Connect Success, connected to TaskPlanner DB`);
    } catch (error) {
        console.log('Cant connect with DB', error);
        process.exit(1);
    }
}

module.exports = connectDB;