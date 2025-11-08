import { loginViewContent, signupViewContent } from "./components.js";

let isSignedIn = false;
const contentContainer = document.getElementById("page-content");

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

function openLoginView() {
  contentContainer.innerHTML = "";

  const box = loginViewContent();
  contentContainer.appendChild(box);

  document.getElementById("login-button").addEventListener("click", login);
  document
    .getElementById("return-button")
    .addEventListener("click", createLoginSingupBox);
}

function openSignupView() {
  contentContainer.innerHTML = "";

  const box = signupViewContent();
  contentContainer.appendChild(box);

  document.getElementById("signup-button").addEventListener("click", signup);
  document
    .getElementById("return-button")
    .addEventListener("click", createLoginSingupBox);
}

function login(event) {
  console.log("Kirjaudutaan...");
  showProfile();
}

function signup(event) {
  console.log("Luodaan uusi käyttäjä...");
}

function showProfile() {
  contentContainer.innerHTML = "";

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

  const username = document.createElement("p");
  username.innerText = "KÄYTTÄJÄTUNNUS: TESTIKÄYTTÄJÄ";

  const email = document.createElement("p");
  email.innerText = "SÄHKÖPOSTIOSOITE: TESTISPOSTI";

  const favRestaurant = document.createElement("p");
  favRestaurant.innerText = "SUOSIKKIRAVINTOLA: TESTIRAVINTOLA";

  const change = document.createElement("button");
  change.innerText = "Muuta";

  imageContainer.appendChild(avatarImg);
  avatarBox.appendChild(imageContainer);
  avatarBox.appendChild(avatarChange);

  infoBox.appendChild(title);
  infoBox.appendChild(username);
  infoBox.appendChild(email);
  infoBox.appendChild(favRestaurant);
  infoBox.appendChild(change);

  contentBox.appendChild(infoBox);
  contentBox.appendChild(avatarBox);

  contentContainer.appendChild(contentBox);
}

createLoginSingupBox();
