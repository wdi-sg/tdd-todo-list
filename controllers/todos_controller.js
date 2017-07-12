const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// const todos = []
// // the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')
  return true
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var {name, description, completed} = params
  // if name not provided, return false
  if (!name) return false
  // if name less than 5 chars, return false
  if (name.length < 5) return false

  // if desc not provided, insert default. do the same for completion status
  if (!description || !completed) {
    params.description = 'my todo description'
    params.completed = false
  }

  params._id = uuidGenerator()
  todos.push(params)
  return todos[todos.length - 1]
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

}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      // if there was a change to the property, change it
      for (key in todos[i]) {
        if (params.key) {
          todos[i].key = params.key
        }
      }
      return true
    }
  } return false    // returns false when no matching id found
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  todos,
  save
}
