// customized fetch version for Handcar authenticated calls
'use strict';

var _fetchWithHandling = require('./_fetchWithHandling');

function initializer(credentials) {
  return function handcarFetch(params, successCallback, errorCallback) {
      // wrapper around global fetch to include signing
    let URL = 'https://' + credentials['handcar'].Host + '/handcar/services';
    var url = URL + params.path;

    if (url.indexOf('%3A') >= 0) {
      url = decodeURIComponent(url);
    }

    if (url.indexOf('?') >= 0) {
      url = url + '&proxyname=' + credentials.ProxyKey;
    } else {
      url = url + '?proxyname=' + credentials.ProxyKey;
    }

    _fetchWithHandling(url, successCallback, errorCallback);
  }
}

module.exports = initializer;
