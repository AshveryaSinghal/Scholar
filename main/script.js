function navigateToPage() {
  window.open('/WE/index.html', '_blank'); // Open in a new tab/window
}

// Get elements
const homeLink = document.getElementById('homeLink');
const savedLink = document.getElementById('savedLink');
const itemList = document.getElementById('itemList');

// Save original content of itemList
let originalContent = itemList.innerHTML;

// Load saved items from localStorage
let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

// Function to update star states
function updateStarStates() {
  const allStars = document.querySelectorAll('.tab i');
  allStars.forEach((star) => {
    const itemId = star.closest('.tab').dataset.id;
    if (savedItems.includes(itemId)) {
      star.classList.add('fa-solid', 'star-filled'); // Solid gold star for saved
      star.classList.remove('fa-regular'); // Remove regular star style
    } else {
      star.classList.add('fa-regular'); // Regular outline star
      star.classList.remove('fa-solid', 'star-filled'); // Remove gold fill
    }

    // Add click event to toggle save state
    star.addEventListener('click', () => {
      const isCurrentlySaved = star.classList.toggle('fa-solid'); // Toggle solid star
      star.classList.toggle('star-filled', isCurrentlySaved); // Toggle gold color
      star.classList.toggle('fa-regular', !isCurrentlySaved); // Toggle regular star
      if (isCurrentlySaved) {
        savedItems.push(itemId);
      } else {
        const index = savedItems.indexOf(itemId);
        if (index > -1) {
          savedItems.splice(index, 1);
        }
      }
      localStorage.setItem('savedItems', JSON.stringify(savedItems));
    });
  });
}

// Initial update of star states
updateStarStates();

// Show only saved items when clicking "Saved"
savedLink.addEventListener('click', (e) => {
  e.preventDefault();
  const savedItemsList = JSON.parse(localStorage.getItem('savedItems')) || [];
  itemList.innerHTML = savedItemsList
    .map((id) => {
      const item = document.querySelector(`.tab[data-id="${id}"]`);
      return item ? item.outerHTML : '';
    })
    .join('');
  updateStarStates(); // Reattach event listeners after updating content
});

// Restore the original content when clicking "Home"
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  itemList.innerHTML = originalContent; // Restore original items
  updateStarStates(); // Reattach event listeners for stars
});
