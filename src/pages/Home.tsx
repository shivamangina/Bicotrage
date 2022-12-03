import React from 'react'

import Card from './Card'
import Stepper from './Stepper'

function Home() {
  return (
    <div>
      <button
        className="flex content-center w-full px-6 py-1 mb-3 text-base leading-6 text-white bg-purple-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto ">
        Add Step
      </button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-6">
        <Stepper />
        <Card />
      </div>
    </div>
  )
}

export default Home