// const uuidGenerator = require('uuid/v4')
// const fs = require('fs')

var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/mongo-todo'
var toDo = require('./models/mongoose_todo')

mongoose.connect(dbURI)
mongoose.Promise = global.Promise

// const todos = []
// {
//   name:
//   description:
//   completed:
//   _id: uuidGenerator
// }
//// the following line will instead load the todos from a json file when the app starts
const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }



// CREATE - params should be an object with keys for name, description and completed
// pass an object into todos
function create(params) {
  if (params.name === '' || params.name.length < 5) {
    return false
    mongoose.disconnect()
  } else {
    var newTodo = {
      name: params.name,
      description: params.description || params.name,
      completed: params.completed || false
    }
    toDo.create(newTodo, function (err, newToDo) {
      if(err) console.error(err)
      console.log(newToDo)
    })
    return true
    mongoose.disconnect()
  }
}

// READ (list & show)
function list () {
  toDo.find({}, function (err, data) {
    if(err) console.error(err)
    console.log(data)
    mongoose.disconnect()
  })
}

function show(id) {
  toDo.findById(id, function (err, data) {
      if(err) console.error(err)
      console.log(data)
      mongoose.disconnect()
    })
  }

// UPDATE - params should be an object with KVPs for the fields to update
// function update(id, updatedParams) {
//   if(updatedParams.name != '' && updatedParams.name.length > 5){
//     for(var key in todos) {
//       if(todos[key].id_num === id) {
//         todos[key].name = updatedParams.name
//         todos[key].description = updatedParams.description
//         todos[key].completed = updatedParams.completed
//         return true
//       }
//     }
//   }
//   save()
//   return false
// }

// DESTROY (destroy & destroyAll)
function destroy(id) {
  toDo.remove({ _id: id }, function (err, data) {
    if(err) console.error(err)
    console.log(data)
    mongoose.disconnect()
  })
}

function destroyAll() {
  toDo.remove({}, function (err, data) {
    if(err) console.error(err)
    console.log(data)
    mongoose.disconnect()
  })
}

module.exports = {
  create,
  list,
  show,
  update,
  destroy,
  destroyAll
}
