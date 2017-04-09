// connect to db
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todo-list')
//
//
// // require the models
var toDo = require('./models/mongoose_todo')
mongoose.Promise = global.Promise

//// The following function can be used to save the todos array to the json data file
// function save () {
  const json = JSON.stringify(todos)
  fs.writeFileSync('data.json', json, 'utf8')

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
  // console.log(newTodo)
  todos.push(newTodo)
  save()
  return newTodo
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
  save()
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
  save()
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
  save()
  return false
}

function destroyAll() {
  todos = []
  save()
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
