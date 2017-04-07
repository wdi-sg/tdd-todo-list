const uuidGenerator = require('uuid/v4')
const fs = require('fs')

var Todo = require('../models/todo')
var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/exercise'
mongoose.Promise = global.Promise

mongoose.connect(dbURI)

console.log('connected to db')

//
// // const todos = []
// // // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')
//
// // // The following function can be used to save the todos array to the json data file
function save (input) {
  input.save(function (err, data) {
    if (err) console.error(err)
    console.log('new To-do ' + data.name + ' is created')
    mongoose.disconnect()
  })
}
//
// // CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var newTodo = new Todo()
  if (params.name === undefined || params.name.length < 5) {
    console.log('Name not give! || name shorter than 5 characters.\nCannot create new Todo!')
    return false
  } else {
    newTodo.name = params.name
  }

  if (params.description === undefined) {
    newTodo.description = 'description here'
  } else {
    newTodo.description = params.description
  }

  if (params.completed === undefined) {
    newTodo.completed = false
  } else {
    newTodo.completed = params.completed
  }
  save(newTodo)

  // newTodo._id = uuidGenerator()
  // return newTodo
}

// LIST - list todos
function list () {
  // return list of all TODOs
  return Todo.find().exec(function (err, data) {
    if (err) console.error(err)
    console.log(data)
    mongoose.disconnect()
    return data
  })
}

// SHOW - show todos based on id
function show (id) {
  console.log('Showing Todo based on id')
  // find the TODO with this id
  return Todo.find().where('_id').equals(id).exec(function (err, data) {
    if (err) console.error(err)
    console.log(data)
    mongoose.disconnect()
    return data
  })
}

// MyModel.update({ age: { $gt: 18 } }, { oldEnough: true }, fn);
// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var toUpdate = {}

  if ((params.name !== undefined && params.name === '') || (params.name !== undefined && params.name.length < 5)) {
    console.log('Update failed')
    return false
  } else {
    params.name === undefined ? '' : toUpdate.name = params.name
  }
  params.description === undefined ? '' : toUpdate.description = params.description
  params.completed === undefined ? '' : toUpdate.completed = params.completed

  Todo.update({ _id: id}, toUpdate, function (err, data) {
    if (err) console.error(err)
    console.log('Update successful')
    console.log(data)
  })
  return true
}
// DESTROY todos based on id
function destroy (id) {
  Todo.remove({_id: id}, function (err) {
    if (err) console.error(err)
    console.log('Destroyed!')
    return true
  })
}

// DESTROYALL todos
function destroyall () {
  Todo.remove({}, function (err) {
    if (err) console.error(err)
    console.log('All destroyed!')
    return true
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyall
}
