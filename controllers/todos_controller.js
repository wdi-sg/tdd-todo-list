
var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/todolist'

var Todo = require('../models/todo')

mongoose.connect(dbURI, function (err) {
  if (err) console.error(err)
  console.log('connected to database')
})

mongoose.Promise = global.Promise

//CREATE - create (params)

// var newTodo = new Todo()
// newTodo.name = 'Find a Venue'
// newTodo.description = 'Find a venue that is convenient and fits the budget'
// newTodo.completed = true
//
// console.log(newTodo)
//
// newTodo.save(function (err) {
//   if (err) console.error(err)
//
//   console.log('newTodo is saved')
//   mongoose.disconnect()
// })

//READ - list
// Todo.find({}, function (err, todo) {
//   if (err) console.error(err)
//
//   console.log(todo)
//   mongoose.disconnect()
// })

//READ - show(id)
// Todo.find({}).where('_id').equals('58e6c909540bdd12fe3efc0c').exec(function (err, todo) {
//   if (err) console.error(null)
//   console.log(todo)
//   mongoose.disconnect()
// })

//Update
//
// Todo.findOne({ _id: '58e6cde31e3f63132fda036c' }, function (err, todo){
//   var newTodo = new Todo()
//   newTodo.name = 'Buy Ingredients for Updated Cake';
//
//   newTodo.save(function (err) {
//     if (err) console.error(false)
//
//     console.log(true)
//     mongoose.disconnect()
// })
// })

//delete
Todo.findByIdAndRemove('58e6c80a890b0b12f74f15bd', function (err, todo) {
    var response = {
        message: "Todo successfully deleted",
        id: todo._id
    }
  mongoose.disconnect()
})
