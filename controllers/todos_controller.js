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
  if (params.name.length < 5) {
    console.log('name should be at least 5 characters long')
    return
  }
  function generateTodo () {
    var newTodo = params
    newTodo._id = uuidGenerator()
    todos.push(newTodo)
    if (newTodo.description) { newTodo.description = 'none' }
    if (newTodo.completed) { newTodo.completed = 'false' }
  }

  generateTodo()
}

// READ (list & show)
function list () {
  return todos
  // return list of all TODOs
}
function show (id) {
  var idArray = todos.filter(function (obj) {
    return obj._id === id
  })
  if (idArray.length === 0) { return null } else { return idArray[0] }
}

  // find the TODO with this id

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, newparams) {
  if (newparams.name.length < 5) { return false }
  var objectOfId = show(id)
  objectOfId.name = newparams.name
  objectOfId.description = newparams.description
  objectOfId.completed = newparams.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var objectOfId = show(id)
  if (objectOfId) {
    var index = todos.indexOf(objectOfId)
    todos.splice(index, 1)
    return true
  } else {
    return false
  }
}

function destroyAll () {
  todos.splice(0)
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
