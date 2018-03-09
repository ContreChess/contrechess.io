import tc           from 'truffle-contract';
import Web3         from 'web3';
import { networks } from '../networks';

const AirdropCampaignArtifact = require('../../build/contracts/AirdropCampaign.json'),
      OriginalTokenArtifact   = require('../../build/contracts/OriginalToken.json')

let provider,
    bundledWeb3,
    contracts = {}

export default {
  getProvider () {
    if (!provider) {
      const mainnet = networks.find(network => network.id === '1')

      provider = new Web3.providers.HttpProvider(mainnet.host)
    }

    return provider
  },
  getWeb3 () {
    if (!bundledWeb3) {
        // even if web3 is already defined we use the web3 library bundled with the application instead of
        // some unknown version injected by Mist, MetaMask (or something else)
      bundledWeb3 = new Web3(this.getProvider())
    }

    return bundledWeb3
  },
  getAirdropCampaignContract () {
    if (!contracts.AirdropCampaign) {
      contracts.AirdropCampaign = tc(AirdropCampaignArtifact)

      contracts.AirdropCampaign.setProvider(this.getProvider())
    }

    return contracts.AirdropCampaign
  },
  getOriginalTokenContract () {
    if (!contracts.OriginalToken) {
      contracts.OriginalToken = tc(OriginalTokenArtifact)

      contracts.OriginalToken.setProvider(this.getProvider())
    }

    return contracts.OriginalToken
  }
}
