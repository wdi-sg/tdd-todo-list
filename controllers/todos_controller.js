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
  // console.log('params given', params)
  if (!params.name) return false
  if (params.name.length <= 4) return false

  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false

  params._id = uuidGenerator()
  todos.push(params)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  // find the TODO with this id
  var testForNull = null
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) {
      testForNull = todos[i]
    }
  }
  return testForNull
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, updatedParams) {
  let idOfObj = show(id)
  if (updatedParams.name.length < 5) { return false }
  idOfObj.name = updatedParams.name
  idOfObj.description = updatedParams.description
  idOfObj.completed = updatedParams.completed
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  let idOfObj2 = show(id)
  if (idOfObj2) {
    var destroyIndex = todos.indexOf(idOfObj2)
    todos.splice(destroyIndex, 1)
    return true
  } else {
    return false
  }
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
