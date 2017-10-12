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
  if (params.name.length <=4) return false

  if(!params.description) params.description = 'N/A'
  if(!params.completed)params.completed = false

  params._id = uuidGenerator()
  todos.push(params)

}
// function create (params) {
//   if (params.name && params.name.length >= 5){
//     if (!params.description){ params.description=''}
//     if (!params.completed){ params.completed=false}
//     params._id = uuidGenerator()
//     todos.push(params)
//   }
//   else {return
//
//   }
//
// }

// READ (list & show)
function list () {
  // return list of all TODOs
  return todos
}
function show (id) {
  var newItem =null
  // find the TODO with this id
  todos.forEach(function(item){
    if(item._id === id){
      newItem = item
    }
  })
  return newItem
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  var item = show(id)
  if(params.name.length >= 5){
    item.name = params.name
    item.description = params.description
    item.completed = params.completed
      return true
  }else{
    return false
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  var item = show(id)
  if(item){
    todos.splice(todos.indexOf(item),1)
    return true
  }else{
    return false
  }
}

function destroyAll(){
  todos.splice(0)
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
