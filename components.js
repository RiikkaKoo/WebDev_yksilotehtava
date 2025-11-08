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
export const restaurantModal = (restaurant, menu, menuType) => {
  /*const restLocation = {
    address: restaurant.address,
    postalCode: restaurant.postalCode,
    city: restaurant.city,
  }; */
  const { address, postalCode, city } = restaurant;

  /*const company = {
    name: restaurant.name,
    compName: restaurant.company,
    phone: restaurant.phone,
  }; */
  const { name, company, phone } = restaurant;

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
  other.innerHTML = `${company}<br>${phone}`;

  column1.appendChild(addressTitle);
  column1.appendChild(addressLine);
  column1.appendChild(other);

  // The menu column:
  const column2 = document.createElement("div");

  const menuTitle = document.createElement("h2");

  if (menuType === "daily") {
    menuTitle.innerText = "Päivän ruokalista:";
    const menuContent = createDailyMenu(menu);
    column2.appendChild(menuTitle);
    column2.appendChild(menuContent);
  } else {
    menuTitle.innerText = "Viikon ruokalista:";
    const menuContent = createWeeklyMenu(menu);
    column2.appendChild(menuTitle);
    column2.appendChild(menuContent);
  }

  const dialog = document.querySelector("dialog");
  dialog.appendChild(close);
  dialog.appendChild(nameTitle);
  dialog.appendChild(column1);
  dialog.appendChild(column2);
  return dialog;
};

function createDailyMenu(menu) {
  const menuContent = document.createElement("div");
  if (!menu.ok) {
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
  return menuContent;
}

function createWeeklyMenu(menu) {
  const menuContent = document.createElement("div");
  if (menu === null) {
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
  return menuContent;
}

export const loginViewContent = () => {
  const box = document.createElement("div");
  const title = document.createElement("h1");
  const usernameLabel = document.createElement("label");
  const usernameField = document.createElement("input");
  const passwordLabel = document.createElement("label");
  const passwordField = document.createElement("input");
  const loginButton = document.createElement("button");
  const returnBtn = document.createElement("p");

  box.id = "login-box";
  title.innerText = "Kirjaudu sisään";
  usernameLabel.innerText = "Käyttäjätunnus:";
  passwordLabel.innerText = "Salasana:";

  usernameLabel.htmlFor = "usernameField";
  usernameField.id = "usernameField";
  usernameField.type = "text";
  usernameField.name = "usernameField";

  passwordLabel.htmlFor = "passwordField";
  passwordField.id = "passwordField";
  passwordField.type = "text";
  passwordField.name = "passwordField";

  loginButton.innerHTML = "Kirjaudu sisään";
  loginButton.id = "login-button";

  returnBtn.innerText = "Palaa takaisin";
  returnBtn.id = "return-button";

  box.appendChild(title);
  box.appendChild(usernameLabel);
  box.appendChild(usernameField);
  box.appendChild(passwordLabel);
  box.appendChild(passwordField);
  box.appendChild(loginButton);
  box.appendChild(returnBtn);

  return box;
};

export const signupViewContent = () => {
  const box = document.createElement("div");
  const title = document.createElement("h1");
  const usernameLabel = document.createElement("label");
  const usernameField = document.createElement("input");
  const passwordLabel = document.createElement("label");
  const passwordField = document.createElement("input");
  const emailLabel = document.createElement("label");
  const emailField = document.createElement("input");
  const signupButton = document.createElement("button");
  const returnBtn = document.createElement("p");

  box.id = "signup-box";
  title.innerText = "Luo uusi käyttäjä";
  usernameLabel.innerText = "Käyttäjätunnus:";
  passwordLabel.innerText = "Salasana:";
  emailLabel.innerText = "Sähköposti:";

  usernameLabel.htmlFor = "usernameField";
  usernameField.id = "usernameField";
  usernameField.type = "text";
  usernameField.name = "usernameField";

  passwordLabel.htmlFor = "passwordField";
  passwordField.id = "passwordField";
  passwordField.type = "text";
  passwordField.name = "passwordField";

  emailLabel.htmlFor = "emailField";
  emailField.id = "emailField";
  emailField.type = "text";
  emailField.name = "emailField";

  signupButton.innerHTML = "Luo käyttäjä";
  signupButton.id = "signup-button";

  returnBtn.innerText = "Palaa takaisin";
  returnBtn.id = "return-button";

  box.appendChild(title);
  box.appendChild(usernameLabel);
  box.appendChild(usernameField);
  box.appendChild(passwordLabel);
  box.appendChild(passwordField);
  box.appendChild(emailLabel);
  box.appendChild(emailField);
  box.appendChild(signupButton);
  box.appendChild(returnBtn);

  return box;
};
