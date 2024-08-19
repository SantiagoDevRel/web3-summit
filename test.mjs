import { Web3, FMT_NUMBER } from "web3";

const web3 = new Web3("https://endpoints.omniatech.io/v1/zksync-era/sepolia/public");

async function sign() {
  const wallet = web3.eth.wallet.add("0x1dc0bca5325fb16c9a31859e8ab2f3bbab0bda45d7b12b8d2bfc9ec6d95bd131");

  const gasPrice = await web3.eth.getGasPrice(FMT_NUMBER.STR);
  const nonce = await web3.eth.getTransactionCount(wallet[0].address, undefined, FMT_NUMBER.STR);

  const txObject = {
    from: wallet[0].address,
    to: "0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F",
    value: 1,
    gas: 500000,
    gasPrice,
    nonce,
  };
  const signature = await wallet[0].signTransaction(txObject);
  console.log(signature);
}

sign();

async function send() {
  const rawSignature = "0x9127b2149430d0033e13ae4476bc88e831b23b215f7c1b8b6fbc202f1f487e905f3e7a53860f264c2d818cbd540867690b4a63a6173c8b37094b501d080501ea1b";

  web3.eth.sendSignedTransaction(rawSignature);
}
//send();

/* 

signTX
0xf8668084017d78408307a12094ea9eeca67682cd9c6ce3ddd1681049d7a897289f018082027ba0a8082683b2ba73073c01fab315c0bfe61009019748fa8fe1d3d0d7b2eadf11e0a007eddbb0e0deffd3f9e8352309bc5c8883c19bd42311329510572237d8cf92c6

Metamask Sign
0x9127b2149430d0033e13ae4476bc88e831b23b215f7c1b8b6fbc202f1f487e905f3e7a53860f264c2d818cbd540867690b4a63a6173c8b37094b501d080501ea1b

*/
