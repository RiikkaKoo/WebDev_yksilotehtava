import { restaurants as restList } from "./restaurants.js";
import { restaurantRow, restaurantModal } from "./components.js";

// Variables for the program:
let currentMenuType = "daily";
let restaurants;
let markersById = {};

const searchBy = document.getElementById("search-by");
const searchWith = document.getElementById("search-with");
searchBy.addEventListener("input", filterRestaurants);
searchWith.addEventListener("input", filterRestaurants);

const map = L.map("map");
// The map:
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
map.setView([60.170833, 24.9375], 13);

//---------------------------------------------------------------------------------//

// If users position is found:
function success(position) {
  const longitude = position.coords.longitude;
  const latitude = position.coords.latitude;
  console.log(typeof latitude, typeof longitude);
  console.log("Latitude: " + latitude + ", Longitude: " + longitude);

  // A unique marker for user's current location:
  const myMarker = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Add user's current location to the map:
  L.marker([latitude, longitude], { icon: myMarker })
    .addTo(map)
    .bindPopup("Minun sijainti")
    .openPopup();

  map.setView([latitude, longitude], 13);
}

// Error for cases when location cannot be found:
function error(err) {
  console.log("ERROR " + err.code + ": " + err.message);
}

// Add all the restaurant locations to the map:
function addToMap(array) {
  Object.values(markersById).forEach((marker) => map.removeLayer(marker));

  markersById = {};
  for (let r of array) {
    let rLat = r.location.coordinates[1];
    let rLong = r.location.coordinates[0];
    const marker = L.marker([rLat, rLong])
      .addTo(map)
      .bindPopup(
        `<h3>${r.name}</h3><p>${r.address}<br>${r.postalCode}, ${r.city}</p>`
      )
      .on("click", () => highlightRestaurant(r._id))
      .on("popupclose", () => {
        const allRows = document.querySelectorAll("tr");
        allRows.forEach((tr) => tr.classList.remove("highlighted"));
      });
    markersById[r._id] = marker;
  }
}

// Highlight the restaurant from the list:

function highlightRestaurant(id) {
  const allRows = document.querySelectorAll("tr");
  allRows.forEach((tr) => tr.classList.remove("highlighted"));
  const tableRow = document.getElementById(id);
  tableRow.classList.add("highlighted");
  tableRow.scrollIntoView({ behavior: "smooth" });
}

// Find location
function findLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    console.log("Not supported");
  }
}

// Close and clear the dialog:
function closeModal() {
  const modal = document.querySelector("dialog");
  modal.close();
  modal.innerHTML = "";
}

async function getDailyMenu(id) {
  try {
    const dailyMenu = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/fi`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return dailyMenu;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getWeeklyMenu(id) {
  try {
    const weeklyMenu = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/fi`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(weeklyMenu);
    return weeklyMenu;
  } catch (e) {
    console.log(e);
    return null;
  }
}

// Display restaurant info in a modal window:
async function openModal(id, array) {
  let selectedRes = array.find((i) => i._id === id);
  console.log(selectedRes);

  const menu =
    currentMenuType === "daily"
      ? await getDailyMenu(selectedRes._id)
      : await getWeeklyMenu(selectedRes._id);
  const modalWindow = restaurantModal(selectedRes, menu, currentMenuType);
  const modalClose = document.querySelector("#dialog-header span");
  console.log(modalClose);
  modalClose.addEventListener("click", closeModal);

  modalWindow.showModal();
}

// Move map to the selected restaurant:
function setMapToSelectedRestaurant(id) {
  const marker = markersById[id];
  console.log(marker);
  if (marker) {
    marker.openPopup();
    const { lat, lng } = marker.getLatLng();
    highlightRestaurant(id);
    map.setView([lat, lng], 13);
  }
}

// Highlight the selected row and open a modal window:
function selectRow(event, array) {
  let element = event.currentTarget;
  console.log(element);
  setMapToSelectedRestaurant(element.id, array);
  openModal(element.id, array);
}

// Show the restaurants on the table in HTML:
function displayRestaurants(array) {
  const table = document.getElementById("table-body");
  table.innerHTML = "";
  if (array.length !== 0) {
    array.sort((a, b) => a.name.localeCompare(b.name));

    for (let r of array) {
      const tableRow = restaurantRow(r);

      tableRow.addEventListener("click", (event) => selectRow(event, array));
      // Put the favourited restaurant at the top of the list:
      if (!tableRow.classList.contains("favourite")) {
        table.insertAdjacentElement("beforeend", tableRow);
      } else {
        table.insertAdjacentElement("afterbegin", tableRow);
      }
    }
  } else {
    const row = document.createElement("tr");
    row.innerHTML = "<td>Ravintoloita ei löytynyt.</td><td> </td>";
    table.insertAdjacentElement("beforeend", row);
  }
}

// API fetch function:
async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Error! Status: " + response.status);
    return await response.json();
  } catch (e) {
    throw e;
  }
}

// Change selected menu type:
function selectMenu(event) {
  const selectedBtn = event.currentTarget.id;
  currentMenuType = selectedBtn === "dailymenu-btn" ? "daily" : "weekly";
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.classList.remove("selected-menu");
  });
  const currentSelection = document.getElementById(selectedBtn);
  currentSelection.classList.add("selected-menu");
  console.log(currentMenuType);
}

// Function for filtering the reataurants:
function filterRestaurants() {
  const query = searchWith.value.toLowerCase();
  const type = searchBy.value;
  for (let rest of restaurants) console.log(rest[type]);
  const filtered = restaurants.filter((item) =>
    item[type].toLowerCase().includes(query)
  );

  displayRestaurants(filtered);
  addToMap(filtered);
}

// Main async function:
async function main() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", selectMenu);
  });
  findLocation();
  try {
    const url =
      "https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    restaurants = await fetchData(url, options);
    sessionStorage.setItem("restaurants", JSON.stringify(restaurants));
    // restaurants = restList;
    console.log(restaurants);

    displayRestaurants(restaurants);
    addToMap(restaurants);
  } catch (error) {
    console.error("An error occurred:", error);
    const row = document.createElement("tr");
    row.innerHTML = "<td>Ravintoloita ei voitu hakea.</td><td> </td>";
    document
      .getElementById("table-body")
      .insertAdjacentElement("beforeend", row);
  }
}

main();
