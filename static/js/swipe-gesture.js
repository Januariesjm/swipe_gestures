// Variables to track zoom in and zoom out
let zoomInStartX = 0;
let zoomInStartY = 0;
let zoomInStartTime = 0;
let zoomOutStartX = 0;
let zoomOutStartY = 0;
let zoomOutStartTime = 0;

// ... Other variable declarations ...

// Function to handle touch start for zoom in
function handleTouchStartZoomIn(event) {
  zoomInStartX = event.touches[0].clientX;
  zoomInStartY = event.touches[0].clientY;
  zoomInStartTime = new Date().getTime();
}

// Function to handle touch end for zoom in
function handleTouchEndZoomIn(event) {
  if (zoomInStartX !== 0 && zoomInStartY !== 0) {
    const zoomInEndX = event.changedTouches[0].clientX;
    const zoomInEndY = event.changedTouches[0].clientY;
    const zoomInEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for zoom in
    const swipeDistanceX = zoomInEndX - zoomInStartX;
    const swipeDistanceY = zoomInEndY - zoomInStartY;

    // Calculate the time taken for the zoom in gesture in milliseconds
    const zoomInTime = zoomInEndTime - zoomInStartTime;

    if (swipeDistanceX > 0 && swipeDistanceY > 0) {
      // It's a zoom in gesture
      document.getElementById('zoomIn').value = 1;
      document.getElementById('zoomOut').value = 0;
      document.getElementById('swipeWidth').value = Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY);
      document.getElementById('swipingRepetitionsX').value = swipeDistanceX;
      document.getElementById('swipingRepetitionsY').value = swipeDistanceY;
      document.getElementById('totalTimeTaken').value = zoomInTime;
    }
  }
}

// Function to handle touch start for zoom out
function handleTouchStartZoomOut(event) {
  zoomOutStartX = event.touches[0].clientX;
  zoomOutStartY = event.touches[0].clientY;
  zoomOutStartTime = new Date().getTime();
}

// Function to handle touch end for zoom out
function handleTouchEndZoomOut(event) {
  if (zoomOutStartX !== 0 && zoomOutStartY !== 0) {
    const zoomOutEndX = event.changedTouches[0].clientX;
    const zoomOutEndY = event.changedTouches[0].clientY;
    const zoomOutEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for zoom out
    const swipeDistanceX = zoomOutEndX - zoomOutStartX;
    const swipeDistanceY = zoomOutEndY - zoomOutStartY;

    // Calculate the time taken for the zoom out gesture in milliseconds
    const zoomOutTime = zoomOutEndTime - zoomOutStartTime;

    if (swipeDistanceX < 0 && swipeDistanceY < 0) {
      // It's a zoom out gesture
      document.getElementById('zoomIn').value = 0;
      document.getElementById('zoomOut').value = 1;
      document.getElementById('swipeWidth').value = Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY);
      document.getElementById('swipingRepetitionsX').value = swipeDistanceX;
      document.getElementById('swipingRepetitionsY').value = swipeDistanceY;
      document.getElementById('totalTimeTaken').value = zoomOutTime;
    }
  }
}

// ... Continue with other functions and event listeners ...

// Form submission
const swipeForm = document.getElementById('swipeForm');
swipeForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // You can send this data to the server using JavaScript fetch or XMLHttpRequest
  // Example using fetch:
  fetch('/swipe_gesture', {
    method: 'POST',
    body: new FormData(swipeForm), // Automatically includes all form fields
  })
    .then(response => {
      if (response.ok) {
        // Handle a successful response, e.g., show a success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block'; // Display the message
        console.log('Data submitted successfully.');
      } else {
        // Handle errors if the server responds with an error
        console.error('Error submitting data.');
      }
    })
    .catch(error => {
      // Handle network errors or other issues
      console.error('Network error:', error);
    });
});
