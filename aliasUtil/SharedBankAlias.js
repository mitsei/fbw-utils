// SharedBankAlias.js
// Standardize the algorithm to calculate shared bankIds for subjects
'use strict';

var sharedBankAlias = function (termBankId) {
  // should return something like "shared-bank%3Aassessment.Bank%253A1234567890abcdef12345678%2540ODL.MIT.EDU%40ODL.MIT.EDU"
  if (termBankId.indexOf('@') >= 0) {
    termBankId = encodeURIComponent(encodeURIComponent(termBankId))
  } else {
    termBankId = encodeURIComponent(termBankId)
  }
  return `shared-bank%3A${termBankId}%40ODL.MIT.EDU`
};

module.exports = sharedBankAlias;
