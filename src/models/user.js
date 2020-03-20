'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

let UserSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter a username.',
    unique: true
  },
  password: {
    type: String,
    required: 'Please enter a password.'
  },
  name: {
    type: String,
    required: 'Please enter your name.'
  },
  email: {
    type: String,
    required: 'Please enter your e-email address.'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);