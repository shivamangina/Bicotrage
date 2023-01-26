import React from "react";
import { Link } from "react-router-dom";
import { useSmartAccountContext } from "../biconomy/contexts/SmartAccountContext";
import { useWeb3AuthContext } from "../biconomy/contexts/SocialLoginContext";
import { ellipseAddress } from "../biconomy/utils";

const paths = [
  // {
  //   path: "/",
  //   name: "Home",
  //   type: "route"
  // },
  {
    path: "/team",
    name: "Team",
    type: "route"
  },
  {
    path: "https://github.com/shivamangina/Bicotrage",
    name: "Github",
    type: "link"
  },
  {
    path: "https://www.youtube.com/watch?v=ZItkM2ZDX4o",
    name: "Demo",
    type: "link"
  },
  {
    path: "https://www.youtube.com/watch?v=ZItkM2ZDX4o",
    name: "About",
    type: "link"
  }
];


export default function Header() {
  const { connect, disconnect } = useWeb3AuthContext();
  const {
    selectedAccount,
    setSelectedAccount,
  } = useSmartAccountContext();

  const disconnectWallet = () => {
    disconnect();
    setSelectedAccount(null)
  };

  return (
    <section className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
          <Link to="/" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
            <span className="mx-auto ml-0 text-xl font-black leading-none text-pink-500 select-none">
              Bico
              <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-indigo-400  to-purple-700 lg:inline">Trage</span>
              <span className="text-indigo-600">.</span>
            </span>
          </Link>
          <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
            {paths &&
              paths.map(({ path, name, type }) => (
                type === "route" ?
                  <Link key={path + name} to={path} className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                    {name}
                  </Link> :
                  <a key={path + name} href={path} target="_blank" rel="noreferrer" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">
                    {name}
                  </a>
              ))}
          </nav>
        </div>
        <div className="inline-flex items-center ml-1 space-x-5 lg:justify-end">
          <button
            disabled={selectedAccount && selectedAccount.smartAccountAddress ? true : false}
            onClick={connect}
            className="inline-flex items-center justify-center px-2 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-yellow-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
            {
              selectedAccount
                ? ellipseAddress(selectedAccount.smartAccountAddress, 8)
                : "Connect Wallet"
            }

          </button>

          {selectedAccount && selectedAccount.smartAccountAddress &&
            <button
              onClick={disconnectWallet}
              className="flex items-center w-full px-6 py-1 mb-3 text-base leading-6 text-white bg-purple-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
              Logout
            </button>
          }
        </div>
      </div>
    </section>
  );
}
