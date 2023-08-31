import { Outlet } from "react-router-dom";
import { RiMoonLine } from "react-icons/ri";
import { useState, useEffect } from "react";

const Layout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleTheme = () => {
    const body = document.querySelector("body");
    if (theme === "light") {
      body.classList.remove("light");
      body.classList.add("dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
    if (theme === "dark") {
      body.classList.remove("dark");
      body.classList.add("light");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const loadTheme = () => {
      const body = document.querySelector("body");
      if (theme === "light") {
        body.classList.add("light");
      }
      if (theme === "dark") {
        body.classList.add("dark");
      }
    };
    loadTheme();
  }, [theme]);

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
