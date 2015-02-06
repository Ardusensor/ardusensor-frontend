var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

module.exports = View.extend({

  template: require('./templates/clear_filter.dot'),

  events: {
    'click': 'clearFilters'
  },

  initialize: function () {
    this.listenTo(session.sensors, 'change:active', this.render);
  },

  render: function () {
    this.renderWithTemplate({
      filterCount: session.sensors.filterCount()
    });
    return this;
  },

  clearFilters: function () {
    session.sensors.clearFilters();
  }

});
