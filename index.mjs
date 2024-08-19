import { Web3PluginBase, eth } from "web3";

export default class PluginTxNoFees extends Web3PluginBase {
  pluginNamespace = "gasless";

  async sign(tx) {
    console.log("signing");

    super.link(this);

    //console.log(this.requestManager());

    console.log(await this.wallet[0].signTransaction(tx));
    /*   const signature = await eth.signTransaction(this, tx);
    console.log(signature); */
  }
}
