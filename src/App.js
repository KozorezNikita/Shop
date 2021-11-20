import React from "react";
import { BrowserRouter } from "react-router-dom";
import ShopRouter from "./components/ShopRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import ShopProvider from "./context/ShopContext";

import "./styles/App.css";

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Navbar />
        <ShopRouter />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;
