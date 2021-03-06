var https = require('https');
var http = require('http');

var url = 'https://www.nicehash.com/api?method=orders.get&location=1&algo=';

var algos = [
  "Scrypt"
  ,"SHA256"
  ,"ScryptNf"
  ,"X11"
  ,"X13"
  ,"Keccak"
  ,"X15"
  ,"Nist5"
  ,"NeoScrypt"
  ,"Lyra2RE"
   ,"WhirlpoolX"
   ,"Qubit"
   ,"Quark"
   ,"Axiom"
   ,"Lyra2REv2"
   ,"ScryptJaneNf16"
   ,"Blake256r8"
   ,"Blake256r14"
   ,"Blake256r8vnl"
   ,"Hodl"
   ,"DaggerHashimoto"
   ,"Decred"
   ,"CryptoNight"
   ,"Lbry"
   ,"Equihash"
   ,"Pascal"
   ,"X11Gost"
]

function orderPrices(index) {
  https.get(url + index, function(res) {
    res.setEncoding('utf8');
    var data = '';
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function() {
      const result = JSON.parse(data).result.orders;
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
      console.log('End???');
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
  var type = '';
  const retObj = result.reduce(function(acc, order) {
    acc.speed_utilized += parseFloat(order.accepted_speed);
    type = parseInt(order.algo);
    return acc;
  }, {
    'speed_utilized': 0
  });
  retObj.type = algos[type];
  return retObj;
}

function kickoffOrderRetrieval() {
  algos.forEach((algo, i) => {
    orderPrices(i);
  })
}

setInterval(kickoffOrderRetrieval, 1000);
