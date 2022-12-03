import React, { useEffect, useContext } from "react";
import Routing from "./Routing";
import Loader from "./layouts/Loader";
import { GlobalContext } from "./context/context";
import { ethers } from "ethers";
import Config from "./Config";
// import { makeStyles } from "@material-ui/core/styles";
// import { ToastContainer } from "react-toastify";
// import Navbar from "./components/Navbar";
// import TabsBody from "./components/TabsBody";
// import { useSmartAccountContext } from "./contexts/SmartAccountContext";
// import { useWeb3AuthContext } from "./contexts/SocialLoginContext";
// import Button from "./components/Button";

const App: React.FC = () => {
  const { loading, addWeb3ProviderToContext, setLoading } =
  useContext(GlobalContext);
  return <div>{loading ? <Loader /> : <Routing />}</div>;
};

export default App;