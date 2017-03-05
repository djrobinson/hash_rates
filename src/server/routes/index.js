var express = require('express');
var router = express.Router();

var Scrypt = require('../schemas/scrypt_orders_schema');

router.get('/test', function(req, res) {
  res.json({
    "test": 0
  });
});



router.post('/scrypt', function(req, res) {
  var scrypt = new Scrypt();
  scrypt.type = "Test!!!";
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
