const uuidGenerator = require('uuid/v4')
const fs = require('fs')
console.log(uuidGenerator())
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
  var newTodo = {}
  if (params.name === undefined || params.name.length < 5) {
    // console.log('NAME NOT GIVEN! Cannot create new Todo!')
    return false
  } else {
    newTodo.name = params.name
  }

  if (params.description === undefined) {
    newTodo.description = 'description here'
  } else {
    newTodo.description = params.description
  }

  if (params.completed === undefined) {
    newTodo.completed = false
  } else {
    newTodo.completed = params.completed
  }

  newTodo._id = uuidGenerator()

  todos.push(newTodo)
  return newTodo
}

// function create (params) {
//   var newTodo = {
//     name: function (inputName) {
//       if (inputName === undefined) {
//         console.log('To-do name not given!')
//         return false
//       } else {
//         return inputName
//       }
//     },
//     description: params.description,
//     completed: params.completed
//
//   }
//   return newTodo.name(params.name)
//   console.log(newTodo)
// }

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var toShow = null
  todos.forEach(function (item, index, array) {
    if (item._id === id) {
      toShow = item
    }
  })

  return toShow
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var toUpdate = show(id)

  if ((params.name !== undefined && params.name === '') || (params.name !== undefined && params.name.length < 5)) {
    return false
  } else {
    toUpdate.name = params.name
  }

  params.name === undefined ? '' : toUpdate.name = params.name
  params.description === undefined ? '' : toUpdate.description = params.description
  params.completed === undefined ? '' : toUpdate.completed = params.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var toDestroy = show(id)

  if (toDestroy) {
    var index = todos.indexOf(toDestroy)

    todos.splice(index, 1)
    return true
    console.log(todos)
  } else {
    return false
  }
}

function destroyall () {
  todos.forEach(function (item, index, array) {
    array.pop()
  })

  return true
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyall
}
