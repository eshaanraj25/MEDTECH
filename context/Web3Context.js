import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";

import CONTRACT_JSON from "../contract/PatientContract.json";
import { patientAddress } from "../contract/contractAddress";

const abi = CONTRACT_JSON.abi;

export const PatientContext = React.createContext();

let ethereum;
if (typeof window !== "undefined") {
  ethereum = window.ethereum;
}

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const patientContract = new ethers.Contract(patientAddress, abi, signer);

  return patientContract;
};

const Web3Provider = (props) => {
  const [currentAccount, setCurentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask!!");
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurentAccount(accounts[0]);
        console.log(accounts);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethreum object.");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethreum object.");
    }
  };

  const getPatient = async () => {
    try {
      if (!ethereum) return alert("Please connect to eth");
      const contract = getContract();
      const data = await contract.getPatient();
      if (data.name === "") return null;
      return data;
    } catch (err) {
      console.log("err", err);
      alert(err);
    }
  };
  const createPatientWeb3 = async (name, dob, rID) => {
    try {
      if (!ethereum) return alert("Please connect to eth");
      const contract = getContract();
      const data = await contract.createPatient(name, dob, rID);
      if (data.name === "") return null;
      return data;
    } catch (err) {
      console.log("err", err);
      alert(err);
    }
  };
  // const sendTransaction = async () => {
  //   try {
  //     if (!ethereum) return alert('Please install metamask');

  //     const { addressTo, amount, keyword, message } = formData;
  //     const transactionsContract = getEthereumContract();
  //     const parsedAmount = ethers.utils.parseEther(amount);

  //     await ethereum.request({
  //       method: 'eth_sendTransaction',
  //       params: [
  //         {
  //           from: currentAccount,
  //           to: addressTo,
  //           gas: '0x5208', // 21000 gwei
  //           value: parsedAmount._hex,
  //         },
  //       ],
  //     });

  //     const transactionHash = await transactionsContract.addToBlockchain(
  //       addressTo,
  //       parsedAmount,
  //       message,
  //       keyword
  //     );

  //     setIsLoading(true);
  //     console.log(`Loading - ${transactionHash.hash}`);
  //     // this will wait for the transaction to be over
  //     await transactionHash.wait();
  //     console.log(`Success - ${transactionHash.hash}`);
  //     setIsLoading(false);

  //     const transactionsCount =
  //       await transactionsContract.getTransactionCount();

  //     setTransactionCount(transactionsCount.toNumber());
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error('No ethreum object.');
  //   }
  // };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <PatientContext.Provider
      value={{
        connectWallet,
        currentAccount,
        getPatient,
        createPatientWeb3,
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};

export default Web3Provider;

export const useWeb3Context = () => {
  return useContext(PatientContext);
};
