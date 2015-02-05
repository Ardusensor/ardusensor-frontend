var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

module.exports = View.extend({

  template: require('./templates/sensor_edit.dot'),

  render: function () {
    console.log(this.model.toJSON());
    this.renderWithTemplate();
    return this;
  }

});
