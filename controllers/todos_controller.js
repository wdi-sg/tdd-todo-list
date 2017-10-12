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
function objectHas3Key (params) {
  // console.log((Object.keys(params)));
  var arrays = (Object.keys(params))
  if (arrays.length === 3) return true
  else return false
}

function create (params) {
  if (params.name.length !== 0) {
    if (params.name.length > 5) {
      if (objectHas3Key(params) === true) {
        params._id = uuidGenerator()
        // show(params._id)
        todos.push(params)
        show(params._id)
        return true
      } else { return false }
    } else { return false }
  } else { return false }
}

// READ (list & show)
function list () {
  return todos
}

function show (id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i]._id === id) return todos[i]
    else return null
  }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length !== 0) {
    if (params.name.length > 5) {
      if (objectHas3Key(params) === true) {
        for (var i = 0; i < todos.length; i++) {
          if (todos[i]._id === id) {
            todos.splice(i, 1)
            todos.splice(i, 0, params)
            return true
          } else { return false }
        }
      } else { return false }
    } else { return false }
  } else { return false }
}
// search ID and remove params. Splice it out and replace with new updates

// DESTROY (destroy & destroyAll)
function destroy (id) {
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
