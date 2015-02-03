var Events = require('backbone-events-standalone');
var extend = require('amp-extend');

var hub = {
  debug: function(name) {
    var self = this;
    self._trigger = self.trigger;
    self.trigger = function() {
      console.log('Hub:', arguments);
      return self._trigger.apply(self, arguments);
    };
  }
};

extend(hub, Events);
hub.initialize();

window.hub = hub;

module.exports = hub;
