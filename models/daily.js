var mongoose = require('mongoose');

var dailySchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  completed: {
      sun: Boolean,
      mon: Boolean,
      tue: Boolean,
      wed: Boolean,
      thurs: Boolean,
      fri: Boolean,
      sat: Boolean,
  },
  color: String
});

module.exports = mongoose.model('Daily', dailySchema);
