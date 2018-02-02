const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({ 
    username: String, 
    email: String, 
    password: String, 
    age:Number, 
    gender: String,
    location: {
      lat: Number,
      long: Number
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);