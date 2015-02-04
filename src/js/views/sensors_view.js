var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

module.exports = View.extend({

  template: require('./templates/sensors.dot'),

  initialize: function () {},

  render: function () {
    this.renderWithTemplate({
      sensors: session.sensors.models
    });
    return this;
  }

});
