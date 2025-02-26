const express = require('express');
const MENU = require('../models/MENU');
const USER = require('../models/USER');
const PENDING_ORDERS = require('../models/PENDING_ORDERS');
const express_session = require('express-session');
let flash = require('connect-flash');
var cookieParser = require('cookie-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getHashPassword,isCorrectPassword,isAuthenticatedUser,isOrderOwner,generateOTP,sendEmail} = require('../utils');
const ADMIN = require('../models/ADMIN');
const router = express.Router({ mergeParams: true });
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

//middlewares 
router.use(cookieParser());
router.use(express_session({secret: process.env.SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})
router.use(flash());

router.use((req,res,next)=>{
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
})

// User Authentication Strategy
passport.use('user-local', new LocalStrategy(
  { usernameField: 'mobileNumber', passwordField: 'password' },
  async (mobileNumber, password, done) => {
    try {
      const user = await USER.findOne({ mobileNumber });
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

router.get('/landing',(req,res)=>{
    res.render('landingPage.ejs');
});

router.route('/signup')
.get((req,res)=>{
    res.render('signupPage.ejs');
})
.post(async(req,res,next)=>{
    try {
        console.log(req.body);
        req.body.password = await getHashPassword(req.body.password); 
        let user = new USER(req.body);
        user = await user.save();
        req.flash('success','user accout has been successfully created!');
        res.redirect('/admin/signin');
    } catch (error) {
        req.flash('error','error occurred while creating user account');
        res.redirect('/admin/signup');
    }
})

router.route('/signin')
.get((req,res)=>{
    res.render('signinPage.ejs');
})
.post(passport.authenticate('user-local', {
    failureRedirect: '/user/signin',
    failureFlash: 'Invalid username or password'
  }),async(req,res)=>{
    try {
        req.flash('success', 'user has been logged in successfully');
        res.redirect(`/user/${req.user._id}`);
    } catch (error) {
        next(error);
    }
});

router.route('/signout')
.get((req,res,next)=>{
    req.logout((err) => {
        if (err) {
          return res.status(500).send('Error logging out');
        }
        req.flash('success','user has been logged out!');
        res.redirect('/user/signin');  // Redirect after logout
      });
})

router.post('/getMenusData',async(req,res,next)=>{
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
})

router.get('/bestSelling',(req,res)=>{
    res.render('bestSellingPage.ejs');
})

router.get('/category',(req,res)=>{
    res.render('categoryOptions.ejs');
})

router.get('/password/forget',(req,res)=>{
    res.render('forgetPasswordPage.ejs');
})

router.post('/password/forget/opt',async (req,res,next)=>{
    let email = req.body.email;
    let user = await USER.findOne({email:email});
    if(user){
        const OTP = generateOTP();
        await sendEmail(email,'Email For Changing OTP',OTP);
        res.locals.email=email;
        res.locals.otp=OTP;
        res.render('enterOtpPage.ejs');
    }else{
        req.flash('error','Please Enter a Registered Email ID')
        res.redirect('/user/password/forget');
    }
})

router.route('/:userEmail/password/change')
.get(async (req,res,next)=>{
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
})
.post(async (req,res,next)=>{
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
})


router.get('/:userId',isAuthenticatedUser,async(req,res,next)=>{
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
            req.flash('error','no such menu category available');
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
            req.flash('error','no such menu available');
            res.redirect('/user');
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:userId/cart',isAuthenticatedUser,(req,res)=>{
    res.render('cartPage.ejs')
})

router.get('/:userId/orderHistory',isAuthenticatedUser,async(req,res)=>{
    let orders = await PENDING_ORDERS.find({userId:req.params.userId,isComplete:{$eq:true}}).populate('menuId');
    res.render('orderHistoryPage.ejs',{orders}); 
})


router.get('/:userId/orderStatus',isAuthenticatedUser,async(req,res,next)=>{
    try {
        const userId = req.params.userId;
        const orders = await PENDING_ORDERS.find({userId:userId}).populate('menuId');
        res.render('orderStatusPage.ejs',{orders});
    } catch (error) {
        next(error);
    }
})

router.route('/:userId/:tableNo/placeOrder')
.post(isAuthenticatedUser,async (req,res,next)=>{
try {
    const userId = req.params.userId;
    const tableNo = req.params.tableNo;
    console.log('table number : '+tableNo);
    console.log(req.body);
    await PENDING_ORDERS.insertMany(req.body.orderDetails);
    req.flash('success','Your order has been placed');
    res.json({redirectUrl:`/user/${userId}/orderStatus`});
} catch (error) {
    next(error);
}
});

router.route('/order/:orderId/delete')
.delete(isAuthenticatedUser,isOrderOwner,async (req,res,next)=>{
    let orderId = req.params.orderId;
    await PENDING_ORDERS.findByIdAndDelete(orderId);
    res.json({redirectRoute:`/user/${req.user._id}/orderStatus`})
})


module.exports=router;