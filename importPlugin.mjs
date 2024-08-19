import PluginTxNoFees from "./index.mjs";
import { Web3 } from "web3";

const web3 = new Web3();
web3.registerPlugin(new PluginTxNoFees());

async function main() {
  const wallet = web3.eth.wallet.add("0x1dc0bca5325fb16c9a31859e8ab2f3bbab0bda45d7b12b8d2bfc9ec6d95bd131");

  const tx = {
    from: wallet[0].address,
    to: "0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F",
    value: 1,
    gas: 500000,
    gasPrice: await web3.eth.getGasPrice(),
    nonce: await web3.eth.getTransactionCount(wallet[0].address),
  };

  await web3.gasless.sign(tx);
}

main();
