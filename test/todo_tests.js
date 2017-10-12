const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.

// test list method --------------------------------
console.log('testing list method')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

success()

// test create method --------------------------------
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

var paramsJustName = {
  name: 'buy a flower'
}

var paramsNoName = {}

var paramsShortName = {
  name: 'test'
}

todos.create(params)

var todoListNow = todos.list()

assert.strictEqual(todoListNow.length, 1, 'Should add the todos arr')

console.log('check if the todo items created have property _id')
var createdItem = todoListNow[0] // object
var keys = Object.keys(createdItem)
// assert.notStrictEqual(createdItem._id, undefined, '_id is not found')
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
var justNameItem = todoListNow[2]
assert.strictEqual(justNameItem.description, 'N/A', 'default description value is not set')
assert.strictEqual(justNameItem.completed, false, 'default completed value is not set')

console.log('Invalid name property check')

console.log('blank name')
assert.strictEqual(todos.create(paramsNoName), false, 'Name cannot be blank')

console.log('short name/ ')
assert.strictEqual(todos.create(paramsShortName), false, 'Name is too long')

success()

// test show method --------------------------------
console.log('check if the show method returns the object with a correct id')
var id = params._id
assert.strictEqual(todos.show(id), params, 'return is not an object')
// assert.strictEqual(todos.show(secondItem._id), secondItem, 'should return object')

console.log('check if the show method returns null if no TODO with that id exists')
assert.strictEqual(todos.show('2020'), null, 'should return null if no todo with that id exists')
success()

// test update method (dont understand)--------------------------------
// var updatedParam = {
//   name: 'get money',
//   description: 'at the atm',
//   completed: true
// }
// 
// todos.update(id, updatedParam)
// var newParam = todoListNow[0]
//
// // test
// assert.strictEqual(newParam.name === updatedParam.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed, true, 'update should change the original object to the supplied object')
//
// // testing if individual fields can be updated
// console.log('checking if update can update individual fields')
//
// // prep
// var updatedParam2 = { name: 'transfer money' }
// todos.update(id, updatedParam2)
// newParam = todoListNow[0]
// console.log(newParam)
//
// // test
// assert.strictEqual(newParam.name === updatedParam2.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed && newParam._id === id, true, 'update should only update the updated fields')
//
// // testing if update disallows a name change if less than 5 chars long
// console.log('checking if update will allow a name change to less than five characters long')
//
// // prep
// var updatedParam3 = { name: 'create ibanking' }
// todos.update(id, updatedParam3)
// newParam = todoListNow[0]
//
// // test
// assert.strictEqual(newParam.name === updatedParam3.name, false, 'update should not allow a name change to less than five characters long')
//
// // testing if update returns false upon unsuccessful call
// console.log('checking if update returns false when unsuccessful')
//
// // test
// assert.strictEqual(todos.update(id, updatedParam3), false, 'update should return false if unsuccessful')
//
// // testing if update returns true upon successful call
// console.log('checking if update returns true upon successful call')
//
// // prep
// var updatedParam4 = {name: 'apply for account'}
//
// // test
// assert.strictEqual(todos.update(id, updatedParam4), true, 'update should return true if successful')
//
// success()

// function update (id, params) {
//   if (!params.name && params.name.length < 5) return false
//   var updatedTodo = show(id)

//   updated.Todo.description = (params.description) ? params.description : updatedTodo.description
//   updated.Todo.completed = (params.completed) ? params.completed : updatedTodo.completed
//   updatedTodo.name = params.name
// }

// success()

// test destroy method --------------------------------
console.log('check if the destroy method is able to delete TODO with the given id and return true')
assert.strictEqual(todos.destroy(secondItem._id), true)

console.log('check if the destroyall method is able to delete all TODOs and return true')
todos.destroyAll()
assert.strictEqual(todoListNow.length, 0)

success()
