// Import the libraries and load the environment variables.
const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk') ;
require('dotenv').config()

// Create Auth object
const auth = new Auth({
      projectId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
      secretId: process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
      privateKey: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
      chainId: 80001,
});

// Instantiate SDK
const sdk = new SDK(auth);
const getCollectionsByWallet = async ()=> {
const collectionNFT = await sdk.api.getNFTsForCollection({
  contractAddress: "0x53B1bcF55df98aD924aD6BA06ea8117AB0cE4F95",
});
console.log('NFT Collection: \n', collectionNFT);
console.log('NFT Metadata: \n', collectionNFT.assets[0].metadata);
}


(async() => {
    try {
      await getCollectionsByWallet();
    } catch (error) {
      console.log(error);
    }
})();
