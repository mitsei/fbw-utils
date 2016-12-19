// PrivateBankAlias.js
// Standardize the algorithm to calculate private bankIds for users
'use strict';

var privateBankAlias = function (termBankId, username) {
  // should return something like "private-bank%3A1234567890abcdef12345678-S12345678.acc.edu%40ODL.MIT.EDU"
  if (termBankId.indexOf('@') >= 0) {
    termBankId = encodeURIComponent(termBankId)
  }
  return `private-bank%3A${termBankId.match(/%3A(.*)%40/)[1]}-${username.replace('@', '.')}%40ODL.MIT.EDU`
};

module.exports = privateBankAlias;
