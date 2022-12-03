export const batchTransaction = async (txnArray, wallet) => {
  try {
    console.log("Batching transactions");

    const feeQuotes = await wallet.prepareRefundTransactionBatch({
      transactions: txnArray,
    });

    // making transaction with version, set feeQuotes[1].tokenGasPrice = 6
    const transaction = await wallet.createRefundTransactionBatch({
      transactions: txnArray,
      feeQuote: feeQuotes[1],
    });

    console.log("transaction", transaction);

    let gasLimit = {
      hex: "0x1E8480",
      type: "hex",
    };
    // send transaction internally calls signTransaction and sends it to connected relayer
    const txHash = await wallet.sendTransaction({
      tx: transaction,
      gasLimit,
    });
    
    console.log(txHash);
    return txHash;

  } catch (err) {
    console.error(err);
    throw err;
  }
};
