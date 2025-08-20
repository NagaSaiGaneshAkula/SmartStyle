
import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "../Common/Navbar";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div>
        {/* top bar */}
        <Topbar />
        {/* navbar */}
        <Navbar />
        {/* cart drawer */}
      </div>
    </header>
  );
};

export default Header;
