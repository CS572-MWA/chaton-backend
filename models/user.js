const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({ 
    username: { type: String, required: true}, 
    email: { type: String, required: true}, 
    password: { type: String, required: true}, 
    age:Number, 
    gender: String,
    location: {
      lat: Number,
      long: Number
    }
},{
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);