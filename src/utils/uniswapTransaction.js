import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers } from "ethers";
import JSBI from "jsbi";
import { Percent } from "@uniswap/sdk-core";

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

export const buildUniswapTransaction = async (web3Provider, recipient, token1config, token2config) => {
  const router = new AlphaRouter({ chainId: 5, provider: web3Provider });

  const token1 = new Token(5, "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", 18, "WETH", "Wrapped Ether");

  const token2 = new Token(5, "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF", 6, "USDC", "USD//C");

  const typedValueParsed = "100000000000000";

  const wethAmount = CurrencyAmount.fromRawAmount(WETH, JSBI.BigInt(typedValueParsed)); // check this

  const route = await router.route(wethAmount, USDC, TradeType.EXACT_INPUT, {
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
