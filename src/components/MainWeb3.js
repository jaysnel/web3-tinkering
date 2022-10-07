import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import WalletInstalled from "./WalletInstalled"
import Button from './Button';

export default function MainWeb3() {
  const [walletInstalled, setWalletInstalled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingText, setIsLoadingText] = useState('We don\'t detect a wallet in this browser.')
  const checkForWallet = async () => {
      setIsLoadingText('Checking for wallet...')
      
      // A Web3Provider wraps a standard Web3 provider, which is
      // what MetaMask injects as window.ethereum into each page
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log('Provider: ', provider)
  
      // requesting permission to connect users accounts from wallet
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner()
      console.log('Signer: ', signer)
      signer ? setWalletInstalled(true) : setWalletInstalled(false)
      // code seems to stop here if 
      // no wallet is installed and 
      // nothing further will run...
      //Interesting...but i like it
      setIsLoading(false)
      // console.log('Signer Data: ', signer)

      const signerAddress = await signer.getAddress()
      console.log('Signer Address: ', signerAddress)
      const signerBalance = await signer.getBalance()
      console.log('Signer Balance: ', ethers.utils.formatEther( signerBalance ))
  
      // Look up the current block number
      const currentBlockNumber = await provider.getBlockNumber()
      console.log('Current Block Number: ', currentBlockNumber)
    }
    
  return (
    <div>
      <h1>Web3 Project</h1>
      {isLoading && <h2>{isLoadingText}</h2>}
      {!isLoading && <WalletInstalled walletInstalled={walletInstalled}/>}
      <Button buttonText='Connect Wallet' buttonColor='green' buttonFunction={checkForWallet}/>
    </div>
  )
}
