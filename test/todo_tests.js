const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')

var testNormal = {
  name: 'testNormal',
  description: 'to do desc',
  completed: false
}

var testNoName = {
  description: 'to do desc',
  completed: false
}

var testName = {
  name: 'testName',
}

var testShortName = {
  name: 'abc',
  description: 'to do desc',
  completed: false
}

console.log("RUNNING: Test for whether new todo allows creation without name");
assert.strictEqual(todos.create(testNoName), false, "Should return false but it allowed creation of name" )
console.log("Test PASSED");

console.log("RUNNING: Test for whether new todo allows creation with name lesser than 5");
assert.strictEqual(todos.create(testShortName), false, "Should return false but it allowed creation of shortName" )
console.log("Test PASSED");

console.log("RUNNING: Test for whether new todo allows creation with ONLY name"); //How to test if the defaults are created correctly?
assert.strictEqual(todos.create(testName), true, "Should return created todo but there was none" )
console.log("Test PASSED");

console.log("RUNNING: Test for whether new todo has id");
todos.create(testNormal)
assert.strictEqual(!(todos.list()[0]), false, "Should return false but id param was empty" )
console.log("Test PASSED");

console.log("RUNNING: Test for whether list function returns all todos");
var firstTodo = todos.create(testNormal)
var secondTodo = todos.create(testNormal)
var testList = [firstTodo, secondTodo]
var tester = todos.list()
assert.strictEqual(tester, testList, "tester should return testList but it did not")
console.log("Test PASSED");
