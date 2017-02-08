process.env.NODE_ENV = 'test';

let should = require('should');

let PrivateBankAlias = require('../PrivateBankAlias');

let BANK_ID = 'assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU'
let USERNAME = 'student-123@school.edu'
let USERNAME_WITH_SPACE = 'student 123@school.edu'
let USERNAME_WITH_UNICODE = 'studeñt-123@school.edu'

function identifier(id) {
  return id.match(/%3A(.*)%40/)[1]
}

describe('PrivateBankAlias', () => {

    it('should have namespace of assessment.Bank', done => {
      // this is so the authz works properly on qbank side
      let alias = PrivateBankAlias(BANK_ID, USERNAME);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      done();
    });

    it('should only include the termBankId identifier if decoded', done => {
      let alias = PrivateBankAlias(decodeURIComponent(BANK_ID), USERNAME);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      should(alias).not.containEql('%2540')
      should(alias).not.containEql(BANK_ID);
      should(alias).containEql(identifier(BANK_ID))
      done();
    })

    it('should only include the termBankId identifier if encoded', done => {
      let alias = PrivateBankAlias(BANK_ID, USERNAME);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      should(alias).not.containEql('%2540')
      should(alias).not.containEql(BANK_ID);
      should(alias).containEql(identifier(BANK_ID))
      done();
    })

    it('should remove space from the username', done => {
      let alias = PrivateBankAlias(BANK_ID, USERNAME_WITH_SPACE);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      should(alias).containEql('student-123.school.edu');
      done();
    })

    it('should remove unicode from the username', done => {
      let alias = PrivateBankAlias(BANK_ID, USERNAME_WITH_UNICODE);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      should(alias).containEql('studet-123.school.edu');
      done();
    })

})
