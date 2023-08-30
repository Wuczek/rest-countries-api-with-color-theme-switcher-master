import React from "react";
import { formatPopulation } from "./utils";
import { Link } from "react-router-dom";

const Country = ({ country }) => {
  return (
    <Link to={`/${country.cca3}`} className="link">
      <div className="country">
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
            <span>Population:</span> {formatPopulation(country.population)}
          </p>
          <p>
            <span>Region:</span> {country.region}
          </p>
          <p>
            <span>Capital:</span>
            {country.capital.length !== 0 ? country.capital.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
