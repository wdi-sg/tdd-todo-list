var mongoose = require('mongoose')

var todoSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: Boolean
})

var Todo = mongoose.model('todo', todoSchema)

module.exports = Todo
