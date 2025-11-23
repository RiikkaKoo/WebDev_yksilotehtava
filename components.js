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

  const favouriteColumn = document.createElement("td");
  favouriteColumn.classList.add("favourite-column");
  const nameColumn = document.createElement("td");
  const addressColumn = document.createElement("td");

  if (sessionStorage.getItem("token")) {
    const favourite = sessionStorage.getItem("favouriteRest");
    if (_id === favourite) tableRow.classList.add("favourite");
    const img =
      _id === favourite
        ? '<img src="./img/heart_icon_500x500.png" alt=""></img>'
        : '<img src="./img/heart_icon_empty_500x500.png" alt=""></img>';
    favouriteColumn.innerHTML = img;
  } else {
    favouriteColumn.innerHTML =
      '<img src="./img/heart_icon_empty_500x500.png" alt=""></img>';
  }

  nameColumn.innerText = name;
  addressColumn.innerHTML = `${address}<br>${postalCode}, ${city}`;

  tableRow.appendChild(favouriteColumn);
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

function createDailyMenu1(menu) {
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
      course.innerHTML = `${courses[i].name} -- ${
        courses[i].price ?? "Hintoja ei ole asetettu"
      }<br>${courses[i].diets ?? ""}`;
      menuContent.appendChild(course);
    }
  } else {
    const course = document.createElement("p");
    course.innerHTML = `Tälle paivälle ei ole ruokalistaa.`;
    menuContent.appendChild(course);
  }
  return menuContent;
}

function createDailyMenu(menu) {
  const menuContent = document.createElement("div");
  menuContent.id = "daily-menu";

  const dayTable = document.createElement("table");
  dayTable.classList.add("menu-table");

  const dayTableHead = document.createElement("thead");
  const courseTh = document.createElement("th");
  courseTh.innerText = "Kuvaus";
  const allergTh = document.createElement("th");
  allergTh.innerText = "Ruokavalio";
  const priceTh = document.createElement("th");
  priceTh.innerText = "Hinnat";

  dayTableHead.appendChild(courseTh);
  dayTableHead.appendChild(allergTh);
  dayTableHead.appendChild(priceTh);

  dayTable.appendChild(dayTableHead);

  const dayTableBody = document.createElement("tbody");

  if (menu === undefined || menu === null) {
    const courseRow = document.createElement("tr");
    const descTd = document.createElement("td");
    descTd.innerHTML = `Ruokalistaa ei ole saatavilla.`;
    courseRow.appendChild(descTd);
    dayTableBody.appendChild(courseRow);
  } else if (menu.courses.length > 0) {
    const courses = menu.courses;
    for (let i = 0; i < courses.length; i++) {
      const courseRow = document.createElement("tr");

      const descTd = document.createElement("td");
      const allergTd = document.createElement("td");
      const priceTd = document.createElement("td");

      descTd.innerHTML = `${courses[i].name}`;
      allergTd.innerHTML = `${courses[i].diets ?? ""}`;
      priceTd.innerHTML = `${courses[i].price ?? "Hintoja ei ole annettu"}`;

      courseRow.appendChild(descTd);
      courseRow.appendChild(allergTd);
      courseRow.appendChild(priceTd);
      dayTableBody.appendChild(courseRow);
    }
  } else {
    const courseRow = document.createElement("tr");
    const descTd = document.createElement("td");
    descTd.innerHTML = `Tälle päivälle ei ole ruokalistaa.`;
    courseRow.appendChild(descTd);
    dayTableBody.appendChild(courseRow);
  }
  dayTable.appendChild(dayTableBody);
  menuContent.appendChild(dayTable);
  return menuContent;
}

function createWeeklyMenu(menu) {
  const menuContent = document.createElement("div");
  //console.log(menu);
  menuContent.id = "weekly-menu";
  if (menu === undefined || menu === null) {
    const course = document.createElement("p");
    course.innerHTML = `Ruokalistaa ei ole saatavilla.`;
    menuContent.appendChild(course);
  } else if (menu.days.length > 0) {
    const days = menu.days;
    //console.log(days);
    days.forEach((day) => {
      const dayTable = document.createElement("table");
      dayTable.classList.add("menu-table");

      const date = document.createElement("caption");
      date.innerText = day.date;

      const dayTableHead = document.createElement("thead");
      const courseTh = document.createElement("th");
      courseTh.innerText = "Kuvaus";
      const allergTh = document.createElement("th");
      allergTh.innerText = "Ruokavalio";
      const priceTh = document.createElement("th");
      priceTh.innerText = "Hinnat";

      dayTableHead.appendChild(courseTh);
      dayTableHead.appendChild(allergTh);
      dayTableHead.appendChild(priceTh);

      dayTable.appendChild(date);
      dayTable.appendChild(dayTableHead);

      const dayTableBody = document.createElement("tbody");

      day.courses.forEach((c) => {
        const courseRow = document.createElement("tr");

        const descTd = document.createElement("td");
        const allergTd = document.createElement("td");
        const priceTd = document.createElement("td");

        descTd.innerHTML = `${c.name}`;
        allergTd.innerHTML = `${c.diets ?? ""}`;
        priceTd.innerHTML = `${c.price ?? "Hintoja ei ole annettu"}`;

        courseRow.appendChild(descTd);
        courseRow.appendChild(allergTd);
        courseRow.appendChild(priceTd);
        dayTableBody.appendChild(courseRow);
      });
      dayTable.appendChild(dayTableBody);
      menuContent.appendChild(dayTable);
    });
  } else {
    const course = document.createElement("p");
    course.innerHTML = `Tälle viikolle ei ole ruokalistaa.`;
    menuContent.appendChild(course);
  }
  return menuContent;
}

// The login view in profile page:
export const loginViewContent = () => {
  const box = document.createElement("div");
  const title = document.createElement("h1");
  const passwordShowCheckbox = document.createElement("div");
  const usernameLabel = document.createElement("label");
  const usernameField = document.createElement("input");
  const passwordLabel = document.createElement("label");
  const passwordField = document.createElement("input");
  const showCheck = document.createElement("input");
  const checkboxLabel = document.createElement("label");
  const loginButton = document.createElement("button");
  const returnBtn = document.createElement("p");

  box.id = "login-box";
  title.innerText = "Kirjaudu sisään";
  usernameLabel.innerText = "Käyttäjätunnus:";
  passwordLabel.innerText = "Salasana:";
  checkboxLabel.innerText = "Näytä salasana";

  usernameLabel.htmlFor = "usernameField";
  usernameField.id = "usernameField";
  usernameField.type = "text";
  usernameField.name = "usernameField";

  passwordLabel.htmlFor = "passwordField";
  passwordField.id = "passwordField";
  passwordField.type = "password";
  passwordField.name = "passwordField";

  checkboxLabel.htmlFor = "showCheck";
  showCheck.id = "showPassword-checkbox";
  showCheck.type = "checkbox";
  showCheck.name = "showCheck";

  loginButton.innerHTML = "Kirjaudu sisään";
  loginButton.id = "login-button";

  returnBtn.innerText = "Palaa takaisin";
  returnBtn.id = "return-button";

  passwordShowCheckbox.id = "checkbox-container";
  passwordShowCheckbox.appendChild(showCheck);
  passwordShowCheckbox.appendChild(checkboxLabel);

  box.appendChild(title);
  box.appendChild(usernameLabel);
  box.appendChild(usernameField);
  box.appendChild(passwordLabel);
  box.appendChild(passwordField);
  box.appendChild(passwordShowCheckbox);
  box.appendChild(loginButton);
  box.appendChild(returnBtn);

  return box;
};

// The signup view in profile page:
export const signupViewContent = () => {
  const box = document.createElement("div");
  const title = document.createElement("h1");
  const passwordShowCheckbox = document.createElement("div");
  const usernameLabel = document.createElement("label");
  const usernameField = document.createElement("input");
  const passwordLabel = document.createElement("label");
  const passwordField = document.createElement("input");
  const showCheck = document.createElement("input");
  const checkboxLabel = document.createElement("label");
  const emailLabel = document.createElement("label");
  const emailField = document.createElement("input");
  const signupButton = document.createElement("button");
  const returnBtn = document.createElement("p");

  box.id = "signup-box";
  title.innerText = "Luo uusi käyttäjä";
  usernameLabel.innerText = "Käyttäjätunnus:";
  passwordLabel.innerText = "Salasana:";
  emailLabel.innerText = "Sähköposti:";
  checkboxLabel.innerText = "Näytä salasana";

  usernameLabel.htmlFor = "usernameField";
  usernameField.id = "usernameField";
  usernameField.type = "text";
  usernameField.name = "usernameField";

  passwordLabel.htmlFor = "passwordField";
  passwordField.id = "passwordField";
  passwordField.type = "password";
  passwordField.name = "passwordField";

  checkboxLabel.htmlFor = "showCheck";
  showCheck.id = "showPassword-checkbox";
  showCheck.type = "checkbox";
  showCheck.name = "showCheck";

  emailLabel.htmlFor = "emailField";
  emailField.id = "emailField";
  emailField.type = "text";
  emailField.name = "emailField";

  signupButton.innerHTML = "Luo käyttäjä";
  signupButton.id = "signup-button";

  returnBtn.innerText = "Palaa takaisin";
  returnBtn.id = "return-button";

  passwordShowCheckbox.id = "checkbox-container";
  passwordShowCheckbox.appendChild(showCheck);
  passwordShowCheckbox.appendChild(checkboxLabel);

  box.appendChild(title);
  box.appendChild(usernameLabel);
  box.appendChild(usernameField);
  box.appendChild(passwordLabel);
  box.appendChild(passwordField);
  box.appendChild(passwordShowCheckbox);
  box.appendChild(emailLabel);
  box.appendChild(emailField);
  box.appendChild(signupButton);
  box.appendChild(returnBtn);

  return box;
};

// The profile view if user is logged in:
export const profileView = (profile, reataurants) => {
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
  avatarImg.src = profile.avatar
    ? `https://media2.edu.metropolia.fi/restaurant/uploads/${profile.avatar}`
    : "img/user_avatar_img.jpg";
  avatarImg.alt = "Käyttäjän profiilikuva";

  const avatarChange = document.createElement("button");
  avatarChange.innerText = "Vaihda profiilikuva";
  avatarChange.id = "change-avatar";

  const username = document.createElement("p");
  username.innerText = `KÄYTTÄJÄTUNNUS: ${profile.username}`;

  const email = document.createElement("p");
  email.innerText = `SÄHKÖPOSTIOSOITE: ${profile.email}`;

  console.log(reataurants);
  const favourite = reataurants.find(
    (r) => r._id === profile.favouriteRestaurant
  );
  const favRestaurant = document.createElement("p");
  favRestaurant.innerText = `SUOSIKKIRAVINTOLA: ${
    favourite.name ?? "Ei valittu"
  }`;

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

// Modal dialog view for changing user information:
export const changeInfoModal = (reataurants) => {
  const restaurantJson = JSON.parse(reataurants);
  restaurantJson.sort((a, b) => a.name.localeCompare(b.name));

  const modal = document.querySelector("dialog");

  const close = document.createElement("span");
  close.innerText = "X";

  const content = document.createElement("div");

  const title = document.createElement("h1");
  title.innerText = "MUUTA TIETOJA";

  const passwordShowCheckbox = document.createElement("div");
  const showCheck = document.createElement("input");
  const checkboxLabel = document.createElement("label");
  checkboxLabel.innerText = "Näytä salasana";
  checkboxLabel.htmlFor = "showCheck";
  showCheck.id = "showPassword-checkbox";
  showCheck.type = "checkbox";
  showCheck.name = "showCheck";
  passwordShowCheckbox.id = "checkbox-container";
  passwordShowCheckbox.appendChild(showCheck);
  passwordShowCheckbox.appendChild(checkboxLabel);

  const usernameLabel = document.createElement("label");
  usernameLabel.innerText = "Anna uusi käyttäjänimi:";
  const usernameField = document.createElement("input");

  const emailLabel = document.createElement("label");
  emailLabel.innerText = "Anna uusi sähköposti:";
  const emailField = document.createElement("input");

  const favouriteLabel = document.createElement("label");
  favouriteLabel.innerText = "Valitse suosikkiravintola:";
  const restaurantSelect = document.createElement("select");

  restaurantJson.forEach((r) => {
    const option = document.createElement("option");
    option.value = r._id;
    if (r._id === sessionStorage.getItem("favouriteRest"))
      option.selected = true;
    option.innerText = r.name;
    restaurantSelect.appendChild(option);
  });

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

  favouriteLabel.htmlFor = "restaurant-selection";
  restaurantSelect.id = "restaurant-selection";

  passwordLabel.htmlFor = "passwordField";
  passwordField.id = "passwordField";
  passwordField.type = "password";
  passwordField.name = "passwordField";

  emailLabel.htmlFor = "emailField";
  emailField.id = "emailField";
  emailField.type = "text";
  emailField.name = "emailField";

  content.appendChild(title);
  content.appendChild(usernameLabel);
  content.appendChild(usernameField);
  content.appendChild(emailLabel);
  content.appendChild(emailField);
  content.appendChild(favouriteLabel);
  content.appendChild(restaurantSelect);
  content.appendChild(passwordLabel);
  content.appendChild(passwordField);
  content.appendChild(passwordShowCheckbox);

  modal.appendChild(close);
  modal.appendChild(content);
  modal.appendChild(submitChnagesBtn);

  return modal;
};

export const uploadAvatarView = () => {
  const modal = document.querySelector("dialog");

  const close = document.createElement("span");
  close.innerText = "X";

  const container = document.createElement("div");
  const imgContainer = document.createElement("div");
  const formContainer = document.createElement("div");

  const title = document.createElement("h2");
  const form = document.createElement("form");
  const preview = document.createElement("img");
  const inputLabel = document.createElement("label");
  const fileInput = document.createElement("input");
  const uploadBtn = document.createElement("button");

  title.id = "upload-title";
  title.innerText = "VAIHDA PROFIILIKUVA";

  form.id = "upload-form";
  container.id = "upload-view-container";
  imgContainer.id = "preview-container";
  formContainer.id = "form-container";

  preview.id = "avatar-preview";
  preview.src = "https://placehold.co/400x300?text=Preview+IMG";

  inputLabel.htmlFor = "file-input";
  inputLabel.innerText = "Valitse kuvatiedosto: ";

  fileInput.id = "file-input";
  fileInput.name = "file-input";
  fileInput.type = "file";

  uploadBtn.id = "upload-button";
  uploadBtn.innerText = "Lähetä";

  form.appendChild(inputLabel);
  form.appendChild(fileInput);
  form.appendChild(uploadBtn);

  imgContainer.appendChild(preview);
  formContainer.appendChild(form);

  container.appendChild(imgContainer);
  container.appendChild(formContainer);

  modal.appendChild(close);
  modal.appendChild(title);
  modal.appendChild(container);

  return modal;
};
