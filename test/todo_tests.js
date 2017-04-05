const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// Testing the todos.create(params) method
var testParams = {
  name: 'test todo list',
  description: 'description',
  completed: false
}

var testParams1 = {
  name: 'test',
  description: 'dummy test',
  completed: false
}

todos.create(testParams)
// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos here')
// testing the todos show(id) method
assert.strictEqual(todos.list()[0].description, 'Insert description here', 'Does not assign sensible defaults to the Description field.')
assert.strictEqual(todos.list()[0].completed, false, 'Todo is not completed')
assert.strictEqual(todos.list()[0]._id, true, 'Id is present')

// Testing 2nd todos list
todos.create(testParams1)
assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')

todos.show()

// test for function show(id)

//* *****************function destroy(id)***************************//
// we expect that when we run destroy(id), it should return true to let us know it was successful
assert.strictEqual(todos.destroy(id), true, 'Destroy(id) should return true, to indicate success')
// We also expect the list should now be empty
assert.strictEqual(todos.list().length, 0, 'List should be empty after deleting all TODOs')
