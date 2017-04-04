const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// Use Assert to Test the functionality of all your CRUD methods e.g.
// Test List Function
console.log('TESTING List Function...')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
console.log('TEST PASSED')

// Test Create Function
console.log('TESTING Create Function...')
var testParams = {
  name: 'testing',
  description: 'test description',
  completed: true
}
todos.create(testParams)
assert.strictEqual(todos.list().length, 1, 'create should push an object into the todos list')
assert.strictEqual(todos.list()[0].description, 'test description', 'KVPs should be reflected')
assert.strictEqual(todos.list()[0].completed, true, 'KVPs should be reflected')
console.log('TEST PASSED')

// Test Create Function ID Property
console.log('TESTING Create Function ID Property...')
assert.strictEqual(typeof(todos.list()[0]._id), 'string', 'Create should automatically create an _id property')
console.log('TEST PASSED')

// Test Create Function with just name parameters
console.log('TESTING Create Function with just name parameters...')
var test2Params = {
  name: 'testing2'
}
todos.create(test2Params)
assert.strictEqual(todos.list()[1].description, 'my description', 'Create should be able to create a new Todo with just name')
assert.strictEqual(todos.list()[1].completed, false, 'Create should be able to create a new Todo with just name')
console.log('TEST PASSED')

// Test Create Function without name parameters
console.log('TESTING Create Function without name parameters...')
var test3Params = {
  description: 'testing3',
  completed: false
}
todos.create(test3Params)
assert.strictEqual(todos.list()[todos.list().length - 1].description, 'my description', 'Should NOT be able to create a new Todo without a name being provided')
console.log('TEST PASSED')

// Test Create Function with name parameters < 5 characters
console.log('TESTING Create Function with name parameters < 5 characters')
var test4Params = {
  name: 'less',
  description: 'testing4',
  completed: false
}
todos.create(test4Params)
assert.strictEqual(todos.list().length, 2, 'Create cannot accept a name of less than 5 characters')
console.log('TEST PASSED')

// Testing the todos.show(id) method
console.log('TESTING Show Function with ID')
var testId = todos.list()[0]._id
assert.strictEqual(todos.show(testId), todos.list()[0], 'show should return todo of id')
console.log('TEST PASSED')

// Testing the todos.show(id) with no ID
console.log('TESTING Show Function with invalid ID')
assert.strictEqual(todos.show('invalid'), null, 'show should return null')
console.log('TEST PASSED')

// Testing update ID
console.log('TESTING Update Function with ID')
var updateTestParams = {
  name: 'testing5',
  description: 'test5 description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTestParams), true, 'update should return true')
todos.update(testId, updateTestParams)
assert.strictEqual(todos.list()[0].name, 'testing5', 'update should update parameters')
assert.strictEqual(todos.list()[0].description, 'test5 description', 'update should update parameters')
assert.strictEqual(todos.list()[0].completed, true, 'update should update parameters')
console.log('TEST PASSED')

// Testing update with invalid ID
console.log('TESTING Update Function with invalid id')
assert.strictEqual(todos.update('invalid', updateTestParams), false, 'update should return false')
assert.strictEqual(todos.list()[0].name, 'testing5', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].description, 'test5 description', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].completed, true, 'update should not update parameters when return is false')
console.log('TEST PASSED')

// Testing update ID (name less than 5)
console.log('TESTING Update Function with name < 5 characters')
var updateTest2Params = {
  name: 'less',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTest2Params), false, 'update should return false')
assert.strictEqual(todos.list()[0].name, 'testing5', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].description, 'test5 description', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].completed, true, 'update should not update parameters when return is false')
console.log('TEST PASSED')

// Testing update ID (blank name)
console.log('TESTING Update Function with blank name')
var updateTest3Params = {
  name: '',
  description: 'new description',
  completed: true
}
assert.strictEqual(todos.update(testId, updateTest3Params), false, 'update should return false')
assert.strictEqual(todos.list()[0].name, 'testing5', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].description, 'test5 description', 'update should not update parameters when return is false')
assert.strictEqual(todos.list()[0].completed, true, 'update should not update parameters when return is false')
console.log('TEST PASSED')

// Testing destroy with id
console.log('TESTING destroy Function with id')
assert.strictEqual(todos.destroy(testId), true, 'destroy should return true')
todos.destroy(testId)
assert.strictEqual(todos.list()[0].name, 'testing2', 'Should be able to destroy the Todo with the given id')
console.log('TEST PASSED')

// Testing destroy with invalid id
console.log('TESTING destroy Function with invalid id')
todos.destroy('invalid')
assert.strictEqual(todos.destroy(testId), false, 'destroy should return false')
assert.strictEqual(todos.list()[0].name, 'testing2', 'Should not be able to destroy the Todo when false')
console.log('TEST PASSED')

// Testing destroyAll
console.log('TESTING destroyAll Function with invalid id')
assert.strictEqual(todos.destroyAll(), true, 'destroyAll should return true')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'Should be able to delete all the Todos')
console.log('TEST PASSED')
