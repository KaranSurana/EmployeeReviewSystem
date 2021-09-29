const mongoose = require('mongoose');
// creating an employee schema in mongodb
const empSchem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    admin: {
        type: Boolean,
        default: false
    },
    username:{
        type: String,
    },
    rating:{
        type: Number,
        default: 0,

    },
    number:{
        type: Number,
        default: 0,

    },
    canvote:{
        type: Boolean,
        default: false,

    },
    liked:{
        type: [],
        
    }
})

const emp = mongoose.model('employee_details', empSchem);

module.exports = emp;