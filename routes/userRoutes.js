const express = require('express');
const MENU = require('../models/MENU');
const USER = require('../models/USER');
const express_session = require('express-session');
let flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {getHashPassword,isCorrectPassword,isAuthenticatedUser} = require('../utils');
const ADMIN = require('../models/ADMIN');
const router = express.Router({ mergeParams: true });
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

//middlewares 
router.use(express_session({secret: process.env.SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use((req,res,next)=>{
    res.locals.user = req.user;
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
        console.log(user,user instanceof USER);
        console.log('user accout has been successfully created!');
        res.send('working');
    } catch (error) {
        console.log('error while creating user account');
        next(error);
    }
})

router.route('/signin')
.get((req,res)=>{
    res.render('signinPage.ejs');
})
.post(passport.authenticate('user-local', {
    failureRedirect: '/user/signin'
  }),async(req,res)=>{
    try {
        console.log('user has been logged in successfully');
        res.redirect(`/user/${req.user._id}`)
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
        console.log('user has been logged out!');
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

router.get('/:userId/cart',isAuthenticatedUser,(req,res)=>{
    res.render('cartPage.ejs')
})

router.get('/:userId/orderHistory',isAuthenticatedUser,(req,res)=>{
    res.render('orderHistoryPage.ejs'); 
})


router.get('/:userId/orderStatus',isAuthenticatedUser,(req,res)=>{
    res.render('orderStatusPage.ejs');
})

router.route('/:userId/:tableNo/placeOrder')
.post(isAuthenticatedUser,async (req,res,next)=>{
try {
    const userId = req.params.userId;
    const tableNo = req.params.tableNo;
    console.log('table number : '+tableNo);
    console.log(req.body);
    res.json({redirectUrl:`/user/${userId}/orderStatus`});
} catch (error) {
    next(error);
}
});
module.exports=router;