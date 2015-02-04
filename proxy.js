// Node.js proxy to develop against staging/live
var httpProxy = require('http-proxy');
var http = require('http');
var connect = require('connect');
var logger = require('morgan');
var static = require('serve-static')

var proxy = httpProxy.createProxyServer({});

var app = connect();
app.use(logger('dev'));
app.use('/api', function (req, res) {
  console.log('Proxy');
  proxy.web(req, res, {
    target: 'http://www.ardusensor.com/api'
  });
});
app.use(static('dist'));
app.listen(1234);

console.log("listening on port 1234");
