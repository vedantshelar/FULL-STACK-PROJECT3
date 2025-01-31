const express = require('express');
const MENU = require('../models/MENU');
const multer = require('multer');
const storage = require('../cloudinaryConfig');
const router = express.Router({ mergeParams: true });

//multer config
const upload = multer({ storage: storage });

router.get('/',(req,res)=>{
    res.render('admin.ejs');
})

router.get('/pending',(req,res)=>{
    res.render('pendingOrdersPage.ejs');
})

router.get('/completed',(req,res)=>{
    res.render('completedOrdersPage.ejs');
})

router.get('/landing',(req,res)=>{
    res.render('adminLandingPage.ejs');
})

router.get('/signin',(req,res)=>{
    res.render('adminSigninPage.ejs');
})

router.get('/signup',(req,res)=>{
    res.render('adminSignupPage.ejs');
})

router.route('/menu')
.get((req,res)=>{
    res.render('addMenuFormPage.ejs'); 
})
.post(upload.single("menuImg"),async(req,res)=>{
    let menuImgUrl = req.file.path;
    let menuDataObj = req.body;
    if(menuDataObj.isBestSelling==='true'){
        menuDataObj.isBestSelling=true;
    }else{
        menuDataObj.isBestSelling=false;
    }
    if(menuImgUrl){
        menuDataObj.menuImg=menuImgUrl;
    }else{
        menuDataObj.menuImg='https://media.istockphoto.com/id/1222357475/vector/image-preview-icon-picture-placeholder-for-website-or-ui-ux-design-vector-illustration.jpg?s=612x612&w=0&k=20&c=KuCo-dRBYV7nz2gbk4J9w1WtTAgpTdznHu55W9FjimE=';
    }
    let menuData = new MENU(menuDataObj);
    menuData = await menuData.save();
    console.log('menu has been added successfully');
    res.redirect('/admin/menu');
}) 

router.get('/menu/edit',(req,res)=>{
    res.render('editMenuFormPage.ejs');
});

module.exports=router;