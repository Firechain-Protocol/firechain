/** @jsxRuntime classic */
/** @jsx jsx */

import React, { useState } from "react";
import { jsx, Box } from 'theme-ui';
import { NFTStorage } from "nft.storage";
import { useRouter } from 'next/router'
import { ethers } from "ethers";
import Web3Modal from "web3modal";
// import axios from 'axios'
// import { rgba } from 'polished';
import { Wallet, providers } from "ethers";

import 'dotenv/config';
import fileNFT from "../../artifacts/contracts/autorecover.sol/FileNFT.json";
import { fileShareAddress } from "../../config";
// const APIKEY = [process.env.NFT_STORAGE_API_KEY];
const APIKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4Zjc4ODAwMkUzZDAwNEIxMDI3NTFGMUQ0OTJlNmI1NjNFODE3NmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MzA1NjE4NzM4MCwibmFtZSI6InBlbnNpb25maSJ9.agI-2V-FeK_eVRAZ-T6KGGfE9ltWrTUQ7brFzzYVwdM";

const MintBounty = () => {
  const navigate = useRouter();
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState();
  const [uploadedFile2, setUploadedFile2] = useState();
  const [uploadedFile3, setUploadedFile3] = useState();
  const [imageView, setImageView] = useState();
  const [metaDataURL, setMetaDataURl] = useState();
  const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [formInput, updateFormInput] = useState({ name: "", description: "", make: "", model: "", vin: "", price: "", year: "", colour: "" });

  const handleFileUpload = (event) => {
    console.log("file1 for upload selected...");
    setUploadedFile(event.target.files[0]);
    setTxStatus("");
    setImageView("");
    setMetaDataURl("");
    setTxURL("");
  };
  const handleFileUpload2 = (event) => {
    console.log("file2 for upload selected...");
    setUploadedFile2(event.target.files[0]);
  };
  const handleFileUpload3 = (event) => {
    console.log("file3 for upload selected...");
    setUploadedFile3(event.target.files[0]);
  };

  const uploadNFTContent = async (inputFile, inputFile2, inputFile3) => {
    const { name, description, make, model, vin, year, colour, price } = formInput;
    
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

    if (!name || !description || !make || !model || !vin || !year || !colour || !price || !inputFile) return;
    const nftStorage = new NFTStorage({ token: APIKEY, });
    try {
      console.log("Trying to upload file to ipfs");
      setTxStatus("Uploading Item to IPFS & Filecoin via NFT.storage.");
      console.log("close to metadata");
      const metaData = await nftStorage.store({
        name: name,
        description: description,
        image: inputFile,
        properties: {
          address,
          make,
          model,
          vin,
          price,
          year,
          colour,
          image2: inputFile2,
          image3: inputFile3
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

  const sendTxToBlockchain = async (metadata) => {
    try {
      setTxStatus("Adding transaction to Polygon Mumbai Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);

      const connectedContract = new ethers.Contract(fileShareAddress, fileNFT.abi, provider.getSigner());
      console.log("Connected to contract", fileShareAddress);
      console.log("IPFS blockchain uri is ", metadata.url);

      const mintNFTTx = await connectedContract.createFile(metadata.url);
      console.log("File successfully created and added to Blockchain");
      await mintNFTTx.wait();
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Polygon Mumbai.");
      console.log(error);
    }
  };

  const previewNFT = (metaData, mintNFTTx) => {
    console.log("getIPFSGatewayURL2 two is ...");
    const imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);
    //const img2ViewString = getIPFSGatewayURL(metaData.data.image2.pathname);
    //const img3ViewString = getIPFSGatewayURL(metaData.data.image3.pathname);
    console.log("image ipfs path is", imgViewString);
    //console.log("image2 ipfs path is", img2ViewString);
    //console.log("image3 ipfs path is", img3ViewString);
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));
    setTxURL(`https://mumbai.polygonscan.com/tx/${mintNFTTx.hash}`);
    setTxStatus("File addition was successfully!");
    console.log("File preview completed");
  };

  const mintNFTFile = async (e, uploadedFile, uploadedFile2, uploadedFile3) => {
    e.preventDefault();
    // 1. upload File content via NFT.storage
    const metaData = await uploadNFTContent(uploadedFile, uploadedFile2, uploadedFile3);

    // 2. Mint a NFT token on Polygon
    const mintNFTTx = await sendTxToBlockchain(metaData);

    // 3. preview the minted nft
   previewNFT(metaData, mintNFTTx);

    //4. Mint Reward
     mintReward();

    //5. navigate("/explore");
    navigate.push('/dashboard');
  };
  async function CarDetails() {
    /* Link to Library Categories */
    // router.push("/catebooks");
    navigate("/carDetails");
  }

           // NFTPort Reward NFT code here
           async function mintReward() {
            const { ethereum } = window;
            const accounts = await ethereum.request({
              method: 'eth_requestAccounts',
            });
  
            console.log('Connected', accounts[0]);
            //const playerAccount = deploy;
  
  
            const options = {
              method: 'POST',
              url: 'https://api.nftport.xyz/v0/mints/easy/urls',
              headers: { 'Content-Type': 'application/json', Authorization: '768bfb7a-087d-4ee1-8bb0-5498cc36ad46' },
              data: {
                chain: 'polygon',
                name: 'AutoRecover',
                description: 'Reward for creating bounty',
              // using IPFS to pin reward NFT 
                file_url: 'https://bafkreievjsq4glmoz4lzvwob6yfsaifpbufsnj47oz47ml4oa6dh4enhbi.ipfs.nftstorage.link/',
                mint_to_address: accounts[0],
              },
            };
        
            axios.request(options).then((response) => {
              console.log(response.data);
            }).catch((error) => {
              console.error(error);
            });
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
        <h1> Create Bounty</h1>
      </div>
      <div className="flex justify-center bg-blue-100">
        <div className="w-1/2 flex flex-col pb-12 ">
        <input
            placeholder="Enter Bounty Name e.g. bounty for 2011 Toyota VENZA"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Description of Vehicle"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, description: e.target.value })}
            rows={2}
          />
          <input
            placeholder="Bounty Amount in USD e.g. $250"
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, price: e.target.value })}
          />
        <input
            placeholder="Vehicle Make e.g. Mercedes, Ford, Toyota, Honda etc. "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, make: e.target.value })}
          />
        <input
            placeholder="Vehicle Model e.g. Camry, Civic, Highlander etc. "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, model: e.target.value })}
          />
          <input
            placeholder="VIN Vehicle Identification Number e.g.1C4GJWAG0DL544058 "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, vin: e.target.value })}
          />
          <input
            placeholder="Vehicle year e.g. 2012, 2016 etc. "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, year: e.target.value })}
          />
          <input
            placeholder="Vehicle Colour e.g. Black, White etc. "
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, colour: e.target.value })}
          />

          <br />

          <div className="MintNFT text-black text-xl">
            <form >
              <h3>Select picture 1</h3>
              <input type="file" onChange={handleFileUpload} className="text-black mb-2 border rounded  text-xl" />
              <h3>Select picture 2</h3>
              <input type="file" onChange={handleFileUpload2} className="text-black mb-2 border rounded  text-xl" />
              <h3>Select picture 3</h3>
              <input type="file" onChange={handleFileUpload3} className="text-black mb-2 border rounded  text-xl" />
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

          <button type="button" sx={{ backgroundColor : 'primary', }} onClick={(e) => mintNFTFile(e, uploadedFile, uploadedFile2, uploadedFile3)} className="font-bold mt-20 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Publish Bounty
          </button>
        </div>
      </div>
    </Box>

  );
};
export default MintBounty;

const styles = {
  section: {
    backgroundColor: 'primary',
    pt: [17, null, null, 20, null],
    pb: [6, null, null, 12, 16],
  },
};
