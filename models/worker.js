const mongoose = require('mongoose')

const workerSchema = new mongoose.Schema({
  username: String,
  type: {
    type: String,
    default: 'normal'
  },
  position: {
    type: String,
    default: String
  },
  boss: String,
  password: String
})

module.exports = mongoose.model('Worker', workerSchema)
