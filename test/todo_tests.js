const assert = require('assert')
const todos = require('../controllers/todos_controller.js')
const uuidGenerator = require('uuid/v4')
// todos.list()[todos.list().length-1] - calls the last item
// // Use Assert to Test the functionality of all your CRUD methods e.g.

// what should list function do?
// 1. should return the array of all todos
// assert.strictEqual(todos.list().length, 0, 'List should return an array of all todos')


// what should create function do?
// 1. Create a new todo and push into todos

// todos.create({name:'Cara Chew', description:'GA Student', completed: false})
//
// console.log(todos.list()) // array of object
// console.log(todos.list().length) // 1
// console.log(todos.list()[0].name) // Cara Chew
//
//
// assert.strictEqual(todos.list().length, 1, 'To do is not created.')

// 2. the todo that is created should have a name, description, completed and id

// todos.create({name:'Cara Chew', description:'GA Student', completed: false})
//
// console.log(todos.list()) // array of object
// console.log(todos.list().length) // 1
// console.log(todos.list()[0].name) // Cara Chew
// var myTodo = todos.list()[0] // object
//
// assert.notEqual(myTodo.name, undefined, 'Name field does not exist')
// assert.notEqual(myTodo.description, undefined, 'Description field does not exist')
// assert.notEqual(myTodo.completed, undefined, 'Completed field does not exist')
// assert.notEqual(myTodo._id, undefined, 'ID field does not exist')

// 3. the todo that is created should have the same parameters that i specified

// todos.create({name:'Cara Chew', description:'GA Student', completed: false})
//
// console.log(todos.list()) // array of object
// console.log(todos.list().length) // 1
// console.log(todos.list()[0].name) // Cara Chew
// var myTodo = todos.list()[0]
//
// assert.strictEqual(myTodo.name, "Cara Chew", 'Name is not correct.')
// assert.strictEqual(myTodo.description, "GA Student", 'Description is not correct.')
// assert.strictEqual(myTodo.completed, false, 'Completed is not correct.')

// 4. the todo should not be created if the name is less than 5 characters

// todos.create({name:'Cara', description:'GA Student', completed: false})
//
// console.log(todos.list()) // array of object
// console.log(todos.list().length) // 1
//
// assert.strictEqual(todos.list().length, 0, 'To do should not be added because of name length.')

// 5. the todo should not be created if there is no name

// todos.create({name:'',description:'GA Student', completed: false})
//
// console.log(todos.list()) // array of object
// console.log(todos.list().length) // 1
//
// assert.strictEqual(todos.list().length, 0, 'To do is added to list when there is no name.')

// 6. the todo can be created if only name is provided

// todos.create({name:'Cara Chew', description:'', completed: ''})
//
//
// assert.strictEqual(todos.list().length, 1, 'Did not add todo when name is provided.')

// 7. the todo should have the correct defaults for description and completed fields if they are not provided.

// todos.create({name:'Cara Chew', description:'', completed:''})
// var myTodo = todos.list()[0]
//
// assert.strictEqual(myTodo.description, 'default description', 'Description did not return a default message')
// assert.strictEqual(myTodo.completed, false, 'Completed did not return a default message')

//TEST UPDATE

// 1. Should return Todo object with the specified id

todos.create({name:'Cara Chew', description:'GA Student', completed: false})

todos.create({name:'Pamie', description:'Other', completed: true})

console.log(todos.list())
// console.log(todos.)
// console.log(todos.list()) // array of object
// console.log(todos.list()[0]._id) // Cara Chew

assert.strictEqual(todos.show(1) , 1, 'Not the correct Object')

// 2. should return null if no Todo with that id exists
