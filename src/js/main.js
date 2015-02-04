var Router = require('./routers/router.js');
require('./core/loader.js');

document.addEventListener("DOMContentLoaded", function(event) {
  var router = new Router();
  router.history.start();
});
