import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => <>Wecome to the React App</>

function Routing() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default Routing;
