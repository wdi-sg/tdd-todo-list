const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

var testParams1 = {
  name: 'testParams1',
  description: 'my description',
  completed: false
}
// test param with no name
var testParams2 = {
  description: 'my description',
  completed: false
}
// test param with no description & completed
var testParams3 = {
  name: 'testParams3'
}

var testParams4 = {
  name: 'tp4',
  description: 'my description',
  completed: false
}

console.log('+++ Checking if todo.create() allows new Todo without name +++\n')
// New todo created with testParams2 (no name)
todos.create(testParams2)
assert.strictEqual(todos.list().length, 0, 'should not allow new Todo without name to be created')
console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if new Todo is created when name is lesser than 5 characters +++\n')
todos.create(testParams4)
assert.strictEqual(todos.list().length, 0, 'should not allow to create new Todo with name < 5 character')

// assert.strictEqual((todos.list()[0].name.length < 5), true, 'should not allow to create new Todo with name < 5 character')

console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if new Todo is created when only name is provided +++\n')
todos.create(testParams3)
assert.strictEqual(todos.list().length, 1, 'should allow to create new todo with just name')
console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if new Todo created with just name has default value for other properties +++\n')
assert.strictEqual(todos.list()[0].description, 'description here', 'should allow to create new todo with just name, with default description "description here"')
assert.strictEqual(todos.list()[0].completed, false, 'should allow to create new todo with just name, with default completed to be "false"')
console.log('---------- Test Passed ----------')

console.log('+++ Checking if _id property is created +++\n')
assert.strictEqual(!!(todos.list()[0]._id), true, 'show automatically create _id for each new Todo')
console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if list shows array of all todos +++\n')
todos.list().pop()
var first = todos.create(testParams1)
var second = todos.create(testParams1)
var arrToTest = todos.list()
var arrToCheck = [first, second]

assert.deepEqual(arrToTest, arrToCheck, 'should return an array of all todos')

console.log('---------- Test Passed ----------\n')


console.log('+++ Checking if Show(id) returns Todo with id +++\n')

var id = todos.list()[0]._id
var id2 = 'asdasdasdiadjasjdlad'

assert.strictEqual(todos.show(id), todos.list()[0], 'should return Todo Object of specified id')
assert.strictEqual(todos.show(id2), null, 'should return Todo Object of specified id')

console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if Update allows updating KVP given an id +++\n')

var updatedName = {
  name: 'buy grandma a coffin'
}

var updatedDescrip = {
  description: 'must fit two'
}

var updatedCompleted = {
  completed: true
}

var updatedAll = {
  name: 'jump from 3rd floor',
  description: 'head down first',
  completed: true
}

assert.strictEqual(todos.update(id, updatedName), true, 'should be true')
assert.strictEqual(todos.list()[0].name, updatedName.name, 'should update to ' + updatedName.name)

assert.strictEqual(todos.update(id, updatedDescrip), true, 'should be true')
assert.strictEqual(todos.list()[0].description, updatedDescrip.description, 'should update to ' + updatedDescrip.description)

assert.strictEqual(todos.update(id, updatedCompleted), true, 'should be true')
assert.strictEqual(todos.list()[0].completed, updatedCompleted.completed, 'should update to ' + updatedCompleted.completed)

var objToCheck = todos.show(id)
var objToCheck2 = todos.list()[0]

assert.strictEqual(todos.update(id, updatedAll), true, 'should be true')
assert.deepEqual(objToCheck2, objToCheck, 'should update to updatedAll obj')

console.log('---------- Test Passed ----------\n')


console.log('+++ Checking if Destroy(id) works +++\n')

var beforeDestroy = todos.list()
console.log(beforeDestroy)
assert.strictEqual(todos.destroy(id), true, 'should return true if destroy is successful')
assert.strictEqual(todos.list().length, 1, 'should return length = 1 after destroy is successful')

assert.strictEqual(todos.destroy('lkajsdkljaklds323123'), false, 'should return false if destroy is unsuccessful')

console.log('---------- Test Passed ----------\n')

console.log('+++ Checking if DestroyAll works +++\n')

var destroyChecker = todos.destroyall()
assert.strictEqual(todos.list().length, 0, 'todos array length should return 0 after destroyall')
assert.strictEqual(destroyChecker, true, 'should return true after destroyall is successful')

console.log('---------- Test Passed ----------\n')

// // New todo created with testParams 1
// todos.create(testParams1)
// // // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 1, 'todos[] should have 1 newly added todo')
// assert.strictEqual(todos.list().length, 1, 'todos[] should have 1 newly added todo')
