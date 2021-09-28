// Importing all the necessary libraries

const express = require('express');

const path = require('path');

// defining port
const port = 7979;

const app = express();

// setting up monogdb
const db = require('./config/mongoose')

const repository = require('./models/employee');

// view engine 
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

// defining path for static files like css & images
app.use(express.static('assets/css'));

app.use(express.static('assets/images'));

app.use(express.static('views'));

app.set('view-engine','ejs');

app.set('views','./views');

app.use('/',require('./routes/index'));

// express listening to the port and returning
app.listen(port,function(err){
    if(err){
        console.log("Error In Running The Server!");
        return;
    }
    console.log("Server Running!");
})