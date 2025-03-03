const express = require('express');
const userControllers = require('../controllers/userControllers');
const USER = require('../models/USER');
let flash = require('connect-flash');
var cookieParser = require('cookie-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { isCorrectPassword, isAuthenticatedUser, isOrderOwner } = require('../utils');
const ADMIN = require('../models/ADMIN');
const router = express.Router({ mergeParams: true });
if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

//middlewares 
router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})
router.use(flash());

router.use((req, res, next) => {
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

      const isValidPassword = await isCorrectPassword(password, user.password);
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

router.get('/landing', userControllers.landingPage);

router.route('/signup')
  .get(userControllers.singUpPage)
  .post(userControllers.createUserAccount);

router.route('/signin')
  .get(userControllers.signInPage)
  .post(passport.authenticate('user-local', {
    failureRedirect: '/user/signin',
    failureFlash: 'Invalid username or password'
  }), async (req, res) => {
    try {
      req.flash('success', 'user has been logged in successfully');
      res.redirect(`/user/${req.user._id}`);
    } catch (error) {
      next(error);
    }
  });

router.route('/signout')
  .get(userControllers.signOut)

router.post('/getMenusData', userControllers.getMenuData);

router.get('/bestSelling', userControllers.renderBestSellingPage);

router.get('/category', userControllers.renderCategoryOptionPage);

router.get('/password/forget', userControllers.renderForgetPasswordPage);

router.post('/password/forget/opt', userControllers.renderEnterOtpPage);

router.route('/:userEmail/password/change')
  .get(userControllers.renderChangePasswordFormPage)
  .post(userControllers.changePassword)


router.get('/:userId', isAuthenticatedUser, userControllers.renderHomePage);

router.get('/category/:categoryName', userControllers.renderCategoryMenuListPage);

router.get('/menu/:menuId', userControllers.renderIndividualMenuPage);

router.get('/:userId/cart', isAuthenticatedUser, userControllers.renderCartPage);

router.get('/:userId/orderHistory', isAuthenticatedUser, userControllers.renderOrderHistoryPage);


router.get('/:userId/orderStatus', isAuthenticatedUser, userControllers.renderOrderStatusPage)

router.route('/:userId/:tableNo/placeOrder')
  .post(isAuthenticatedUser, userControllers.placeOrder);

router.route('/order/:orderId/delete')
  .delete(isAuthenticatedUser, isOrderOwner, userControllers.destroyPendingOrder)


// i have used the same error page called adminErrorPage for user and admin

router.use(userControllers.renderErrorPage);


router.all('*', userControllers.renderPageNotFoundPage);

module.exports = router;