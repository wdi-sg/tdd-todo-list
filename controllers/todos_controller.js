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
  if (!params.name || params.name.length < 5) return false
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
  var showItem = null
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      showItem = todos[i]
    }
  }
  return showItem
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (!params.name || params.name.length < 5) return false
  todos.forEach((item) => {
    if (item._id === id) {
      item.name = params.name
      item.description = params.description
      item.completed = params.completed
      return true
    } else {
      return false
    }
  })
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  todos.forEach((item) => {
    if (item._id === id) {
      todos.splice(todos.indexOf(item), 1)
      return true
    }
  })
  return false
}

function destroyAll () {
  todos.splice(0, todos.length)
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
