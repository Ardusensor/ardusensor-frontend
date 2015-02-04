var Collection = require('ampersand-rest-collection');
var Sensor = require('./sensor.js');
var session = require('../core/session.js');
var _ = require('lodash');


module.exports = Collection.extend({

  model: Sensor,

  url: function () {
    return `/api/coordinators/${session.coordinatorId}/sensors`;
  },

  active: function () {
    return _.filter(this.models, (sensor) => {
      return sensor.active
    });
  }

});
