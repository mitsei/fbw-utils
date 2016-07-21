'use strict';


function _fetchWithHandling(url, fetchInit, successCallback, errorCallback) {
  fetch(url, fetchInit)
  .then(function (response) {
      if (response.ok) {
          // some API calls return an empty response, so handle that case
          response.json()
            .then( (responseData) => successCallback(responseData))
            .catch(() => successCallback());
      } else {
          response.text().then(function (responseText) {
              console.log('Not a 200 response: ' + url);
              console.log('Error returned: ' + responseText);
            try {
              errorCallback(response);
            } catch (e) {

            }
          });
      }
  })
  .catch(function (error) {
      console.log('Error fetching: ' + url);
      console.log('Error with fetch! ' + error.message);
  });
}

module.exports = _fetchWithHandling;
