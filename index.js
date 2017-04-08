var express = require('express')
var app = express()
var port = 5000

var mongoose = require('mongoose')
var todoscontroller = require('./controllers/todoscontroller')

var dburi = 'mongodb://localhost/todo'
mongoose.connect(dburi)
mongoose.Promise = global.Promise

var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.set('view engine', 'ejs')
var ejsLayouts = require('express-ejs-layouts')
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride('_method'))


// START THE ROUTING
app.use('/', todoscontroller)
app.use('/assets', express.static('assets'))

// END THE ROUTING

app.listen(port, function () {
  console.log('express is running on port ' + port)
})
