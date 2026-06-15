const tools = [
  {
    name: "ChatGPT",
    category: "content",
    image: "images/chatgpt.webp",
    description: "Create content, brainstorm ideas, summarize research, and improve productivity."
  },
  {
    name: "Claude",
    category: "research",
    image: "images/claude.webp",
    description: "Analyze documents, generate insights, and support strategic research projects."
  },
  {
    name: "HubSpot AI",
    category: "automation",
    image: "images/hubspot.webp",
    description: "Automate CRM workflows, customer communications, and marketing processes."
  },
  {
    name: "Jasper",
    category: "content",
    image: "images/jasper.webp",
    description: "Generate marketing copy, blog content, and campaign messaging."
  }
];

const toolContainer = document.querySelector("#toolContainer");
const filterButtons = document.querySelectorAll(".filter-btn");

function displayTools(toolList) {
  toolContainer.innerHTML = "";

  toolList.forEach(tool => {
    toolContainer.innerHTML += `
      <article class="card tool-card">
        <img
          src="${tool.image}"
          alt="${tool.name}"
          loading="lazy"
          width="600"
          height="400"
        >
        <h3>${tool.name}</h3>
        <p>${tool.description}</p>
      </article>
    `;
  });
}

function saveFilter(category) {
  localStorage.setItem("selectedCategory", category);
}

function loadFilter() {
  return localStorage.getItem("selectedCategory") || "all";
}

function filterTools(category) {

  if (category === "all") {
    displayTools(tools);
  } else {
    const filteredTools = tools.filter(tool => tool.category === category);
    displayTools(filteredTools);
  }

  saveFilter(category);

  filterButtons.forEach(button => {
    button.classList.remove("active");
  });

  const activeButton = document.querySelector(
    `[data-category="${category}"]`
  );

  if (activeButton) {
    activeButton.classList.add("active");
  }
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterTools(button.dataset.category);
  });
});

filterTools(loadFilter());