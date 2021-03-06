const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  type: {
    type: String,
    default: 'normal'
  },
  position: {
    type: String,
    default: String
  },
  workers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workers',
  }],
  boss: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)
