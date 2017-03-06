var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ordersSchema = new Schema({
  "created_at" : Number,
  "type": String,
  "cost_for_min" : Number,
  "high" : Number,
  "cost_for_all" : Number,
  "speed_utilized": Number,
  "orders" : []
});

var orders = mongoose.model('orders', ordersSchema);

module.exports = orders;