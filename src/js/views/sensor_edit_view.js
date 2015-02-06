var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');
var _ = require('lodash');

module.exports = View.extend({

  template: require('./templates/sensor_edit.dot'),

  events: {
    'click button.close': 'remove',
    'click button.save': 'save'
  },

  render: function () {
    this.renderWithTemplate();
    return this;
  },

  save: function () {
    var data = {}
      , label = this.query('#label').value
      , temperature = parseInt(this.query('#temperature').value);
    if (label) data.label = label;
    if (data !== NaN && _.isNumber(temperature)) data.current_temperature = temperature;
    if (!_.isEmpty(data)) {
      hub.trigger('update:sensor', {
        attributes: data,
        model: this.model
      });
    }
    this.remove();
  }

});
