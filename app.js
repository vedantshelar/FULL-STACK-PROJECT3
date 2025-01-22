const express = require('express');
const app = express();
const engine = require('ejs-mate');
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("server is listening on port number "+PORT);
})

//built in middlewares 

app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('home.ejs')
});

app.get('/category/pizza',(req,res)=>{
    res.render('categoryMenuList.ejs');
})

app.get('/menu/fryRice',(req,res)=>{
    res.render('individualMenuPage.ejs');
})

app.get('/cart',(req,res)=>{
    res.render('cartPage.ejs')
})

app.get('/orderHistory',(req,res)=>{
    res.render('orderHistoryPage.ejs'); 
})

app.get('/bestSelling',(req,res)=>{
    res.render('bestSellingPage.ejs');
})

app.get('/category',(req,res)=>{
    res.render('categoryOptions.ejs');
})

app.get('/signup',(req,res)=>{
    res.render('signupPage.ejs');
})

app.get('/signin',(req,res)=>{
    res.render('signinPage.ejs');
})

app.get('/landing',(req,res)=>{
    res.render('landingPage.ejs');
})

app.get('/admin',(req,res)=>{
    res.render('admin.ejs');
})

app.get('/admin/pending',(req,res)=>{
    res.render('pendingOrdersPage.ejs');
})