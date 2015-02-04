var Collection = require('ampersand-rest-collection');
var Sensor = require('./sensor.js');
var session = require('../core/session.js');


module.exports = Collection.extend({

  model: Sensor,
  url: function () {
    return `/api/coordinators/${session.coordinatorId}/sensors`;
  }

});
