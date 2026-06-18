const dotenv = require('dotenv')
dotenv.config()


class ERC721 {
    constructor(network) {
        this.networkUrl = network.networkuri
        this.contractAddress = network.contract
        this.chain = network.chain
        this.abi = network.abi || null
    }
    async init() {
        try {
            this.web3 = new Web3(new Web3.providers.HttpProvider(this.networkUrl))
            console.log('contractAddress', this.contractAddress)
            this.myContract = new this.web3.eth.Contract(
                this.abi,
                this.contractAddress
            )
            console.log(`connected chain: ${this.chain}`)
        } catch (error) {
            console.log('connection failed', error)
        }
    }

}
module.exports = ERC721