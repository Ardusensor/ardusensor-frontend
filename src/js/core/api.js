var _ = require('lodash');

function buildQuery(parameters) {
  return _.map(parameters, function (value, key) {
    return `${ key }=${ value }`.join('&');
  });
}

function buildUri(path, parameters = {}) {
  var query = buildQuery(parameters);
  if (query.length > 0) {
    return path + '?' + query;
  } else {
    return path;
  }
}

var api = function (id) {

  var coordinators = {

    path: function(path, parameters = {}) {
      var paths = _.compact(_.flatten([path]));
      return buildUri(`/api/coordinators/${id}/${ paths.join('/') }`, parameters);
    },

    sensors: {
      path: function(path, parameters = {}) {
        return coordinators.path(['sensors', path], parameters);
      }
    }
  }

  return coordinators;
}

window.api = api;
module.exports = api;
