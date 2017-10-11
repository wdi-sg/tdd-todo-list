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
function create (params, description = 'default', completed = false) {
  var newTodo = params
  if (newTodo.name.length < 5) { return false }
  newTodo.description = description
  newTodo.completed = completed
  newTodo._id = uuidGenerator()
  console.log(newTodo)
  todos.push(newTodo)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}

function show (id) {
  // find the TODO with this id
  // loop all todos
  //    for each todo check for id
  //
  var todoindex = 0
  todos.forEach(function (param, index) {
    if (param._id === id) {
      console.log(id)
      todoindex = index
    } else {
      todoindex = null
    }
  })
  if (todos[todoindex]) return todos[todoindex]
  else {
    return null
  }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) { return false }
  var theobject = show(id)
  // console.log(params)
  // var arrPos = todos.indexOf(theobject)
  // todos[arrPos] = params
  theobject.name = params.name
  theobject.description = params.description
  theobject.completed = params.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var theobject = show(id)
  var arrPos = todos.indexOf(theobject)
  todos.splice(arrPos, 1)
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
