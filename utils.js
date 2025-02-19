const bcrypt = require('bcrypt');
const dayjs = require('dayjs');
const USER = require('./models/USER');
const ADMIN = require('./models/ADMIN');

async function getHashPassword(plainPassword) {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(plainPassword, saltRounds);
    console.log(hashPassword);
    return hashPassword;
}

async function isCorrectPassword(plainPassword, hashPassword) {
    let boolean = await bcrypt.compare(plainPassword, hashPassword);
    return boolean;
}

function isAuthenticatedUser(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof USER) {
        return next();
    }
    console.log('you are not authenticated!');
    res.redirect('/user/signin');
}

function isAuthenticatedAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user instanceof ADMIN) {
        return next();
    }
    console.log('you are not authenticated!');
    res.redirect('/admin/signin');
}

function getCurrentTime() {
    const now = dayjs();
    // Custom formatting: e.g., "YYYY-MM-DD HH:mm:ss"
    let dateAndTime = now.format('YYYY-MM-DD HH:mm:ss').split(" ");
    const currentTime = dateAndTime[1];//02:35:54
    return currentTime;
}

function getCurrentDate() {
    const now = dayjs();
    // Custom formatting: e.g., "YYYY-MM-DD HH:mm:ss"
    let dateAndTime = now.format('YYYY-MM-DD HH:mm:ss').split(" ");
    const currentDate = dateAndTime[0];//2025-02-19
    return currentDate;
}

function getOrderProfit(frontPrice, qnty) {
    return (frontPrice * qnty);
}

function getOrderGrossProfit(frontPrice, backPrice, qnty) {
    let actualProfit = ((frontPrice * qnty) - (backPrice * qnty));
    return actualProfit;
}


module.exports = {
    getHashPassword,
    isCorrectPassword,
    isAuthenticatedUser,
    isAuthenticatedAdmin,
    getCurrentDate,
    getCurrentTime,
    getOrderProfit,
    getOrderGrossProfit
}