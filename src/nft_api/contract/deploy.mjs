
// Import the libraries and load the environment variables.
import { config as loadEnv } from 'dotenv';
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
import fs from 'fs';
//const fs = require('fs');

//require('dotenv').config()
loadEnv();
// Create Auth object
const auth = new Auth({
      projectId: process.env.INFURA_API_KEY,
      secretId: process.env.INFURA_API_KEY_SECRET,
      privateKey: process.env.WALLET_PRIVATE_KEY,
      chainId: 80001,
      ipfs: {
        projectId: process.env.INFURA_IPFS_PROJECT_ID,
        apiKeySecret: process.env.INFURA_IPFS_PROJECT_SECRET,
      },
});
// Instantiate SDK
const sdk = new SDK(auth);

(async() => {
    try {
      // CREATE CONTRACT Metadata 
      const collectionMetadata = Metadata.openSeaCollectionLevelStandard({
        name: 'Fireside NFT Marketplace',
        description: "Welcome to the Fireside  Asset Marketplace store-front.",
        image: await sdk.storeFile({
          metadata: 'https://bafybeih6oxo5mbvqibbvji3cj7tqs7sitktkeatqwtiynv6ppkze7m6rui.ipfs.infura-ipfs.io/',
        }),
        external_link: 'https://firechain-xi.vercel.app/',
      });

      console.log('collectionMetadata ----', collectionMetadata);
      const storeMetadata = await sdk.storeMetadata({ metadata: collectionMetadata });
      console.log('storeMetadata', storeMetadata);

      const newContract = await sdk.deploy({
        template: TEMPLATES.ERC721Mintable,
        params: {
          name: 'FireSideProtocol',
          symbol: 'FSP',
          contractURI:storeMetadata,
        },
      });
      console.log(`FireSide Contract address is: ${newContract.contractAddress}`);
      fs.writeFileSync('./config.js', `
      export const fireSideAddress = "${newContract.contractAddress}"
      `)
    } catch (error) {
      console.log(error);
    }
})();