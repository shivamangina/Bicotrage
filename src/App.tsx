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

  return <>{loading ? <Loader /> : <Routing />}</>;


};

export default App;