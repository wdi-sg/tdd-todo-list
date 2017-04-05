const uuidGenerator = require('uuid/v4')
const fs = require('fs')

console.log('this is id generator ' + uuidGenerator())

const todos = []
//// the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  var newTodo = params
  newTodo._id = uuidGenerator()
  console.log(newTodo)
  todos.push(newTodo)
}

//if name is undefined

function checkName () {
  if (testParamsName.name !== undefined) {
    return true
  } else if (testParamsName.name === undefined) {
    return false
  } else if (testParamsName.length <= 4) {
    return false
  }
}

// READ (list & show)
function list () {
  return todos
}


function show (id) {
  //Should return the Todo Object with the specified `id`
  //Should return null if no TODO with that `id` exists
  if (testParams._id !== null) {
  return 'insert code for specified id'
} else if (testParams._id === null)
  return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
}

module.exports = {
  create,
  checkName,
  list,
  show,
  update,
  destroy
}
