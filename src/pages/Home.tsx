import React from 'react'

import Card from './Card'
import Stepper from './Stepper'

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
    <div className='container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* <button
        className="flex content-center w-full px-6 py-1 mb-3 text-base leading-6 text-white bg-purple-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto ">
        Add Step
      </button> */}
      {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-6 mr-10"> */}
      {steps && <Stepper steps={steps} />}
      {steps && <Card steps={steps} />}
      {/* </div> */}
    </div>
  )
}

export default Home