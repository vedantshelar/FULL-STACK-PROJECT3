const express = require('express');
const app = express();
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const {deleteCanceledOrders} = require('./utils');
const PORT = 3000;
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
  await mongoose.connect('mongodb://127.0.0.1:27017/RESTAURANT');
}

main().then(()=>{
    console.log('connected to RESTAURANT Database');
})
.catch(err => console.log(err));

//routes
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);

//automatically runs every day at 12am to delete cancelled orders from pending database
deleteCanceledOrders();


app.use((err,req,res,next)=>{
    console.log(err);
    res.send('some error occured');
})