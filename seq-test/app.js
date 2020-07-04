const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//database import
const db= require('./config/database')

//test database

db.authenticate()
    .then(()=>console.log('Database connected!'))
    .catch((err)=>console.log("Error occured:" + err));

//handlebars
app.engine('handlebars',exphbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//index route
app.get('/',(req,res)=>res.render('index',{layout:'landing'}));

//gig routes

app.use('/gigs',require('./routes/gigs'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));