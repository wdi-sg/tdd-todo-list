const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

//testing the create(params) method
var testParams = {
  name: 'test todo list',
  description: 'my description',
  completed: false
}

todos.create(testParams)

assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')

// console.log(todos.list()[todos.list().length -1]._id)

//create new Todo with just name
//
// var obj = {
//   description: 'default',
//   completed: 'default'
// }
// //how to do default values for objects
// var testParamsName = {
//   name: 'todo with just name'
// }
//
// //Should NOT be able to create a new Todo without a `name` being provided
//
//
// console.log(testParamsName.name)
// todos.create(testParamsName)
//
// //{ name: 'todo with just name',
// //  _id: '165768fd-a063-458e-a6b6-ac9ed5ffc04c' }
//
// assert.strictEqual(testParamsName.name, 1, 'List should not be created if name is undefined')

//assert.strictEqual(todos.list().length, 1, 'List should return name with default values')





//testing the todos.show(id) method

//assert.strictEqual(todos.list().length, 1, 'List should return an array of all todos')
