const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')

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

var paramsJustName = {
  name: 'get a huishi'
}

var paramsNoName = {}

var paramsShortName = {
  name: 'sad'
}

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todoListNow.length, 1, 'should add the todos arr')

console.log('checking if the todo items created have property_id')
var createdItem = todoListNow[0]
// assert.notstrictEqual(createdItem._id, undefined, '_id is not found')
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')

console.log('checking if a new todo items have difference_id')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false, 'each_id should be unique')

// console.log(`check if the todo items created have property ${key}`)
var keys = Object.keys(createdItem) // Object refers to the object class
keys.forEach(key => {
  assert.strictEqual(createdItem.hasOwnProperty(key), true, `key: ${key} is not found`)
})

console.log('checking if a new todo with only name property can be created, with default description and completed')
todos.create(paramsJustName)
var noNameItem = todoListNow[2]
assert.strictEqual(noNameItem.description, 'N/A', 'default description value is not set')
assert.strictEqual(noNameItem.completed, false, 'default completed value is not set')

console.log('checking if the todo items created have a name')
assert.strictEqual(todos.create(paramsNoName), false, 'cannot create without a name being provided')

console.log('checking if the todo items created have names longer than 5 characters')
assert.strictEqual(todos.create(paramsShortName), false, 'Name is too long')
success()

// SHOW
console.log('checking if the show method returns the object with a correct id')
var id = params._id
// test
assert.strictEqual(todos.show(id), params, 'return is not an object')
// assert.strictEqual(todos.show(secondItem._id), secondItem, 'should return object')

console.log('checking if the show method returns null if no TODO with that id exists')
// test
assert.strictEqual(todos.show('2020'), null, 'should return null if no todo with that id exists')
success()

// UPDATE
var updatedParam = {
  name: 'huishi',
  description: 'from yishun',
  completed: false
}

todos.update(id, updatedParam)
var newParam = todoListNow[0]
// test
assert.strictEqual(newParam.name === updatedParam.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed, true, 'update should change the original object to the supplied object')

console.log('checking if the update method can update individual fields')
// prep
var updatedParam2 = {name: 'will wet'}
todos.update(id, updatedParam2)
newParam = todoListNow[0]
// test
assert.strictEqual(newParam.name === updatedParam2.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed && newParam._id === id, true, 'update should only update the updated fields')

console.log('checking if the update method allows a name change with less than five characters long')
// prep
var updatedParam3 = {name: 'wet'}
todos.update(id, updatedParam3)
newParam = todoListNow[0]
// console.log(updatedParam3)
// test
assert.strictEqual(newParam.name === updatedParam3.name, false, 'update should not allow a name change to less than five characters long')

console.log('checking if the update method returns false when unsuccessful')
// test
assert.strictEqual(todos.update(id, updatedParam3), false, 'update should return false if unsuccessful')

console.log('checking if the update method returns true upon successful call')
// prep
var updatedParam4 = {name: 'hui de'}
// test
assert.strictEqual(todos.update(id, updatedParam4), true, 'update should return true if successful')

success()

// DESTROY
console.log('checking if the destroy method is able to delete TODO with the given id and return true')
// test
// console.log(todoListNow)
assert.strictEqual(todos.destroy(updatedParam4._id), true, 'unable to delete specified TODO')
// console.log(todoListNow)

console.log('checking if the destroyall method is able to delete all TODOs and return true')
todos.destroyAll()
// test
// console.log(todoListNow)
assert.strictEqual(todoListNow.length, 0, 'did not delete all TODO')
// console.log(todoListNow)
success()
