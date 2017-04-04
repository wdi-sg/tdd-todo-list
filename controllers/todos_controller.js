const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// const todos = []
// the following line will instead load the todos from a json file when the app starts
var todos = require('../data.json')

// The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')
  console.log('...file saved')
  return true
}

// CREATE - params should be an object with keys for name, description and completed
function create(params) {
  var newTodo = params

  newTodo._id = uuidGenerator()

  todos.forEach(function(value) {
    if (value._id === newTodo._id) {
      return console.log('id already exists!')
    }
  })

  console.log(params._id + " was created")
  if (!newTodo.description) newTodo.description === "default"
  if (!newTodo.completed) newTodo.completed === "false"
  if (newTodo.name.length >= 5) {
    todos.push(newTodo)
  }
}

// READ (list & show)
function list() {
  return todos
  // return list of all TODOs
}

function show(id) {
  // find the TODO with this id

  var object = {}

  todos.forEach(function(value) {
    if (value._id === id) {
      object = value
    }
  })

  if (Object.keys(object).length === 0) return null
  else return object
}

// UPDATE - params should be an object with KVPs for the fields to update
function update(id, params) {

  var updatedParams = params
  updatedParams._id = id
  var index = null

  todos.forEach(function(value, ind) {
    if (value._id === id) {
      index = ind
    }
  })

  if (!updatedParams.description) updatedParams.description === "default"
  if (!updatedParams.completed) updatedParams.completed === "false"
  if (updatedParams.name.length >= 5) {
    todos[index] = updatedParams
    return true
  } else return false
}

// DESTROY (destroy & destroyAll)
function destroy(id) {

  var index = null

  todos.forEach(function(value,ind) {
    if (value._id === id) {
      index = ind
    }
  })

  if (index) {
    todos.splice(index,1)
    return true
  }
  else return false
}

function destroyAll() {
  console.log('Deleting all todos!')
  todos.forEach(function(val){
      todos.pop()
  })
  return true
}

module.exports = {
  save,
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
