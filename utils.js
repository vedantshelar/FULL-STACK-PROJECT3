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

function bubbleSort(arr1,arr2) {
    let n = arr1.length;
    // Loop through all elements of the array
    for (let i = 0; i < n - 1; i++) {
      // Last i elements are already in place
      for (let j = 0; j < n - i - 1; j++) {
        // Swap if the element found is greater than the next element
        if (arr1[j] < arr1[j + 1]) {
          let temp1 = arr1[j];
          let temp2 = arr2[j];
          arr1[j] = arr1[j + 1];
          arr2[j] = arr2[j + 1];
          arr1[j + 1] = temp1;
          arr2[j + 1] = temp2;
        }
      }
    }
    return {arr1:arr1,arr2:arr2};
  }
  


module.exports = {
    getHashPassword,
    isCorrectPassword,
    isAuthenticatedUser,
    isAuthenticatedAdmin,
    getCurrentDate,
    getCurrentTime,
    getOrderProfit,
    getOrderGrossProfit,
    bubbleSort
}