import { restaurants as restList } from "./restaurants.js";
import { restaurantRow, restaurantModal } from "./components.js";

const map = L.map("map");
// The map:
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
map.setView([60.170833, 24.9375], 13);

let currentMenuType = "daily";

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
  for (let r of array) {
    let rLat = r.location.coordinates[1];
    let rLong = r.location.coordinates[0];
    L.marker([rLat, rLong])
      .addTo(map)
      .bindPopup(
        `<h3>${r.name}</h3><p>${r.address}<br>${r.postalCode}, ${r.city}</p>`
      );
  }
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

  // Remove the highlight from the row:
  const allRows = document.querySelectorAll("tr");
  allRows.forEach((element) => {
    element.classList.remove("highlight");
  });
}

// Display restaurant info in a modal window:
async function openModal(id, array) {
  let selectedRes = array.find((i) => i._id === id);
  console.log(selectedRes);

  let dailyMenu = "";
  try {
    dailyMenu = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${selectedRes._id}/fi`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.log(e);
  }
  console.log(dailyMenu);

  const modalWindow = restaurantModal(selectedRes, dailyMenu);
  const modalClose = document.querySelector("dialog span");
  modalClose.addEventListener("click", closeModal);

  modalWindow.showModal();
}

// Highlight the selected row and open a modal window:
function selectRow(event, array) {
  let element = event.currentTarget;
  console.log(element);
  element.classList.add("highlight");
  openModal(element.id, array);
}

// Show the restaurants on the table in HTML:
function displayRestaurants(array) {
  if (array.length !== 0) {
    array.sort((a, b) => a.name.localeCompare(b.name));

    for (let r of array) {
      const tableRow = restaurantRow(r);

      tableRow.addEventListener("click", (event) => selectRow(event, array)); // Adding clikc-event with function that has another parameter (the restaurant array) to all of the rows

      document
        .querySelector("table")
        .insertAdjacentElement("beforeend", tableRow);
    }
  } else {
    const row = document.createElement("tr");
    row.innerHTML = "<td>Ravintoloita ei voitu hakea.</td><td> </td>";
    document.querySelector("table").insertAdjacentElement("beforeend", row);
  }
}

async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Error! Status: " + response.status);
    return await response.json();
  } catch (e) {
    throw e;
  }
}

async function getDailyMenu(restaurantId, lang = "en") {
  const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurantId}/${lang}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error! Status: " + response.status);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

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

// Main async function to test the other function:
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
    // const restaurants = await fetchData(url, options);
    const restaurants = restList;
    console.log(restaurants);
    displayRestaurants(restaurants);
    addToMap(restaurants);
  } catch (error) {
    console.error("An error occurred:", error);
    displayRestaurants([]);
  }
}

main();
