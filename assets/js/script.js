// Function to show the selected grid and update the active tab
function showGrid(gridId) {
  const grids = document.querySelectorAll('.grid-container');
  const tabs = document.querySelectorAll('.tab-button');

  // Hide all grids
  grids.forEach(grid => grid.classList.add('hidden'));

  // Show the selected grid if it exists
  const targetGrid = document.getElementById(`${gridId}-grid`);
  if (targetGrid) {
    targetGrid.classList.remove('hidden');
  } else {
    console.warn(`Grid with ID "${gridId}-grid" not found.`);
  }

  // Remove 'active' class from all tabs
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add 'active' class to the clicked tab
  const clickedTab = document.querySelector(`button[onclick="showGrid('${gridId}')"]`);
  if (clickedTab) {
    clickedTab.classList.add('active');
  }
}

// Set the default tab on page load
document.addEventListener('DOMContentLoaded', () => {
  const sqlGrid = document.getElementById('sql-grid');
  const rGrid = document.getElementById('r-grid');
  const dataJournalismGrid = document.getElementById('data-journalism-grid');

  // Determine default grid based on availability
  const defaultGrid = sqlGrid && sqlGrid.querySelector('button.challenge-card')
    ? 'sql'
    : (rGrid && rGrid.querySelector('button.challenge-card')
      ? 'r'
      : (dataJournalismGrid && dataJournalismGrid.querySelector('button.challenge-card')
        ? 'data-journalism'
        : null));

  if (defaultGrid) {
    showGrid(defaultGrid);
  } else {
    console.warn('No projects available to display.');
    // Optionally, you could add a message dynamically if no grids have projects
    const container = document.querySelector('.tabs');
    if (container) {
      const noProjectsMessage = document.createElement('p');
      noProjectsMessage.textContent = 'No projects are available at this time. Please check back later.';
      container.insertAdjacentElement('afterend', noProjectsMessage);
    }
  }
});
