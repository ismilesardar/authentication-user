/**
 * Date: 03/06/2023
 * Subject: Auth project
 * Auth: Ismile Satdar
**/

//require packeg
const bcrypt = require('bcrypt');

//hash password
exports.hashPassword = (password) => {
    return new Promise((resolve,reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err){reject(err)}
            bcrypt.hash(password, salt, (err, hash) => {
                if(err){reject(err)}
                resolve(hash);
            });
        });
    });
}

//compare Password
exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
}