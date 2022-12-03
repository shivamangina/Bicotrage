import { TxBuilderV2, Network, Market } from "@aave/protocol-js";

export const aaveDeposit = async (web3Provider, token, value, decimals, recipient) => {
  const txBuilder = new TxBuilderV2(Network.m, web3Provider);

  const lendingPool = txBuilder.getLendingPool(Market.main); // get all lending pool methods

  lendingPool.deposit({
    user: , // string,
    reserve, // string,
    amount, // string,
    
  });
};
