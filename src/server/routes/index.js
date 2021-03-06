var express = require('express');
var router = express.Router();

var Order = require('../schemas/orders_schema');

router.get('/test', function(req, res) {
  res.json({
    "test": 0
  });
});

router.post('/orders', function(req, res) {
  var order = new Order();
  order.created_at = Date.now();
  order.type = req.body.type;
  order.orders = req.body.orders;
  order.save(function(err, data) {
    if (err) {
      throw err;
    } else {
      res.json(data);
    }
  });
});

router.get('/orders', function(req, res) {
  Order.find({}, function(err, data) {
    res.json(data);
  });
});

router.get('/orders/:type', function(req, res) {
  Order.find({type: req.params.type}, function(err, data) {
    res.json(data);
  });
})

router.get('/orders/:type/:start_date/:end_date', function(req, res) {
  Order.find({type: req.params.type,
              created_at: {
                $gte: req.params.start_date,
                $lt: req.params.end_date
              }
            }, function(err, data) {
    res.json(data);
  });
})

module.exports = router;
