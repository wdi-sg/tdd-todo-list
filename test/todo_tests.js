const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')
// // Use Assert to Test the functionality of all your CRUD methods e.g.

console.log('READ from here')
var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}

var params2 = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}

var params3 = {
  name: '',
  description: '',
  completed: false
}

var params4 = {
  name: 'fff',
  description: '',
  completed: false
}

var params5 = {
  name: 'fdffsd',
  description: ''
}

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'should add the todos arr')

// console.log('Check if the todo items have property_id');
var firstItem = todoListNow[0]
assert.strictEqual(firstItem.hasOwnProperty('_id'), true, 'ID is not found')

// test if each object in the array has a unique property iD
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(firstItem._id === secondItem._id, false, 'each _id should be unique')

// test if there is any char in string.
assert.strictEqual(todos.create(params3), false, 'Please input a field in name')

 // testing if less than 5 charac'
assert.strictEqual(todos.create(params4) , false, 'Input field must be at least 5 characters long')

 // test if there are 3 property
assert.strictEqual(todos.create(params5) , false, 'Parameter must contain at least 3 keys')
// Part 2

// test should find TODO Object with ID
var checkID = todoListNow[0]._id
assert.strictEqual(todos.show(checkID) , todoListNow[0], 'function does not return an Object ')

// test should return null if can't search for ID on todo.
var checkID1 = ''
assert.strictEqual(todos.show(checkID1) , null, 'should return null')

// test if name can be updated
params = {
  name: 'loveBonito',
  description: 'hi',
  completed: false
}
assert.strictEqual(todos.update(checkID ,params) , true, 'should return true')

params = {
  name: '',
  description: 'hi',
  completed: false
}
// test if name is less than 5 char / no name input /
assert.strictEqual(todos.update(checkID ,params) , false, 'should return true')


success()
