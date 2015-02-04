var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

var SensorView = View.extend({

  template: require('./templates/sensor.dot'),

  events: {
    'click': 'toggleActive'
  },

  render: function () {
    this.renderWithTemplate(this.model);
    return this;
  },

  toggleActive: function () {
    this.model.active = !this.model.active;
    this.render();
  }

});


module.exports = View.extend({

  template: require('./templates/sensors.dot'),

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(session.sensors, SensorView);
    return this;
  }

});
