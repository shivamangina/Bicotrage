import { ethers } from "ethers";
import { configInfo as config } from "../biconomy/utils";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const approveTransaction = async (web3Provider, token, value) => {
  const wethContract = new ethers.Contract(
    config.dai.address, // TODO:  user should select token from UI and pass it here
    config.dai.abi,
    web3Provider
  );

  const approveTx = await wethContract.populateTransaction.approve(
    V3_SWAP_ROUTER_ADDRESS,
    ethers.utils.parseEther("0.01") // value should be paddw
  );

  const tx1 = {
    to: config.dai.address,
    data: approveTx.data,
  };

  return tx1;
};
