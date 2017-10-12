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
  if (!params.name) return false
  if (params.name.length <= 4) return false

  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false

  params._id = uuidGenerator()
  todos.push(params)
}

// READ (list & show)
function list () {
// return list of all TODOs
  return todos
}

function show (id) {
// find the TODO with this id
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      return todos[i]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (!params.name) return false
  if (params.name.length <= 4) return false
  for (var j = 0; j < todos.length; j++) {
    if (todos[j]._id === id) {
      todos[j].name = params.name
      todos[j].description = params.description
      todos[j].completed = params.completed
      return true
    }
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  for ( var m = 0; m < todos.length; m++) {
    if (todos[m]._id === id ) {
      todos.splice(m, 1)
      return true
    }
  }
  return false
}

function destroyAll () {
  todos.splice(0, todos.length)
  return true
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
