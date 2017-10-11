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
  // console.log('params given: ', params)
  if (!params.name) return false
  if (params.name.length <= 4) return false
  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false
  params._id = uuidGenerator()
  // // set params key => _id = 123
  // params._id = 123
  // console.log('params now; ', params)
  todos.push(params)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
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
