'use strict';


function _fetchWithHandling(url, fetchInit, successCallback, errorCallback) {
  fetch(url, fetchInit)
  .then(function (response) {
      if (response.ok) {
          response.json().then( (responseData) => successCallback(responseData));

      } else {
          response.text().then(function (responseText) {
              console.error('Not a 200 response:', url, 'Error returned:', responseText);
            try {
              errorCallback(response);
            } catch (e) {

            }
          });
      }
  })
  .catch(function (error) {
      console.error('Error with fetch. url', url, error.message);
  });
}

module.exports = _fetchWithHandling;
