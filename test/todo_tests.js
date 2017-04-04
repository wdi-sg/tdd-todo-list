const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

// testing the create params method
var testParams = {
  name: 'teasssa',
  description: 'my description',
  completed: false
}
todos.create(testParams)

var testParams2 = {
  name: 'abcde'
}

todos.create(testParams2)

assert.strictEqual(todos.list().length, 2, 'List should return an array of all todos')
assert.ok(todos.list()[0].name, 'Todo should include a valid name')
assert.ok(todos.list()[0].name.length > 4, 'Todo name should be at least 5 characters long')
assert.strictEqual(todos.list()[0].description, 'none', 'completed did not return a default value of none')
assert.strictEqual(todos.list()[0].completed, false, 'completed did not return a default value of false')
assert.strictEqual(typeof (todos.list()[0].completed), 'boolean', 'completed did not return a boolean value')
assert.ok(todos.list()[0]._id, 'Todo should generate a valid id')

// todo.list test
assert.strictEqual(todos.list().length, 2, 'List should return an array of all todos')

// testing the totos.show(id) method

var randomIndex = Math.floor(Math.random() * todos.list().length)
var expectedTodos = todos.list()[randomIndex]
var testTodosId = expectedTodos._id
assert.strictEqual(todos.show(testTodosId), expectedTodos, 'show function returns as expected')
assert.strictEqual(todos.show(1234), null, 'Should return null if no TODO with that id exists')

// testing the Update(id, updatedParams) method

var updateTestParams = {
  name: 'testing3',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testTodosId, updateTestParams), true, 'update should return true')
assert.strictEqual(expectedTodos.name, 'testing3', 'Update function did not change name')
assert.strictEqual(expectedTodos.description, 'new description', 'Update function did not change description')
assert.strictEqual(expectedTodos.completed, true, 'Update function did not change completion status')
var updateTest2Params = {
  name: 'less',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testTodosId, updateTest2Params), false, 'update should return false, name is less than 5 characters')

// testing the destroy method
assert.strictEqual(todos.destroy(testTodosId), true, 'True if destroyed')
assert.strictEqual(todos.destroy(1234), false, 'Rumpelt cannot live!')

todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'destroyAll function did not delete all objects in Todo')
assert.strictEqual(todos.destroyAll(), true, 'destroyAll function did not delete all objects in Todo and return true')
