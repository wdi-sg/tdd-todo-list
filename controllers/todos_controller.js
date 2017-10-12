const uuidGenerator = require('uuid/v4')
// const fs = require('fs')

// const todos = []
// // the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (params.hasOwnProperty('name') === false) return false
  if (params.name.length <= 4) return false

  if (params.hasOwnProperty('decription') === false) params.description = 'default'
  if (params.hasOwnProperty('completed') === false) params.completed = false
  params._id = uuidGenerator()
  todos.push(params)

  save()
}

// READ (list & show)
function list () {
  return todos
  // return list of all TODOs
  save()
}
function show (id) {
  if (!id) return null
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) return todos[i]
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) return false

  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      for (var key in params) {
        todos[i][key] = params[key]
        todos[i]._id = id
      }
      // console.log(todos[i]) // => success
      return true
    }
    save()
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  if (!id) return false

  var destroyedTodo = show(id)
  for (var i = 0; i < todos.length; i++) {
    if (destroyedTodo._id === todos[i]._id) {
      todos.splice(i, 1)
      break
    }
    save()
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
