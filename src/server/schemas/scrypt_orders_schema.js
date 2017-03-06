var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scryptOrdersSchema = new Schema({
  "created_at" : Number,
  "type": String,
  "cost_for_min" : Number,
  "high" : Number,
  "cost_for_all" : Number,
  "speed_utilized": Number,
  "orders" : []
});

var scryptOrders = mongoose.model('scryptOrders', scryptOrdersSchema);

module.exports = scryptOrders;