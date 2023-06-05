/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { SDK, Auth, TEMPLATES, Metadata } from '@infura/sdk';
import { Wallet, providers } from "ethers";

import 'dotenv/config';
import fileNFT from "../../artifacts/contracts/autorecover.sol/FileNFT.json";
import { fireSideAddress } from "../../config";
const APIKEY = [process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY];

const auth = new Auth({
  projectId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
  secretId: process.env.NEXT_PUBLIC_INFURA_API_KEY_SECRET,
  privateKey: process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY,
  chainId: 80001,
  ipfs: {
    projectId: process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID,
    apiKeySecret: process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET,
  },
});
// Instantiate SDK
const sdk = new SDK(auth);

const Mint = () => {
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "", description: "", price: "", colour: "" });

  const handleFileUpload = (event) => {
    console.log("Asset for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };


  const uploadNFTContent = async (inputFile) => {
    const { name, description, colour, price } = formInput;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    let accounts = await provider.send("eth_requestAccounts", []);
    let account = accounts[0];
    provider.on('accountsChanged', function (accounts) {
        account = accounts[0];
        console.log(address); // Print new address
    });
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    console.log("users account is: ", address);

    if (!name || !description  || !colour || !price || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Assetto IPFS ...");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name: name,
        description: description,
        image: inputFile,
        properties: {
          address,
          price,
          colour,
        },
      });
      setMetaDataURl(metaData.url);
      console.log("metadata is: ", { metaData });
      return metaData;
    } catch (error) {
      setErrorMessage("Could store file to NFT.Storage - Aborted file upload.");
      console.log("Error Uploading Content", error);
    }
  };

  const sendTxToBlockchain = async (metaData) => {
    console.log(`sending TX to blockchain`);
    const existing = await sdk.loadContract({
      template: TEMPLATES.ERC721Mintable,
      contractAddress: fireSideAddress,
    });
    console.log(`Contract address is: ${existing.contractAddress}`);
    
    try {
      setTxStatus("Adding transaction on-chain using Infura NFT SDK");
      const message = 'You are about to mint an asset to the Marketplace';
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const signature = await signer.signMessage(message);
      console.log("Signature is", signature);
      const address = await signer.getAddress();
      console.log("Connected to contract", fireSideAddress);
      console.log("IPFS blockchain uri is ", metaData.url);
      const mint1 = await existing.mint({
        publicAddress: fireSideAddress,
        tokenURI: getIPFSGatewayURL(metaData.url),
      }
      );
      const mintNFTTx = await mint1.wait();
      console.log("File successfully created and added to Blockchain");
      console.log(`Status: ${mintNFTTx.status}\n NFT minted on ${mintNFTTx.blockHash} with ${mintNFTTx.confirmations} confirmation!`);
      return { mintNFTTx, address };

    } catch (error) {
      setErrorMessage("Failed to send tx to Blockchain.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    console.log("image ipfs path is", imgViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("File addition was successfully!");
    console.log("File preview completed");
  };

  const mintNFTFile = async (e, uploadedFile) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
   previewNFT(metaData, mintNFTTx);

    //4. navigate("/explore");
    navigate.push('/dashboard');
  };
  async function CarDetails() {
    /* Link to Library Categories */
    // router.push("/catebooks");
    navigate("/carDetails");
  }

  const getIPFSGatewayURL = (ipfsURL) => {
    const urlArray = ipfsURL.split("/");
    console.log("urlArray = ", urlArray);
    const ipfsGateWayURL = `https://${urlArray[2]}.ipfs.nftstorage.link/${urlArray[3]}`;
    console.log("ipfsGateWayURL = ", ipfsGateWayURL)
    return ipfsGateWayURL;
  };

  return (
    <Box as="section"  sx={styles.section}>
      <div className="bg-blue-100 text-4xl text-center text-black font-bold pt-10">
        <h1> Create New Asset</h1>
      </div>
      <div className="flex justify-center bg-blue-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Asset Name"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Description of Asset"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            rows={2}
          />
          <input
            placeholder="Asset Amount in USDC e.g. 250"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
          />
          <input
            placeholder="Asset Colour e.g. Black, White etc. "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, colour: e.target.value })}
          />

          <br />

          <div className="MintNFT text-black text-xl">
            <form >
              <h3>Select an image</h3>
              <input type="file" onChange={handleFileUpload} className="text-black mb-2 border rounded  text-xl" />
              
            </form>
            {txStatus && <p>{txStatus}</p>}
            
            {metaDataURL && <p className="text-blue"><a href={metaDataURL} className="text-blue">Metadata on IPFS</a></p>}
            
            {txURL && <p><a href={txURL} className="text-blue">See the mint transaction</a></p>}
           
            {errorMessage}

            {imageView && (
            <img
              className="mb-10"
              title="File"
              src={imageView}
              alt="File preview"
              frameBorder="0"
              scrolling="auto"
              height="50%"
              width="100%"
            />
            )}

          </div>

          <button type="button" sx={{ backgroundColor : 'primary', }} onClick={(e) => mintNFTFile(e, uploadedFile)} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Create Asset
          </button>
        </div>
      </div>
    </Box>

  );
};
export default Mint;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
