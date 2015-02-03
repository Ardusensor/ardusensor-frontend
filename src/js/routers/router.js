var Router = require('ampersand-router');
var session = require('../core/session.js');
var SensorCollection = require('../models/sensor_collection.js');

module.exports = Router.extend({

  routes: {
    '': 'home',
    ':coordinatorId/:trash': 'start'
  },

  home: function () {
    alert('404, mate');
  },

  start: function (coordinatorId) {
    session.coordinatorId = coordinatorId;
    var sensors = new SensorCollection();
    sensors.fetch();
  }

});
