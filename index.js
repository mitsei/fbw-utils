



module.exports = function(credentials) {
  return {
    handcarFetch: require('./fetch/handcarFetch')(credentials),
    qbankFetch: require('./fetch/qbankFetch')(credentials),
    CheckMissionStatus: require('./dateUtil/CheckMissionStatus'),
    ConvertDateToDictionary: require('./dateUtil/ConvertDateToDictionary'),
    QBankSignature: require('./signingUtil/QBankSignature'),
    WrapMathjax: require('./renderingUtil/WrapMathjax')(credentials),
    privateBankAlias: require('./aliasUtil/PrivateBankAlias'),
    sharedBankAlias: require('./aliasUtil/SharedBankAlias')
  };
}
