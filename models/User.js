const mongoose = require('mongoose');

// Will create a new user schema which basically describes what it means to be a user in my project - exported as a MongoDB model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 6
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  }, 
  password : {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  role: {
    type: String
  },
  // Can contain nested schemas
  bookmarkedShops: [],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('User', userSchema); // export this schema as a new user model