var dbURI = 'mongodb://localhost/tdd'
var mongoose = require('mongoose')

// sets up the testers
var should = require('chai').should()
var clearDB = require('mocha-mongoose')(dbURI)

// sets up the models
var Todos = require('../models/todos')

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

create('grandma','Bring fruits to grandma',false)

// describe('CHARACTER CRUD',function(){
//   before(function(){
//     // check if we are connected or not to mongodb via mongoose
//     if (mongoose.connection.db) return done()
//     mongoose.connect(dbURI, done)
//     console.log('before all')
//   })
