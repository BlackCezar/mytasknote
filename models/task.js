const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  author: String,
  status: String,
  project: String,
  name: String,
  desc: String,
  files: [mongoose.Schema.Types.Mixed]
})

module.exports = mongoose.model('Task', taskSchema)