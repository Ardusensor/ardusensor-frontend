var hub = require('./hub.js');

var METHODS = ['load', 'update', 'delete'];

function load(method, name, options) {

  var successCallback = function (data) {
    if (options.success) {
      options.success(data);
    }
    hub.trigger(`${method}:${name}:success`, ...arguments);
  };

  var errorCallback = function () {
    hub.trigger(`${method}:${name}:error`, ...arguments);
  };

  if (method === 'load') {
    var target = options.model || options.collection;
    target.fetch({
      success: successCallback,
      error: errorCallback
    });
  } else if (method === 'update') {
    var validError;
    if (options.model.validate) {
      validError = options.model.validate(options.attributes);
    }
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
