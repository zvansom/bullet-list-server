var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  completed: Boolean,
  category: Integer
});

module.exports = mongoose.model('Task', taskSchema);

