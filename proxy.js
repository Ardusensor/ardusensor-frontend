// Node.js proxy to develop against staging/live
var httpProxy = require('http-proxy');
var http = require('http');
var connect = require('connect');

var endpoint = {
    host: 'http://ardusensor.com', // or IP address
    port: 80,
    prefix: '/api'
  }
  , staticDir = 'dist';

var proxy = httpProxy.createProxyServer({});

// var server = http.createServer(function(req, res) {
//   proxy.web(req, res, { target: 'http://ardusensor.com' });
// });

var app = connect()
  .use(connect.logger('dev'))
  .use(function(req, res) {
    if (req.url.indexOf(endpoint.prefix) === 0) {
      proxy.proxyRequest(req, res, endpoint);
    }
  })
  .use(connect.static(staticDir))
  .listen(1234);

console.log("listening on port 1234")

// http://localhost:4242/api/test will give response
// from http://your-app-domain.com/api/test
