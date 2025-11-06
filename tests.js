import { restaurants, restaurants as restList } from "./restaurants.js";

const searchBy = document.getElementById("search-by");
const searchWith = document.getElementById("search-with");
const results = document.getElementById("results");

function filterRestaurants() {
  console.log("Filtering...");
  const query = searchWith.value.toLowerCase();
  const type = searchBy.value;
  for (let rest of restaurants) console.log(rest[type]);
  const filtered = restaurants.filter((item) =>
    item[type].toLowerCase().includes(query)
  );

  showSearchResults(filtered);
}

function showSearchResults(filtered) {
  results.innerHTML = "";
  filtered.forEach((rest) => {
    const par = document.createElement("p");
    par.innerText = `Name: ${rest.name}, Company: ${rest.company}, City: ${rest.city}`;
    results.appendChild(par);
  });
}

searchBy.addEventListener("input", filterRestaurants);
searchWith.addEventListener("input", filterRestaurants);

filterRestaurants();
