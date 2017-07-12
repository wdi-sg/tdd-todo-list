const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('../helpers/success.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var params = {
  name: 'First Todo',
  description: 'First Description',
  completed: false
}

var params2 = {
  name: 'Second Todo',
  description: 'First Description',
  completed: false
}

var params3 = {
  name: 'Only name'
}

var params4 = {
  description: 'error here'
}

var params5 = {
  name: 'four'
}

var params6 = {
  description: 'First Todo\'s new name'
}

var params7 = {
  description: 'First Todo\'s new name'
}

// TESTS FOR CREATE AND LIST FUNCTIONS

// normal case: creating new todos
var firstTodo = todos.create(params)
assert.strictEqual(todos.list().length, 1, 'List should have one after create')
success('List should have one element in the array after first create')
// normal case: params contains 3 props
assert.strictEqual(firstTodo.hasOwnProperty('name'), true)
assert.strictEqual(firstTodo.hasOwnProperty('description'), true)
assert.strictEqual(firstTodo.hasOwnProperty('completed'), true)
success('params contains 3 props')
// normal case
// actual firstTodo._id
// expected? true
assert.strictEqual(firstTodo.hasOwnProperty('_id'), true, 'every todo needs to have _id property')
success('todo is assigned an id')

// normal case
// secondTodo._id is unique
var secondTodo = todos.create(params2)
assert.notStrictEqual(secondTodo._id, firstTodo._id, '_id prop needs to be unique')
success('ids are different')

// normal case
// new todo without name in param, should have default description and completed
var onlyNameTodo = todos.create(params3)
var defaultDescription = 'my todo description'
var defaultCompleted = false
assert.strictEqual(onlyNameTodo.description, defaultDescription, 'Description should be default')
assert.strictEqual(onlyNameTodo.completed, defaultCompleted, 'Completed should be default')
success('default desc and completion status are assigned')

// error case
// cannot create new todo without name property
var noNameTodo = todos.create(params4)
assert.strictEqual(noNameTodo, false, 'Name is required')
success('returns false if name not submitted')

// error case
// cannot create new todo with short name
var shortTodo = todos.create(params5)
assert.strictEqual(shortTodo, false, 'Name is too short')
success('returns false if name shorter than 5 chars')

// TESTS FOR SHOW FUNCTION
// console.log(todos.todos)
var firstId = todos.todos[0]._id
var showTodo = todos.show(firstId)
assert.strictEqual(showTodo, todos.todos[0], 'Wrong or no todo shown')
success('show todo based on id')

// TESTS FOR UPDATE FUNCTION
// Should return true if an update is successful, false if otherwise
var firstId = todos.todos[0]._id
var updatedTodo = todos.update(todos.todos[0]._id, params6)
assert.strictEqual(updatedTodo, true, 'Update should reflect true')
success('update with new params')

var updatedTodo = todos.update('fakeid-12345', params6)
assert.strictEqual(updatedTodo, false, 'Update was not successful')
success('update with non-existent id returns false')

// TESTS FOR DESTROY FUNCTION
