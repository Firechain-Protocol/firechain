require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
   
    zkevm_testnet: {
      url: process.env.INFURA_API_KEY, // 'https://rpc-mumbai.matic.today'
      accounts: [process.env.PRIVATE_KEY],
    },

    mumbai: {
      url: process.env.INFURA_API_KEY, // 'https://rpc-mumbai.matic.today'
      accounts: [process.env.PRIVATE_KEY],
    },

  zkevm_mainnet: {
      url: 'https://testnet.aurora.dev', // 'https://rpc-mumbai.matic.today'
      accounts: [process.env.PRIVATE_KEY],
    },

    polygon: {
      url: 'https://polygon-rpc.com', // [process.env.POLYGON_RPC], 
      accounts: [process.env.PRIVATE_KEY],
    },

  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
