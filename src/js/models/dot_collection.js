var Collection = require('ampersand-rest-collection');
var Dot = require('./dot.js');
var session = require('../core/session.js');
var _ = require('lodash');


module.exports = Collection.extend({

  model: Dot,

  initialize: function (models, {sensorId}) {
    this.sensorId = sensorId;
  },

  url: function () {
    var end = Math.floor(Date.now() / 1000)
      , start = Math.floor((Date.now() - 30 * 86400000) / 1000); // 7 days
    // return `/api/sensors/${this.sensorId}/dots?start=${start}&end=${end}&dots_per_day=24`;
    return `/api/sensors/${this.sensorId}/dots?start=1420359986&end=1423038386&dots_per_day=24`;
  },

  temperatures: function () {
    var filtered = _.filter(this.models, (dot) => {
      return _.isNumber(dot.temperature);
    });
    return _.map(filtered, (dot) => {
      return [(new Date(dot.datetime)).getTime(), Math.round(dot.temperature)];
    });
  },

  humidities: function () {
    var filtered = _.filter(this.models, (dot) => {
      return _.isNumber(dot.sensor2);
    });
    return _.map(filtered, (dot) => {
      return [(new Date(dot.datetime)).getTime(), dot.sensor2];
    });
  }

});
