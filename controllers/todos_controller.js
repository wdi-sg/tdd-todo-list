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

function Params (name, description = '', completed = false) {
  this.name = name
  this.description = description
  this.completed = completed
}

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  if (params.name.length < 5) {
    console.log('name too short (4 or fewer characters)')
    return
  }
  function generateTodo () {
    var newTodo = params
    var uuid = uuidGenerator
    newTodo._id = uuid.call()
    todos.push(newTodo)
  }

  generateTodo()
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}

function show (id) {
  // find the TODO with this id
  var x = todos.filter(function (item) {
    return item._id === id
  })
  return (x.length === 0) ? null : x[0]
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var x = show(id)
  var changeMade = false
  if (params.name.length < 5) {
    console.log('name too short')
    return
  }
  if (params.name.length > 4 && x.name !== params.name) {
    x.name = params.name
    changeMade = true
  }
  if (typeof params.description === 'string' && x.description !== params.description) {
    x.description = params.description
    changeMade = true
  }
  if (typeof params.completed === 'boolean' && x.completed !== params.completed) {
    x.completed = params.completed
    changeMade = true
  }
  return changeMade
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var x = show(id)
  if (x) {
    var index = todos.indexOf(x)
    todos.splice(index, 1)
    return true
  } else {
    return false
  }
}

function destroyAll () {
  while (todos.length > 0) {
    todos.forEach(function (item) {
      destroy(item._id)
    })
  }
}

module.exports = {
  Params,
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
