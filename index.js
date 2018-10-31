const bitcore = require('bitcore-lib')
const TronBip44 = require('./tron-bip44')()
function EthDepositUtils (options) {
  if (!(this instanceof EthDepositUtils)) return new EthDepositUtils(options)
  let self = this
  self.options = Object.assign({}, options || {})
  // if (!self.options.password) throw new Error('EthDepositUtils: password required')
  return self
}

// https://github.com/trapp/ethereum-bip44
EthDepositUtils.prototype.bip44 = function (xpub, path) {
  let self = this
  let address = TronBip44.getAddress(xpub, path)
  // if (ethereumAddress.isAddress(address)) {
  return address
  // } else {
  return new Error('address validation failed')
// }
}

// // https://github.com/trapp/ethereum-bip44
EthDepositUtils.prototype.getPrivateKey = function (xprv, path) {
  let self = this
  if (!xprv) throw new Error('Xprv is null. Bad things will happen to you.')
  // create the hd wallet
  let secretKey = TronBip44.getPrivateKey(xprv, path)
  return secretKey
}

EthDepositUtils.prototype.privateToPublic = function (privateKey) {
  let pub = TronBip44.privateToPublic(privateKey)
  if (ethereumAddress.isAddress(pub)) {
    return pub
  } else {
    return new Error('address validation failed')
  }
}

EthDepositUtils.prototype.generateNewKeys = function () {
  // to gererate a key:
  let key = new bitcore.HDPrivateKey()
  let derivedPubKey = key.derive("m/44'/60'/0'/0").hdPublicKey
  return {
    xpub: derivedPubKey.toString(),
    xprv: key.toString()
  }
}

EthDepositUtils.prototype.getXpubFromXprv = function (xprv) {
  let key = new bitcore.HDPrivateKey(xprv)
  let derivedPubKey = key.derive("m/44'/60'/0'/0").hdPublicKey
  return derivedPubKey.toString()
}

module.exports = EthDepositUtils
