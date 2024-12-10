document.addEventListener("DOMContentLoaded", function () {
  const jsonPath = "/assets/json/grid_cards.json"; // Absolute path based on root directory
  console.log("Fetching JSON from:", jsonPath);

  fetch(jsonPath)
    .then(response => {
      console.log("Fetch response status:", response.status); // Log the status
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched data successfully:", data); // Log the JSON data
      populateGrids(data);
    })
    .catch(error => console.error("Error fetching grid data:", error));
});

function populateGrids(data) {
  Object.keys(data).forEach(category => {
    const gridContainer = document.querySelector(`#${category}-grid .grid`);
    if (!gridContainer) {
      console.error(`No grid container found for category: ${category}`);
      return;
    }

    const challenges = data[category];
    challenges.forEach(challenge => {
      console.log(`Adding challenge: ${challenge.title}`);
      const card = document.createElement("article");
      card.className = "challenge-card";
      card.innerHTML = `
        <h2>${challenge.title}</h2>
        <p><strong>Platform:</strong> ${challenge.platform}</p>
        <p><strong>Difficulty:</strong> ${challenge.difficulty}</p>
        <p><strong>Tags:</strong> ${challenge.tags.join(", ")}</p>
      `;

      card.addEventListener("click", () => {
        window.location.href = challenge.link;
      });

      gridContainer.appendChild(card);
    });
  });
}

