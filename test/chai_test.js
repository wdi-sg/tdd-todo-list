var dbURI = 'mongodb://localhost/tdd'
var mongoose = require('mongoose')

// sets up the testers
var should = require('chai').should()
var clearDB = require('mocha-mongoose')(dbURI)

// sets up the models
var Todos = require('../models/todos')


// create('grandma','Bring fruits to grandma',false)
// destroy()
// list()

// CREATE FUNCTION
function create(name,desc,completed){
  mongoose.connect(dbURI, function(err) {
    if (err) throw err
    console.log('connected to database!')
  })
  mongoose.Promise = global.Promise

  var newTodo = new Todos()
  newTodo.name = name
  newTodo.desc = desc
  newTodo.completed = completed

  console.log('creating new todo', newTodo);

  newTodo.save( function(err) {
    if(err) console.error(err);
    console.log('New todo is saved.')

   mongoose.disconnect()
 })
}

function update(id, field, value){
  mongoose.connect(dbURI, function(err) {
    if (err) throw err
    console.log('connected to database!')
  })
  mongoose.Promise = global.Promise

  Todos.update({ _id: id},{$set : {field: value}}.toArray(function(err, data) {
  if(err) console.error(err);
    console.log(data)
    todos = data
  }))

  Todos.save( function(err) {
    if(err) console.error(err);
    console.log('New todo is saved.')
  })
  mongoose.disconnect()

  return todos
}


function list(){
  mongoose.connect(dbURI, function(err) {
    if (err) throw err
    console.log('connected to database!')
  })
  mongoose.Promise = global.Promise

  var todos = []

  Todos.find({}, function(err, data) {
  if(err) console.error(err);
    console.log(data)
    todos[0] = data
  })
  mongoose.disconnect()
  console.log(todos)

  return todos
}

function destroy(input){
  mongoose.connect(dbURI, function(err) {
    if (err) throw err
    console.log('connected to database!')
  })
  mongoose.Promise = global.Promise

  if (input) {
    Todos.remove({name: input}, function(err) {
    if(err) console.error(err);
    console.log(input+' removed!')
  })
  }
  else {
    Todos.remove({}, function(err) {
    if(err) console.error(err);
    console.log('all todos removed!')
  })
  }

    mongoose.disconnect()

}

// describe('CHARACTER CRUD',function(){
//   before(function(){
//     // check if we are connected or not to mongodb via mongoose
//     if (mongoose.connection.db) return done()
//     mongoose.connect(dbURI, done)
//     console.log('before all')
//   })
