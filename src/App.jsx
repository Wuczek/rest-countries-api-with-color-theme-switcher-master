import Home from "./Home";
import DetailPage from "./DetailPage";
import Layout from "./Layout";
import NoPage from "./NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,borders,currencies,tld,cca3"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
    loadTheme();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout handleTheme={handleTheme} theme={theme} />}
          >
            <Route
              index
              element={<Home countries={countries} isLoading={isLoading} />}
            />
            <Route path="/:id" element={<DetailPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
