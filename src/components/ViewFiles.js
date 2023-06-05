/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Box } from 'theme-ui';
import { ethers } from "ethers";
import axios from "axios";
import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
// Import the libraries and load the environment variables.
const { SDK, Auth, TEMPLATES, Metadata } = require('@infura/sdk') ;
require('dotenv').config()

import { fireSideAddress } from "../../config";

// Create Auth object
const auth = new Auth({
  projectId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  secretId: process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
  privateKey: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
  chainId: 80001,
});

export default function ViewFiles() {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadfileNFT();
  }, []);



  async function loadfileNFT() {

      // Instantiate SDK
const sdk = new SDK(auth);
const getCollectionsByWallet = async ()=> {
const collectionNFT = await sdk.api.getNFTsForCollection({
  contractAddress: fireSideAddress,
});
console.log('NFT Collection: \n', collectionNFT);
  console.log('NFT Metadata: \n', collectionNFT.assets[0].metadata);
  return collectionNFT;
}

async function getContractNFT() {
    try {
      await getCollectionsByWallet();
      return collectionNFT;
    } catch (error) {
      console.log(error);
    }
};

    const data = await getContractNFT();
    console.log('data.map items Function ', data);
    try {
      const items = await axios.get(getContractNFT) 
        console.log('data.map items Function ', items);
      const meta = await axios.get(getContractNFT);
      console.log('axios get Function ', meta);

      const item = {
        tokenId: i.tokenId.toNumber(),
        image: getIPFSGatewayURL(meta.data.image),
        name: meta.data.name,
        description: meta.data.description,
        sharelink: getIPFSGatewayURL(meta.data.image),
        //vin: meta.data.properties.vin,
      };
      console.log("item returned is ", item);
      setNfts(items);
      setLoadingState("loaded");
      return item;
    } catch (err) {
      console.log(err);
    }

  }

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    return ipfsGateWayURL;
  };

  

  async function share(nft) {
    console.log("item id clicked is", nft.tokenId);
    const id = nft.tokenId;

    router.push({
      pathname: "/carDetails",
      query: { id },
    });
    console.log('Prop result without {} is ', { id });
  }

  async function CarDetails() {
    router.push({
        pathname: "/carDetails",
        query: {id}
      });
      console.log('Prop result is ', prop.id)
  }
  if (loadingState === "loaded" && !nfts.length) {
    return (
      <div sx={styles.section}>
        <h1 className="px-20 py-10 text-3xl text-white">Empty drive, no file yet</h1>
      </div>
    );
  }
  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-blue-100 text-4xl text-center text-black font-bold pt-10">
        <h1>Unified Asset Marketplace</h1>
      </div>
    <div className="flex justify-center bg-blue-100 mb-12">

      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          {nfts.map((nft, i) => (

            <div key={i} className="shadow rounded-xl overflow-hidden border-2 border-white-500">
              <img
                title="fileNFT"
                frameBorder="0"
                scrolling="no"
                height="200px"
                width="100%"
                // objectFit="cover"
                src={`${nft.image}#toolbar=0`}
                className="py-3 object-cover h-500"
                w={nft.key}
              />
              <div className="p-1">
                <p style={{ height: "34px" }} className="text-xl text-purple-700 font-semibold">Name: {nft.name}</p>
                <p className="text-xl font-bold text-black">ID : {nft.tokenId}</p>
                <p className="text-xl font-bold text-black">VIN : {nft.vin}</p>
              </div>
              {/** onClick={() => share(nft)} */}
              <div className="p-2 bg-black">
              <button data-value={nft} type="button" onClick={() => share(nft) } className="w-full bg-purple-700 text-white font-bold py-2 px-2 rounded" >View Bounty</button>             
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
    </Box>
  );
}

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
 };
