const express = require('express');
const ADMIN = require('../models/ADMIN');
const multer = require('multer');
const storage = require('../cloudinaryConfig');
const express_session = require('express-session');
let flash = require('connect-flash');
var cookieParser = require('cookie-parser')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {isCorrectPassword, isAuthenticatedAdmin} = require('../utils');
const USER = require('../models/USER');
const adminControllers = require('../controllers/adminControllers');
const router = express.Router({ mergeParams: true });
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

//middlewares 
router.use(flash());
router.use(cookieParser());
router.use(express_session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use((req, res, next) => {
    res.locals.admin = req.user;
    next();
})


router.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
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

//multer config
const upload = multer({ storage: storage });

router.get('/pending', isAuthenticatedAdmin, adminControllers.renderPendingOrderPages);

router.get('/completed', isAuthenticatedAdmin, adminControllers.renderCompletedOrderPage);

router.get('/landing', adminControllers.renderAdminLandingPage);

router.route('/signin')
    .get(adminControllers.renderAdminSigninPage)
    .post(passport.authenticate('admin-local', {
        failureRedirect: '/admin/signin',
        failureFlash: 'Invalid username or password'
    }), async (req, res) => {
        try {
            req.flash('success','admin has been login');
            res.redirect(`/admin/${req.user._id}`);
        } catch (error) {
            next(error);
        }
    });

router.route('/signout')
    .get(isAuthenticatedAdmin, adminControllers.adminLogout)

router.route('/signup')
    .get(adminControllers.renderAdminSignupPage)
    .post(adminControllers.createAdminAccout)

router.route('/menu')
    .get(isAuthenticatedAdmin, adminControllers.renderAddMenuFormPage)
    .post(upload.single("menuImg"), adminControllers.addMenuInfoToDb)

router.get('/menu/edit', isAuthenticatedAdmin, adminControllers.renderEditMenuPage);

router.get("/order/complete", isAuthenticatedAdmin,adminControllers.getAllCompletedOrders)

router.get("/topThreeCategory", isAuthenticatedAdmin, adminControllers.getTopThreeMenuCategory)

router.get("/topThreeMenu", isAuthenticatedAdmin, adminControllers.getTopThreeMenuItem);

router.get('/password/forget',adminControllers.renderAdminForgetPasswordPage);

router.post('/password/forget/opt',adminControllers.renderAdminEnterOtpPage);

router.route('/:adminEmail/password/change')
.get(adminControllers.renderAdminChangePasswordFormPage)
.post(adminControllers.changeAdminPassword);

router.get('/:adminId', isAuthenticatedAdmin, adminControllers.renderAdminHomePage)

router.route('/:adminId/profile')
    .get(isAuthenticatedAdmin, adminControllers.renderAdminProfilePage)

router.route('/menu/:menuId/edit')
    .get(isAuthenticatedAdmin, adminControllers.renderEditMenuFormPage)
    .put(upload.single("menuImg"), isAuthenticatedAdmin, adminControllers.updateMenuInfo)
    .delete(isAuthenticatedAdmin, adminControllers.destroyMenu);

router.route('/:orderId/start')
    .put(adminControllers.markPlacedOrderAsStart);

router.route('/:orderId/destroy')
    .delete(adminControllers.cancelPlacedOrder);

router.route('/:orderId/complete')
    .post(adminControllers.completeOrder);

    router.use(adminControllers.renderAdminErrorPage)

    router.all('*',adminControllers.renderPageNotFoundPage)

module.exports = router;