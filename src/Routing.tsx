import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

import Header from "./layouts/Header";

const Routing: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
