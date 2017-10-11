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
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}

var createdItem = todoListNow[0]
var keys = Object.keys(createdItem)

console.log(keys)

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'should add the todos arr')

console.log('check if the todo items created have property _id')
// console.log(createdItem.hasOwnProperty())
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')

console.log('check if a new todo item have different _id')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')
console.log('check if the todo items created have property name')
// console.log(createdItem)
assert.strictEqual(createdItem.name !== undefined, true, 'created item does not have a name')
console.log('check if the todo item created does not have property description')
assert.strictEqual(createdItem.description !== undefined, true, 'created item does not have property description')
console.log('check if the to do items have property completed')
assert.strictEqual(createdItem.hasOwnProperty('completed'), true, 'createdItem does not have completed property')
assert.strictEqual((createdItem.name.length <= 4), true, 'createdItem name cannot be more than 5')
success()
