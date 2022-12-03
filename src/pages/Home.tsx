import React from "react";

import Card from "./Card";
import Stepper from "./Stepper";

function Home() {
  return (
    <>
      <section className="px-2 py-20 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-col items-center mt-12 text-center tails-selected-element">
            <span className="relative inline-flex w-full md:w-auto">
              <a
                href="#_"
                type="button"
                className="inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-white bg-purple-600 border border-transparent rounded-md md:w-auto hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                Add Step
              </a>
            </span>
            <br/>
          </div>
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="container items-center">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-6">
                <Stepper />
                <Card />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
