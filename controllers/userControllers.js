const USER = require('../models/USER');
const MENU = require('../models/MENU');
const PENDING_ORDERS = require('../models/PENDING_ORDERS');
const {getHashPassword,generateOTP,sendEmail} = require('../utils');
const COMPLETE_ORDERS = require('../models/COMPLETE_ORDERS');

if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

const landingPage = (req,res)=>{
    res.render('landingPage.ejs');
};

const signInPage = (req,res)=>{
    res.render('signinPage.ejs');
};

const signOut = (req,res,next)=>{
    req.logout((err) => {
        if (err) {
          return res.status(500).send('Error logging out');
        }
        req.flash('success','user has been logged out!');
        res.redirect('/user/signin');  // Redirect after logout
      });
};

const singUpPage = (req,res)=>{
    res.render('signupPage.ejs');
};

const createUserAccount = async(req,res,next)=>{
    try {
        req.body.password = await getHashPassword(req.body.password); 
        let user = new USER(req.body);
        user = await user.save();
        req.flash('success','user accout has been successfully created!');
        res.redirect('/user/signin');
    } catch (error) {
        req.flash('error','error occurred while creating user account');
        res.redirect('/user/signup');
    }
}

const getMenuData = async(req,res,next)=>{
    try {
        let menuIdArr = req.body.cartInfo;
        if(menuIdArr && menuIdArr.length>0){
            let menus = await MENU.find({_id:{$in:menuIdArr}});
            res.send(menus);
        }else{
            res.send('noMenusAddedToCart');
        }
    } catch (error) {
        next(error);
    }
};

const renderBestSellingPage = async(req,res)=>{
    try {
        let menus = await MENU.find({isBestSelling:true});
        res.render('bestSellingPage.ejs',{menus});
    } catch (error) {
        next(error)
    }
};

const renderCategoryOptionPage = (req,res)=>{
    res.render('categoryOptions.ejs');
}

const renderForgetPasswordPage = (req,res)=>{
    res.render('forgetPasswordPage.ejs');
}

const renderEnterOtpPage = async (req,res,next)=>{
    let email = req.body.email;
    let user = await USER.findOne({email:email});
    if(user){
        const OTP = generateOTP();
        await sendEmail(email,'Email For Changing Your Account Password',OTP);
        res.locals.email=email;
        res.locals.otp=OTP;
        res.render('enterOtpPage.ejs');
    }else{
        req.flash('error','Please Enter a Registered Email ID')
        res.redirect('/user/password/forget');
    }
}

const renderChangePasswordFormPage = async (req,res,next)=>{
    try {
        let email = req.params.userEmail;
        let user = await USER.findOne({email:email});
        if(user){
            res.locals.email=email;
            res.render('changePasswordForm.ejs');
        }else{
            req.flash('error','Please Enter a Registered Email ID')
            res.redirect('/user/password/forget');
        }
    } catch (error) {
        next(error);   
    }
}

const changePassword = async (req,res,next)=>{
    try {
        let email = req.params.userEmail;
        let user =await USER.findOne({email:email});
        if (user) {
            user.password= await getHashPassword(req.body.password1);
            await user.save();
            req.flash('success','your password has been successfully changed!');
            res.redirect('/user/signin');
        } else {
            req.flash('error','something went wrong! please try again');
            res.redirect('/user/signin');
        }
    } catch (error) {
        next(error);
    }
}

const renderHomePage = async(req,res,next)=>{
    try {
        let menus = await MENU.find({isBestSelling:true});
        res.render('home.ejs',{menus}); 
    } catch (error) {
        next(error)
    }
}

const renderCategoryMenuListPage = async(req,res,next)=>{
    try {
        let categoryName = req.params.categoryName;
        let menus = await MENU.find({category:categoryName});
        if(menus){
            res.render('categoryMenuList.ejs',{menus}); 
        }else{
            req.flash('error','no such menu category available');
            res.redirect('/user');
        }
    } catch (error) {
        next(error);
    }
}

const renderIndividualMenuPage = async(req,res,next)=>{
    try {
        let menuId = req.params.menuId;
        let menu = await MENU.findById(menuId);
        if(menu){
            res.render('individualMenuPage.ejs',{menu});
        }else{
            req.flash('error','no such menu available');
            res.redirect('/user');
        }
    } catch (error) {
        next(error)
    }
}

const renderCartPage = (req,res)=>{
    res.locals.websiteRootUrl = process.env.WEBSITE_ROOT_URL;
    res.render('cartPage.ejs')
}

const renderOrderHistoryPage = async(req,res,next)=>{
    try {
        let orders = await PENDING_ORDERS.find({userId:req.params.userId,isComplete:{$eq:true}}).populate('menuId');
        res.render('orderHistoryPage.ejs',{orders}); 
    } catch (error) {
        next(error)
    }
}

const renderOrderStatusPage = async(req,res,next)=>{
    try {
        const userId = req.params.userId;
        const orders = await PENDING_ORDERS.find({userId:userId}).populate('menuId');
        res.render('orderStatusPage.ejs',{orders});
    } catch (error) {
        next(error);
    }
}

const placeOrder = async (req,res,next)=>{
    try {
        const userId = req.params.userId;
        const tableNo = req.params.tableNo;
        console.log('table number : '+tableNo);
        await PENDING_ORDERS.insertMany(req.body.orderDetails);
        req.flash('success','Your order has been placed');
        res.json({redirectUrl:`/user/${userId}/orderStatus`});
    } catch (error) {
        next(error);
    }
    }

const destroyPendingOrder = async (req,res,next)=>{
    let orderId = req.params.orderId;
    await PENDING_ORDERS.findByIdAndDelete(orderId);
    res.json({redirectRoute:`/user/${req.user._id}/orderStatus`})
}

const renderErrorPage = (err,req,res,next)=>{
    res.render('adminErrorPage.ejs',{errorMessage:err.message,redirect:'/user/landing'});
}

const renderPageNotFoundPage = (req,res)=>{
    res.render('adminErrorPage.ejs',{errorMessage:'Page Not Found!',redirect:'/user/landing'});
}

module.exports = {
    landingPage,
    signInPage,
    signOut,
    singUpPage,
    createUserAccount,
    getMenuData,
    renderBestSellingPage,
    renderCategoryOptionPage,
    renderForgetPasswordPage,
    renderEnterOtpPage,
    renderChangePasswordFormPage,
    changePassword,
    renderHomePage,
    renderCategoryMenuListPage,
    renderIndividualMenuPage,
    renderCartPage,
    renderOrderHistoryPage,
    renderOrderStatusPage,
    placeOrder,
    destroyPendingOrder,
    renderErrorPage,
    renderPageNotFoundPage
}