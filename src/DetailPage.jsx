import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatPopulation } from "./utils";
import { RiArrowLeftLine } from "react-icons/ri";

const DetailPage = () => {
  const [country, setCountry] = useState({});
  const [borderNames, setBorderNames] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  // `https://restcountries.com/v3.1/all?fields=name,cca3`

  useEffect(() => {
    const fetchNameAndId = async (borders) => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/all?fields=name,cca3`
        );
        const data = await response.json();
        const filter = data
          .map((element) => {
            return {
              name: borders.includes(element.cca3) && element.name.common,
              id: element.cca3,
            };
          })
          .filter((element) => element.name !== false);
        setBorderNames(filter);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${id}?fields=name,capital,flags,population,region,subregion,languages,borders,currencies,tld`
        );
        const data = await response.json();
        setCountry(data);
        fetchNameAndId(data.borders);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCountry();
  }, [id]);

  return (
    <main>
      <div className="container">
        <nav className="detail-nav">
          <Link to="/" className="link">
            <button>
              <RiArrowLeftLine className="detail-nav-icon" />
              Back
            </button>
          </Link>
        </nav>
        <div className="detail">
          {(isLoading && <h1>Loading country...</h1>) || (
            <>
              <img src={country.flags?.png} alt={country.flags?.alt} />
              <div className="detail__info">
                <h2>{country.name?.common}</h2>
                <div className="flex">
                  <div className="detail__info__left">
                    <p>
                      <span>Native Name:</span>
                      {
                        country.name.nativeName?.[
                          Object.keys(country.name.nativeName)[0]
                        ].common
                      }
                    </p>
                    <p>
                      <span>Population:</span>
                      {formatPopulation(country.population)}
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
                      {
                        country.currencies?.[Object.keys(country.currencies)[0]]
                          .name
                      }
                    </p>
                    <p>
                      <span>Languages:</span>
                      {Object.values(country.languages).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="detail__info__borders">
                  <p>
                    <span className="bold-text">Border Countries:</span>
                  </p>
                  <div className="border-countries">
                    {country.borders?.length === 0 && (
                      <p>No border countries</p>
                    )}
                    {borderNames.map((border) => {
                      return (
                        <Link to={`/${border.id}`} key={border.id}>
                          <button className="border-country-btn">
                            {border.name}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
