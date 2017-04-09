// setting up express
var express = require('express')
var app = express()
var port = 5000

// connecting to the database
var mongoose = require('mongoose')
var dbURI = 'mongodb://localhost/tdd'

mongoose.connect(dbURI,function(err){
  if (err) throw console.error(err);
  else console.log('connected to '+dbURI)
})

// Initializing the models
mongoose.Promise = global.Promise
var Todos = require('./models/todos')

// setting up template engine for express
app.set('view engine','ejs')

//setting my layout structure
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)

// handle the post request
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))



app.get('/',function(req,res){
  Todos.find({}, function(err,todos){
    if (err) throw console.error(err);
    console.log(todos)
    res.render('homepage', {allTodos: todos})
  })
})

// getting a todo by id
app.get('/:id',function(req,res){
  console.log(req.params.id)
  Todos.findById(req.params.id,function(err,todos){
    if (err) throw console.error(err);
    console.log(todos)
    res.render('homepage', {allTodos: todos})
  })
})

// adding a new todo
app.post('/',function(req,res){
  //read the output
  console.log(req.body)
  res.send(req.body)
  var todo = new Todos({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  })
  todo.save(function(err){
    if (err) throw console.error(err);
    console.log('saved new todo')
  })
  res.redirect(req.get('referer')) // super useful for going back to the page
})

app.listen(port, function(){
  console.log('express is running on port '+ port)
})
