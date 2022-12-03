import { TxBuilderV2, Network, Market } from "@aave/protocol-js";

export const aaveBorrow = async (web3Provider, token, value, decimals, recipient) => {
  const txBuilder = new TxBuilderV2(Network.m, web3Provider);

  const lendingPool = txBuilder.getLendingPool(Market.main); // get all lending pool methods


  
  lendingPool.borrow({
     user, // string,
     reserve, // string,
     amount, // string,
     interestRateMode:'Stable', // InterestRate;
     debtTokenAddress, // ? string;
     onBehalfOf, // ? string;
     referralCode, // ? string;
  });
};
