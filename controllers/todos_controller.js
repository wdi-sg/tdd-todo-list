const uuidGenerator = require('uuid/v4')
const fs = require('fs')

const todos = []
//// the following line will instead load the todos from a json file when the app starts
// const todos = require('../data.json')

//// The following function can be used to save the todos array to the json data file
// function save () {
//   const json = JSON.stringify(todos)
//   fs.writeFileSync('data.json', json, 'utf8')
// }

// CREATE - params should be an object with keys for name, description and completed
function create(params) {
    var newTodo = {}
    //NAME FIELD
    if (params.name == undefined || params.name.length < 5) {
        console.log("You need to input a proper name!");
        return false
    } else {
        newTodo.name = params.name
    }

    //DESC FIELD
    if (params.description === undefined) {
        newTodo.description = "desc unspecified"
    } else {
        newTodo.description = params.description
    }

    //COMPLETED FIELD
    if (params.completed === undefined)
        newTodo.completed = false
    else {
        newTodo.completed = params.completed
    }

    newTodo._id = uuidGenerator()
    todos.push(newTodo)
    console.log(newTodo._id + "was created")
    return true
}

// READ (list & show)
function list() {
    // return list of all TODOs
    return todos
}

function show(id) {
    // find the TODO with this id
    // if (id === todo.list()) {
    //
    // }
    // return null
}

// UPDATE - params should be an object with KVPs for the fields to update
function update(id, params) {}

// DESTROY (destroy & destroyAll)
function destroy(id) {}

module.exports = {
    create,
    list,
    show,
    update,
    destroy
}
