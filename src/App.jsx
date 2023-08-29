import { useEffect, useState } from "react";
import {
  RiMoonFill,
  RiMoonLine,
  RiSearchLine,
  RiArrowDownSLine,
} from "react-icons/ri";

const App = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,languages,borders,currencies,tld,cca3"
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  const showFilterOptions = () => {
    const filterOptions = document.querySelector(".filter__options");
    filterOptions.classList.toggle("show");
  };

  const formatPopulation = (population) => {
    return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const switchTheme = () => {
    const body = document.querySelector("body");
    if (body.classList.contains("dark")) {
      body.classList.replace("dark", "light");
    } else {
      body.classList.replace("light", "dark");
    }
  };

  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <button onClick={switchTheme}>
          <RiMoonFill />
          Dark Mode
        </button>
      </header>
      <main>
        <div className="container">
          <nav>
            <form>
              <RiSearchLine className="search-icon" />
              <label htmlFor="input">InputField</label>
              <input
                type="text"
                id="input"
                placeholder="Search for a country..."
              />
            </form>
            <div className="filter">
              <div className="select" onClick={showFilterOptions}>
                <p>Filter by Region</p>
                <RiArrowDownSLine className="arrow-icon" />
              </div>
              <ul className="filter__options">
                <li>All</li>
                <li>Africa</li>
                <li>America</li>
                <li>Asia</li>
                <li>Europe</li>
                <li>Oceania</li>
              </ul>
            </div>
          </nav>
          <div className="countries">
            {countries.map((country) => {
              return (
                <div className="country" key={country.cca3}>
                  <img
                    width="256px"
                    height="400px"
                    src={country.flags.png}
                    alt={country.flags.alt}
                    className="country__flag"
                  />
                  <div className="country__info">
                    <h2>{country.name.common}</h2>
                    <p>
                      <span>Population:</span>{" "}
                      {formatPopulation(country.population)}
                    </p>
                    <p>
                      <span>Region:</span> {country.region}
                    </p>
                    <p>
                      <span>Capital:</span>
                      {country.capital.length !== 0
                        ? country.capital.join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              );
            })}
            ;
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
