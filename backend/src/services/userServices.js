const { model } = require('mongoose');
const User = require('../config/usersDB');

const getAllUsers = async () => {
    try {
        const res = await User.find();
        console.log(res);
        //console.log('Task successfully:', res);
        return res;
    } catch (error) {
        console.log('Error creating user services, error:', error);
        throw error;
    }finally{
        console.log('creating user services finallized');
    }
}

const createUser = async (userData) => {
    try {
        await User.save(userData);
        console.log('user created:', newUser);
        return newUser;

    } catch (error) {
        console.log('user couldnt be added, error:', error);
        throw error;
    }finally{
        console.log('create user finallized');
    }
}
module.exports = {getAllUsers, createUser} ;