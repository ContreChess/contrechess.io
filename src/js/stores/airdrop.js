import { EventEmitter } from 'events'
import { token } from '../contracts/token'
import { airdrop } from '../contracts/airdrop'

class AirdropStore extends EventEmitter {
  constructor() {
    super()

    // begin with a faked status and let the blockchain correct us
    this.statuses = [{
      amount: 38.5,
      percent: 70,
      isComplete: false,
      total: 55
    }]

    this.watch()
  }

  watch () {
    if (!this.watching) {
      this.watching = true

      return airdrop.deployed().then(instance => {
        return token.deployed()
        .then(occ => {
          return instance.tokenHolderAddress.call()
          .then(holder => {
            this.watchTransfer(occ, holder)
            
            return occ.balanceOf.call(holder)
          })
        })
      })
      .then(balanceOf => {
        this.addStatus(balanceOf)
        return Promise.resolve(this.watching)
      })
      .catch(reason => {
        console.log(reason)
        this.watching = false
        return Promise.resolve(this.watching)
      })
    } else { return Promise.resolve(this.watching) }
  }

  watchTransfer (occ, address) {
    const transferEvent = occ.Transfer({ from: address })
    transferEvent.watch(this.onTransfer.bind(this))
    this.transferEvent = transferEvent
  }

  onTransfer (error, result) {
    if (!error) {
      airdrop.deployed().then(instance => {
        token.deployed()
        .then(occ => {
          instance.tokenHolderAddress.call()
          .then(holder => {
            occ.balanceOf.call(holder)
            .then(this.addStatus.bind(this))
          })
        })
      })
    } else {
      console.log(error)
    }
  }

  stop () {
    if (this.transferEvent) {
      this.transferEvent.stopWatching()
      delete this.transferEvent
      this.watching = false
    }
  }

  addStatus(balanceOf) {
    const remaining = parseFloat(balanceOf.div('10e26').toPrecision(5)),
          total = 55,
          amount = total - remaining,
          percent = Math.floor(amount / total * 100),
          isComplete = amount === 0

    this.statuses.push({ amount , percent, isComplete, total })

    this.emit('change')
  }

  getStatus = () => this.statuses[this.statuses.length - 1]
}

const airdropStore = new AirdropStore

export default new AirdropStore
