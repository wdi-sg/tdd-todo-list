var express = require('express')
var app = express()
var router = express.Router()

var Todo = require('../models/todoschema')

app.use('/', router)

// START THE ROUTING

router.get('/', function(req,res) {
  res.render('index')
})

router.get('/new', function(req,res) {
  res.render('todos/new')
})

router.get('/index', function(req,res) {
  // console.log(req)
  // console.log(res)
  Todo.find({}, function (err, list) {
    if (err) throw (err)

    res.render('todos/index', {obj:list})
  })
})


router.post('/new/:id', function (req, res) {
  var reqBody = req.body

  if (reqBody.name.length < 5) {
    console.log('Name has no entry or less than 5 characters')
    return false
  }
  else {
    if (reqBody.description === '') {
      reqBody.description = 'Nil'
    }

    if (reqBody.completed === '') {
      reqBody.completed = false
    }

    Todo.create({name: reqBody.name, description: reqBody.description, completed: reqBody.completed, id: reqBody.id}, function (err, doc) {
      if (err) throw (err)
      console.log('Entry is updated')

      res.redirect('/new/:id')
    })
  }
})

// router.get('/showOne/:id', function(req,res) {
//
//   console.log({obj:list}.obj)
//   console.log(req.params.id)
//
//   Todo.findById(req.params.id, function (err, list) {
//     if (err) throw (err)
//
//     var objectArray = {obj:list}.obj
//
//     objectArray.filter (function (each) {
//     return each.id === req.params.id
//
//     res.render('homepage', {obj:list})
//
//   })
// })



router.delete('/:id', function (req, res) {

  Todo.findByIdAndRemove(req.params.id, function (err, found) {
    if (err) throw (err)
    res.redirect('/')
  })
})

router.post('/update/:id', function (req, res, next) {

  var reqBody = req.body
  if(reqBody.name.length > 5 && reqBody.name.length != '') {
    if (reqBody.description === '') {
      reqBody.description = 'Nil'
    }

    if (reqBody.completed === '') {
      reqBody.completed = false
    }

    Todo.update({ _id: req.params.id }, { $set:  {
      name: reqBody.name,
      description: reqBody.description,
      completed: reqBody.completed
    }}, function (err, result) {
      console.log('Entry updated')
      res.redirect('/')
    })
  }
  else {
  console.log('Update not successful')
  }
})

router.delete('/', function (req, res) {

  Todo.remove(function(err) {
    if (err) console.error ('Sorry this list does not exist.')

   console.log('All Todos have been deleted from the list.')

    res.redirect('/')
  })
})


// END THE ROUTING


module.exports = router
