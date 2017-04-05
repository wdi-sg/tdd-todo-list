const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// const todos = [{"_id":"7ea03ab6-eb63-4ff9-a38e-be68490247fc","name":"Bring fruits to grandma","description":"Bring fruits to grandma","completed":false}]
//// the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var newTodo = params
  newTodo._id = uuidGenerator()
  if (!newTodo.description || newTodo.description == '') {
    newTodo.description = 'my description'
  }
  if (!newTodo.completed || newTodo.completed == '') {
    newTodo.completed = false
  }
  if (newTodo.name && newTodo.name.length >= 5) {
    todos.push(newTodo)
  }
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var output = null
  todos.forEach(function (object) {
    if (object._id == id) {
      output = object
    }
  })
  return output
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var object = show(id)
  if (show(id) === null) {
    return false
  }
  else if (params.name.length >= 5 && params.name !== '') {
    for (key in params) {
      object[key] = params[key]
    }
    return true
  }
  else {
    return false
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  if (show(id) === null) {
    return false
  }
  else {
    todos.forEach(function (object, i) {
      if (object._id === id) {
        todos.splice(i, 1)
      }
    })
    return true
  }
}

function destroyAll () {
  todos.forEach(function (object, i) {
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
  destroyAll,
  save
}

// {"_id":"7ea03ab6-eb63-4ff9-a38e-be68490247fc","name":"Bring fruits to grandma","description":"Bring fruits to grandma","completed":false}
