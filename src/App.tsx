import React, { useEffect, useContext } from "react";
import Routing from "./Routing";
import { GlobalContext } from "./context/context";
import { ethers } from "ethers";
import Config from "./Config";
// import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
// import Navbar from "./components/Navbar";
// import TabsBody from "./components/TabsBody";
import { useSmartAccountContext } from "./biconomy/contexts/SmartAccountContext";
import { useWeb3AuthContext } from "./biconomy/contexts/SocialLoginContext";
import Button from "./biconomy/components/Button";
import Home from "./pages/Home";
import Loader from "./layouts/Loader";

const App: React.FC = () => {
  const { connect, address, loading: eoaWalletLoading } = useWeb3AuthContext();
  const { loading } = useSmartAccountContext();
  console.log(address, "address");
  console.log(eoaWalletLoading, "eoaWalletLoading");


  // if (!address) connect();

  if (!address) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "30vh",
        }}
      >
        <h1 >Biconomy SDK Demo</h1>
        <button
          title="Get Started"
          onClick={connect}
          // isLoading={eoaWalletLoading}
          style={{
            fontSize: 20,
            padding: "30px 20px",
            border: 0,
            background:
              "linear-gradient(90deg, #0063FF -2.21%, #9100FF 89.35%)",
          }}
        >Button</button>
        <ToastContainer />
      </div>
    );
  }

  return <>{loading ? <Loader /> : <Routing />}</>;


};

export default App;