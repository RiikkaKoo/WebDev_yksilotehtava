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
  const top = document.createElement("div");
  top.id = "dialog-header";

  const { address, postalCode, city } = restaurant;
  const { name, company, phone } = restaurant;

  const close = document.createElement("span");
  close.innerText = "X";

  // The info colmun:
  const column1 = document.createElement("div");
  column1.id = "rest-info";

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
  column2.id = "menu-column";

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

  top.appendChild(nameTitle);
  top.appendChild(close);

  const columns = document.createElement("div");
  columns.id = "columns";
  columns.appendChild(column1);
  columns.appendChild(column2);

  const dialog = document.querySelector("dialog");
  dialog.appendChild(top);
  dialog.appendChild(columns);
  return dialog;
};

function createDailyMenu(menu) {
  const menuContent = document.createElement("div");
  menuContent.id = "daily-menu";
  console.log(menu);
  if (menu === undefined || menu === null) {
    const course = document.createElement("p");
    course.innerHTML = `Ruokalistaa ei ole saatavilla.`;
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
    course.innerHTML = `Tälle paivälle ei ole ruokalistaa.`;
    menuContent.appendChild(course);
  }
  return menuContent;
}

function createWeeklyMenu(menu) {
  const menuContent = document.createElement("div");
  console.log(menu);
  menuContent.id = "weekly-menu";
  if (menu === undefined || menu === null) {
    const course = document.createElement("p");
    course.innerHTML = `Ruokalistaa ei ole saatavilla.`;
    menuContent.appendChild(course);
  } else if (menu.days.length > 0) {
    const days = menu.days;
    console.log(days);
    days.forEach((day) => {
      const date = document.createElement("h2");
      date.innerText = day.date;
      const coursesDiv = document.createElement("div");
      day.courses.forEach((c) => {
        const course = document.createElement("p");
        course.innerHTML = `${c.name} -- ${c.price}<br>${c.diets}`;
        coursesDiv.appendChild(course);
      });
      menuContent.appendChild(date);
      menuContent.appendChild(coursesDiv);
    });
  } else {
    const course = document.createElement("p");
    course.innerHTML = `Tälle viikolle ei ole ruokalistaa.`;
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

export const profileView = (profile) => {
  const contentBox = document.createElement("div");
  const avatarBox = document.createElement("div");
  const imageContainer = document.createElement("div");
  const infoBox = document.createElement("div");
  const title = document.createElement("h1");

  contentBox.id = "content-box";
  avatarBox.id = "avatar-box";
  infoBox.id = "info-box";
  imageContainer.id = "image-container";

  title.innerText = "PROFIILI";

  const avatarImg = document.createElement("img");
  avatarImg.src = "uploads/cat_profile_pic.jpg";
  avatarImg.alt = "Käyttäjän profiilikuva";

  const avatarChange = document.createElement("button");
  avatarChange.innerText = "Vaihda profiilikuva";
  avatarChange.id = "change-avatar";

  const username = document.createElement("p");
  username.innerText = `KÄYTTÄJÄTUNNUS: ${profile.username}`;

  const email = document.createElement("p");
  email.innerText = `SÄHKÖPOSTIOSOITE: ${profile.email}`;

  const favRestaurant = document.createElement("p");
  favRestaurant.innerText = `SUOSIKKIRAVINTOLA: ${profile.favouriteRestaurant}`;

  const change = document.createElement("button");
  change.innerText = "Muuta tietoja";
  change.id = "change-button";

  const logoutBtn = document.createElement("button");
  logoutBtn.innerText = "Kirjaudu ulos";
  logoutBtn.id = "logout-button";

  imageContainer.appendChild(avatarImg);
  avatarBox.appendChild(imageContainer);
  avatarBox.appendChild(avatarChange);

  infoBox.appendChild(title);
  infoBox.appendChild(username);
  infoBox.appendChild(email);
  infoBox.appendChild(favRestaurant);
  infoBox.appendChild(change);
  infoBox.appendChild(logoutBtn);

  contentBox.appendChild(infoBox);
  contentBox.appendChild(avatarBox);

  return contentBox;
};

export const changeInfoModal = () => {
  const modal = document.querySelector("dialog");

  const close = document.createElement("span");
  close.innerText = "X";

  const content = document.createElement("div");

  const title = document.createElement("h1");
  title.innerText = "MUUTA TIETOJA";

  const text = document.createElement("p");
  text.innerText =
    "Suosikkiravintolan voi valita/muuttaa etusivun ravintolalistasta, jos olet kirjautunut sisään.";

  const usernameLabel = document.createElement("label");
  usernameLabel.innerText = "Anna uusi käyttäjänimi:";
  const usernameField = document.createElement("input");

  const emailLabel = document.createElement("label");
  emailLabel.innerText = "Anna uusi sähköposti:";
  const emailField = document.createElement("input");

  const passwordLabel = document.createElement("label");
  passwordLabel.innerText = "Anna uusi salasana:";
  const passwordField = document.createElement("input");

  const submitChnagesBtn = document.createElement("button");
  submitChnagesBtn.innerText = "Muuta";
  submitChnagesBtn.id = "submit-changes-button";

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

  content.appendChild(title);
  content.appendChild(text);
  content.appendChild(usernameLabel);
  content.appendChild(usernameField);
  content.appendChild(emailLabel);
  content.appendChild(emailField);
  content.appendChild(passwordLabel);
  content.appendChild(passwordField);

  modal.appendChild(close);
  modal.appendChild(content);
  modal.appendChild(submitChnagesBtn);

  return modal;
};
