/*==================== DATA ====================*/
const iconMap = {
  facebook: "uil-facebook-f",
  instagram: "uil-instagram",
  linkedin: "uil-linkedin-alt",
  phone: "uil-phone-alt",
  zalo: "uil-message",
  messenger: "uil-facebook-messenger-alt",
  mail: "uil-envelope-alt",
  service: "uil-briefcase-alt",
  portfolio: "uil-scenery",
  github: "uil-github-alt",
  behance: "uil-behance-alt",
};

/*==================== GET DATA ELEMENT ====================*/
const elementContent = {
  logo: document.getElementById("logo-name"),
  greeting: document.getElementById("greeting"),
  role: document.getElementById("role"),
  statement: document.getElementById("statement"),
  avatarImage: document.getElementById("avatar-image"),
  homeContacts: document.getElementById("social-contact"),
  navContacts: document.getElementById("nav-list"),
  tabIcon: document.getElementById("tab-icon"),
  siteTitle: document.getElementById("site-title"),
};

/*==================== RENDER FROM DATA FUNCTIONS ====================*/
const loadContent = (person) => {
  elementContent.siteTitle.innerHTML = person.name;
  elementContent.tabIcon.href = person.avatarImage;

  elementContent.logo.innerHTML = person.name;
  elementContent.greeting.innerHTML = person.greeting;
  elementContent.role.innerHTML = person.role;
  elementContent.statement.innerHTML = person.statement;

  elementContent.avatarImage.setAttribute(
    "href",
    "data:image/png;base64," +
      // + person.avatarImage
      ""
  );
  elementContent.avatarImage.setAttribute("x", person.avatarAlignX);
  elementContent.avatarImage.setAttribute("y", person.avatarAlignY);

  person.homeContacts.forEach((homeContact) => {
    const a = document.createElement("A");
    a.classList.add("home__social-icon");
    a.target = "_blank";
    a.href = homeContact.link;

    const i = document.createElement("I");
    i.classList.add("uil", iconMap[homeContact.type]);
    a.appendChild(i);
    elementContent.homeContacts.appendChild(a);
  });

  person.navContacts.forEach((navContact) => {
    const li = document.createElement("LI");
    li.classList.add("nav__item");

    const a = document.createElement("A");
    a.classList.add("nav__link");
    a.target = "_blank";
    a.href = navContact.link;

    const i = document.createElement("I");
    i.classList.add("uil", "nav__icon", iconMap[navContact.type]);

    a.appendChild(i);
    a.innerHTML += navContact.title;
    li.appendChild(a);
    elementContent.navContacts.appendChild(li);
  });
};

/*===== THEME COLOR =====*/
const loadColors = (colorsArr) => {
  let current = parseInt(localStorage.getItem("color-counter"));
  if (!current) {
    current = 0;
  }
  document.documentElement.style.setProperty("--hue-color", colorsArr[current]);

  nameLogo.addEventListener("click", () => {
    current = (current + 1) % colorsArr.length;
    document.documentElement.style.setProperty(
      "--hue-color",
      colorsArr[current]
    );
    localStorage.setItem("color-counter", current);
  });
};

/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  homeScroll = document.getElementById("home-info"),
  navClose = document.getElementById("nav-close"),
  nameLogo = document.getElementById("logo-name");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (homeScroll) {
  homeScroll.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
    homeScroll.classList.add("home-remove");
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== GET PARAM FROM URL ====================*/
const url_string = window.location.href;
const url = new URL(url_string);
var param = url.searchParams.get("name");
param = param === null ? "Van Tuyet Trinh" : param;

/*==================== REQUEST DATA ====================*/
const Http = new XMLHttpRequest();
const mongoRealmUrl =
  "https://ap-southeast-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/happytap-uloxm/service/HappyTapBe/incoming_webhook/getData?arg1=" +
  param;
Http.open("GET", mongoRealmUrl);
Http.send();

Http.onloadend = (e) => {
  const person = JSON.parse(Http.responseText);

  loadContent(person);
  loadColors(person.themeColors);
};

/*==================== ACCORDION SKILLS ====================*/

/*==================== QUALIFICATION TABS ====================*/

/*==================== SERVICES MODAL ====================*/

/*==================== PORTFOLIO SWIPER  ====================*/

/*==================== TESTIMONIAL ====================*/

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

/*==================== CHANGE BACKGROUND HEADER ====================*/

/*==================== SHOW SCROLL UP ====================*/
