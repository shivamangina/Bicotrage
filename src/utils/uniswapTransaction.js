import { CurrencyAmount, Token, TradeType, Fetcher, WETH } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import JSBI from "jsbi";
import { Percent } from "@uniswap/sdk-core";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const buildUniswapTransaction = async (web3Provider, recipient, token1config, token2config, amount) => {
  const router = new AlphaRouter({ chainId: 5, provider: web3Provider });

  const token1 = new Token(5, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", 18, "WETH", "Wrapped Ether");

  const token2 = new Token(5, "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF", 6, "USDC", "USD//C");

  const dai = await Fetcher.fetchTokenData(5, token1config.address, web3Provider);
  console.log("dai: ", dai);
  const weth = WETH[5];
  const pair = await Fetcher.fetchPairData(dai, weth, web3Provider);
  console.log("pair: ", pair);

  const token1Amount = CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(amount)); 

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
