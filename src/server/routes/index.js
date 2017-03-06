var express = require('express');
var router = express.Router();

var Scrypt = require('../schemas/scrypt_orders_schema');

router.get('/test', function(req, res) {
  res.json({
    "test": 0
  });
});

router.post('/scrypt', function(req, res) {
  console.log("reqqqq", req.body);
  var scrypt = new Scrypt();
  scrypt.createdAt = Date.now();
  scrypt.type = req.body.type;
  scrypt.high = req.body.high;
  scrypt.low = req.body.low;
  scrypt.cost_for_all = req.body.cost_for_all;
  scrypt.orders = req.body.orders;
  scrypt.save(function(err, data) {
    if (err) {
      throw err;
    } else {
      console.log("Save worked", data);
      res.json(data);
    }
  });
});

module.exports = router;
