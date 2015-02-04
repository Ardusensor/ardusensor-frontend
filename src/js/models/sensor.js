var Model = require('ampersand-model');
var DotCollection = require('./dot_collection.js');


module.exports = Model.extend({

  props: {
    id: 'string',
    controller_id: 'string',
    label: 'string',
    last_tick: 'string',
    calibration_constant: 'number'
  },

  collections: {
    dots: DotCollection
  },

  session: {
    active: {
      default: true,
      type: 'boolean'
    }
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
