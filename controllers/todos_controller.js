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
  if (!params.name) return false
  if (params.name.length <= 4) return false
  if (!params.description) params.description = 'N/A'
  if (!params.completed) params.completed = false

  params._id = uuidGenerator() // from dependency in line 1; linter also gave hint that the variable was not used

  // console.log('params given', params)
  //
  // //set params key => _id = 123
  // params.id = 123
  //
  // console.log('params given', params)
  todos.push(params)
}

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}

function show (id) {
  // find the TODO with this id
  var obj = null
  todos.forEach((item) => {
    if (item._id === id) {
      obj = item
    }
  })
  return obj

// if(! id) return null
//
// for( var i = 0; i < todos.length; i++) { // forEach not used here because you dont need to go through everything
//   if(id ===todos[i]._id) {
//     return todos[i]
//     break
//   }
// }
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  if (params.name.length < 5) return false
  params._id = id
  todos.forEach(function (item, index, array) {
    if (item._id === id) {
      for (var key in array[index]) {
        if (item[key] !== params[key] && params[key] !== undefined) array[index][key] = params[key]
      }
    // array[index] = params
    }
  })
  return true
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var item = show(id)
  if (item._id === id) {
    todos.splice(todos.indexOf(item), 1)
    return true
  } else {
    return false
  }
}

function destroyAll () {
  todos.splice(0, todos.length)
  return true
}

// function destroy (id) {
//   if(! id) return false

//   var destroyedTodo = show(id)
//   for (var i = 0; i < todos.length; i++) {
//     if (destroyedTodo._id === todos[i]._id) {
//       todos.splice(i, 1)
//       save()
//       break
//     }
//   }

//   return false
// }

// function destroyAll () {
//   todos.splice(0) // empty the array
//   save()
// }

// update('7ea03ab6-eb63-4ff9-a38e-be68490247fc', {
//   name: 'test'
// })

module.exports = {
  create,
  list,
  show,
  update,
  destroy
}
