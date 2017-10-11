const assert = require("assert")
const todos = require("../controllers/todos_controller.js")
const success = require("./helpers/success")

// // Use Assert to Test the functionality of all your CRUD methods e.g.
console.log("Testing list method")
assert.strictEqual(
  todos.list().length,
  0,
  "List should return an array of all todos"
)
success()

console.log("Testing Create")

let params = {
  name: "breads",
  description: "funky breads",
  completed: false
}

let params2 = {
  name: "milky?",
  description: "get cow milk",
  completed: false
}

todos.create(params)
let todoListNow = todos.list()
assert.strictEqual(
  todoListNow.length,
  1,
  "list should be updated with new todo"
)
assert.strictEqual(todoListNow[0].name, params.name, "name is not set")
assert.strictEqual(
  todoListNow[0].description,
  params.description,
  "description is not set"
)
assert.strictEqual(
  todoListNow[0].completed,
  params.completed,
  "completed is not set"
)
success()

console.log("check if todos items created have property _id")
assert.strictEqual(
  todoListNow[0].hasOwnProperty("_id"),
  true,
  "_id is not found"
)
success()

console.log("checking if a new todo item has different ids")
todos.create(params2)
assert.strictEqual(
  todoListNow[0]._id === todoListNow[1]._id,
  false,
  "_id is not unique"
)
success()

console.log("checking default values for description and completed")
let paramNameOnly = { name: "apples" }
todos.create(paramNameOnly)
assert.strictEqual(todoListNow[2].name, paramNameOnly.name, "name only not ok")
assert.strictEqual(
  todoListNow[2].description,
  "NA",
  "default description not working"
)
assert.strictEqual(
  todoListNow[2].completed,
  false,
  "default completed not working"
)
success()

console.log("checking if no name is possible")
let paramNoName = {}
todos.create(paramNoName)
assert.strictEqual(todos.create(paramNoName), false, "no name is possible")
success()

console.log("checking if name needs to be above 5 characters")
let paramSmallName = { name: "123" }
todos.create(paramSmallName)
assert.strictEqual(
  todos.create(paramSmallName),
  false,
  "small name is possible"
)
success()

console.log("checking if can receive the todo object with specified id")
let idCheck = todoListNow[2]._id
assert.strictEqual(
  todos.show(idCheck),
  todoListNow[2],
  "get object from id not working"
)
success()

console.log("checking if return null if id doesn't exist")
let idCheck2 = 23124
assert.strictEqual(todos.show(idCheck2), null, "wrong id is being processed")
success()

console.log("checking update function")
//using idCheck for todoListNow[2]
let updadeParams = {
  name: "new milk",
  description: "beef milk, not cow",
  completed: true
}

assert.strictEqual(
  todos.update(idCheck, updadeParams),
  true,
  "update not working"
)
assert.strictEqual(todoListNow[2].name, "new milk", "update not updating name")
assert.strictEqual(
  todoListNow[2].description,
  "beef milk, not cow",
  "update not updating description"
)

assert.strictEqual(
  todoListNow[2].completed,
  true,
  "update not updating completed"
)
success()

let updateNameBelow5 = {
  name: "123"
}

console.log("testing if update name rejects names below 5 letters")
assert.strictEqual(
  todos.update(idCheck, updateNameBelow5),
  false,
  "update is accepting name below 5"
)
success()

console.log("testing destroy")
todos.destroy(idCheck)
assert.strictEqual(todoListNow[2], undefined, "destroy is not working")
success()

console.log("test if destroy returns true")
let idCheck3 = todoListNow[1]._id
assert.strictEqual(
  todos.destroy(idCheck3),
  true,
  "destroy is not returning true"
)
success()

console.log("test if destroy returns false")
assert.strictEqual(
  todos.destroy("random string. new phone, who this?"),
  false,
  "destroy is not returning false"
)
success()

console.log("test destroy all")
assert.strictEqual(todos.destroyAll(), true, "destroyAll not returning true")
assert.strictEqual(
  todoListNow.length,
  0,
  "destoryAll does not remove all items"
)

success()
