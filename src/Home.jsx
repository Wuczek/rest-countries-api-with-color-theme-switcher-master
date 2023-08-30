import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Countries from "./Countries";

const Home = ({ countries, isLoading }) => {
  const [filter, setFilter] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filterCountries = () => {
      if (filter === "All") {
        setFilteredCountries(countries);
      } else {
        const filterCountries = countries.filter(
          (country) => country.region === filter
        );
        setFilteredCountries(filterCountries);
      }
      const filterOptions = document.querySelector(".filter__options");
      if (filterOptions.classList.contains("show")) {
        filterOptions.classList.remove("show");
      }
    };
    filterCountries();
  }, [filter, countries]);

  useEffect(() => {
    const searchCountries = () => {
      const filterOptions = document.querySelector(".filter__options");
      if (filterOptions.classList.contains("show")) {
        filterOptions.classList.remove("show");
      }
      const filteredCountries = countries.filter((country) => {
        return (
          country.name.common.toLowerCase().includes(search.toLowerCase()) ||
          country.capital
            .join(", ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
      setFilteredCountries(filteredCountries);
    };
    searchCountries();
  }, [search]);

  return (
    <main>
      <div className="container">
        <Navbar search={search} setSearch={setSearch} setFilter={setFilter} />
        <Countries
          filteredCountries={filteredCountries}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default Home;
