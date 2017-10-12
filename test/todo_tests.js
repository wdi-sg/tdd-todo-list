const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
console.log('testing list method')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

success()

console.log('testing create method')
var params = {
  name: 'get milk',
  description: 'from cold storage',
  completed: false
}

var params2 = {
  name: 'get milk',
  description: 'from cold storage',
  completed: false
}

var paramsJustName = {
  name: 'buy flower'
}

var paramsNoName = {}

var paramsShortName = {
  name: 'test'
}

todos.create(params)
var toDoListNow = todos.list()
assert.strictEqual(toDoListNow.length, 1, 'Should add the todos arr')

var createdItem = toDoListNow[0]
var keys = Object.keys(createdItem)
// console.log(keys)
keys.forEach(key => {
  console.log(`check if the todo items created have property ${key}`)
  assert.strictEqual(createdItem.hasOwnProperty(key), true, `key: ${key} is not found`)
})

console.log('check if the todo items created have property_id')
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')

console.log('check if a new todo items have different _id')
todos.create(params2)
var secondItem = toDoListNow[1]
// console.log(toDoListNow)
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')

console.log('check if can create todo items with just name and default description and completed property')
todos.create(paramsJustName)
var justNameItem = toDoListNow[2]
assert.strictEqual(justNameItem.description, 'N/A', 'default description value is not set')
assert.strictEqual(justNameItem.completed, false, 'default completed is not set')

console.log('Invalid name property check')

console.log('blank name')
assert.strictEqual(todos.create(paramsNoName), false, 'must input name')

console.log('short name')
assert.strictEqual(todos.create(paramsShortName), false, 'name must be more than 5 character long')

success()

console.log('testing show method')
var id = createdItem._id
console.log(todos.show(id))
assert.strictEqual(todos.show(id), createdItem._id, 'Show should return todo Object with specified id')
assert.strictEqual(todos.show('ecf31356-a7f8-456d-ad07-def600e751') === null, true, 'Should return null if id does not exist')

success()

console.log('testing update method')
assert.strictEqual(todos.update(id, params), createdItem, 'Should be able to update the todo list')
// assert.strictEqual(todos.update(paramsNoName), false, 'must input name')
// assert.strictEqual(todos.update(paramsShortName), false, 'name must be more than 5 characters long')

success()

console.log('testing destroy method')
assert.strictEqual(todos.destroy(id), createdItem, 'Should be able to delete the todo list')

success()
