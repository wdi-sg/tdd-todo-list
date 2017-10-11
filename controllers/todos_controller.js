const uuidGenerator = require("uuid/v4")
const fs = require("fs")

const todos = []
// // the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

// // The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create(params) {
  if (params.name === undefined || params.name.length < 5) return false
  if (params.description === undefined) params.description = "NA"
  if (params.completed === undefined) params.completed = false
  params._id = uuidGenerator()
  todos.push(params)
}

// READ (list & show)
function list() {
  return todos
  // return list of all TODOs
}
function show(id) {
  // find the TODO with this id
  for (key in todos) {
    if (todos[key]._id === id) return todos[key]
  }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update(id, params) {
  if (params.name.length < 5) return false
  for (key in todos) {
    if (todos[key]._id === id) {
      todos[key].name = params.name
      if (params.description !== undefined)
        todos[key].description = params.description
      if (params.completed !== undefined)
        todos[key].completed = params.completed
    }
  }
  return true
}

// DESTROY (destroy & destroyAll)
function destroy(id) {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) todos.splice(i, 1)
  }
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
