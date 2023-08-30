import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const DetailPage = () => {
  const [country, setCountry] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}?fields=name,capital,flags,population,region,subregion,languages,borders,currencies,tld`
        );
        const data = await response.json();
        setCountry(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountry();
  }, [id]);

  return (
    <main>
      <div className="container">
        <nav>
          <Link to="/">
            <button>Back</button>
          </Link>
        </nav>
        <div className="detail">
          <img src={country.flags?.png} alt={country.flags?.alt} />
          <div className="detail__info">
            <h2>{country.name?.common}</h2>
            <div className="detail__info__left">
              <p>
                <span>Native Name:</span> {country.name?.nativeName?.common}
              </p>
              <p>
                <span>Population:</span> {country.population}
              </p>
              <p>
                <span>Region:</span> {country.region}
              </p>
              <p>
                <span>Sub Region:</span> {country.subregion}
              </p>
              <p>
                <span>Capital:</span> {country.capital?.join(", ")}
              </p>
            </div>
            <div className="detail__info__right">
              <p>
                <span>Top Level Domain</span> {country.tld?.join(",")}
              </p>
              <p>
                <span>Currencies:</span>
                {country.currencies?.[Object.keys(country.currencies)[0]].name}
              </p>
              <p>
                <span>Languages:</span>{" "}
              </p>
            </div>
            <div className="detail__info__down">
              <p>
                <span>Border Countries:</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
