// Function to preload and apply the sidebar background image
function preloadSidebarBackground() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return; // Ensure the sidebar exists before proceeding

    const bgImage = new Image();
    bgImage.src = '/assets/images/forest2.webp'; // Path to your WebP image

    bgImage.onload = () => {
        sidebar.style.backgroundImage = `url(${bgImage.src})`;
        sidebar.classList.remove('loading'); // Remove the loading class if it exists
    };
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', () => {
    preloadSidebarBackground();
});

