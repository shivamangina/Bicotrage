import React, { useEffect, useContext } from "react";
import Routing from "./Routing";
import Loader from "./layouts/Loader";
import { GlobalContext } from "./context/context";
import { ethers } from "ethers";
import Config from "./Config";

const App = () => {
  const { loading,  setLoading } =
    useContext(GlobalContext);



  return <>{loading ? <Loader /> : <Routing />}</>;
};

export default App;
