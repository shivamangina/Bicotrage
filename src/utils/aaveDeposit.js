import { TxBuilderV2, Network, Market } from "@aave/protocol-js";
import { ethers } from "ethers";

export const aaveDeposit = async (web3Provider, userAddress, amount, decimal,assetAddress) => {
  const txBuilder = new TxBuilderV2(Network.m, web3Provider);

  const lendingPool = txBuilder.getLendingPool(Market.main); // get all lending pool methods

  lendingPool.deposit({
    user: userAddress, // string,
    reserve: assetAddress, // string,
    amount: ethers.utils.parseUnits(amount, decimal), // string,
  });
};
