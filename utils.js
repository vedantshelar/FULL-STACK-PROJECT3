const bcrypt = require('bcrypt');
const USER = require('./models/USER');
const ADMIN = require('./models/ADMIN');

async function getHashPassword(plainPassword){
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log(hashPassword);
    return hashPassword;
}

async function isCorrectPassword(plainPassword,hashPassword){
    let boolean = await bcrypt.compare(plainPassword,hashPassword);
    return boolean;
}

function isAuthenticatedUser(req,res,next){
    if (req.isAuthenticated() && req.user instanceof USER) {
        return next();
      }
      console.log('you are not authenticated!');
      res.redirect('/user/signin');
}

function isAuthenticatedAdmin(req,res,next){
    if (req.isAuthenticated() && req.user instanceof ADMIN) {
        return next();
      }
      console.log('you are not authenticated!');
      res.redirect('/admin/signin');
}

module.exports = {
    getHashPassword,
    isCorrectPassword,
    isAuthenticatedUser,
    isAuthenticatedAdmin
}