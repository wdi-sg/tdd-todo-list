const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
//// the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var newTodo = params
  if (!newTodo.description || newTodo.description == '') {
    newTodo.description = 'my description'
  }
  if (!newTodo.completed || newTodo.completed == '') {
    newTodo.completed = false
  }
  newTodo._id = uuidGenerator()
  if (newTodo.name && newTodo.name.length >= 5) {
    todos.push(newTodo)
  }
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var output = null
  todos.forEach(function (object) {
    if (object._id == id) {
      output = object
    }
  })
  return output
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var object = show(id)
  if (params.name.length >= 5 && params.name !== '') {
    for (key in params) {
      params[key] = object[key]
    }
    return true
  }
  else {
    return false
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
