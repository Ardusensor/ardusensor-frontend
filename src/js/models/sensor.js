var Model = require('ampersand-model');
var DotCollection = require('./dot_collection.js');
var colors = require('../core/colors.js');


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
    },
    color: {
      deps: ['id'],
      fn: function () {
        return colors.get()
      }
    }
  }

});
