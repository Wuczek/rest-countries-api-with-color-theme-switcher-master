import React from "react";
import Country from "./Country";

const Countries = ({ filteredCountries, isLoading }) => {
  return (
    <div className="countries">
      {isLoading && <h1>Loading...</h1>}
      {!isLoading &&
        filteredCountries.map((country) => {
          return <Country country={country} key={country.cca3} />;
        })}
    </div>
  );
};

export default Countries;
