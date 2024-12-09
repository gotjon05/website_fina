function showGrid(gridId) {
  const grids = document.querySelectorAll('.grid-container');
  const tabs = document.querySelectorAll('.tab-button');

  // Hide all grids
  grids.forEach(grid => grid.classList.add('hidden'));
  // Show the selected grid
  document.getElementById(`${gridId}-grid`).classList.remove('hidden');

  // Remove 'active' class from all tabs
  tabs.forEach(tab => tab.classList.remove('active'));
  // Add 'active' class to the clicked tab
  event.target.classList.add('active');
}

// Show the SQL tab by default on page load
document.addEventListener('DOMContentLoaded', () => {
  showGrid('sql');
});

