const assert = require('assert')
const todos = require('../controllers/todos_controller.js')

// // Use Assert to Test the functionality of all your CRUD methods e.g.


// testing the todos.create(params) method
console.log('Testing --CREATE--create--')
console.log('Creating Bobby...')
todos.create(new todos.Params('Bobby', 'Person'))
console.log('Creating Tommy...')
todos.create(new todos.Params('Tommy'))
assert.strictEqual(typeof todos.list()[0].name, 'string', 'A proper name must be entered')
console.log('Checking name length...')
assert.strictEqual(todos.list()[0].name.length > 4, true, 'Name must have at least 5 characters')
console.log('Checking desciption is a string...')
assert.strictEqual(typeof todos.list()[0].description, 'string', 'Description must be a string')
console.log('Making sure todo is not completed...')
assert.strictEqual(todos.list()[0].completed, false, 'Todo should not be completed when created')
console.log('Checking for uuid...')
assert.strictEqual(!todos.list()[0]._id, false, 'There must be a uuid')
console.log('Success!\n')

// testing the todos.list() method
console.log('Testing --READ--list--')
console.log('Made the list, now checking it twice...')
assert.strictEqual(todos.list().length, 2, 'List should return an array of all todos')
console.log('Success!\n')

// testing the todos.show() method
console.log('Testing --READ--show--')
console.log('Creating Meredith...')
todos.create(new todos.Params('Meredith', 'Donkey'))
console.log('Creating Vanessa...')
todos.create(new todos.Params('Vanessa', 'Owl'))
var tempID = todos.list()[0]._id
console.log('Bobby\'s id is ' + tempID)
console.log('Pulling out Bobby\'s todo...')
assert.strictEqual(todos.show(tempID), todos.list()[0], 'Show should return only one unique todo')
console.log('Testing a made up id...')
console.log(todos.show('345-FTE'))
assert.strictEqual(todos.show('345-FTE'), null, 'Searching for made up ids should fail')
console.log('Success!\n')

// testing the todos.update() method
console.log('Testing --UPDATE--update--')
console.log('Creating Alonso...')
todos.create(new todos.Params('Alonso', 'Wyvern'))
console.log('Creating Feilra...')
todos.create(new todos.Params('Feilra', 'Phoenix'))
console.log('Testing changing all parameters of Meredith...')
var tempID2 = todos.list()[2]._id
assert.strictEqual(todos.update(tempID2, new todos.Params('Meredith', 'Donkey', false)), false, 'No update should return false')
assert.strictEqual(todos.update(tempID2, new todos.Params('Madison', 'Chicken', true)), true, 'Update should return true')
assert.strictEqual(todos.list()[2].name, 'Madison', 'Name should be Madison')
assert.strictEqual(todos.list()[2].description, 'Chicken', 'Description should be Chicken')
assert.strictEqual(todos.list()[2].completed, true, 'Completed should be true')
console.log('Testing changing just the name of Madison(previously Meredith)...')
todos.update(tempID2, new todos.Params('Mowgli'))
assert.strictEqual(todos.list()[2].name, 'Mowgli', 'Name should be Mowgli')
console.log('Success!\n')

// testing the todos.destroy() methods
console.log('Testing --DESTROY--destroy--')
console.log('Creating Rumpelt...')
todos.create(new todos.Params('Rumpelt', 'Mouse'))
console.log('Changed my mind, destroying Rumpelt...')
var tempID3 = todos.list()[6]._id
assert.strictEqual(todos.destroy(tempID3), true, 'True if destroyed')
assert.strictEqual(todos.destroy(tempID3), false, 'Rumpelt cannot live!')
console.log('Rumpelt has angered me. No one can live...')
todos.destroyAll()
assert.strictEqual(todos.list().length, 0, 'Todos should be empty')
console.log(todos.list())
console.log('Haha! All destroyed!')
console.log('Success!\n')
