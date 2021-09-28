
// seeting up database
// using mongodb
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo_list_db');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting To Database"));

db.once('open',function(){
    console.log("Database Successfully Connected");
});