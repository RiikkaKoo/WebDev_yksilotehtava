// Create and return a row for the table:
export const restaurantRow = (restaurant) => {
  const restLocation = {
    address: restaurant.address,
    postalCode: restaurant.postalCode,
    city: restaurant.city,
  };
  const { address, postalCode, city } = restLocation;

  const company = { name: restaurant.name, _id: restaurant._id };
  const { name, _id } = company;

  const tableRow = document.createElement("tr");
  tableRow.id = _id;

  const nameColumn = document.createElement("td");
  const addressColumn = document.createElement("td");

  nameColumn.innerText = name;
  addressColumn.innerHTML = `${address}<br>${postalCode}, ${city}`;

  tableRow.appendChild(nameColumn);
  tableRow.appendChild(addressColumn);

  return tableRow;
};

// Create and return the dialog modal window:
export const restaurantModal = (restaurant, menu) => {
  const restLocation = {
    address: restaurant.address,
    postalCode: restaurant.postalCode,
    city: restaurant.city,
  };
  const { address, postalCode, city } = restLocation;

  const company = {
    name: restaurant.name,
    compName: restaurant.company,
    phone: restaurant.phone,
  };
  const { name, compName, phone } = company;

  const close = document.createElement("span");
  close.innerText = "X";

  // The info colmun:
  const column1 = document.createElement("div");

  const nameTitle = document.createElement("h1");
  const addressTitle = document.createElement("h2");
  const addressLine = document.createElement("p");
  const other = document.createElement("p");

  nameTitle.innerText = name;
  addressTitle.innerText = "Yhteystiedot: ";

  addressLine.innerHTML = `${address}<br>${postalCode}, ${city}`;
  other.innerHTML = `${compName}<br>${phone}`;

  column1.appendChild(addressTitle);
  column1.appendChild(addressLine);
  column1.appendChild(other);

  // The menu column:
  const column2 = document.createElement("div");

  const menuTitle = document.createElement("h2");
  const menuContent = document.createElement("div");

  menuTitle.innerText = "Päivän menu:";
  console.log(menu);
  if (menu === "") {
    const course = document.createElement("p");
    course.innerHTML = `Menua ei ole saatavilla.`;
    menuContent.appendChild(course);
  } else if (menu.courses.length > 0) {
    const courses = menu.courses;
    for (let i = 0; i < courses.length; i++) {
      const course = document.createElement("p");
      course.innerHTML = `${courses[i].name} -- ${courses[i].price}<br>${courses[i].diets}`;
      menuContent.appendChild(course);
    }
  } else {
    const course = document.createElement("p");
    course.innerHTML = `Tälle paivälle ei ole menua.`;
    menuContent.appendChild(course);
  }

  column2.appendChild(menuTitle);
  column2.appendChild(menuContent);

  const dialog = document.querySelector("dialog");
  dialog.appendChild(close);
  dialog.appendChild(nameTitle);
  dialog.appendChild(column1);
  dialog.appendChild(column2);
  return dialog;
};
