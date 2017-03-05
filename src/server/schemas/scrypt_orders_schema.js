var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scryptOrdersSchema = new Schema({
  "created_at" : Number,
  "type": String,
  "high" : Number,
  "low" : Number,
  "cost_for_all" : Number,
  "low" : Number,
  "orders" : []
});

var scryptOrders = mongoose.model('scryptOrders', scryptOrdersSchema);

module.exports = scryptOrders;