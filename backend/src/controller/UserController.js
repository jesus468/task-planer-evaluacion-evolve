
const User = require('../config/usersDB');
const {getAllUsers, createUser} = require('../services/userServices');
const {createUserValidation} = require('../validations/userValidation')
const { response } = require('express');

const userController = {
    getUsers: [
        async (req, res) =>{
            console.log('get user');
            try {
                const data = await getAllUsers();
                res.status(200).json(data);
            } catch (error) {
                console.log('There was an error (controller):', error);
                response.status(500).json({ error: 'Error getting users from DB' });
            }finally{
                console.log('get users finalized (controller)')
            }
        }
    ],
    createUserss: [
        ...createUserValidation,
        async (request , res) => {
            const creUser = request.body;
            try {
                const newUser = new User(creUser)
                console.log('--------------------------', creUser)

                await newUser.save();
                console.log('user created:', newUser);
                res.status(200).json(newUser);

                
            } catch (error) {
                console.log('There was an error (controller):', error.code);
                if(error.code===11000){
                    res.status(500).json({code: error.code, message: 'Correo ya existe'});
                }
                res.status(500).json({ error: 'Error creating users from DB' , code: error.code});
            }finally{
                console.log('create users finalized (controller)')
            }
        }
    ]
}

module.exports = userController;