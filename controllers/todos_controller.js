const uuidGenerator = require('uuid/v4') // go to https://yarnpkg.com/en/package/uuid to see the uuid package details
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

  params._id = uuidGenerator() // from dependency in line 1; linter also gave hint that the variable was not used
  todos.push(params)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  for (var j = 0; j < todos.length; j++) {
    if (todos[j]._id === id) {
      // console.log('testtest', todos[j])
      return todos[j]
    }
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) return false
  show(id).name = params.name
  show(id).description = params.description
  show(id).completed = params.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  if (show(id)) {
    todos.splice(todos.indexOf(show(id)), 1)
    return true
  }
  else return false
}

function destroyAll () {
  todos.length = 0
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll,
  // save
}
