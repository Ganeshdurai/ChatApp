var mongoose = require('mongoose');

var Message   = new mongoose.Schema({
  name: String,
  message: String  
});

module.exports = mongoose.model('Message', Message);    