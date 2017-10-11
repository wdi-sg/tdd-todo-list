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
  if (params.name && params.name.length >= 5){
    if (!params.description){ params.description='N/A'}
    if (!params.completed){ params.completed=false}
    params._id = uuidGenerator()
    todos.push(params)
    return true
  }
  else return false


}

// READ (list & show)
function list () {
  return todos
}
function show (id) {
  var theItem = null
  todos.forEach((item)=>{
    if (item._id === id){
      theItem = item
    }
  })
  return theItem
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var toUpdate = show(id)
  if (params.name && params.name.length >= 5){
    toUpdate.name = params.name
    if (params.description) toUpdate.description = params.description
    if (params.completed) toUpdate.completed = params.completed
    toUpdate._id = id
    return true
  }
  else return false
    //return toUpdate
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var currentLength = todos.length
  var toDeleteItem = show(id)
  var indexNo = todos.indexOf(toDeleteItem)
  todos.splice(indexNo,1)
  if (todos.length<currentLength){
    return true
  } else {
    return false
  }
}

function destroyAll(){
  todos.length = 0
  return true
  // var currentLength = todos.length
  // for (var i = 1; i < currentLength; i++){
  //   todos.pop()
  // }
  // if (todos.length === 0){
  //   return true
  // } else return false
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
