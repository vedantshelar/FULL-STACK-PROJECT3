const express = require('express');
const MENU = require('../models/MENU');
const router = express.Router({ mergeParams: true });

router.get('/',async(req,res,next)=>{
    try {
        let menus = await MENU.find({isBestSelling:true});
        res.render('home.ejs',{menus}); 
    } catch (error) {
        next(error)
    }
});

router.get('/category/:categoryName',async(req,res,next)=>{
    try {
        let categoryName = req.params.categoryName;
        let menus = await MENU.find({category:categoryName});
        if(menus){
            res.render('categoryMenuList.ejs',{menus}); 
        }else{
            console.log('no such menu category available');
            res.redirect('/user');
        }
    } catch (error) {
        next(error);
    }
})

router.get('/menu/:menuId',async(req,res,next)=>{
    try {
        let menuId = req.params.menuId;
        let menu = await MENU.findById(menuId);
        if(menu){
            res.render('individualMenuPage.ejs',{menu});
        }else{
            console.log('no such menu available');
            res.redirect('/user');
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:userId/cart',(req,res)=>{
    res.render('cartPage.ejs')
})

router.get('/:userId/orderHistory',(req,res)=>{
    res.render('orderHistoryPage.ejs'); 
})

router.get('/bestSelling',(req,res)=>{
    res.render('bestSellingPage.ejs');
})

router.get('/category',(req,res)=>{
    res.render('categoryOptions.ejs');
})

router.get('/:userId/orderStatus',(req,res)=>{
    res.render('orderStatusPage.ejs')
})

router.get('/signup',(req,res)=>{
    res.render('signupPage.ejs');
})

router.get('/signin',(req,res)=>{
    res.render('signinPage.ejs');
})

router.get('/landing',(req,res)=>{
    res.render('landingPage.ejs');
})

module.exports=router;