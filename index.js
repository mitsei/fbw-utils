



module.exports = function(credentials) {
  return {
    handcarFetch: require('./fetch/handcarFetch')(credentials),
    qbankFetch: require('./fetch/qbankFetch')(credentials),
    CheckMissionStatus: require('./dateUtil/CheckMissionStatus'),
    ConvertDateToDictionary: require('./dateUtil/ConvertDateToDictionary'),
    QBankSignature: require('./signingUtil/QBankSignature')
  }

}
