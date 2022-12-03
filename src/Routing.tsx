import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddStep from "./pages/AddStep";

import Header from "./layouts/Header";

const Routing: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<AddStep />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
