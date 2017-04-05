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
  var newTodo = params
  if (!newTodo.name || newTodo.name.length < 5) {
    return false
  }
  if (!newTodo.description || newTodo.description === '') {
    newTodo.description = 'default'
  }
  if (!newTodo.completed || newTodo.completed === '') {
    newTodo.completed = false
  }
  newTodo._id = uuidGenerator()
  todos.push(newTodo)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var link = null
  todos.forEach(function (element) {
    if (element._id === id) {
      link = element
    }
  })
  return link
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var changes = show(id)
  if (show(id) === null) {
    return false
  } else if (params.name.length < 5 || params.name === '') {
    return false
  } else if (params.name.length >= 5 && params.name !== '') {
    changes.name = params.name
    changes.description = params.description
    changes.completed = params.completed
    return true
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  if (show(id) === null) {
    return false
  } else if (show(id) === !null) {
    var index = todos.indexOf(show(id))
    todos.splice(index, 1)
    return true
  } else {
    return false
  }
}

function destroyAll () {
  todos.forEach(function (element, index, list) {
    todos.shift()
  })
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
