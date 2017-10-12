const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

console.log('testing create method')

var params = {
  name: 'get milk',
  description: 'from cold storage',
  completed: false
}
var params2 = {
  name: 'get apple',
  description: 'from NTUC',
  completed: false
}
var paramsJustName = {
  name: 'buy a flower'
}

var paramsShortName = {
  name: 'test'
}

var paramsNoName = {}


todos.create(params)

var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'should add the todos arrary')
var createdItem = todoListNow[0]
// console.log(createdItem.hasOwnProperty('_id'))
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found dude.')

// console.log('check if a new todo items have different _id.')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')
// console.log(todoListNow)

todos.create(paramsJustName)
var noNameItem = todoListNow[2]
assert.strictEqual(noNameItem.description, 'None', 'default description value is not set')
assert.strictEqual(noNameItem.completed, false, 'default completed value is not set')

// console.log('Invalid name property check')
// console.log('blank name')
assert.strictEqual(todos.create(paramsNoName), false, 'Name cannot be blank')

// console.log('short name')
assert.strictEqual(todos.create(paramsShortName), false, 'Name is too long')

assert.strictEqual(todos.show(secondItem._id), secondItem, 'Should return the Todo Object with the specified id')
// console.log(createdItem)

assert.notStrictEqual(todos.show(createdItem._id), null, 'bro, give me a correct ID.')
assert.strictEqual(todos.show('william'), null, 'bro, give me a correct ID.')

var updatedParams = {
  name: 'update',
  description: 'update me',
  completed: false
}
todos.create(updatedParams)
var updatedItem = todoListNow[3]
todos.update(updatedItem._id, updatedParams)
console.log(updatedItem)
assert.strictEqual(updatedParams.name, 'orange', `can't update`)
console.log(updatedItem)
success()
