import { ethers } from "ethers";
import { configInfo as config } from "../biconomy/utils";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const approveTransaction = async (web3Provider, token, value, decimals) => {
  const wethContract = new ethers.Contract(
    config[token].address, // TODO:  user should select token from UI and pass it here
    config[token].abi,
    web3Provider,
  );

  const approveTx = await wethContract.populateTransaction.approve(
    V3_SWAP_ROUTER_ADDRESS,
    ethers.utils.parseUnits(value, decimals), // value should be paddw
  );

  const tx1 = {
    to: config[token].address,
    data: approveTx.data,
  };

  return tx1;
};
