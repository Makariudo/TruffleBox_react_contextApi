const path = require("path");
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic  = process.env.MNEMONIC;
const infuraAPI = process.env.INFURAAPI;
const endpoint = (reseau) => `https://${reseau}.infura.io/${infuraAPI}`;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    //develop on Ganache check your config
    develop: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1337"
    }, 
    mainnet: {
      provider: () => new HDWalletProvider(mnemonic, endpoint('mainnet')),
      network_id: 1,       
      gas: 5500000,       
      confirmations: 2,   
      timeoutBlocks: 200 
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, endpoint('ropsten')),
      network_id: 3,       
    },

    rinkby: {
      provider: () => new HDWalletProvider(mnemonic, endpoint('rinkeby')),
      network_id: 4,       
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, endpoint('kovan')),
      network_id: 42,
    },
    goerli: {
      provider: () => new HDWalletProvider(mnemonic, endpoint('goerli')),
      network_id: 5,
      gas: 5500000,
    },
  },
  compilers: {
    solc: {
      version: "^0.7.4",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
