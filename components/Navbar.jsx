import React from "react";
import { UserValue } from "../context/UserContext";

const Navbar = () => {
  const { user } = UserValue();

  return (
    <div className="navbar">
      <h1 className="navbar-h1">Edvora</h1>
      <div className="profile">
        <h2 className="navbar-h2">{user.name}</h2>
        <img
          src={user.url}
          height={50}
          width={50}
          className="navbar-img"
        />
      </div>
    </div>
  );
};

export default Navbar;
