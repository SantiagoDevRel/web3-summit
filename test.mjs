import { Web3 } from "web3";

const web3 = new Web3("https://endpoints.omniatech.io/v1/zksync-era/sepolia/public");

const wallet = web3.eth.wallet.add("0x1dc0bca5325fb16c9a31859e8ab2f3bbab0bda45d7b12b8d2bfc9ec6d95bd131");

const tx = {
  from: wallet[0].address,
  to: "0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F",
  value: 1,
  gas: 500000,
  gasPrice: await web3.eth.getGasPrice(),
  nonce: await web3.eth.getTransactionCount(wallet[0].address),
};

async function sign() {
  const signature = await wallet[0].signTransaction(tx);
  console.log(signature);
}

//sign();

async function send() {
  const rawSignature = "0xcc45af494f0346926617a1021f63c90e3649221568a72fee7cc3b12bb6fe067d72ac8f64c1441b73531f801bd35cfa5fa7f86ee27ac9932c1625b48951a856431c";

  web3.eth.sendSignedTransaction(rawSignature);
}
send();

/* 
mainnet
0xf86480848341c05b8307a12094ea9eeca67682cd9c6ce3ddd1681049d7a897289f018025a09783c0b59de907203325a2ef28f350451eb377d2b3724b45783b74c5227325e7a0413906ab62d88ebe6f6bc48d9abf96cd5da2ea5be0c02893a5b73033ee472190

sepolia
0xf8692f8501a50b99708307a12094ea9eeca67682cd9c6ce3ddd1681049d7a897289f01808401546d71a0a99dc33a37a37c89b2bf03e87ba99a378eead3cf5fbf027a440c1bd11d3b39a9a0279250f3f464e68edf1384a6726defadc722727fd6f58490173a08c58e3572ed

zksync sepolia
0xf8668084017d78408307a12094ea9eeca67682cd9c6ce3ddd1681049d7a897289f018082027ba0a8082683b2ba73073c01fab315c0bfe61009019748fa8fe1d3d0d7b2eadf11e0a007eddbb0e0deffd3f9e8352309bc5c8883c19bd42311329510572237d8cf92c6

*/
