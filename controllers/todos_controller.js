var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/todo'
const Todo = require('../models/todo')

// CREATE - params should be an object with keys for name, description and completed
function create (params) {
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  var newTodo = params
  if (!newTodo.name || newTodo.name.length < 5) {
    return false
    mongoose.disconnect()
  }
  if (!newTodo.description || newTodo.description === '') {
    newTodo.description = 'default'
  }
  if (!newTodo.completed || newTodo.completed === '') {
    newTodo.completed = false
  }
  // todos.push(newTodo)
  save()
  // return newTodo
  console.log(newTodo)
  mongoose.disconnect()
}

// READ (list & show)
function list () {
  // return list of all TODOs
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.find({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

function show (id) {
  // find the TODO with this id
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.find().where('_id').equals(id).exec(function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

// UPDATE - params should be an object with KVPs for the fields to update
function update (id, params) {
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  if (params.name.length >= 5) {
    Todo.findByIdAndUpdate(id, {$set: params}, {new: true}, function (err, data) {
      if (err) {
        console.error(err)
        mongoose.disconnect()
        // return false
      } else {
        console.log(data)
        mongoose.disconnect()
      }
    })
  } else {
    mongoose.disconnect()
  }
}

// DESTROY (destroy & destroyAll)
function destroy (id) {
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.findByIdAndRemove(id, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
  })
}

function destroyAll () {
  mongoose.connect(dbURI)
  mongoose.Promise = global.Promise
  Todo.remove({}, function (err, data) {
    if (err) {
      console.error(err)
      mongoose.disconnect()
    } else {
      console.log(data)
      mongoose.disconnect()
    }
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
