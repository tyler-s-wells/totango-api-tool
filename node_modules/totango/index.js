var url = require('url');
var request = require('request');
var querystring = require('querystring');
var extend = require('util')._extend;


module.exports = function(serviceId) {
  var self = this;

  self.request = function(params, cb) {
    var opt = {
      url: url.format({
        protocol: 'https',
        host: 'sdr.totango.com',
        pathname: 'pixel.gif/',
        search: querystring.stringify(params)
      }),
      method: 'GET',
      jar: false
    };
    request(opt, function(err, res, body) {
      if (err) {
        cb(err);
      } else if (res.statusCode !== 200 && res.statusCode !== 201) {
        cb(new Error('Request returned with an invalid status code of: ' + res.statusCode));
      } else {
        cb(null);
      }
    });
  };

  self.user = function(username, accountId, accountName) {
    var user = {};
    user.params = {
      sdr_s: serviceId,
      sdr_u: username,
      sdr_o: accountId
    };
    if (accountName) {
      user.params.sdr_odn = accountName;
    }

    user.event = function(activity, module, cb) {
      if (typeof activity !== 'string' ||
          typeof module !== 'string' ||
          typeof cb !== 'function') {
        throw new Error('Invalid parameters');
      }
      var params = extend({}, user.params);
      params.sdr_a = activity;
      params.sdr_m = module;
      self.request(params, cb);
    };

    user.setAttributes = function(attributes, cb) {
      if (typeof attributes !== 'object' ||
          typeof cb !== 'function') {
        throw new Error('Invalid parameters');
      }
      var params = extend({}, user.params);
      for(var attr in attributes) {
        params['sdr_u.'+attr] = attributes[attr];
      }
      self.request(params, cb);
    };

    user.setAccountAttributes = function(attributes, cb) {
      if (typeof attributes !== 'object' ||
          typeof cb !== 'function') {
        throw new Error('Invalid parameters');
      }
      var params = extend({}, user.params);
      for(var attr in attributes) {
        params['sdr_o.'+attr] = attributes[attr];
      }
      self.request(params, cb);
    };

    return user;
  };
};
