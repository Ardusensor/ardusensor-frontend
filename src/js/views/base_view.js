var View = require('ampersand-view');
var session = require('../core/session.js');
var hub = require('../core/hub.js');
var SensorsView = require('./sensors_view.js');
var ChartView = require('./chart_view.js');
var HeaderView = require('./header_view.js');

module.exports = View.extend({

  template: require('./templates/base.dot'),

  initialize: function () {},

  render: function () {
    this.renderWithTemplate();
    this.renderSubview(new HeaderView());
    if (session.sensors) {
      this.renderSubview(new SensorsView());
      this.renderSubview(new ChartView());
    } else {
      this.listenToOnce(hub, 'load:sensors:success', () => {
        this.renderSubview(new SensorsView());
        this.renderSubview(new ChartView());
      });
    }
    return this;
  }

});
