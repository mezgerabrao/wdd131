const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salvador Brazil",
        location: "Salvador, Bahia, Brazil",
        dedicated: "2024, October, 20",
        area: 29963,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salvador-brazil-temple/salvador-brazil-temple-51668-main.jpg"
    },
    {
        templeName: "Campinas Brazil",
        location: "Campinas, São Paulo, Brazil",
        dedicated: "2002, May, 17",
        area: 48100,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/campinas-brazil-temple/campinas-brazil-temple-6012-main.jpg"
    },
    {
        templeName: "São Paulo Brazil",
        location: "São Paulo, São Paulo, Brazil",
        dedicated: "1978, October, 30",
        area: 59246,
        imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/_temp/017-S%C3%A3o-Paulo-Brazil-Temple.jpg"
    }
];

function getDedicatedYear(dedicatedStr) {
    return parseInt(dedicatedStr.split(",")[0].trim(), 10);
}

function createCard(temple) {
    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    const body = document.createElement("div");
    body.classList.add("card-body");

    body.innerHTML = `
        <h3>${temple.templeName}</h3>
        <p><span>Location:</span> ${temple.location}</p>
        <p><span>Dedicated:</span> ${temple.dedicated}</p>
        <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
    `;

    card.append(img, body);
    return card;
}

function displayTemples(list) {
    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    list.forEach(temple => gallery.appendChild(createCard(temple)));
}

function filterTemples(filter) {
    switch (filter) {
        case "old":   return temples.filter(t => getDedicatedYear(t.dedicated) < 1900);
        case "new":   return temples.filter(t => getDedicatedYear(t.dedicated) > 2000);
        case "large": return temples.filter(t => t.area > 90000);
        case "small": return temples.filter(t => t.area < 10000);
        default:      return temples;
    }
}

const navLinks = document.querySelectorAll(".navigation a");
const filterHeading = document.getElementById("filter-heading");

const labelMap = {
    all:   "Home",
    old:   "Old",
    new:   "New",
    large: "Large",
    small: "Small"
};

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        // Update active class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Update heading
        const filter = link.dataset.filter;
        filterHeading.textContent = labelMap[filter];

        // Render filtered temples
        displayTemples(filterTemples(filter));

        // Close hamburger menu after selection (mobile)
        navigation.classList.remove("open");
        hamButton.classList.remove("open");
    });
});

displayTemples(temples);