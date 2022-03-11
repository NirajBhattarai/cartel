import { Injectable } from '@angular/core';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import Web3 from 'web3';
declare const window: any;
const chainAddress = '0x4';
const rpcurl = 'wss://rinkeby.infura.io/ws/v3/0c4614c66b244dc9a975984b0cf0934a';
const remoteweb3 = new Web3(rpcurl);
const NFTAddress = '0x183fFA95BEb0E1d2630CA57C6F1151C58bBA317F';
const amountMultiply = 80000000000000000;

const TokenAbis = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'numberOfTokens',
        type: 'uint256',
      },
    ],
    name: 'mintCartel',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MintService {
  constructor() {}
  public isConnected = false;
  public walletAddress = '';
  public isNetworkError = false;
  public totalMinted = 0;

  public connector;
  public isWallectConnected = false;

  cryptoAlien = new remoteweb3.eth.Contract(
    [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    NFTAddress
  ).methods;

  loadContract() {
    return new window.web3.eth.Contract(TokenAbis, NFTAddress);
  }

  async connectToMetaMask() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' }).then(
        (response: any) => {
          this.getChainId(response);
        },
        (error: any) => {
          this.isConnected = false;
        }
      );
    } else {
      return;
    }
  }

  async getTotal() {
    await this.cryptoAlien
      .totalSupply()
      .call()
      .then((response: any) => {
        this.totalMinted = response;
      });
  }

  async mint(inputValue) {
    this.checkWalletConnected();
    const contract = await this.loadContract();
    const methods = await contract.methods;
    return await methods
      .mintCartel(
        Number(inputValue)
      )
      .send({
        from: window.web3.currentProvider.selectedAddress,
        value: Number(inputValue) * amountMultiply,
      });
  }

  setWalletAddress() {
    let responseString = window.web3.currentProvider.selectedAddress;
    let splittedAddress =
      responseString.substring(0, 7) +
      '...' +
      responseString.substring(responseString.length - 3);
    this.walletAddress = splittedAddress;
    console.log(this.walletAddress);
  }

  async getChainId(userAddresses: any) {
    window.ethereum.request({ method: 'eth_chainId' }).then((response: any) => {
      if (response === chainAddress) {
        this.setWalletAddress();
        this.isNetworkError = false;
        this.isConnected = userAddresses.length == 0 ? false : true;
      } else if (userAddresses.length > 0) {
        this.isConnected = userAddresses.length == 0 ? false : true;
        this.isNetworkError = true;
      }
    });
  }

  async connectWalletConnect() {
    this.connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org', // Required
      qrcodeModal: QRCodeModal,
    });
    if (!this.connector.connected) {
      // create new session
      this.connector.createSession();
    }

    // Subscribe to connection events
    this.connector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }
      this.isWallectConnected = true;

      console.log(payload);
    });
    console.log(this.connector);
  }

  async mintFromWalletConnect(inputValue) {
    const methods = await this.loadContract().methods;
    // Progress notification display

    const data = methods
      .mintCartel( Number(inputValue))
      .encodeABI();

    const tx = {
      from: this.connector._accounts[0], // Required
      to: NFTAddress,
      data,
      value: Number(inputValue) * amountMultiply + '',
    };

    this.connector
      .sendTransaction(tx)
      .then((result) => {
        // Returns transaction id (hash)
        console.log(result);
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error);
        alert(error);
      });
    console.log(tx);
    console.log(this.connector._accounts);
  }

  checkWalletConnected() {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  }
}
