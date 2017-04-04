const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// console.log(uuidGenerator);

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
  newTodo._id = uuidGenerator()
  if (newTodo.description === null) {
    newTodo.description = 'default'
  } else if (newTodo.completed === null) {
    newTodo.completed = false
  } else if (newTodo.completed === null && newTodo.description === null) {
    newTodo.completed = false
    newTodo.description = 'default'
  }

  if (newTodo.name !== null && newTodo.name !== '' && newTodo.name.length > 5) {
    todos.push(newTodo)
     // console.log(newTodo);
  }
}

// READ (list & show)
function list () {
  return todos
}
function show (id) {
  // find the TODO with this id
  var array = list()
  for (var i = 0; i < array.length; i++) {
    if (array[i]._id == id) {
      return array[i]
    } else {
      return null
    }
  }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var array = list()
  var updated = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i]._id = id) {
      if (params.name > 5) {
        array[i].name = params.name
        updated = 1
      }
      array[i].description = params.description
      array[i].completed = params.completed

    } else {
      updated = 0
    }
  }
  if (updated === 1) {
    return true
  } else {
    return false
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var array = list()
  for (var i = 0; i < array.length; i++) {
    if (array[i]._id = id) {
      array.splice(i, 1)
      return true
    } else {
      return false
    }
  }
}

function destroyAll(){
  todos = []
  if(todos.length == 0){
    return true
  }
  else {
    return false
  }
}


module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
