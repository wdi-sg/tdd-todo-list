const assert = require('assert')
const success = require('./helpers/success')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
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

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'should add the created to the todos array')

var createdItem = todoListNow[0]
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')
success()

console.log('check if new todo items have different _id')
todos.create(params2)
var secondItem = todoListNow[1]
console.log(todoListNow)
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')

console.log('check if the todo items created have property _id')

console.log('check if can make the TODO using just name')
var params3 = {
  name: 'buy chicken'
}

todos.create(params3)
console.log(params3)
var thirdItem = todoListNow[2]
assert.strictEqual(thirdItem.hasOwnProperty('description'), true, 'item description not created')
assert.strictEqual(thirdItem.hasOwnProperty('completed'), true, 'item completed not created')
success()

var params4 = {
}

todos.create(params4)
console.log(params4)
assert.strictEqual(todos.create(params4), false, 'name not defined')

var shortName = {
  name: 'buyw'
}

todos.create(shortName)
console.log(shortName)
assert.strictEqual(todos.create(shortName), false, 'name too short')
