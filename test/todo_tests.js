const assert = require('assert')
const todosController = require('../controllers/todos_controller.js')

//testing the todo.create(params) methods
var testParams1 = {
  name: 'buy fish',
  description: 'my description',
  completed: false
}

var testParams2 = {
  name: '',
  description: 'my description',
  completed: false
}

var testParams3 = {
  name: 'Daniel'
}

var testParams4 = {
  name: 'Da'
}

// # Testing create(params)  # //
todosController.create(testParams1)
assert.strictEqual(todosController.list().length, 1, 'one param should have been created')
console.log('testParams1 passed!!!!!!');

todosController.create(testParams2)
assert.strictEqual(todosController.list().length, 1, 'params should not have been created')
console.log('testParams2 passed!!!!!!');

todosController.create(testParams3)
assert.strictEqual(todosController.list().length, 2, 'one more params should have been created')
console.log('testParams3 passed!!!!!!');

todosController.create(testParams4)
assert.strictEqual(todosController.list().length, 2, 'params should not have been created')
console.log('testParams4 passed!!!!!!');


assert.strictEqual(todosController.list().length, 2, 'params should not have been created')



// # Testing show(id)  # //
var showVar = todosController.show(todosController.list()[0]._id)
assert.strictEqual(todosController.show(todosController.list()[0]._id), showVar, 'this should return buy fish' )
console.log('passed show 1');

var showVar = todosController.show(todosController.list()[1]._id)
assert.strictEqual(todosController.show(todosController.list()[1]._id), showVar, 'this should return null' )
console.log('passed show 2');

// # Update(id, updatedParam) #//
var updatedParam = {
  name: 'buying',
  description: 'large brown',
  completed: false
}

todosController.create(updatedParam)
var updateResult = todosController.update(todosController.show(todosController.list()[1]._id), todosController.list()[3])
assert.strictEqual(todosController.update(todosController.show(todosController.list()[1]._id), todosController.list()[2]), updateResult, 'it should have updated')
console.log('passed update');


//# Destroy(id) #//
var destroyVar = todosController.destroy(todosController.show(todosController.list()[1]._id))
assert.strictEqual(todosController.destroy(todosController.show(todosController.list()[1]._id)), destroyVar, 'it should have been deleted')
console.log('passed destroy');

var destroyAllVar = todosController.destroyAll
assert.strictEqual(todosController.destroyAll, destroyAllVar, 'all should have been deleted')
