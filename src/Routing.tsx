import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

const Routing: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
