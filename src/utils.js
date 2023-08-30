const formatPopulation = (population) => {
  return population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const showFilterOptions = () => {
  const filterOptions = document.querySelector(".filter__options");
  filterOptions.classList.toggle("show");
};

export { formatPopulation, showFilterOptions };
