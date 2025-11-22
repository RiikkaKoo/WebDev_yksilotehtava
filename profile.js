import {
  loginViewContent,
  signupViewContent,
  profileView,
  changeInfoModal,
} from "./components.js";

const contentContainer = document.getElementById("page-content");

// The "front page" of the profile. User can choose to login or sign up:
function createLoginSingupBox() {
  contentContainer.innerHTML = "";

  const box = document.createElement("div");
  const title = document.createElement("h1");
  const loginButton = document.createElement("button");
  const signupButton = document.createElement("button");

  box.id = "login-or-signup";

  title.innerText = "Et ole kirjautunut sisään";
  loginButton.innerText = "Kirjaudu sisään";
  signupButton.innerText = "Luo uusi käyttäjä";

  loginButton.addEventListener("click", openLoginView);
  signupButton.addEventListener("click", openSignupView);

  box.appendChild(title);
  box.appendChild(loginButton);
  box.appendChild(signupButton);

  contentContainer.appendChild(box);
}

// Open the login view for the user:
function openLoginView() {
  contentContainer.innerHTML = "";

  const box = loginViewContent();
  contentContainer.appendChild(box);

  const usernameField = document.getElementById("usernameField");
  const passwordField = document.getElementById("passwordField");
  const checkbox = document.getElementById("showPassword-checkbox");

  // Show or hide password (change passwordField type between password and text):
  checkbox.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
  });

  document
    .getElementById("login-button")
    .addEventListener("click", () =>
      login(usernameField.value, passwordField.value)
    );
  document
    .getElementById("return-button")
    .addEventListener("click", createLoginSingupBox);
}

// Open the sign up view for the user:
function openSignupView() {
  contentContainer.innerHTML = "";

  const box = signupViewContent();
  contentContainer.appendChild(box);

  const usernameField = document.getElementById("usernameField");
  const passwordField = document.getElementById("passwordField");
  const emailField = document.getElementById("emailField");
  const checkbox = document.getElementById("showPassword-checkbox");

  // Show or hide password (change passwordField type between password and text):
  checkbox.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
  });

  document.getElementById("signup-button").addEventListener("click", () => {
    console.log(usernameField.value + passwordField.value + emailField.value);
    signup(usernameField.value, passwordField.value, emailField.value);
  });
  document
    .getElementById("return-button")
    .addEventListener("click", createLoginSingupBox);
}

// Function for login as a user. Saves the token into session storage and opens profile view if succesful:
async function login(username, password) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };

    const profile = await fetchData(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login",
      options
    );
    console.log(profile);
    if (profile) {
      sessionStorage.setItem("token", profile.token);
      showProfile();
    } else {
      const box = document.getElementById("login-box");
      displayError("Kirjautuminen epäonnistui", box);
    }
  } catch (error) {
    console.log(error);
    const box = document.getElementById("login-box");
    displayError("Kirjautuminen epäonnistui", box);
  }
}

// Function for signing up as a user. Opens a new view if succesful:
async function signup(username, password, email) {
  try {
    const options1 = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const isAvailable = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/${username}`,
      options1
    );
    console.log(isAvailable);
    if (isAvailable.available) {
      console.log("Käyttäjänimi on vapaa");
      try {
        const options2 = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        };

        const profile = await fetchData(
          "https://media2.edu.metropolia.fi/restaurant/api/v1/users",
          options2
        );
        console.log(profile);
        if (profile) {
          alert("Uusi käyttäjä luotu.");
          openInfoView(profile);
        } else {
          const box = document.getElementById("signup-box");
          displayError("Käyttäjän luominen ei onnistunut", box);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const box = document.getElementById("signup-box");
      displayError("Käyttäjänimi on jo käytössä", box);
    }
  } catch (error) {
    console.log(error);
    const box = document.getElementById("signup-box");
    displayError("Käyttäjän luominen ei onnistunut", box);
  }
}

function displayError(text, container) {
  if (container.querySelector("#error") !== null)
    container.removeChild(container.querySelector("#error"));
  if (container.querySelector("#message") !== null)
    container.removeChild(container.querySelector("#message"));
  const error = document.createElement("p");
  error.id = "error";
  error.innerText = text;
  container.appendChild(error);
}

function displayMessage(text, container) {
  if (container.querySelector("#error") !== null)
    container.removeChild(container.querySelector("#error"));
  if (container.querySelector("#message") !== null)
    container.removeChild(container.querySelector("#message"));
  const message = document.createElement("p");
  message.id = "message";
  message.innerText = text;
  container.appendChild(message);
}

// Shown to user when a new user is created succesfully:
function openInfoView(profile) {
  contentContainer.innerHTML = "";
  const box = document.createElement("div");
  const title = document.createElement("h1");
  const text = document.createElement("p");
  const returnBtn = document.createElement("p");

  box.id = "info-view";

  title.innerHTML = "Uusi käyttäjä luotu!";
  returnBtn.innerText = "Palaa profiilin etusivulle";
  returnBtn.id = "return-button";

  box.appendChild(title);
  box.appendChild(text);
  box.appendChild(returnBtn);

  contentContainer.appendChild(box);

  document
    .getElementById("return-button")
    .addEventListener("click", createLoginSingupBox);
}

// Shown user ptofile to user if login was succesful:
async function showProfile() {
  try {
    const profile = await getUserInfo();
    contentContainer.innerHTML = "";
    sessionStorage.removeItem("favouriteRest");
    sessionStorage.setItem("favouriteRest", profile.favouriteRestaurant);

    console.log(profile);

    const contentBox = profileView(profile);
    contentContainer.appendChild(contentBox);

    document
      .getElementById("change-button")
      .addEventListener("click", openChangeModal);
    document.getElementById("logout-button").addEventListener("click", logout);
    document
      .getElementById("change-avatar")
      .addEventListener("click", () => changeProfilePicture(profile));

    contentContainer.appendChild(contentBox);
  } catch (error) {
    console.log("Show profile:", error);
    createLoginSingupBox();
  }
}

// The change info view shown in modal:
function openChangeModal() {
  const modalView = changeInfoModal(sessionStorage.getItem("restaurants"));

  const password = document.getElementById("passwordField");
  const email = document.getElementById("emailField");
  const username = document.getElementById("usernameField");
  const restaurant = document.getElementById("restaurant-selection");
  const checkbox = document.getElementById("showPassword-checkbox");

  // Show or hide password (change passwordField type between password and text):
  checkbox.addEventListener("click", () => {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
  });

  document.querySelector("dialog span").addEventListener("click", closeModal);
  document
    .getElementById("submit-changes-button")
    .addEventListener("click", () =>
      submitChanges(
        password.value,
        email.value,
        username.value,
        restaurant.value
      )
    );

  modalView.showModal();
}

// Close modal view:
function closeModal() {
  const modal = document.querySelector("dialog");
  modal.close();
  modal.innerHTML = "";
}

// Submit changes to API:
async function submitChanges(
  newPassword,
  newEmail,
  newUsername,
  newRestaurant
) {
  try {
    let usernameAvailable;
    const user = await getUserInfo();
    const updates = {};
    if (newUsername && newUsername !== user.username) {
      const options1 = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      usernameAvailable = await fetchData(
        `https://media2.edu.metropolia.fi/restaurant/api/v1/users/available/${newUsername}`,
        options1
      );
      if (!usernameAvailable) {
        displayError(
          "Käyttäjänimi on jo varattu",
          document.querySelector("dialog")
        );
        return;
      }
      updates.username = newUsername;
    }

    if (newEmail && newEmail !== user.email) updates.email = newEmail;

    if (newPassword) updates.password = newPassword;

    console.log(newRestaurant);
    if (newRestaurant !== user.favouriteRestaurant) {
      updates.favouriteRestaurant = newRestaurant;
    }

    if (usernameAvailable || !newUsername) {
      const options2 = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify(updates),
      };

      const response = await fetchData(
        `https://media2.edu.metropolia.fi/restaurant/api/v1/users`,
        options2
      );
      console.log("Vastaus: ", response);
      displayMessage(
        "Profiilitiedot päivitetty!",
        document.querySelector("dialog")
      );
      showProfile();
    }
  } catch (error) {
    console.log(error);
    displayError(
      "Profiilitietoja ei voitu päivittää",
      document.querySelector("dialog")
    );
  }
  console.log("Lähetetään muutokset...");
}

// Logout from the API. Clears the session storage:
function logout() {
  sessionStorage.clear();
  createLoginSingupBox();
  console.log("Kirjaudutaan ulos...");
}

// Change the profile picture by uploading a new picture:
function changeProfilePicture() {
  console.log("Avataan ikkuna profiilikuvan muuttamiselle...");
}

// Get current users info for the profile view:
async function getUserInfo() {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };

    const profile = await fetchData(
      "https://media2.edu.metropolia.fi/restaurant/api/v1/users/token",
      options
    );
    return profile;
  } catch (error) {
    throw error;
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

function main() {
  const token = sessionStorage.getItem("token");
  if (token) {
    showProfile();
  } else {
    createLoginSingupBox();
  }
}

main();
