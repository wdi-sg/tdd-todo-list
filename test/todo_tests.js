const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// testing todos.create(params) method
var testParams = {
  name: 'testing1',
  description: 'description here',
  completed: false
}
todos.create(testParams)
assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')

// testing for id being created
var testParams2 = {
  name: 'testing2',
  description: 'description here',
  completed: true
}
todos.create(testParams2)
assert.strictEqual(!!(todos.list()[0]._id), true, 'Did not automatically create _id property')

// testing for being able to create new Todo with just name
var testParams3 = {
  name: 'testing3'
}
todos.create(testParams3)
assert.strictEqual(todos.list().length, 3, 'Could not create new Todo with just name')

// testing if can Todo can be created without name
var testParams4 = {
  name: '',
  description: 'description here',
  completed: true
}
todos.create(testParams4)
console.log(todos.list())
assert.strictEqual(todos.list().length, 3, 'Could create a new Todo without a name')

// testing for name that is more than 5 characters
var testParams5 = {
  name: 'V',
  description: 'description here',
  completed: true
}
todos.create(testParams5)
assert.strictEqual(todos.list().length, 3, 'Could create a new Todo with a name that is less than 5 characters')

// testing for return of Todo object with specified id
var id = todos.list()[0]._id
console.log("the id is: " + id)
assert.strictEqual(todos.show(id), todos.list()[0], 'Did not return the Todo Object')

// test if null is returned if no such Todo with specified id
assert.strictEqual(todos.show("not an id"), null, 'Did not return null for no such Todo')

// test if able to update Todo individual fields with given id, returns true
var testUpdate = {
  name: 'Updated name',
  description: 'Updated description',
  completed: true
}
assert.ok(todos.update(id, testUpdate), 'Should return true if update is successful')

// test if update disallows name to be changed to blank or less than 5 characters
var testUpdate2 = {
  name: '',
  description: 'Updated description',
  completed: true
}
assert.ok(!todos.update(id, testUpdate2), 'Allowed name to be changed to blank')

var testUpdate3 = {
  name: 'boo',
  description: 'Updated description',
  completed: true
}
assert.ok(!todos.update(id, testUpdate3), 'Allowed name to be changed to less than 5 characters')

// console.log(todos.list())
// test if Todo returns true upon deletion
assert.strictEqual(todos.destroy(id), true, 'Does not return true if delete is successful')
assert.strictEqual(todos.destroy(id), false, 'Does not return false if delete is unsuccessful')

// test if destroyAll deletes all Todos and returns true
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
assert.ok(todos.destroyAll(), 'Does not return true upon deleting all Todos')
