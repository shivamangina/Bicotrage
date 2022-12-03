import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import JSBI from "jsbi";
import { Percent } from "@uniswap/sdk-core";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const buildUniswapTransaction = async (web3Provider, recipient, token1config, token2config, amount) => {
  const router = new AlphaRouter({ chainId: 5, provider: web3Provider });

  const token1 = new Token(5, token1config.address, token1config.decimal, token1config.symbol, token1config.name);

  const token2 = new Token(5, token2config.address, token2config.decimal, token2config.symbol, token2config.name);

  const token1Amount = CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(ethers.utils.parseUnits(amount,token1config.decimal)));
  console.log("token1Amount: ", token1Amount);

  const route = await router.route(token1Amount, token2, TradeType.EXACT_INPUT, {
    recipient: recipient,
    slippageTolerance: new Percent(5, 100),
    deadline: Math.floor(Date.now() / 1000 + 1800),
  });

  console.log(`Quote Exact In: ${route?.quote.toFixed(2)}`);
  console.log(`Gas Adjusted Quote In: ${route?.quoteGasAdjusted.toFixed(2)}`);
  console.log(`Gas Used USD: ${route?.estimatedGasUsedUSD.toFixed(6)}`);

  const uniswapTx = {
    data: route?.methodParameters?.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: ethers.BigNumber.from(route?.methodParameters?.value),
    from: recipient,
    gasPrice: ethers.BigNumber.from(route?.gasPriceWei),
  };

  console.log(uniswapTx);

  const tx2 = {
    to: uniswapTx.to,
    data: uniswapTx.data,
  };

  return tx2;
};
