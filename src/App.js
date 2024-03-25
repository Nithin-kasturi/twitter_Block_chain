import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { con } from './config';
import './App.css';
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import Feed from "./Feed";
export default function Home() {
  const [currentAccount,setCurrentAccount]=useState('');
  const [correctNetwork,setCorrectNetwork]=useState(false);
  const connectMetamask=async()=>{
    try{
      if(!window.ethereum){
        alert("Download and Install Metamask");
        return;
      } 
      else{
        const eth_chainId=await window.ethereum.request({method:'eth_chainId'});
        if(eth_chainId!='0xaa36a7'){
          alert("Connect to sepolia test network");
          setCorrectNetwork(false);
          return;
        }
        else{
          setCorrectNetwork(true);
        }
      }
      const accounts=await window.ethereum.request({method:'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);

    }
    catch(e){
      console.log(e);
    }
  }
  // Checks if wallet is connected to the correct network
  const checkCorrectNetwork = async () => {
    const { ethereum } = window
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log('Connected to chain:' + chainId)
    if(chainId!='0xaa36a7'){
      alert("Connect to sepolia test network");
      setCorrectNetwork(false);
      return;
    }
    else{
      setCorrectNetwork(true);
    }
  }
  useEffect(()=>{
    connectMetamask();
    checkCorrectNetwork();
    
  },[])
  return (
    <div>
    {currentAccount === '' ? (
      <button
      className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={connectMetamask}
      >
      Connect Wallet
      </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Sepolia Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>

  )
}
