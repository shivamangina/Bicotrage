import React from "react";
import Routing from "./Routing";
import { useSmartAccountContext } from "./biconomy/contexts/SmartAccountContext";
import Loader from "./layouts/Loader";

const App: React.FC = () => {
  const { loading } = useSmartAccountContext();
  return <>{loading ? <Loader /> : <Routing />}</>;
};

export default App;