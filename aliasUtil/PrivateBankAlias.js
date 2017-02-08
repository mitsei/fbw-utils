// PrivateBankAlias.js
// Standardize the algorithm to calculate private bankIds for users
'use strict';

function removeUnicode(string) {
  // from http://stackoverflow.com/questions/10430562/how-do-you-remove-unicode-characters-in-javascript
  return string.replace(/[^\x00-\x7F]/gi, '');
}

var privateBankAlias = function (termBankId, username) {
  // should return something like "assessment.Bank%3A1234567890abcdef12345678-S12345678.acc.edu%40ODL.MIT.EDU"
  if (termBankId.indexOf('@') >= 0) {
    termBankId = encodeURIComponent(termBankId)
  }
  username = removeUnicode(username);
  return `assessment.Bank%3A${termBankId.match(/%3A(.*)%40/)[1]}-${username.replace('@', '.').replace(' ', '-')}%40ODL.MIT.EDU`
};

module.exports = privateBankAlias;
