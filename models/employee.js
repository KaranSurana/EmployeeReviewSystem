const mongoose = require('mongoose');
// creating an issue schema in mongodb
const empSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    username:{
        type: String,
        unique: true
    }
})

const emp = mongoose.model('employee', empSchema);

module.exports = emp;