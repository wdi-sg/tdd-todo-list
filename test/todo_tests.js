const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

// Testing todos.list() function
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

// Testing the todo.create(params) method
var testParams = {
  name: 'testing',
  description: 'my description abc',
  completed: false
}
todos.create(testParams)
assert.strictEqual(todos.list().length, 1, 'create should push an object into the todos list')

// <TEST FOR DEFAULTS, NO NAME?>
var testParams = {
  name: 'testing2',
  description: 'my description',
  completed: false
}
todos.create(testParams)
assert.strictEqual(todos.list().length, 2, 'create cannot accept a name of more than 5 characters')

// Testing the name length in create(params)
var testParams = {
  name: 'less',
  description: 'my description',
  completed: false
}
todos.create(testParams)
assert.strictEqual(todos.list().length, 2, 'create cannot accept a name of more than 5 characters')

var testId = todos.list()[0]._id
// Testing the todos.show(id) method
assert.strictEqual(todos.show(testId), todos.list()[0], 'show should return todo of id')
// Testing the todos.show(id) with no ID
assert.strictEqual(todos.show('testId123'), null, 'show should return null')

// Testing update ID
var updateTestParams = {
  name: 'testing3',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTestParams), true, 'update should return true')

// Testing update ID (more than 5)
var updateTest2Params = {
  name: 'less',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTest2Params), false, 'update should return false')

// Testing update ID (blank)
var updateTest3Params = {
  name: '',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTest3Params), false, 'update should return false')

// Testing destroy
console.log(todos.list(),testId)
// todos.delete(id)
assert.strictEqual(todos.delete(testId), true, 'delete should return true')

//Check removed

assert.strictEqual(todos.delete('testing123'), false, 'delete should return true')
