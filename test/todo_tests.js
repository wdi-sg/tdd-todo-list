const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

var testParams = {
  name: 'abcde'
}

var testParams2 = {
  name: 'abcd'
}

var testParams3 = {
  name: 'hello world'
}
todos.create(testParams3)
todos.create(testParams)
todos.list()
var lastTodos = todos.list()[todos.list().length-1]
var lastId = lastTodos._id
// // Use Assert to Test the functionality of all your CRUD methods e.g.
// console.log(lastTodos);
assert.strictEqual(lastTodos.completed,false,'completed not a boolean')
assert.strictEqual(lastTodos.description,'default','completed not a boolean')
assert.strictEqual(todos.create(testParams2),false,'name is less than 5 charecter')
assert.strictEqual(todos.list().length, 2, 'List should return an array of all todos')
//testign the todos show(id) method

assert.strictEqual(todos.show(lastId),lastTodos,'show function not working')
assert.strictEqual(todos.show(1234),null,'show function does not return null')

// tseting update


todos.update(lastId, {
  name: 'bye world',
  _id: lastId
})
assert.strictEqual(lastTodos.name,'bye world', 'Update function did not change name')

assert.strictEqual(todos.update(lastId, {
  name: '',
  _id: lastId
}),false, 'Update function did allowed name to be less than 5 charecters')

assert.strictEqual(todos.update(lastId, {
  name: 'code god',
  _id: lastId
}),true, 'Update function did return true when successful')


//testing destroy function
todos.destroy(lastId)

assert.strictEqual(todos.show(lastId), null, 'destroy function did not delete the Todo with the given id')

todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'destroyAll function did not delete all objects in Todo')
assert.strictEqual(todos.destroyAll(), true, 'destroyAll function did not delete all objects in Todo')
