var express = require('express')

var router = express.Router()


var Todo = require('../models/todoschema')


// START THE ROUTING

router.get('/', function(req,res) {
  // console.log(req)
  // console.log(res)
  Todo.find({}, function (err, list) {
    if (err) throw (err)
    res.render('homepage', {obj:list})
  })
})

router.post('/', function (req, res) {
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
      if(err) throw (err)
      console.log('Entry is updated')

      res.redirect('/')
    })
  }
})


router.delete('/:id', function (req, res) {

  Todo.findByIdAndRemove(req.params.id, function (err, found) {
    if (err) throw (err)
    res.redirect('/')
  })
})

router.post('/update', function (req, res, next) {

  var reqBody = req.body
  // if(reqBody.name.length > 5 && reqBody.name.length != '') {

    Todo.update({ _id: req.params.id }, { $set:  {
      name: reqBody.name,
      description: reqBody.description,
      completed: reqBody.completed
    }}, function (err, result) {
      console.log('Entry updated')
      res.redirect('/')
    })


  // }
  // else {
  // console.log('Update not successful')
  // }

})

// END THE ROUTING


module.exports = router
