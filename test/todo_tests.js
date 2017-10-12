const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')
// // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
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

var params3 = {
  name: 'get a milk'
}

var params4 = {
  name: 'johnathan',
  description: 'from cold storage',
  completed: false
}

var paramsNoName = {name: 'hello'}

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'created new todos')

console.log('Check if the todos items created have property_id')

var createdItem = todoListNow[0]
assert.notStrictEqual(createdItem.hasOwnProperty('_id'), undefined, '_id is not found')

console.log('check if a new todo items have different _id')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false, 'each _id should be unique')

console.log('check to allow with name only')
todos.create(params3)
var thirdItem = todoListNow[2]
assert.strictEqual(params3.description, 'N/A', 'created new todos 3rd')
assert.strictEqual(params3.completed, false, 'completed is false')

console.log('check if name is provided or not')
todos.create(params4)
var fourthItem = todoListNow[3]
assert.notStrictEqual(fourthItem.name, false, 'name is not given')

console.log('check if name is provided or not')
todos.create(params4)
var fifthItem = todoListNow[4]
console.log(fifthItem)
assert.strictEqual(fifthItem.name.length > 5, true, 'please enter a name longer than 5 characters long')

success()

console.log('testing for list')
todos.list()
assert.strictEqual(todos.list().length, 5, 'Didnt return the correct number of todos')

console.log('checks for Show(id)')
assert.strictEqual(todos.show(fifthItem._id), fifthItem, 'test')
assert.strictEqual(todos.show('1281248172408174'), null, 'test')

console.log('testing for update')
todos.update(fifthItem._id, fourthItem)
assert.strictEqual(fifthItem.name, fourthItem.name, 'name has not been updated')
assert.strictEqual(fifthItem.description, fourthItem.description, 'description has not been updated')
assert.strictEqual(fifthItem.completed, fourthItem.completed, 'completed has not been updated')
assert.notStrictEqual(paramsNoName.name.length, 0, 'empty name')
assert.notStrictEqual(paramsNoName.name.length < 5, true, 'empty name')
assert.strictEqual(todos.update(fifthItem._id, fourthItem), true, 'update is unsucessful')

console.log('testing for destroy')
assert.strictEqual(todos.destroy(fifthItem._id), true, 'Todo has not been destroyed')
assert.strictEqual(todos.destroyAll(), true, 'All todo have not been destroyed')
success()
