import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <div className="navbar">
      <p>PRODUCTSHOP</p>
      <div className="navlinks">
        <Link to="/Shop">Shop</Link>
        <Link to="/About">About</Link>
      </div>
      <Link to="/Cart">
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </Link>
    </div>
  );
}

export default Navbar;
