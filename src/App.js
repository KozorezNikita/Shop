import React from "react";
import { HashRouter } from "react-router-dom";
import ShopRouter from "./components/ShopRouter";
import Navbar from "./components/UI/Navbar/Navbar";
import ShopProvider from "./context/ShopContext";

import "./styles/App.css";

function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <Navbar />
        <ShopRouter />
      </HashRouter>
    </ShopProvider>
  );
}

export default App;
