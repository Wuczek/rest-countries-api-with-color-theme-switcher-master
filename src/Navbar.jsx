import React from "react";
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import { showFilterOptions } from "./utils";

const Navbar = ({ search, setSearch, setFilter }) => {
  return (
    <nav>
      <form>
        <RiSearchLine className="search-icon" />
        <label htmlFor="input">InputField</label>
        <input
          type="text"
          id="input"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="filter">
        <div className="select" onClick={showFilterOptions}>
          <p>Filter by Region</p>
          <RiArrowDownSLine className="arrow-icon" />
        </div>
        <ul className="filter__options">
          <li onClick={(e) => setFilter(e.target.textContent)}>All</li>
          <li onClick={(e) => setFilter(e.target.textContent)}>Africa</li>
          <li onClick={(e) => setFilter(e.target.textContent)}>Americas</li>
          <li onClick={(e) => setFilter(e.target.textContent)}>Asia</li>
          <li onClick={(e) => setFilter(e.target.textContent)}>Europe</li>
          <li onClick={(e) => setFilter(e.target.textContent)}>Oceania</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
