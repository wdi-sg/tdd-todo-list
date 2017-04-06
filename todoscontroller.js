var mongoose = require('mongoose')

var Todo = require('./models/todoschema')

var dburi = 'mongodb://localhost/todo'

mongoose.connect(dburi)
mongoose.Promise = global.Promise

var newTodo = new Todo()

var newEntry = {
  name: 'Need to Test',
  description: 'How to create multiple entries',
  completed: true
}

create(newEntry)

function create (entry) {
  if (entry.description === '') {
    console.log('This has a default description');
    newTodo.description = 'default description'
  }

  if (entry.completed === '') {
    console.log('Completed has no entry');
    newTodo.completed = false
  }

  if(entry.name.length < 5) {
    console.log('Name has no entry.')
    return false
  }
  else {
    newTodo.name = entry.name
    newTodo.description = entry.description
    newTodo.completed = entry.completed
    newTodo.save( function (err) {
      if (err) throw (err)
      console.log('New todo is created.')
    })
  }
  mongoose.disconnect()
}

// list()

function list () {
  Todo.find({}, function (err, entry) {
    if (err) console.error ('There are no todos in the list')
    console.log(entry)
  })
  mongoose.disconnect()
}

// show('asdf')

function show (id) {

  Todo.findById(id, function (err, found) {
    if (err) console.error ('Sorry this list does not exist.')
      console.log(found)
      return found
  })
  mongoose.disconnect()
}



// update('58e648a0d890b92d110dc199', {name: 'Submit Aviva', description: 'soon', completed: false})

function update(id, entry) {
  if(entry.name.length > 5 && entry.name.length != '') {

    Todo.update({ _id: id }, { $set: { name: entry.name, description: entry.description, completed: entry.completed }}).exec();

    console.log('Entry updated')
    mongoose.disconnect()
  }
  else {
  console.log('Update not successful')
  }
}

// destroy('58e648e933e3a72d2988376d')

function destroy(id) {
  Todo.findByIdAndRemove(id, function (err, found) {
    if (err) console.error ('Sorry this list does not exist.')
    console.log('Todo has been deleted from the list.')
    mongoose.disconnect()
  })
}

// destroyAll()

function destroyAll() {
  Todo.remove(function(err) {
    if (err) console.error ('Sorry this list does not exist.')
    console.log('All Todos have been deleted from the list.')
    mongoose.disconnect()
  })
}
