'use strict';


function _fetchWithHandling(url, fetchInit) {
  return fetch(url, fetchInit);
}

module.exports = _fetchWithHandling;
