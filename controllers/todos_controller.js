const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// const todos = []
// // the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')
//
// // The following function can be used to save the todos array to the json data file
function save () {
  // const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8') // write file synchronously
}
//
// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (!params.name) return false
  if (params.name.length <= 4) return false
  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false
    // set params key =>_id = 123
  params._id = uuidGenerator()
  todos.push(params)
  save()
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var obj = null
  todos.forEach((item) => {
    if (item._id === id) {
      obj = item // object will be updated with item if id is found, if not null will be the result
    }
  })
  return obj
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) return false //put conditions without functions
  params._id = id
  todos.forEach(function (item, index, array) {
    if (item._id === id) {
      for (var key in array[index]) {
        if (item[key] !== params[key] && params[key] !== undefined) array[index][key] = params[key]
      }
    }
  })
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var item = show(id)
  if (item._id === id) {
    todos.splice(todos.indexOf(item), 1)
    return true
  }
  return false
}

function destroyAll () {
  todos.splice(0, todos.length)
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
