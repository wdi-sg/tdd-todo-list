const assert = require('assert');
const todos = require('../controllers/todos_controller.js');
const success = require('./helpers/success');
// // Use Assert to Test the functionality of all your CRUD methods e.g.

// testing list
console.log('testing list method')
// test
assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos');
// list test complete
success();

// testing create
var params = {
  name: 'get milk',
  description: 'from cold storage',
  completed: false
};

var params2 = {
  name: 'get milk',
  description: 'from cold storage',
  completed: false
};

var params3 = {
  name: 'testing'
};

var params4 = {};

var params5 = { name: 'test' };

// checking if todo has been added to array
console.log('testing create method');
// prep
todos.create(params);
var todoListNow = todos.list();
// test
assert.strictEqual(todoListNow.length, 1, 'Should add to the todos array');
// checking if todo items have a _id
console.log('checking if todo items created have a property _id');
// prep
var firstItem = todoListNow[0];
// test
assert.strictEqual(firstItem.hasOwnProperty('_id'), true, '_id is not found');

// checking if todo items have unique _id
console.log('checking if each todo item has a unique id');
// prep
todos.create(params2);
var secondItem = todoListNow[1];
// test
assert.strictEqual(firstItem._id === secondItem._id, false, 'each todo item should have it\'s own unique _id');

// checking if defaults are assigned for other fields
console.log('checking if defaults are assigned for other fields');
// prep
todos.create(params3);
var thirdItem = todoListNow[2];
// tests
assert.strictEqual(thirdItem.hasOwnProperty('description'), true, 'description field should be assigned a default value if not supplied');
assert.strictEqual(thirdItem.hasOwnProperty('completed'), true, 'completed field should be assigned a default value if not supplied');

// checking if item can be added to todos without a name
console.log('checking if item can be added to todos without a name');
// test
assert.strictEqual(todos.create(params4), false, 'item should have a name');

// checking if item can be added to todos if name is less than 5 characters long
console.log('checking if item can be added to todos if name is less than 5 chars long');
// test
assert.strictEqual(todos.create(params5), false, 'item requires a name more than 4 chars long');

// create test completed
success();

// testing show
console.log('testing show method');
// testing if show returns an object
console.log('checking if show returns the correct object');
// prep
var id = params._id;
var showParams = todos.show(id);
// test
assert.strictEqual(showParams, params, 'show should return the correct object');
// testing if show returns null if incorrect id is supplied
console.log('checking if show returns null if incorrect id is supplied');
// test
assert.strictEqual(todos.show('test'), null, 'show should return null if an incorrect id is supplied');
// show test completed
success();

// testing update
console.log('testing update method');
// testing if able to update with new object
console.log('checking if update changes the object');
// prep
var updatedParam = {
  name: 'chocolate',
  description: 'from marketplace',
  completed: false
};
todos.update(id, updatedParam);
var newParam = todoListNow[0];
// test
assert.strictEqual(newParam.name === updatedParam.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed, true, 'update should change the original object to the supplied object');
// testing if individual fields can be updated
console.log('checking if update can update individual fields');
// prep
var updatedParam2 = { name: 'potato' };
todos.update(id, updatedParam2);
newParam = todoListNow[0];
// test
assert.strictEqual(newParam.name === updatedParam2.name && newParam.description === updatedParam.description && newParam.completed === updatedParam.completed && newParam._id === id, true, 'update should only update the updated fields');

// testing if update disallows a name change if less than 5 chars long
console.log('checking if update will allow a name change to less than five characters long');
// prep
var updatedParam3 = { name: 'test' };
todos.update(id, updatedParam3);
newParam = todoListNow[0];
// test
assert.strictEqual(newParam.name === updatedParam3.name, false, 'update should not allow a name change to less than  five characters long');

// testing if update returns false upon unsuccessful call
console.log('checking if update returns false when unsuccessful');
// test
assert.strictEqual(todos.update(id, updatedParam3), false, 'update should return false if unsuccessful');
// testing if update returns true upon successful call
console.log('checking if update returns true upon successful call');
// prep
var updatedParam4 = { name: 'tomato' };
// test
assert.strictEqual(todos.update(id, updatedParam4), true, 'update should return true if successful');

// update test completed
success();
