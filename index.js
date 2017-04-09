const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
var app = express()
var port = 3017
var mongoose = require('mongoose')

app.use(bodyParser.json())

// require the models
var Todo = require('./models/mongoose_todo')
mongoose.Promise = global.Promise

router.get('/', function(req, res) {
  Todo.find({}, function (err, todos) {
    if (err) console.error(err)
    res.send(todos)
  })
})

function create(params, callback) {
  if (params.name === '' || params.name.length < 5) {
    return false
    mongoose.disconnect()
  } else {
    var newTodo = {
      name: params.name,
      description: params.description || params.name,
      completed: params.completed || false
    }
    Todo.create(newTodo, function (err, newToDo) {
      if(err) console.error(err)
      callback(newTodo)
    })
    return true
    mongoose.disconnect()
  }
}

router.post('/', function(req, res) {
  var todoData = req.body
  console.log(todoData);
  create(todoData, function(newTodo){
    res.send(newTodo)
  })
})

router.get('/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) console.error(err)
    res.send(todo)
  })
})

function update(id, updatedParams, callback) {
    console.log(updatedParams);
    Todo.findOneAndUpdate({ _id: id },
        {   "name": updatedParams.name,
            "description": updatedParams.description,
            "completed": updatedParams.completed
        }, function(err, data) {
        if (err) return console.err(err)
        callback(data)
      })
}

router.put('/:id', function(req, res) {
  update(req.params.id, req.body, function(updatedTodo) {
    res.send(updatedTodo)
  })
})

router.delete('/:id', function(req, res) {
  Todo.remove({ _id: req.params.id }, function(err, data) {
    if (err) return console.err(err)
    res.send({"message":"deleted"})
  })
})

app.use('/todos', router)
app.listen(port, function () {
  console.log('express is running on port ' + port)
})
