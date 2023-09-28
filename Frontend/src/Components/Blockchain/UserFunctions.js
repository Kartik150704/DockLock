import React, { useState, useEffect } from 'react';
import Web3 from "web3"
import { stringToHash } from '../Cryptography/Cryptography';
import MyContractABI from './FileStorage.json';
const contractAddress = "0x72a0e822Bc17EA1e00f8F796e306A1E546af4c7b";
const privateKeyBlockchain = "0dcec4ef225bc7e6627706325c851919fc184d673d0b344ca79249548f6b9507";
MyContractABI = MyContractABI.abi
async function initialize() {


    const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/223458eb1e534a6e9f3ca05bb3658cd3`));
    const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKeyBlockchain);
    web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);


    const contractWithPrivateKey = new web3WithPrivateKey.eth.Contract(MyContractABI, contractAddress);
    return contractWithPrivateKey;








}
const StoreToBlockchain = async (userData) => {

    console.log(userData)
    const contract=await initialize();
    let response=await contract.methods.addObject(userData.DocumentHash,userData.signature,userData.IssuerName,userData.IssuerGmail,userData.CollectorName,userData.DocId)
    .send({
        from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
        gas: 20000000
      })

      return response;


}

const StoreDataReference=async (privateKey,DocID,DocumentReference)=>
{
    const contract=await initialize();
    let hash=await stringToHash(privateKey+DocID);
    let response=await contract.methods.setDocumentReference(hash,DocumentReference)
    .send({
        from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
        gas: 20000000
      })

      return response;
}

const GetDataReference=async (privateKey,DocId)=>
{
    const contract=await initialize();
    let key=await  stringToHash(privateKey+DocId)
  
    let ReferenceLink=await contract.methods.getDocumentReference(key).call();

    return ReferenceLink


}

const getDocumentDataFromBlockchain=async (documentHash)=>
{
    const contract=await initialize();
    let key=documentHash;
    let documentData=await contract.methods.getObject(key).call()

    return documentData;
}

export { StoreToBlockchain ,StoreDataReference,GetDataReference,getDocumentDataFromBlockchain}