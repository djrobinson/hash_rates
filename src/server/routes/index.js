var express = require('express');
var router = express.Router();

var Order = require('../schemas/orders_schema');

router.get('/test', function(req, res) {
  res.json({
    "test": 0
  });
});

router.post('/orders', function(req, res) {
  console.log("reqqqq", req.body);
  var order = new Order();
  order.created_at = Date.now();
  order.type = req.body.type;
  order.high = req.body.high;
  order.speed_utilized = req.body.speed_utilized;
  order.cost_for_min = req.body.cost_for_min;
  order.cost_for_all = req.body.cost_for_all;
  order.orders = req.body.orders;
  order.save(function(err, data) {
    if (err) {
      throw err;
    } else {
      console.log("Save worked", data);
      res.json(data);
    }
  });
});

router.get('/orders', function(req, res) {
  Order.find({}, function(err, data) {
    res.json(data);
  })
})

module.exports = router;
