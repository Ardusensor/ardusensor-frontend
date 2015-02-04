var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');
var SessionsView = require('./sensors_view.js');

module.exports = View.extend({

  template: require('./templates/base.dot'),

  initialize: function () {},

  render: function () {
    this.renderWithTemplate();
    this.renderSubview(new SessionsView());
    return this;
  }

});