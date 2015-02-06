var Model = require('ampersand-model');
var session = require('../core/session.js');


module.exports = Model.extend({

  props: {
    id: 'string',
    label: 'string',
    log_url: 'string',
    token: 'string',
    // url: 'string'
  },

  url: function () {
    if (this.loaded) {
      return `/api/coordinators/${session.coordinatorId}`;
    } else {
      this.loaded = true;
      return `/api/coordinators/${session.coordinatorId}/${session.token}`;
    }
  }

});
