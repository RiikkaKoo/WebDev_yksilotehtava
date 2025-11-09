import {
  loginViewContent,
  signupViewContent,
  profileView,
  changeInfoModal,
} from "./components.js";

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

  contentContainer.innerHTML = "";

  const contentBox = profileView();

  contentContainer.appendChild(contentBox);

  document
    .getElementById("change-button")
    .addEventListener("click", openChangeModal);
  document.getElementById("logout-button").addEventListener("click", logout);
  document
    .getElementById("change-avatar")
    .addEventListener("click", changeProfilePicture);

  contentContainer.appendChild(contentBox);
}

function openChangeModal() {
  console.log("Avataan ikkuna tietojen muuttamiselle...");
  const modalView = changeInfoModal();

  document.querySelector("dialog span").addEventListener("click", closeModal);
  document
    .getElementById("submit-changes-button")
    .addEventListener("click", submitChanges);

  modalView.showModal();
}

function closeModal() {
  const modal = document.querySelector("dialog");
  modal.close();
  modal.innerHTML = "";
}

function submitChanges() {
  console.log("Lähetetään muutokset...");
}

function logout() {
  console.log("Kirjaudutaan ulos...");
}

function changeProfilePicture() {
  console.log("Avataan ikkuna profiilikuvan muuttamiselle...");
}

createLoginSingupBox();
