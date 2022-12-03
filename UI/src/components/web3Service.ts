import { ethers } from 'ethers';
import Constant from '../wrapper/config/Constant';

declare var window: any;

let signatureMessage1 = 'DataQuest wants you to sign in with your Ethereum account: \n\n';
let signatureMessage2 =
  '\n\n\nBy signing this transaction you are allowing DataQuest to see the following: your wallet address. \n\nURI: https://dapplooker.com \nVersion: 1 \nChain ID: 1 \nIssued At:';
let userWalletAddress = '';

const changeNetwork = () => {
  try {
    if (!window.ethereum) throw new Error('No crypto wallet found');
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: '0x13881',
        },
      ],
    });
  } catch (err: any) {
    return err.code;
  }
};

let provider: any;

const getProvider = () => {
  if (window.ethereum !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  }
};

async function signMessage() {
  let success = false;
  try {
    await getProvider();
    let mydate = new Date().toLocaleString();
    const signer = provider.getSigner();
    const message = signatureMessage1 + signatureMessage2 + mydate;

    let signature = await signer.signMessage(message);
    let address = ethers.utils.verifyMessage(message, signature);
    success = true;
  } catch (err) {}
  localStorage.setItem('userWalletAddress', userWalletAddress);
  return success;
}

///***********CHECK NETWORK*************////

const checkNetwork = () => {
  if (window.ethereum !== 'undefined') {
    let networkKey = window.ethereum.networkVersion;
    return networkKey;
  }
};

export const metamaskLogin2 = async () => {
  console.log('*888888888888888888888888');
  ///***********CHECK NETWORK LOGIC*************////
  if (window.ethereum !== 'undefined') {
    let networkKey = window.ethereum.networkVersion;
    if (networkKey !== 80001) {
      ///***********CHANGING NETWORK LOGIC*************////

      try {
        if (!window.ethereum) throw new Error('No crypto wallet found');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: '0x13881',
            },
          ],
        });
      } catch (err: any) {
        return err.code;
      }
    }
  }
  if (window.ethereum && window.ethereum.isMetaMask) {
    await window.ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((result: any) => {
        userWalletAddress = result[0];
        console.log(result[0]);
        // accountChangedHandler(result[0]);
        // setLoginWithMetamask("Wallet Connected");
      })
      .catch((error: any) => {
        // setErrorMessage(error.message);
      });
  } else {
    // setErrorMessage("Please install MetaMask browser extension to interact");
  }
  await signMessage();
};

// const executeMetamaskTransactions = async () => {
//   const transactionParameters = {
//     nonce: '0x00', // ignored by MetaMask
//     gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
//     gas: '0x2710', // customizable by user during MetaMask confirmation.
//     to: Constant.dataQuestcontract, // Required except during contract publications.
//     from: window.ethereum.selectedAddress, // must match user's active address.
//     value: '0x00', // Only required to send ether to the recipient from the initiating external account.
//     data: '', // Optional, but used for defining smart contract creation and interaction.
//     chainId: Constant.chainID, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
//   };
//   await window.ethereum.request({
//     method: 'eth_sendTransaction',
//     params: [transactionParameters],
//   });
// };
