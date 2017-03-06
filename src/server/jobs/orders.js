var https = require('https');
var http = require('http');

var url = 'https://www.nicehash.com/api?method=orders.get&location=1&algo=0';


function scryptPrices() {
  https.get(url, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      const result = JSON.parse(data).result.orders;

      console.log('Results: ', result);
      const orderSet = findMainStats(result);
      orderSet.orders = result;

      saveData(orderSet);
    })
  }).on('error', function(error) {
    console.log("Got Error message: ", error);
  });
}

function saveData(orderSet) {
  console.log('Order Set: ', typeof(orderSet));
  var options = {
    host: 'localhost',
    path: '/orders',
    port: 3000,
    //This is the only line that is new. `headers` is an object with the headers to request
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  };


  callback = function(response) {
    var str = ''

    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      console.log('End???', str);
    });
  }

  var req = http.request(options, callback);
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(JSON.stringify(orderSet));
  req.end();
}

function findMainStats(result) {
  const retObj = result.reduce(function(acc, order) {
    acc.speed_utilized += parseFloat(order.accepted_speed);
    var orderspeed = parseFloat(order.accepted_speed);
    var orderprice = parseFloat(order.price);
    if (orderspeed > 0) {
      acc.cost_for_min = orderprice;
    }
    if (orderprice > acc.high) {
      acc.high = orderprice;
    }
    return acc;
  }, {
    'speed_utilized': 0,
    'cost_for_min': 0,
    'cost_for_all': 0,
    'high': 0

  });
  retObj.type = "scrypt";
  return retObj;
}

setInterval(scryptPrices, 1000);
