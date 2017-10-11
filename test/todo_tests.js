const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const success = require('../helpers/success')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
console.log('testing create method')
var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}
var params2 = {
  name: 'get a milk',
}
var params3 = {
}
var params4 = {
  name: "ab"
}

todos.create(params)

assert.strictEqual(todos.list().length, 1, 'should added new todos')
console.log('check if the todos items created have property _id')
var firstItem = todos.list()[0]
var keys = Object.keys(firstItem)

keys.forEach(key => {
  console.log(`check if the todo items created have property ${key}`)
  assert.strictEqual(firstItem.hasOwnProperty(key), true, `key: ${key} is not found`)
})
// assert.strictEqual(firstItem.name, 'get a milk', "constructor(name) not working")
// assert.strictEqual(firstItem.description, 'from cold storage', "constructor(description) not working")
// assert.strictEqual(firstItem.completed, false, "default setting not working")
// assert.strictEqual(firstItem.hasOwnProperty('_id'), true, 'the id is missing')


todos.create(params2)
var secondItem = todos.list()[1]
console.log(secondItem)

assert.strictEqual(secondItem.name, 'get a milk', "constructor(name) not working")
assert.strictEqual(secondItem.hasOwnProperty('description'), true, 'default description is not set')
assert.strictEqual(secondItem.description, 'N/A', "default description not working")
assert.strictEqual(secondItem.hasOwnProperty('completed'), true, 'default description is not set')
assert.strictEqual(secondItem.completed, false, "default description not working")

console.log('check if the new todo items have different _id')
assert.strictEqual(firstItem._id === secondItem._id, false, 'each _id should be unique')
assert.strictEqual(todos.create(params3), false, 'should not add new to do list if name is not stated')
assert.strictEqual(todos.list().length, 2, 'should not add new to do list if name is not stated')

assert.strictEqual(todos.create(params4), false, 'should not add new to do list if name is less than 5 character')
assert.strictEqual(todos.list().length, 2, 'should not add new to do list if name is less than 5 character')

console.log('read')

assert.strictEqual(todos.list().length, 2, "Should return an array of all todos")
var firstItemId = firstItem._id
assert.strictEqual(todos.show(firstItemId), firstItem, "Should return the Todo Object with the specified id")
var randomId = "12759275"
assert.strictEqual(todos.show(randomId), null, "Should return null if no TODO with that id exists")
var params5 = {
  name: "buy raisin",
  description: "my sweet tooth need it",
  completed: "false",
  _id : firstItem._id
}
console.log('update')
todos.update(firstItemId, params5)
var afterUpdate = todos.show(firstItemId)
assert.strictEqual(afterUpdate.name, params5.name, "Should be able to update the Todo with the given id")
var params6 = {
  name: "buy chocolate"
}
//todos.update(firstItemId, params6)
var params7 = {
  name: "buy chocolate",
  description: "my sweet tooth need it",
  completed: "false"
}
todos.update(firstItemId, params6)
var afterUpdateTwo = todos.show(firstItemId)
assert.strictEqual(afterUpdateTwo.name, params7.name, "Should be able to update the Todo with the (give)n id")
assert.strictEqual(afterUpdateTwo.description, params7.description, "Should be able to update the Todo with the (give)n id")
var params8 = {}
todos.update(firstItemId, params8)
var afterUpdateThree =  todos.show(firstItemId)
assert.strictEqual(afterUpdateThree.name, params7.name, "Should NOT allow a name to be changed to blank or less than 5 characters in length" )
var params9 = {
  name: "ab"
}
todos.update(firstItemId, params9)
var afterUpdateFour =  todos.show(firstItemId)
assert.strictEqual(afterUpdateFour.name, params7.name, "Should NOT allow a name to be changed to blank or less than 5 characters in length" )

assert.strictEqual(todos.update(firstItemId, params9),false, "Should return true if an update is successful, false if otherwise")
assert.strictEqual(todos.update(firstItemId, params7),true, "Should return true if an update is successful, false if otherwise")

console.log('destroy')
todos.destroy(firstItemId)
assert.strictEqual(todos.show(firstItemId),null, "Should be able to delete the Todo with the given id")
assert.strictEqual(todos.destroy(secondItem._id), true, "Should return true if the delete is successful, false if otherwise")
assert.strictEqual(todos.destroy(firstItemId), false, "Should return true if the delete is successful, false if otherwise")

console.log('destroyAll')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, "Should be able to delete all the Todos")
assert.strictEqual(todos.destroyAll(), true, "Should be able to delete all the Todos and return true")

success()
