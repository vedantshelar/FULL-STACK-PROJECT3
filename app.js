const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
var cookieParser = require('cookie-parser');
const express_session = require('express-session');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const {deleteCanceledOrders} = require('./utils');
const { renderPageNotFoundPage } = require('./controllers/userControllers');
const PORT = 3000;
if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}

app.listen(PORT,"0.0.0.0",()=>{
    console.log("server is listening on port number "+PORT);
});

//routes

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

//built in middlewares 

app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//fucntion to connnect to database

async function main() {
await mongoose.connect(process.env.DB_URL);
}

main().then(()=>{
    console.log('connected to RESTAURANT Database');
})
.catch(err => console.log(err));

//express session 
app.use(cookieParser());
app.use(express_session({
  secret: process.env.SECRET, resave: false, saveUninitialized: true, store: MongoStore.create({
    mongoUrl: process.env.DB_URL, crypto: {
      secret: process.env.SECRET
    }, 
    ttl: 14 * 24 * 60 * 60,
  }),
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days in milliseconds
    httpOnly: true,
  }
}));//14 day expiry date

//routes
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);

//automatically runs every day at 12am to delete cancelled orders from pending database
deleteCanceledOrders();


app.use((err,req,res,next)=>{
    res.send('some error occured');
})

app.all('*',renderPageNotFoundPage);