const ADMIN = require('../models/ADMIN');
const MENU = require('../models/MENU');
const PENDING_ORDERS = require('../models/PENDING_ORDERS');
const COMPLETE_ORDERS = require('../models/COMPLETE_ORDERS');
const { getHashPassword,getOrderGrossProfit, getOrderProfit,generateOTP,sendEmail } = require('../utils');
const { bubbleSort } = require('../utils');
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const renderPendingOrderPages = async (req, res) => {
    try {
        let pendingOrders = await PENDING_ORDERS.find({}).populate('menuId').populate('userId');
        res.render('pendingOrdersPage.ejs', { pendingOrders });
    } catch (error) {
        next(error);
    }
}

const renderCompletedOrderPage = async(req, res,next) => {
    try {
        let orders = await COMPLETE_ORDERS.find({}).populate('userId').populate('menuId');
        if(orders){
            res.render('completedOrdersPage.ejs',{orders});
        }else{
            res.send('no completed orders!');
        }
    } catch (error) {
        next(error);
    }
}

const renderAdminLandingPage = (req, res) => {
    res.render('adminLandingPage.ejs');
}

const renderAdminSigninPage = (req, res) => {
    res.render('adminSigninPage.ejs');
}

const adminLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.redirect('/admin/signin');  // Redirect after logout
    });
}

const renderAdminSignupPage = (req, res) => {
    res.render('adminSignupPage.ejs');
}

const createAdminAccout = async (req, res, next) => {
    try {
        console.log(req.body);
        req.body.password = await getHashPassword(req.body.password);
        let admin = new ADMIN(req.body);
        admin = await admin.save();
        req.flash('success','admin accout has been successfully created!');
        res.redirect('/admin/signin');
    } catch (error) {
        req.flash('error','error while creating user account');
        res.redirect('/admin/signup');
    }
}

const renderAddMenuFormPage = (req, res) => {
    res.render('addMenuFormPage.ejs');
}

const addMenuInfoToDb = async (req, res) => {
    let menuImgUrl = req.file.path;
    let menuDataObj = req.body;
    if (menuDataObj.isBestSelling === 'true') {
        menuDataObj.isBestSelling = true;
    } else {
        menuDataObj.isBestSelling = false;
    }
    if (menuImgUrl) {
        menuDataObj.menuImg = menuImgUrl;
    } else {
        menuDataObj.menuImg = 'https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
    }
    let menuData = new MENU(menuDataObj);
    menuData = await menuData.save();
    req.flash('success','menu has been added successfully');
    res.redirect('/admin/menu');
}

const renderEditMenuPage = async (req, res) => {
    try {
        let menus = await MENU.find({});
        if (menus && menus.length > 0) {
            res.render('editMenuPage.ejs', { menus });
        } else {
            res.send('no menus in database');
        }
    } catch (error) {
        next(error);
    }
}

const getAllCompletedOrders =  async (req, res, next) => {
    try {
        let orders = await COMPLETE_ORDERS.find({});
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

const getTopThreeMenuCategory = async (req, res, next) => {
    try {
        let orders = await COMPLETE_ORDERS.find({}).populate('menuId');
        let object = { rice: 0, noodle: 0, drink: 0, pizza: 0, burger: 0, sandwich: 0 };
        for (order of orders) {
            object[order.menuId.category] += order.qnty;
        }
        let label = [];
        let data = [];
        for (key in object) {
            label.push(key);
            data.push(object[key]);
        }
        let { arr1, arr2 } = bubbleSort(data, label);
        data = arr1;
        label = arr2;
        res.json({ 'data': data, 'label': label });
    } catch (error) {
        next(error);
    }
}

const getTopThreeMenuItem = async (req, res, next) => {
    try {
        let orders = await COMPLETE_ORDERS.find({}).populate('menuId');
        let object = {};
        for (order of orders) {
            object[order.menuId.menuName] = 0;
        }
        for (order of orders) {
            object[order.menuId.menuName] += order.qnty;
        }
        let label = [];
        let data = [];
        for (key in object) {
            label.push(key);
            data.push(object[key]);
        }
        let { arr1, arr2 } = bubbleSort(data, label);
        data = arr1;
        label = arr2;
        res.json({ 'data': data, 'label': label });
    } catch (error) {
        next(error);
    }
}

const renderAdminForgetPasswordPage = (req,res)=>{
    res.render('adminForgetPasswordPage.ejs');
}

const renderAdminEnterOtpPage = async (req,res,next)=>{
    let email = req.body.email;
    let admin = await ADMIN.findOne({email:email});
    if(admin){
        const OTP = generateOTP();
        await sendEmail(email,'Email For Changing Your Accout Password',OTP);
        res.locals.email=email;
        res.locals.otp=OTP;
        res.render('adminEnterOtpPage.ejs');
    }else{
        req.flash('error','Please Enter a Registered Email ID')
        res.redirect('/admin/password/forget');
    }
}

const renderAdminChangePasswordFormPage = async (req,res,next)=>{
    try {
        let email = req.params.adminEmail;
        let admin = await ADMIN.findOne({email:email});
        if(admin){
            res.locals.email=email;
            res.render('adminChangePasswordForm.ejs');
        }else{
            req.flash('error','Please Enter a Registered Email ID')
            res.redirect('/admin/password/forget');
        }   
    } catch (error) {
     next(error);   
    }
}

const changeAdminPassword = async (req,res,next)=>{
    try {
        let email = req.params.adminEmail;
        let admin =await ADMIN.findOne({email:email});
        if (admin) {
            admin.password= await getHashPassword(req.body.password1);
            await admin.save();
            req.flash('success','your password has been successfully changed!');
            res.redirect('/admin/signin');
        } else {
            req.flash('error','something went wrong! please try again');
            res.redirect('/admin/signin');
        }
    } catch (error) {
        next(error);
    }
}

const renderAdminHomePage = (req, res) => {
    const adminId = req.params.adminId;
    res.render('admin.ejs');
}

const renderAdminProfilePage = async (req, res, next) => {
    try {
        const adminId = req.params.adminId;
        let admin = await ADMIN.findById(adminId);
        console.log(admin);
        res.send('profile page of admin');
    } catch (error) {
        next(error);
    }
}

const renderEditMenuFormPage = async (req, res, next) => {
    try {
        const menuId = req.params.menuId;
        let menu = await MENU.findById(menuId);
        if (menu) {
            res.render('editMenuFormPage.ejs', { menu });
        } else {
            req.flash('error','Menu Not Found In DB')
            res.redirect('/admin/edit');
        }
    } catch (error) {
        next(error)
    }
}

const updateMenuInfo = async (req, res, next) => {
    try {
        if (req.file) {
            const menuId = req.params.menuId;
            const menuImgUrl = req.file.path;
            req.body.menuImg = menuImgUrl;
            await MENU.findByIdAndUpdate(menuId, req.body);
            req.flash('success','menu info has been updated');
            res.redirect('/admin/menu/edit');
        } else {
            const menuId = req.params.menuId;
            let menu = await MENU.findById(menuId);
            req.body.menuImg = menu.menuImg;
            await MENU.findByIdAndUpdate(menuId, req.body);
            req.flash('success','menu info has been updated');
            res.redirect('/admin/menu/edit');
        }
    } catch (error) {
        console.log('menu info has not been changed!');
        next(error);
    }
}

const destroyMenu = async (req, res, next) => {
    const menuId = req.params.menuId;
    await MENU.findByIdAndDelete(menuId);
    req.flash('success','menu has been deleted successfully!');
    res.redirect('/admin/menu/edit');
}

const markPlacedOrderAsStart = async (req, res, next) => {
    try {
        const orderId = req.body.orderId;
        await PENDING_ORDERS.findByIdAndUpdate(orderId, { isStart: true });
        res.send(true);
    } catch (error) {
        next(error);
    }
}

const cancelPlacedOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        console.log(orderId);
        await PENDING_ORDERS.findByIdAndUpdate(orderId, { isCancel: true });
        req.flash('success','order has been canceled');
        res.send(true);
    } catch (error) {
        next(error);
    }
}

const completeOrder = async (req, res, next) => {
    try {
        let newOrder = {};
        const orderId = req.params.orderId;
        let order = await PENDING_ORDERS.findById(orderId, { _id: 0 }).populate('menuId');
        if (order.isFullPlate) {
            newOrder.orderGrossProfit = getOrderGrossProfit(order.menuId.fullFrontPrice, order.menuId.fullBackPrice, order.qnty);
            newOrder.orderProfit = getOrderProfit(order.menuId.fullFrontPrice, order.qnty);
        } else {
            newOrder.orderGrossProfit = getOrderGrossProfit(order.menuId.halfFrontPrice, order.menuId.halfBackPrice, order.qnty);
            newOrder.orderProfit = getOrderProfit(order.menuId.halfFrontPrice, order.qnty);
        }
        newOrder.menuId = order.menuId._id;
        newOrder.userId = order.userId;
        newOrder.isFullPlate = order.isFullPlate;
        newOrder.qnty = order.qnty;
        newOrder.tableNo = order.tableNo;
        newOrder.orderPlacedDate = order.orderPlacedDate;
        newOrder.orderPlacedTime = order.orderPlacedTime;

        await COMPLETE_ORDERS.create(newOrder);
        await PENDING_ORDERS.findByIdAndUpdate(orderId, { isComplete: true });
        console.log('Order has been completed');
        res.send(true);
    } catch (error) {
        next(error);
    }
}

const renderAdminErrorPage = (err,req,res,next)=>{
    console.log("admin : ",err.stack);
    res.render('adminErrorPage.ejs',{errorMessage:err.message,redirect:'/admin/landing'});
}

const renderPageNotFoundPage = (req,res)=>{
    res.render('adminErrorPage.ejs',{errorMessage:'Page Not Found!',redirect:'/admin/landing'});
}

module.exports = {
    renderPendingOrderPages,
    renderCompletedOrderPage,
    renderAdminLandingPage,
    renderAdminSigninPage,
    adminLogout,
    renderAdminSignupPage,
    createAdminAccout,
    renderAddMenuFormPage,
    addMenuInfoToDb,
    renderEditMenuPage,
    getAllCompletedOrders,
    getTopThreeMenuCategory,
    getTopThreeMenuItem,
    renderAdminForgetPasswordPage,
    renderAdminEnterOtpPage,
    renderAdminChangePasswordFormPage,
    changeAdminPassword,
    renderAdminHomePage,
    renderAdminProfilePage,
    renderEditMenuFormPage,
    updateMenuInfo,
    destroyMenu,
    markPlacedOrderAsStart,
    cancelPlacedOrder,
    completeOrder,
    renderAdminErrorPage,
    renderPageNotFoundPage
}