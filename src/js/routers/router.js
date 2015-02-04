var Router = require('ampersand-router');
var session = require('../core/session.js');
var SensorCollection = require('../models/sensor_collection.js');
var hub = require('../core/hub.js');
var BaseView = require('../views/base_view.js');

module.exports = Router.extend({

  routes: {
    '': 'home',
    ':coordinatorId/:trash': 'start'
  },

  home: function () {
    alert('404, mate');
  },

  start: function (coordinatorId) {
    session.coordinatorId = coordinatorId;
    hub.trigger('load:sensors', {collection: new SensorCollection()});
    hub.once('load:sensors:success', (sensors) => {
      var baseView = new BaseView();
      document.body.innerHTML = '';
      document.body.appendChild(baseView.render().el);
    });
  }

});