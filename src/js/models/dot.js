var Model = require('ampersand-model');


module.exports = Model.extend({

  props: {
    datetime: 'string',
    battery_voltage_visual: 'number',
    radio_quality: 'number',
    sensor2: 'number',
    temperature: 'number',
    version: 'number'
  }

});
