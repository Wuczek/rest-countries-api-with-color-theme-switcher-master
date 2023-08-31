import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Countries from "./Countries";

const Home = () => {
  const [filter, setFilter] = useState("All");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountries();
  }, []);

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
