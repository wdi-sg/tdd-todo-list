const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./success.js')


// // Use Assert to Test the functionality of all your CRUD methods e.g.

var testParams1 = {
  name: 'shirong',
  description: 'is funky',
  completed: true
}

var testParams2 = {
  name: 'aaa',
  description: '',
  completed: true
}

var testParams3 = {
  name: '',
  description: '',
  completed: true
}

var testParams4 = {
  name: 'edmund'
}

var updatedParams = {
  name: 'raymond',
  description: 'stupid tester',
  completed: false
}

todos.create(testParams1)
assert.strictEqual(todos.list().length, 1, 'Failed Basic Test')
success("Passed first basic test!")
assert.strictEqual(todos.list()[0]._id !== null, true, 'Failed Second Test')
success("Passed second basic test!")

todos.create(testParams2)
assert.strictEqual(todos.list().length, 1, 'Check for condition of names less than 5 chars')
success("Passed test below 5 characters!")

todos.create(testParams3)
assert.strictEqual(todos.list().length, 1, 'Check for condition of names is nothing')
success("Passed test name is nothing!")

todos.create(testParams4)
assert.strictEqual(todos.list().length, 2, 'Check for only name condition')
success("Passed test only name is given!")

assert.strictEqual(todos.list().length > 0, true, 'Check if list returns an array of todos')
success("Passed test list returns array")

var id = todos.list()[0]._id
success('set test id is: '+id)
assert.strictEqual(todos.show(id)._id === id, true, 'Check for object return')
success("Passed id test with specific id!")
id = 123
console.log('set new test id as: '+id)
assert.strictEqual(todos.show(id), null, 'Check for null return upon wrong id')
success("Passed null test with wrong id!")

var id = todos.list()[1]._id
assert.strictEqual(todos.update(id,updatedParams), true, 'Check the update function!')
success("Passed base update function!")

var updatedParams = {
  name: 'ian',
  description: 'stupid tester',
  completed: false
}

assert.strictEqual(todos.update(id,updatedParams), false, 'Check the update function!')
success("Passed update function with short names!")

console.log('test id is: '+id)

assert.strictEqual(todos.destroy(id), true, 'Check the destroy function!')
success("Passed destroy function!")

assert.strictEqual(todos.destroy(id), false, 'Check the destroy function!')
success("Passed a repeat destroy function to test if really destroyed!")

assert.strictEqual(todos.destroyAll(), true, 'Check the destroy all function!')
assert.strictEqual(todos.list().length, 0, 'Check the destroy all function!')
success("Passed destroy all function!")

assert.strictEqual(todos.save(), true, 'Check save function!')
success("Passed save function!")

success('Assignment complete. Congratulations!!\r\n\r\n Another TDD finished!');
