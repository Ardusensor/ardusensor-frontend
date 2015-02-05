var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');

module.exports = View.extend({

  template: require('./templates/header.dot'),

  events: {
    'focusout input': 'save'
  },

  initialize: function () {
    this.listenToOnce(hub, 'load:coordinator:success', this.render);
    this.listenTo(hub, 'update:coordinator:success', this.render);
  },

  render: function () {
    this.renderWithTemplate(session.coordinator);
    return this;
  },

  save: function () {
    hub.trigger('update:coordinator', {
      attributes: {
        label: this.query('input').value
      },
      model: session.coordinator
    });
  }

});
