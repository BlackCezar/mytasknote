const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  author: String,
  name: {
      type: String,
    //   index: true
    unique: true
  },
  dev: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workers'
  }, {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
  }]
})

module.exports = mongoose.model('Project', projectSchema)