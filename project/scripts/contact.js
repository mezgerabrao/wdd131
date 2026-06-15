const contactForm = document.querySelector("#contactForm");
const confirmationMessage = document.querySelector("#confirmationMessage");
const subscriberCount = document.querySelector("#subscriberCount");

function updateSubscriberCount() {
  const subscribers =
    JSON.parse(localStorage.getItem("subscribers")) || [];

  subscriberCount.textContent = subscribers.length;
}

function saveSubscriber(name, email, interest) {

  const subscribers =
    JSON.parse(localStorage.getItem("subscribers")) || [];

  const subscriber = {
    name,
    email,
    interest
  };

  subscribers.push(subscriber);

  localStorage.setItem(
    "subscribers",
    JSON.stringify(subscribers)
  );
}

if (contactForm) {

  contactForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
      document.querySelector("#name").value.trim();

    const email =
      document.querySelector("#email").value.trim();

    const interest =
      document.querySelector("#interest").value;

    if (name && email) {

      saveSubscriber(name, email, interest);

      confirmationMessage.innerHTML = `
        <p>
          Thank you, ${name}! Your information has been saved successfully.
        </p>
      `;

      contactForm.reset();

      updateSubscriberCount();
    }
  });
}

updateSubscriberCount();