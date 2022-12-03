import React, { useEffect, useState, Fragment } from "react";
import { RestRelayer } from "@biconomy/relayer";
import Card from "./Card";
import Stepper from "./Stepper";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AddStep from "./AddStep";

import { useWeb3AuthContext } from "../biconomy/contexts/SocialLoginContext";
import { useSmartAccountContext } from "../biconomy/contexts/SmartAccountContext";

const steps = [
  {
    name: "AAVE",
    description: "Buy Flash Loan",
    status: "complete",
    method: "Borrow",
    token: "USDC",
    amount: 1000,
    logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
  },
  {
    name: "UniSwap",
    description: "Swap your currency",
    status: "current",
    method: "Swap",
    token: "USDC",
    amount: 1000,
    logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
  },
  {
    name: "AAVE",
    description: "Repay the Loan",
    method: "Repay",
    token: "USDC",
    amount: 1000,
    logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
  },
];

function Home() {
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
    }
  }, [wallet]);

  const onExecute = async () => {
    console.log("Execute");

    const txs = [];

    // b0rrow

    // approve transaction

    // swaps

    // repay

    // batch transaction
  };

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
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
                <Card steps={steps} />
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
                      <AddStep />
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
