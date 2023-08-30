import { useState } from "react";
import { Outlet } from "react-router-dom";
import { RiMoonLine } from "react-icons/ri";

const Layout = ({ handleTheme, theme }) => {
  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <button onClick={handleTheme}>
          <RiMoonLine />
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
