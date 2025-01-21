const carousel = document.querySelector('.carousel-items');
const items = document.querySelectorAll('.carousel-item');
const itemHeight = items[0].offsetHeight;
const upArrow = document.getElementById('upArrow');
const downArrow = document.getElementById('downArrow');
let currentIndex = 0;

// Number of clicks down allowed after reaching the 2nd page
const maxDownClicks = 2;
let downClickCount = 0;

function moveCarousel(direction) {
  const maxIndex = items.length - 1;

  // Handle upward movement
  if (direction < 0) {
    currentIndex += direction;

    // Reset the downClickCount when moving up
    if (downClickCount > 0) {
      downClickCount = Math.max(downClickCount - 1, 0);
    }
  }

  // Handle downward movement
  if (direction > 0) {
    // Allow movement only if not beyond the allowed down clicks from the 2nd page
    if (currentIndex >= 1 && downClickCount < maxDownClicks) {
      currentIndex += direction;
      downClickCount++;
    } else if (currentIndex < 1) {
      currentIndex += direction; // Free movement before reaching the 2nd page
    }
  }

  // Prevent out-of-bounds movement
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  // Update the carousel's position
  carousel.style.transform = `translateY(-${currentIndex * itemHeight}px)`;

  // Update button states
  updateArrowStates();
}

function updateArrowStates() {
    const maxIndex = items.length - 1;
  
    // Disable "up" arrow if at the top
    upArrow.disabled = currentIndex === 0;
  
    // Disable "down" arrow after reaching the 1st page (currentIndex > 0)
    if (currentIndex >= 2) {
      downArrow.disabled = true;  // Lock the down arrow after the first page
    } else {
      downArrow.disabled = false; // Enable the down arrow before the first page
    }
  }

// Initialize button states on page load
updateArrowStates();

// Function to reset carousel position when screen resizes from small to large
function resetCarouselOnResize() {
  if (window.innerWidth >= 499 && currentIndex !== 0) {
    // Simulate click on the up arrow to reset to the first page
    upArrow.click();
    upArrow.click();
  }
}

// Check screen size on page load and resize
if (window.innerWidth >= 499) {
  resetCarouselOnResize(); // Reset carousel when page is loaded on a large screen
}

// Optionally, trigger on resize if you want to react to screen size change
window.addEventListener('resize', resetCarouselOnResize);

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  alert('Thank you for reaching out! Your information has been received.');
});
