const express = require('express');
const ADMIN = require('../models/ADMIN');
const MENU = require('../models/MENU');
const multer = require('multer');
const storage = require('../cloudinaryConfig');
const express_session = require('express-session');
let flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getHashPassword,isCorrectPassword,isAuthenticatedAdmin} = require('../utils');
const USER = require('../models/USER');
const router = express.Router({ mergeParams: true });
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

//middlewares 
router.use(express_session({secret: process.env.SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use((req,res,next)=>{
    res.locals.admin = req.user;
    next();
})

// User Authentication Strategy
passport.use('admin-local', new LocalStrategy(
    { usernameField: 'mobileNumber', passwordField: 'password' },
    async (mobileNumber, password, done) => {
      try {
        const user = await ADMIN.findOne({ mobileNumber });
        if (!user) {
          return done(null, false, { message: 'Incorrect mobile number' });
        }

        const isValidPassword = await isCorrectPassword(password,user.password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
  
  passport.serializeUser((entity, done) => {
      done(null, { id: entity.id, type: entity instanceof USER ? 'USER' : 'ADMIN' });
    });
    
    passport.deserializeUser(async (obj, done) => {
      try {
        let entity;
        if (obj.type === 'USER') {
            entity = await USER.findById(obj.id);
        } else {
          entity = await ADMIN.findById(obj.id);
        }
        done(null, entity);
      } catch (err) {
        done(err);
      }
    });

//multer config
const upload = multer({ storage: storage });


router.get('/pending',isAuthenticatedAdmin,(req, res) => {
    res.render('pendingOrdersPage.ejs');
})

router.get('/completed',isAuthenticatedAdmin,(req, res) => {
    res.render('completedOrdersPage.ejs');
})

router.get('/landing', (req, res) => {
    res.render('adminLandingPage.ejs');
})

router.route('/signin')
.get((req, res) => {
    res.render('adminSigninPage.ejs');
})
.post(passport.authenticate('admin-local', {
    failureRedirect: '/admin/signin'
  }),async(req,res)=>{
    try {
        console.log('admin has been login');
        res.redirect(`/admin/${req.user._id}`);
    } catch (error) {
        next(error);
    }
});

router.route('/signout')
.get(isAuthenticatedAdmin,(req,res)=>{
    req.logout((err) => {
        if (err) {
          return res.status(500).send('Error logging out');
        }
        res.redirect('/admin/signin');  // Redirect after logout
      });
})

router.route('/signup')
.get((req, res) => {
    res.render('adminSignupPage.ejs');
})
.post(async(req,res,next)=>{
    try {
        console.log(req.body);
        req.body.password = await getHashPassword(req.body.password); 
        let admin = new ADMIN(req.body);
        admin = await admin.save();
        console.log('user accout has been successfully created!');
        res.redirect('/admin/signin');
    } catch (error) {
        console.log('error while creating user account');
        next(error);
    }
})

router.route('/menu')
    .get(isAuthenticatedAdmin,(req, res) => {
        res.render('addMenuFormPage.ejs');
    })
    .post(upload.single("menuImg"), async (req, res) => {
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
        console.log('menu has been added successfully');
        res.redirect('/admin/menu');
    })

router.get('/menu/edit',isAuthenticatedAdmin,async (req, res) => {
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
});

router.get('/:adminId',isAuthenticatedAdmin,(req, res) => {
    const adminId = req.params.adminId;
    res.render('admin.ejs');
})

router.route('/:adminId/profile')
.get(isAuthenticatedAdmin,async (req,res,next)=>{
    try {
        const adminId = req.params.adminId;
        let admin = await ADMIN.findById(adminId);
        console.log(admin);
        res.send('profile page of admin');
    } catch (error) {
        next(error);
    }
})

router.route('/menu/:menuId/edit')
    .get(isAuthenticatedAdmin,async (req, res, next) => {
        try {
            const menuId = req.params.menuId;
            let menu = await MENU.findById(menuId);
            if(menu){
                res.render('editMenuFormPage.ejs',{menu});
            }else{
                console.log('Menu Not Found In DB')
                res.redirect('/admin/edit');
            }
        } catch (error) {
            next(error)
        }
    })
    .put(upload.single("menuImg"),isAuthenticatedAdmin,async (req,res,next)=>{
        try {
            if(req.file){
                const menuId = req.params.menuId;
                const menuImgUrl = req.file.path;
                req.body.menuImg = menuImgUrl;
                await MENU.findByIdAndUpdate(menuId,req.body);
                console.log('menu info has been updated');
                res.redirect('/admin/menu/edit');
            }else{
                const menuId = req.params.menuId;
                let menu = await MENU.findById(menuId);
                req.body.menuImg = menu.menuImg;
                await MENU.findByIdAndUpdate(menuId,req.body);
                console.log('menu info has been updated');
                res.redirect('/admin/menu/edit');
            }
        } catch (error) {
            console.log('menu info has not been changed!');
            next(error);
        }
    })
    .delete(isAuthenticatedAdmin,async (req,res,next)=>{
        const menuId = req.params.menuId;
        await MENU.findByIdAndDelete(menuId);
        console.log('menu has been deleted successfully!');
        res.redirect('/admin/menu/edit');
    })

module.exports = router;