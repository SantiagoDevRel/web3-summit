import { FMT_BYTES, FMT_NUMBER, Web3PluginBase, eth, utils } from "web3";
import hexer from "browser-string-hexer";

export default class PluginTxNoFees extends Web3PluginBase {
  pluginNamespace = "gasless";

  async sign(tx1) {
    console.log("signing");

    const accounts = await this.requestManager.send({
      method: "eth_requestAccounts",
      params: [],
    });

    const gasPrice = await eth.getGasPrice(this, FMT_NUMBER.STR);
    const nonce = await eth.getTransactionCount(this, accounts[0], undefined, FMT_NUMBER.STR);
    const chainId = await eth.getChainId(this, FMT_NUMBER.NUMBER);

    const txObject = {
      from: accounts[0],
      to: "0xEA9eEca67682Cd9c6Ce3DdD1681049D7A897289F",
      value: 1,
      gas: 500000,
      gasPrice,
      nonce,
    };

    console.log(txObject);
    const gasPriceInNumber = utils.toDecimal(gasPrice).toString();
    const nonceInNumber = utils.toDecimal(nonce).toString();
    const chainIdInNumber = utils.toDecimal(chainId).toString();

    console.log("chain id", chainIdInNumber);
    console.log("from", txObject.from, "to", txObject.to, "value", txObject.value.toString(), "gas", txObject.gas.toString(), "gasprice", gasPriceInNumber, "nonce", nonceInNumber);
    const typedData = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Transaction: [
          { name: "from", type: "address" },
          { name: "to", type: "address" },
          { name: "value", type: "uint256" },
          { name: "gas", type: "uint256" },
          { name: "gasPrice", type: "uint256" },
          { name: "nonce", type: "uint256" },
        ],
      },
      primaryType: "Transaction",
      domain: {
        name: "Transaction Request",
        version: "1",
        chainId: chainIdInNumber,
        verifyingContract: "0x0000000000000000000000000000000000000000",
      },
      message: {
        from: txObject.from,
        to: txObject.to,
        value: txObject.value.toString(),
        gas: txObject.gas.toString(),
        gasPrice: gasPriceInNumber,
        nonce: nonceInNumber,
      },
    };

    const signature = await window.ethereum.request({
      method: "eth_signTypedData_v4",
      params: [accounts[0], JSON.stringify(typedData)],
    });

    console.log("Typed Data Signature:", signature);
  }
}
