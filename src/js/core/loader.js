var hub = require('./hub.js');
var session = require('./session.js');
var Collection = require('ampersand-rest-collection');
var Model = require('ampersand-model');

var METHODS = ['load', 'update', 'delete'];

function load(method, name, options) {

  var successCallback = function (data) {
    if (options.collection) {
      session[name] = data;
    }
    hub.trigger(`${method}:${name}:success`, ...arguments);
  };

  var errorCallback = function () {
    hub.trigger(`${method}:${name}:error`, ...arguments);
  };

  if (method === 'load' || method === 'update') {
    if (options.model) {
      var validError = options.model.validate(options.attributes);
      if (validError) {
        error(validError);
      } else {
        var isNew = options.model.isNew()
        options.model.save(options.attributes, {
          success: function () {
            if (isNew && options.collection) {
              options.collection.add(options.model);
            }
            successCallback(...arguments);
          },
          error: errorCallback
        });
      }
    } else if (options.collection) {
      options.collection.fetch({
        success: successCallback,
        error: errorCallback
      });
    } else {
      throw Error('Cannot load this type of object');
    }
  } else if (method === 'delete') {
    options.model.destroy({
      success: function () {
        if (options.collection) {
          options.collection.remove(options.model);
        }
        successCallback(...arguments);
      },
      error: errorCallback
    });
  }
}

function startLoading(event, options) {
  var eventParts = event.split(':')
  , method = eventParts[0]
  , name = eventParts[1];
  if (METHODS.indexOf(method) > -1
  && eventParts.indexOf('success') < 0
  && eventParts.indexOf('error') < 0) {
    load(method, name, options);
  }
}

hub.on('all', startLoading);
