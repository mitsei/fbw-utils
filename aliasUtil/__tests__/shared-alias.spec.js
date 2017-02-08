process.env.NODE_ENV = 'test';

let should = require('should');

let SharedBankAlias = require('../SharedBankAlias');

let BANK_ID = 'assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU'

describe('SharedBankAlias', () => {

    it('should have namespace of assessment.Bank', done => {
      // this is so the authz works properly on qbank side
      let alias = SharedBankAlias(BANK_ID);
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      done();
    });

    it('should double-escape the input termBankId', done => {
      let alias = SharedBankAlias(decodeURIComponent(BANK_ID));
      should(alias).startWith('assessment.Bank');
      should(alias).containEql('%3A');
      should(alias).containEql('%40');
      should(alias).containEql(encodeURIComponent(BANK_ID));
      done();
    })

})
