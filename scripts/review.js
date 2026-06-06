let reviewCounter =
    Number(localStorage.getItem("reviewCount")) || 0;

reviewCounter++;

localStorage.setItem("reviewCount", reviewCounter);

document.querySelector("#reviewCount").textContent =
    reviewCounter;

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;