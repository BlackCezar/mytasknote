const mongoose = require('mongoose')

const daySchema = new mongoose.Schema({
  author: String,
  created: {
      type: Date,
      default: Date.now
  },
  tasks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tasks'
  }]
})

module.exports = mongoose.model('Day', daySchema)