var Router = require('./routers/router.js');

document.addEventListener("DOMContentLoaded", function(event) {
  var router = new Router();
  router.history.start();
});
