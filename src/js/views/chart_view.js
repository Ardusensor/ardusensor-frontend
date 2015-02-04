var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');
var SessionsView = require('./sensors_view.js');
var _ = require('lodash');

module.exports = View.extend({

  template: '<div class="chart-holder"></div>',

  initialize: function () {
    var after = _.after(session.sensors.length, this.start.bind(this));
    this.listenTo(hub, 'load:dots:success', after);
  },

  start: function () {
    for (var sensor of session.sensors.models) {
      this.listenTo(sensor, 'change', this.build);
    }
    this.build();
  },

  render: function () {
    this.renderWithTemplate();
    return this;
  },

  build: function () {
    new Highcharts.StockChart({
      chart: {
        renderTo: this.el,
        height: '600'
      },
      rangeSelector: { enabled: false },
      exporting: { enabled: false },
      yAxis: [{
        title: {
          text: 'Temperature'
        },
        height: '47%'
      }, {
        title: {
          text: 'Humidity'
        },
        top: '53%',
        height: '47%',
      }],
      series: this.temperatureSeries().concat(this.humiditySeries())
    });
  },

  temperatureSeries: function () {
    return _.map(session.sensors.active(), (sensor) => {
      return {
        name: sensor.name + ' (temperature)',
        data: sensor.dots.temperatures(),
        color: sensor.color,
        yAxis: 0
      }
    });
  },

  humiditySeries: function () {
    return _.map(session.sensors.active(), (sensor) => {
      return {
        name: sensor.name + ' (humidity)',
        data: sensor.dots.humidities(),
        color: sensor.color,
        yAxis: 1
      }
    });
  }

});
