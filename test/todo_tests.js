const assert = require('assert')
const todosController = require('../controllers/todos_controller.js')

// testing the todo.create(params) methods
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
  name: 'Daniel',
  description: 'test'
}

var testParams4 = {
  name: 'Da'
}

// # Testing create(params)  # //
todosController.create(testParams1)
assert.strictEqual(todosController.list().length, 1, 'one param should have been created')

todosController.create(testParams2)
assert.strictEqual(todosController.list().length, 1, 'params should not have been created')

todosController.create(testParams3)
assert.strictEqual(todosController.list().length, 2, 'one more params should have been created')

todosController.create(testParams4)
assert.strictEqual(todosController.list().length, 2, 'params should not have been created')

// # Testing show(id)  # //
var testIdShow = todosController.list()[0]._id
assert.strictEqual(todosController.show(testIdShow)._id, testIdShow, 'should be able to find object with given ID')

// # Update(id, updatedParam) #//
var updatedParam = {
  name: 'send mail',
  description: 'large brown',
  completed: false
}

var lastElemId = todosController.list()[todosController.list().length - 1]._id
var result = todosController.update(lastElemId, updatedParam)

assert.strictEqual(todosController.list()[todosController.list().length - 1].name, updatedParam.name, 'name should be buying')
assert.strictEqual(todosController.list()[todosController.list().length - 1].description, updatedParam.description, 'description should be large brown')
//
assert.strictEqual(todosController.list()[todosController.list().length - 1].completed, updatedParam.completed, 'completed should be false')

assert.strictEqual(result, true, 'item should have been updated')

// # Destroy(id) #//

var lastElemIdDestroy = todosController.list()[todosController.list().length - 1]._id
todosController.destroy(lastElemIdDestroy)

assert.strictEqual(todosController.show(lastElemIdDestroy), null, 'this element should have been destroyed')

// # Destroy All() #//
todosController.destroyAll()
assert.strictEqual(todosController.list().length, 0, 'all should have been deleted')
