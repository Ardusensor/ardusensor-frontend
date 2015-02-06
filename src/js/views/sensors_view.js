var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');
var SensorEditView = require('./sensor_edit_view.js');
var ClearFilterView = require('./clear_filter_view.js');

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
    var filterCount = session.sensors.filterCount();
    if (filterCount === 0) {
      for (var sensor of session.sensors.models) {
        if (sensor === this.model) continue;
        sensor.active = false;
      }
      this.model.active = true;
    } else {
      this.model.active = !this.model.active;
    }

  },

  edit: function () {
    document.body.appendChild(new SensorEditView({
      model: this.model
    }).render().el);
  }

});


module.exports = View.extend({

  template: require('./templates/sensors.dot'),

  initialize: function () {
    this.listenTo(session.sensors, 'change add remove reset', this.render);
  },

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(session.sensors, SensorView, '.sensors__container');
    this.renderSubview(new ClearFilterView());
    return this;
  }

});
