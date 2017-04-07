var mongoose = require('mongoose')
// database
var dbURI = 'mongodb://localhost/test'
// getting the schema from people.js
var Tdl = require('./tdl')

// connecting to the database
mongoose.connect(dbURI)
mongoose.Promise = global.Promise

const uuidGenerator = require('uuid/v4')
const fs = require('fs')
const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var newTodo = {}
  if (params.name === undefined || params.name.length < 5) {
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

  var newTodo = new Todo()
  newTodo.name = 'Buy Food'
  newTodo.description = 'description'
  newTodo.completed = false
  newTodo._id = uuidGenerator()

  console.log('creating new todo list', newTodo)

  newTodo.save(function (err) {
    if (err) console.error(err)

    console.log('new todo-list is saved')
  })
  mongoose.disconnect()
}
// /////////////////////////

newTodo.find({}, function (err, newTodo) {
  if (err) console.error(err)

  console.log(newTodo)
  mongoose.disconnect()
})

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var toShow = null
  todos.forEach(function (item, index, array) {
    if (item._id === id) {
      toShow = item
    }
  })

  return toShow
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var toUpdate = show(id)

  if ((params.name !== undefined && params.name === '') || (params.name !== undefined && params.name.length < 5)) {
    return false
  } else {
    toUpdate.name = params.name
  }

  params.name === undefined ? '' : toUpdate.name = params.name
  params.description === undefined ? '' : toUpdate.description = params.description
  params.completed === undefined ? '' : toUpdate.completed = params.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var toDestroy = show(id)

  if (toDestroy) {
    var index = todos.indexOf(toDestroy)

    todos.splice(index, 1)
    return true
    console.log(todos)
  } else {
    return false
  }
}

function destroyall () {
  todos.forEach(function (item, index, array) {
    array.pop()
  })

  return true
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyall
}
