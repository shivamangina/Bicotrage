import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
// import { Web3Provider } from "./contexts/Web3Context";


const element = document.getElementById("root");
const root = createRoot(element!);

const Index = () => {
  return (
    // <Web3AuthProvider>
    //   {/* <Web3Provider> */}
    //   <SmartAccountProvider>
        <App />
    //   </SmartAccountProvider>
    //   {/* </Web3Provider> */}
    // </Web3AuthProvider>
  );
};

root.render(<Index />);
