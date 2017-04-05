const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// Testing parameters with everything fielded out
var testParams = {
  name: 'testtodo',
  description: 'test',
  completed: false
}

// Testing parameters without name
var testParams2 = {
  description: 'my description',
  completed: false
}

// Testing parameters with just a name
var testParams3 = {
  name: 'testtodo'
}

// Testing parameters with a name less than 4 words
var testParams4 = {
  name: 'sup',
  description: 'my description',
  completed: false
}

// // Use Assert to Test the functionality of all your CRUD methods e.g.
// Test for Read list to return an array of all todos
console.log('------------TESTING READ List FUNCTION------------')
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')
console.log('--------------TEST PASSED--------------')

// Test for create functions
console.log('------------TESTING CREATE FUNCTIONS------------')
console.log('ALL PARAMETERS FILLED TEST')
todos.create(testParams)
assert.strictEqual(todos.list().length, 1, 'At least one object should be returned')
assert.strictEqual(todos.list()[0].description, 'test', 'Description is supposed to be the same')
assert.strictEqual(todos.list()[0].completed, false, 'False should have been reflected')
console.log('ALL PARAMETERS FILLED TEST PASSED')
console.log('ID PARAMETERS TEST')
assert.strictEqual(typeof (todos.list()[0]._id), 'string', 'An user ID should have been created')
console.log('ID PARAMETERS TEST PASSED')
console.log('JUST NAME PARAMETER TEST')
todos.create(testParams3)
assert.strictEqual(todos.list()[1].description, 'default', 'If no description inputted, default will be chosen')
assert.strictEqual(todos.list()[1].completed, false, 'If not boolean inputted, false will be chosen')
console.log('JUST NAME PARAMETER TEST PASSED')
console.log('WITHOUT NAME TEST')
todos.create(testParams2)
assert.strictEqual(todos.list().length, 2, 'No name was give for new object')
console.log('WITHOUT NAME TEST PASSED')
console.log('NAME WITH LESS THANT 5 LETTERS TEST')
todos.create(testParams4)
assert.strictEqual(todos.list().length, 2, 'Name with less than 3 letters not allowed')
console.log('NAME WITH LESS THANT 5 LETTERS TEST PASSED')
console.log('--------------TEST PASSED--------------')

// // Test for Read show(id) functions
console.log('------------TESTING READ show(id) FUNCTION------------')
console.log('TEST FOR ID RETURN ')
assert.strictEqual(todos.show(todos.list()[0]._id), todos.list()[0], 'Return matching object of ID')
console.log('TEST FOR ID RETURN PASSED')
console.log('TEST FOR NO SUCH ID')
assert.strictEqual(todos.show('noSuchID'), null, 'show should return null')
console.log('TEST FOR NO SUCH ID PASSED')
console.log('--------------TEST PASSED--------------')

// // Test for Update functions
console.log('------------TESTING UPDATE FUNCTION------------')

var updatedPara = {
  name: 'newtest',
  description: 'newdescription',
  completed: true
}

assert.strictEqual(todos.update(todos.list()[0]._id, updatedPara), true, 'update should return true')
todos.update(todos.list()[0]._id, updatedPara)
assert.strictEqual(todos.list()[0].name, 'newtest', 'name not updated')
assert.strictEqual(todos.list()[0].description, 'newdescription', 'description not updated')
assert.strictEqual(todos.list()[0].completed, true, 'boolean not updated')
console.log('--------------TEST PASSED--------------')

// // Test for Destroy functions
console.log('------------TESTING DESTROY FUNCTION------------')
assert.strictEqual(todos.destroy(todos.list()[0]._id), false, 'should return true if destroyed')
assert.strictEqual(todos.destroy(todos.list()[0]._id), false, 'should not return true if object is not destroyed')
assert.strictEqual(todos.destroyAll(), true, 'true should be returned after all is object is destroyed')
console.log('--------------TEST PASSED--------------')
