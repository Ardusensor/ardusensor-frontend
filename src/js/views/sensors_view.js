var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

var SensorView = View.extend({

  template: require('./templates/sensor.dot'),

  events: {
    'click .icon-eye': 'toggleActive',
    'click .icon-edit': 'edit'
  },

  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function () {
    this.renderWithTemplate(this.model);
    return this;
  },

  toggleActive: function () {
    if (this.model.active && session.sensors.length !== session.sensors.active().length) {
      for (var sensor of session.sensors.models) {
        sensor.active = true;
      }
    } else {
      for (var sensor of session.sensors.models) {
        if (sensor === this.model) continue;
        sensor.active = false;
      }
      this.model.active = true;
    }
  },

  edit: function () {
    alert('edit');
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
