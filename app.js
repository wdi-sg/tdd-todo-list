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

/* Routes begin here
++++++++++++++++++++++++++++++ */
app.get('/',function(req,res){
  Todos.find({}, function(err,todos){
    if (err) throw console.error(err);
    // console.log(todos)
    res.render('homepage', {allTodos: todos})
  })
})

// getting a todo by id
app.get('/:id',function(req,res){
  console.log('redirecting to ' +req.params.id)
  Todos.find({ _id: req.params.id},function(err,todos){
    if (err) throw console.error(err);
    // console.log(todos)
    res.render('todo', {allTodos: todos})
  })
})

app.get('/id',function(req,res){
  console.log('redirecting to ' +req.body.id)
  Todos.find({ _id: req.body.id},function(err,todos){
    if (err) throw console.error(err);
    // console.log(todos)
    res.render('todo', {allTodos: todos})
  })
})

//updating
app.post('/update',function(req,res){
  //read the output
  console.log(req.body)
  Todos.update({_id: req.body.id}, {$set:{name: req.body.name, description: req.body.description, completed: req.body.completed}},function(err){
    if (err) throw console.error(err);
    console.log('updated '+req.body.id+' todo')
  })
  res.redirect('back')
})

app.post('/delete',function(req,res){
  //read the output
  console.log(req.body)
  Todos.remove({_id: req.body.id}, function(err){
    if (err) throw console.error(err);
    console.log('Deleted '+req.body.id)
  })
  res.redirect('/')
})

// adding a new todo
app.post('/create',function(req,res){
  //read the output
  console.log(req.body)
  var todo = new Todos({
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  })
  todo.save(function(err){
    if (err) throw console.error(err);
    console.log('saved new todo')
  })
  res.redirect('/') // super useful for going back to the page
})

app.listen(port, function(){
  console.log('express is running on port '+ port)
})
