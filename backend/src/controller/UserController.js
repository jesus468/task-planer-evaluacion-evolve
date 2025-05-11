const {User} = require('../config/usersDB');
const { response } = require('express');

const userController = {
    getUsers: [
        async () => {
            try {
                const res = await User.find();
                console.log(res, '--------------------este se el de users');
                //console.log('Task successfully:', res);
                return res;
            } catch (error) {
                console.log('Error getting users, error:', error);
                throw error;
            }finally{
                console.log('getUsers finallized');
            }
        }
    ]
}

module.exports = {userController};