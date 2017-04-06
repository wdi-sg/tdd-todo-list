var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongo-todo-list')
mongoose.Promise = global.Promise

var toDoSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: Boolean
})

var toDo = mongoose.model('People', toDoSchema)
module.exports = toDo
