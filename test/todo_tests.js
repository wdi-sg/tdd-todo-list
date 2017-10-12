const assert = require('assert')
const success = require('./helpers/success')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
console.log('testing list method')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

success()

var params = {
  name: 'get a milk',
  description: 'from cold storage',
  completed: false
}
todos.create(params)
var todoListNow = todos.list()
assert.strictEqual(todos.list().length, 1, 'should be added to the new todos')

console.log('check if the todo items created have property _id')
// assert.strictEqual()

var createdItem = todoListNow[0]
// assert.notStrictEqual(createdItem._id,undefined)
assert.strictEqual(createdItem.hasOwnProperty('_id'), true, '_id is not found')

var params2 = {
  name: 'get a milk',
  description: 'from cold storage2',
  completed: false
}
console.log('check if a new todo item have different id')
todos.create(params2)
var secondItem = todoListNow[1]
assert.strictEqual(createdItem._id === secondItem._id, false)

var params3 = {
  name: 'go shopping'
}
todos.create(params3)
var thirdItem = todoListNow[2]
console.log('checking todolist item with property description')
assert.strictEqual(thirdItem.hasOwnProperty('description'), true, 'please define descriptionn')
console.log('checking the default property of description')
assert.strictEqual(thirdItem.description, 'N/A', 'please use sensible defaults for other properties')

thirdItem.completed = true
console.log('checking the ability to change default parameters');
assert.strictEqual(thirdItem.completed, true, "unable to change default properties")
success()

var param4 = {

}
console.log('checking the ability to create item without name property');
// assert.strictEqual(todos.create(param4), true,"please prodvide a name to your todo list")

var param5 = {
  name : "that"
}
todos.create(param5)
console.log('checking the ability to create an item with name less than 5 characters');
assert.strictEqual(todos.list().length===4 , false,"please create a name with more than 5 characters")
success()

console.log('testing returning an array of all todos');
assert.strictEqual(todos.list().length, 3, 'list function is not functional')
success()

console.log('testing show(id) function')
assert.strictEqual(todos.show(thirdItem._id), thirdItem)
console.log('testing null if no TODO with that id exists ');
assert.strictEqual(todos.show('123'), null,'please check your id')
success()

console.log('checking updating test')
assert.strictEqual(todos.update(thirdItem._id, {name: 'help friend buy tissue', description: "thank you", completed: true}),true,'check your update function')
console.log('checking does not allow a name with less than 5 character')
assert.strictEqual(todos.update(thirdItem._id, {name: 'help', description: "thank you", completed: true}),false, 'checking less then 4 ')
console.log('checking does not allow blank name')
assert.strictEqual(todos.update(thirdItem._id, {name: '', description: "thank you", completed: true}),false)
success()

console.log('checking the delete of the Todo with the given id')
assert.strictEqual(todos.destroy(thirdItem._id), true,'item not removed')
console.log('checking the delete of invalid id')
assert.strictEqual(todos.destroy('123'), false, 'item removed invalid item')

console.log('checking the delete of all items')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'unable to remove all items')
