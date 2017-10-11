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
  // console.log('params given', params)
  //
  // //set params key => _id = 123
  params._id = uuidGenerator()
  if (!params.name) return false
  if (params.name.length <= 4) return false

  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false

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
    if (todos[i]._id === id) return todos[i]
    else return null
  }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length > 4) {
    show(id).name = params.name
    return true
  }
  if (params.description || params.completed) {
    show(id).description = params.description
    show(id).completed = params.completed
    return true
  } else return false
}
// DESTROY (destroy & destroyAll)
function destroy (id) {
  if (show(id)) {
    todos.splice(todos.indexOf(show(id)), 1)
    return true
  } else return false
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
