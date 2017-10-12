const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('./helpers/success')
// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0,
'List should return an array of all todos')

// testing create method
var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: 'false'
}
var params2 = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: 'false'
}
var paramsJustName = {
  name: 'buy a flower'
}
var paramsNoName = {

}
var paramsShortName = {
  name: 'test'
}

todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todos.list().length, 1, 'Should add the todos arr')

// console.log('check if the todo items created have property _id')

var createdItem = todoListNow[0]
var keys = Object.keys(createdItem)

keys.forEach(key => {
  console.log(`check if the todo items have the property ${key}`)
  assert.strictEqual(createdItem.hasOwnProperty(key), true, `key: ${key} is not found`)
})

// console.log(createdItem._id === undefined);
// console.log(createdItem.hasOwnProperty('_id'), true, '_id is not found')
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')

// console.log('check if a new todo items hav different _id')
todos.create(params2)
var secondItem = todoListNow[1]
// console.log(secondItem)
assert.strictEqual(createdItem._id === secondItem._id, false,
'each _id should be unique')

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

// testing show
console.log('testing show method')
// testing if show method returns an object
console.log('testing if show returns an object')
var id = params._id
assert.strictEqual(todoListNow.show('1234'), null, 'show should return object with specified _id')

// testing update
console.log('testing update method')
// testing if able to update with new object
console.log('checking if update changes the object')
// prep
var updatedParam = {
  name: 'chocolate',
  description: 'from marketplace',
  completed: false
}
todos.update(id, updatedParam)
var newParam = todoListNow[0]
// test
assert.strictEqual(newParam.name === updatedParam.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed, true, 'update should change the original object to the supplied object')
// testing if individual fields can be updated
console.log('checking if update can update individual fields')
// prep
var updatedParam2 = { name: 'potato' }
todos.update(id, updatedParam2)
newParam = todoListNow[0]
// test
assert.strictEqual(newParam.name === updatedParam2.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed && newParam._id === id, true, 'update should only update the updated fields')

// testing if update disallows a name change if less than 5 chars long
console.log('checking if update will allow a name change to less than five characters long')
// prep
var updatedParam3 = { name: 'test' }
todos.update(id, updatedParam3)
newParam = todoListNow[0]
// test
assert.strictEqual(newParam.name === updatedParam3.name, false, 'update should not allow a name change to less than  five characters long')

// testing if update returns false upon unsuccessful call
console.log('checking if update returns false when unsuccessful')
// test
assert.strictEqual(todos.update(id, updatedParam3), false, 'update should return false if unsuccessful')
// testing if update returns true upon successful call
console.log('checking if update returns true upon successful call')
// prep
var updatedParam4 = { name: 'tomato' }
// test
assert.strictEqual(todos.update(id, updatedParam4), true, 'update should return true if successful')

// update test completed
success()
