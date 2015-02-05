var Model = require('ampersand-model');


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
      return `/api/coordinators/${this.coordinatorId}`;
    } else {
      this.loaded = true;
      return `/api/coordinators/${this.coordinatorId}/${this.token}`;
    }
  },

  initialize: function (attributes, {coordinatorId, token}) {
    this.coordinatorId = coordinatorId;
    this.token = token;
  }

});
