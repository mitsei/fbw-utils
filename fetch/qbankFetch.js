// customized fetch version with signing for QBank
'use strict';

var QBankSignature = require('../signingUtil/QBankSignature');
var _fetchWithHandling = require('./_fetchWithHandling');

function initializer(credentials) {
  return function qbankFetch(params) {

      let URL = 'https://' + credentials['qbank'].Host + '/api/v2/';

      // wrapper around global fetch to include signing
      var qbank = new QBankSignature(),
          now = new Date(),
          headers = new Headers(),
          url = URL + params.path,
          headerPath = url.split('mit.edu')[1],
          options, fetchInit;
      if (url.indexOf('%3A') >= 0) {
        // let's only decode the stuff we care about ... otherwise magic question IDs
        // get messed up -- this shouldn't be necessary in the future with Jeff's change
        // to abstract the magic question IDs out.
          url = url.replace(/%3A/g, ':').replace(/%40/g, '@');
          headerPath = headerPath.replace(/%3A/g, ':').replace(/%40/g, '@');
        //url = decodeURIComponent(url);
        //headerPath = decodeURIComponent(headerPath);
      }
      headers.append('x-api-key', credentials['qbank'].AccessKeyId);
      headers.append('x-api-proxy', params.proxy ? params.proxy : credentials['qbank'].Proxy);
      headers.append('host', credentials['qbank'].Host);
      headers.append('request-line', headerPath);
      headers.append('accept', 'application/json');
      headers.append('date', now.toUTCString());
      options = {
          path: headerPath,
          method: params.hasOwnProperty('method') ? params.method : 'GET',
          headers: {
            'request-line': headers.get('request-line'),
            'accept': headers.get('accept'),
            'date': now.toUTCString(),
            'host': headers.get('host'),
            'x-api-proxy': headers.get('x-api-proxy')
          },
          credentials: credentials['qbank']
      };
      headers.append('authorization', qbank.getAuthorizationString(options));

      fetchInit = {
          headers: headers,
          method: options.method.toUpperCase()
      };

      if (params.hasOwnProperty('data')) {
        if (typeof params.date == "string") {
          fetchInit['body'] = params.data;
        } else {
          fetchInit['body'] = JSON.stringify(params.data);
          headers.append('Content-Type', 'application/json');
        }
      }

      return _fetchWithHandling(url, fetchInit);
  }
}

module.exports = initializer;
