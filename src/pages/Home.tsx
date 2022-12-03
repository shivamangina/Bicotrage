/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState, Fragment } from "react";
import Card from "./Card";
import Stepper from "./Stepper";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { RestRelayer } from "@biconomy/relayer";
import { useWeb3AuthContext } from "../biconomy/contexts/SocialLoginContext";
import { useSmartAccountContext } from "../biconomy/contexts/SmartAccountContext";
import { approveTransaction } from "../utils/approveTransaction";
import { buildUniswapTransaction } from "../utils/uniswapTransaction";
import { batchTransaction } from "../utils/batchTransaction";
import tokensJson from "../biconomy/utils/configs/contractsInfo.json";

function Home() {
  const initialSteps = [
    {
      id: 1,
      name: "AAVE",
      description: "Buy Flash Loan",
      status: "complete",
      method: "Borrow",
      token: "USDC",
      amount: 1000,
      logo: "https://assets-stg.transak.com/images/cryptoCurrency/usd-coin_small.png",
    },
    {
      id: 2,
      name: "UniSwap",
      description: "Swap your currency",
      status: "current",
      method: "Swap",
      token: "DAI",
      amount: 1000,
      logo: "https://assets-stg.transak.com/images/cryptoCurrency/dai_small.png",
    },
    {
      id: 3,
      name: "AAVE",
      description: "Repay the Loan",
      method: "Repay",
      token: "DAI",
      amount: 1000,
      logo: "https://assets-stg.transak.com/images/cryptoCurrency/dai_small.png",
    },
  ];

  const tokenJson: any = tokensJson;
  const initialTokens: any = Object.keys(tokenJson).map((key) => tokenJson[key]);

  const people = [
    {
      exchange: "AAVE",
      methods: [
        {
          description: "Buy Flash Loan",
          method: "Borrow",
        },
        {
          description: "Repay Flash Loan",
          method: "Repay",
        },
      ],
    },
    {
      exchange: "Uniswap",
      methods: [
        {
          description: "Swap your currency",
          method: "Swap",
        },
      ],
    },
  ];

  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(initialSteps);
  const [tokens, setTokens] = useState(initialTokens);
  const { provider, web3Provider } = useWeb3AuthContext();
  const { state: walletState, wallet } = useSmartAccountContext();
  const [txnArray, setTxnArray] = useState([]);

  useEffect(() => {
    const relayer = new RestRelayer({
      url: "https://sdk-relayer.staging.biconomy.io/api/v1/relay",
      socketServerUrl: "wss://sdk-testing-ws.staging.biconomy.io/connection/websocket",
    });

    if (wallet) {
      console.log("Relayer is set");
      wallet.setRelayer(relayer);

      wallet
        .getAlltokenBalances({
          chainId: 5, // chainId of your choice
          eoaAddress: wallet.address,
          tokenAddresses: ["0x0000000000000000000000000000000000000000", "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"],
        })
        .then((balance) => {
          console.log("balance", balance);
        });
    }
  }, [wallet]);

  const onExecute = async () => {
    console.log("Execute");
    console.log(steps, "steps");

    if (!wallet) return;

    const txs = [];

    // b0rrow

    // approve transaction
    const txAppApprove = approveTransaction(web3Provider, "chainlink", "2");
    txs.push(txAppApprove);

    // swaps
    const swapTx = buildUniswapTransaction(web3Provider, wallet.address, "chainlink", "dai", "2");
    txs.push(swapTx);

    // repay

    // batch transaction

  };

  const addNewStep = (name: string, method: string, description: string) => {
    const newStep = {
      id: steps.length + 1,
      name,
      description,
      method,
      status: "",
      token: "USDC",
      amount: 1000,
      logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    };
    setSteps([...steps, newStep]);
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const updateStepToken = (token: string, id: number) => {
    const selectedToken: any = tokens.find((tok: any) => tok.symbol === token);
    const newSteps: any = steps.map((one) => {
      if (one.id === id) {
        one.token = selectedToken.symbol;
        one.logo = selectedToken.image.small;
      }
      return one;
    });
    setSteps([...newSteps]);
    console.log(selectedToken, newSteps);
  };

  const updateStepAmount = (amount: number, id: number) => {
    const newSteps: any = steps.map((one) => {
      if (one.id === id) {
        one.amount = amount;
      }
      return one;
    });
    setSteps([...newSteps]);
  };

  const deleteStep = (id: number) => {
    let newSteps = steps;
    newSteps.splice(newSteps.findIndex(a => a.id === id), 1)
    setSteps([...newSteps]);
  };

  return (
    <>
      <section className="px-2 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-col items-center mt-3 text-center tails-selected-element">
            <span className="relative inline-flex w-full md:w-auto">
              <button
                onClick={openModal}
                type="button"
                className="inline-flex items-center justify-center w-full px-6 py-2 text-base font-bold leading-6 text-white bg-purple-600 border border-transparent rounded-md md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Add Step
              </button>
            </span>
            <br />
          </div>
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="container items-center">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-6">
                <Stepper steps={steps} />
                <Card steps={steps} tokens={tokens} updateStepToken={updateStepToken} updateStepAmount={updateStepAmount} deleteStep={deleteStep} />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-3 text-center tails-selected-element">
            <span className="relative inline-flex w-full md:w-auto">
              <button
                onClick={onExecute}
                type="button"
                className="inline-flex items-center justify-center w-full px-6 py-2 text-base font-bold leading-6 text-white bg-green-600 border border-transparent rounded-md md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Execute
              </button>
            </span>
            <br />
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10 " onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto ">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          onClick={() => setOpen(false)}>
                          <span className="sr-only">Close</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="container items-center max-w-6xl px-8 mx-auto">
                        <div>
                          <div className="text-center">
                            <h2 className="mt-2 text-lg font-medium text-gray-900">New Method</h2>
                          </div>
                          <form className="mt-6 sm:flex sm:items-center" action="#">
                            <label htmlFor="emails" className="sr-only">
                              Email addresses
                            </label>
                            <div className="relative rounded-md shadow-sm sm:min-w-0 sm:flex-1">
                              <input
                                type="text"
                                name="emails"
                                id="emails"
                                className="block w-full rounded-md border-gray-300 pr-32 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                placeholder="Search for Any Exchange Or Method"
                              />
                            </div>
                          </form>
                        </div>
                        <div className="mt-10">
                          <h3 className="text-sm font-medium text-gray-500">List of Exchanges</h3>
                          <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1">
                            {people.map((person, personIdx) => (
                              <div key={personIdx}>
                                <h2 className='className="text-base font-medium text-gray-900'>{person.exchange}</h2>
                                <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                  {person.methods.map((methodObj, id) => (
                                    <li key={id}>
                                      <button
                                        type="button"
                                        onClick={() => addNewStep(person.exchange, methodObj.method, methodObj.description)}
                                        className="group flex w-full items-center justify-between space-x-3 rounded-full border border-gray-300 p-2 text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        <span className="flex min-w-0 flex-1 items-center space-x-3">
                                          <span className="block flex-shrink-0"></span>
                                          <span className="block min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium text-gray-900">{methodObj.method}</span>
                                          </span>
                                        </span>
                                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center">
                                          <PlusIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                        </span>
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </section>
    </>
  );
}

export default Home;
function swapTransaction(web3Provider: import("@ethersproject/providers").Web3Provider | null, arg1: string, arg2: string, arg3: string) {
  throw new Error("Function not implemented.");
}
