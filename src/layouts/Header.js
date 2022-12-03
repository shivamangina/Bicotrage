import React, { useContext } from "react";
import { GlobalContext } from "../context/context";
import { Link } from "react-router-dom";
import { useWeb3AuthContext } from "../biconomy/contexts/SocialLoginContext";

const paths = [
  {
    path: "/",
    name: "Home"
  },
];

export default function Header() {
  const { accounts } = useContext(GlobalContext);
  const { connect, address, loading: eoaWalletLoading, disconnect } = useWeb3AuthContext();

  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl font-black leading-none text-pink-500 select-none">
              Flash
              <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-400  to-purple-700 lg:inline">Loans</span>
              <span className="text-indigo-600">.</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            {paths &&
              paths.map(({ path, name }) => (
                <Link key={path + name} to={path} className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                  {name}
                </Link>
              ))}
          </nav>
        </div>
        <div className="inline-flex items-center ml-1 space-x-5 lg:justify-end">

          {/* {address && (
            <span className="mr-2 font-medium leading-6 text-gray-600 hover:text-gray-900 bg-indigo-100">Connected to : {address}</span>
          )} */}

          <button
            disabled={address ? true : false}
            onClick={connect}
            className="inline-flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            {address ? address : "Connect to wallet"}
          </button>

          {address &&
            <button
              onClick={disconnect}
              className="flex items-center w-full px-6 py-1 mb-3 text-base leading-6 text-white bg-purple-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
              Logout
            </button>
          }
        </div>
      </div>
    </section>
  );
}