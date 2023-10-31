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
      document.getElementById('zoomInDistanceX').value = swipeDistanceX;
      document.getElementById('zoomInDistanceY').value = swipeDistanceY;
      document.getElementById('zoomInTime').value = zoomInTime;
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
      document.getElementById('zoomOutDistanceX').value = Math.abs(swipeDistanceX);
      document.getElementById('zoomOutDistanceY').value = Math.abs(swipeDistanceY);
      document.getElementById('zoomOutTime').value = zoomOutTime;
    }
  }
}

// ... Continue with other functions and event listeners ...


// Function to handle touch start for zoom out
function handleTouchStartZoomOut(event) {
  zoomInStartX = event.touches[0].clientX;
  zoomInStartY = event.touches[0].clientY;
  zoomInStartTime = new Date().getTime();
}

// Function to handle touch end for zoom out
function handleTouchEndZoomOut(event) {
  if (zoomInStartX !== 0 && zoomInStartY !== 0) {
    const zoomInEndX = event.changedTouches[0].clientX;
    const zoomInEndY = event.changedTouches[0].clientY;
    const zoomInEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for zoom out
    const swipeDistanceX = zoomInEndX - zoomInStartX;
    const swipeDistanceY = zoomInEndY - zoomInStartY;

    // Calculate the time taken for the zoom out gesture in milliseconds
    const zoomOutTime = zoomInEndTime - zoomInStartTime;

    if (swipeDistanceX < 0 && swipeDistanceY < 0) {
      // It's a zoom out gesture
      document.getElementById('zoomIn').value = 0;
      document.getElementById('zoomOut').value = 1;
      document.getElementById('zoomOutDistanceX').value = Math.abs(swipeDistanceX);
      document.getElementById('zoomOutDistanceY').value = Math.abs(swipeDistanceY);
      document.getElementById('zoomOutTime').value = zoomOutTime;
    }
  }
}

// Add event listeners for touch start and end
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);
// Add event listeners for zoom in
document.addEventListener('touchstart', handleTouchStartZoomIn);
document.addEventListener('touchend', handleTouchEndZoomIn);
// Add event listeners for zoom out
document.addEventListener('touchstart', handleTouchStartZoomOut);
document.addEventListener('touchend', handleTouchEndZoomOut);

// ... Add similar event listeners for other gestures ...

// Form submission
const swipeForm = document.getElementById('swipeForm');
swipeForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  // Collect data from the hidden fields
  const leftToRight = document.getElementById('leftToRight').value;
  const rightToLeft = document.getElementById('rightToLeft').value;
  const swipeTime = document.getElementById('swipeTime').value;
  const scrollUp = document.getElementById('scrollUp').value;
  const scrollDown = document.getElementById('scrollDown').value;
  const zoomIn = document.getElementById('zoomIn').value;
  const zoomOut = document.getElementById('zoomOut').value;
  const zoomInDistanceX = document.getElementById('zoomInDistanceX').value;
  const zoomInDistanceY = document.getElementById('zoomInDistanceY').value;
  const zoomInTime = document.getElementById('zoomInTime').value;
  const zoomOutDistanceX = document.getElementById('zoomOutDistanceX').value;
  const zoomOutDistanceY = document.getElementById('zoomOutDistanceY').value;
  const zoomOutTime = document.getElementById('zoomOutTime').value;
  // ... Include other gesture data ...

  // You can send this data to the server using JavaScript fetch or XMLHttpRequest
  // Example using fetch:
  fetch('/swipe_data', {
    method: 'POST',
    body: JSON.stringify({
      leftToRight,
      rightToLeft,
      swipeTime,
      scrollUp,
      scrollDown,
      zoomIn,
      zoomOut,
      zoomInDistanceX,
      zoomInDistanceY,
      zoomInTime,
      zoomOutDistanceX,
      zoomOutDistanceY,
      zoomOutTime,
      // ... Include other gesture data ...
    }),
    headers: {
      'Content-Type': 'application/json',
    },
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
