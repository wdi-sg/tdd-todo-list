var mongoose = require('mongoose')

var tdlSchema = new mongoose.Schema({
// writing the map/schema
  name: String,
  description: String,
  completed: Boolean,
  _id: String
})

var Tdl = mongoose.model('Todos_controller', tdlSchema)

module.exports = Tdl
