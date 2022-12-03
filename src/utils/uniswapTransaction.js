import { CurrencyAmount, Token, TradeType } from "@uniswap/sdk-core";
import { RestRelayer } from "@biconomy/relayer";

export const buildUniswapTransaction = async (from, to, amount, gasPrice, gasLimit, data, nonce) => {

    const ethersProvider = new ethers.providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/d126f392798444609246423b06116c77"
      );
      
      
      const router = new AlphaRouter({ chainId: 5, provider: ethersProvider });
      
      const WETH = new Token(
        5,
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        18,
        "WETH",
        "Wrapped Ether"
      );
      
      const USDC = new Token(
        5,
        "0xb5B640E6414b6DeF4FC9B3C1EeF373925effeCcF",
        6,
        "USDC",
        "USD//C"
      );

      const relayer = new RestRelayer({
        url: "https://sdk-relayer.staging.biconomy.io/api/v1/relay",
        socketServerUrl:
          "wss://sdk-testing-ws.staging.biconomy.io/connection/websocket",
      });
  
      wallet.setRelayer(relayer);
      

}