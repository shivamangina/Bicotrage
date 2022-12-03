import React from "react";

import Card from "./Card";
import Stepper from "./Stepper";

function Home() {
  const steps = [
    {
      name: 'AAVE',
      description: 'Buy Flash Loan',
      status: 'complete',
      method: "Borrow",
      token: "USDC",
      amount: 1000,
      logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389"
    },
    {
      name: 'UniSwap',
      description: 'Swap your currency',
      status: 'current',
      method: "Swap",
      token: "USDC",
      amount: 1000,
      logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389"
    },
    {
      name: 'AAVE',
      description: 'Repay the Loan',
      method: "Repay",
      token: "USDC",
      amount: 1000,
      logo: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389"
    },
  ]

  return (
    <>
      <section className="px-2 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-col items-center mt-3 text-center tails-selected-element">
            <span className="relative inline-flex w-full md:w-auto">
              <a
                href="#_"
                type="button"
                className="inline-flex items-center justify-center w-full px-6 py-2 text-base font-bold leading-6 text-white bg-purple-600 border border-transparent rounded-md md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Add Step
              </a>
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
        </div>
      </section>
    </>
  );
}

export default Home;
