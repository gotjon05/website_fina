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
  const defaultGrid = document.getElementById('sql-grid') ? 'sql' : 'r';
  showGrid(defaultGrid);
});

