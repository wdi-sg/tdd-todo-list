const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
// {
//   name:
//   description:
//   completed:
//   _id: uuidGenerator
// }
//// the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
// pass an object into todos
function create(params) {
  var newTodo = {}
  if (params.name === '' || params.name.length < 5) {
    return false
  } else {
    newTodo.name = params.name
  }
  newTodo.description = params.description || "default description"
  newTodo.completed = params.completed || false
  newTodo._id = uuidGenerator()
  console.log(newTodo)
  todos.push(newTodo)
}

// READ (list & show)
function list() {
  return todos
}

function show(id) {
  // find the TODO with this id
  for(var key in todos) {
      if(todos[key].id_num === id) {
        return todos[key]
      }
    }
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update(id, updatedParams) {
  if(updatedParams.name != '' && updatedParams.name.length > 5){
    for(var key in todos) {
      if(todos[key].id_num === id) {
        todos[key].name = updatedParams.name
        todos[key].description = updatedParams.description
        todos[key].completed = updatedParams.completed
        return true
      }
    }
  }
  return false
}

// DESTROY (destroy & destroyAll)
function destroy(id) {
  for(var key in todos) {
    if(todos[key].id_num === id){
      todos.splice(key, 1)
      return true
    }
  }
  return false
}

function destroyAll() {
  todos = []
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
