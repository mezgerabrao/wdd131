const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector(".navigation");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
      menuButton.textContent = "✖";
    } else {
      menuButton.textContent = "☰";
    }
  });
}

const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

const backToTopButton = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});