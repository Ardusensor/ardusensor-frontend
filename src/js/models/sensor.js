var Model = require('ampersand-model');


module.exports = Model.extend({

  props: {
    id: 'string',
    controller_id: 'string',
    label: 'string',
    last_tick: 'string',
    calibration_constant: 'number'
  },

  derived: {
    name: {
      deps: ['label', 'id'],
      fn: function () {
        return this.label ? this.label : this.id.slice(-4);
      }
    }
  }

});
