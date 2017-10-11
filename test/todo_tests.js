const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
// const todos = require('../../data.json')

const success = require('./helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
console.log('testing list method')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

success()

console.log('testing create method')

var params = {
  name: 'get a soft drink',
  description: 'from cold storage',
  completed: false
}

var params2 = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}

var paramsJustName = {
  name: 'buy a flower'
}

var paramsShortName = {
  name: 'test'
}

var paramsNoName = {}

var params3 = {
  name: 'changed name',
  description: 'changed description',
  completed: true
}

var todoListNow = todos.list()
todos.create(params)
assert.strictEqual(todoListNow.length, 1, 'Should add the todos arr')

var createdItem = todoListNow[0]
var keys = Object.keys(createdItem)

keys.forEach(key => {
  console.log(`check if the todo items created have property ${key}`)
  assert.strictEqual(createdItem.hasOwnProperty(key), true, `key: ${key} is not found`)
})

console.log('check if a new todo items have different _id')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')

console.log('check if a new todo with only name property can be created, with default description and completed')
todos.create(paramsJustName)
var noNameItem = todoListNow[2]
assert.strictEqual(noNameItem.description, 'N/A', 'default description value is not set')

assert.strictEqual(noNameItem.completed, false, 'default completed value is not set')

console.log('Invalid name property check')
console.log('blank name')
assert.strictEqual(todos.create(paramsNoName), false, 'Name cannot be blank')

console.log('short name')
assert.strictEqual(todos.create(paramsShortName), false, 'Name is too long')
success()

console.log('checking if todo list outputs every item added so far')
assert.strictEqual(todos.list().length, 3, 'not displaying full list')
success()

console.log(todos.list()) // testing with ID fb8f8fa3-6b41-4d6f-9bb3-3e732e7aa01b
console.log('check if return correct ID object')
assert.strictEqual(todos.show(params2._id), params2, 'not showing correct params')
success()

console.log('check if incorrect ID returns null')
assert.strictEqual(todos.show('abc'), null, 'invalid ID')
success()

console.log('checking name update on todos by ID')
todos.update(paramsJustName._id, params2)
assert.strictEqual(paramsJustName.name, params2.name, 'name is not updated correctly')
success()

console.log('checking description update on todos by ID')
todos.update(paramsJustName._id, params3)
assert.strictEqual(paramsJustName.description, params3.description, 'description is not updated correctly')
success()

console.log('checking completed update on todos by ID')
todos.update(paramsJustName._id, params3)
assert.strictEqual(paramsJustName.completed, params3.completed, 'name is not updated correctly')
success()

console.log('checking name update with name non-blank and at least 5 char by ID')
todos.update(params2._id, paramsShortName)
assert.strictEqual(params2.name, params2.name, 'blank or > 5 char name should not be accepted')
success()

console.log('checking if return true on successful update')
assert.strictEqual(todos.update(params2._id, params3), true, 'not returning true on successful update')
success()

console.log('checking if return false on unsuccessful update')
assert.strictEqual(todos.update(params2._id, paramsShortName), false, 'not returning false on unsuccessful update')
success()

console.log('testing destroy(id)')
todos.destroy(paramsJustName._id)
assert.strictEqual(todos.list().indexOf(paramsJustName), -1, 'not destroying selected element')
success()

console.log('testing true result of destroy(id)')
assert.strictEqual(todos.destroy(params._id), true, 'does not return successful result')
success()

console.log('testing false result of destroy(id)')
assert.strictEqual(todos.destroy(params3._id), false, 'does not return successful result')
success()

console.log('testing delete of all todos')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'failed to delete all todos')
success()

// todos.save()
