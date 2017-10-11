const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
console.log('testing list method')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

success()

console.log('testing create method')

var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false

}

var params2 = {
  name: 'get a coke',
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

var updatedParams = {
  name: 'OJ',
  description: 'from NTUC',
  completed: false
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

console.log('Check all todos are returned on the list')
assert.strictEqual(todos.list().length, 3, 'Not all todos are returned in the list')

console.log('Return Todo object with specified id')
assert.strictEqual(todos.show(params._id), params, 'Object with specficied id not returned')
success()

console.log('No object with specified id found, return null')
assert.strictEqual(todos.show(345), null, 'No object with specficied id found but null is not returned')
success()

console.log('Update Todo with given ID')
assert.strictEqual(todos.update(createdItem._id, updatedParams), true, 'Todo not updated with given ID')
success()

console.log('Check delete Todo with specified id')
assert.strictEqual(todos.destroy(createdItem._id), true, 'Todo with specified id was not deleted')
success()

console.log('Check delete all Todos')
assert.strictEqual(todos.destroyAll(), true, 'All Todos were not deleted')
success()
// console.log(todos.list())
