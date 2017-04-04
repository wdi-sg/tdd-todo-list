const uuidGenerator = require('uuid/v4')
const fs = require('fs')

// console.log(uuidGenerator());

const todos = []
//// the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

var testParams = {
  name: 'Cara Chew',
  description: 'GA Student',
  completed: true
}

var updatedParams = {
  name: 'Pamie',
  description: 'Other',
  completed: true
}

create(testParams)
console.log(show(uuidGenerator()))
update(uuidGenerator(), updatedParams)

// CREATE - params should be an object with keys for name, description and completed
function create (params) {

  var newTodo = params

  if (newTodo.description === '') {
    newTodo.description = 'default description'
  }

  if (newTodo.completed === '') {
    newTodo.completed = false
  }

  if(newTodo.name.length < 5) {
    return false
  }
  else {
    newTodo._id = uuidGenerator()
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
  // console.log(todos[0]._id)
  // console.log(todos);
  todos.forEach(function(object) {
    if (object._id === id) {
      // console.log(object._id)
      // console.log(object)
      return object
    }
  })
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if(params.name.length > 5 && params.name.length != '') {
    todos.forEach(function(object) {
      if (object._id === id) {

        object.name = params.name
        object.description = params.description
        object.completed = params.completed
        return true
      }
  })
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  todos.forEach(function(object) {
    if (object._id === id) {
      todos.splice(object,1)
      return true
    }
    else {
      return false
    }
  })
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
  destroy
}
