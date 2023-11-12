// Variables to track zoom in and zoom out
let zoomInStartX = 0;
let zoomInStartY = 0;
let zoomInStartTime = 0;
let zoomOutStartX = 0;
let zoomOutStartY = 0;
let zoomOutStartTime = 0;

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
      updateSwipeData(1, 0, swipeDistanceX, swipeDistanceY, zoomInTime);
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
      updateSwipeData(0, 1, swipeDistanceX, swipeDistanceY, zoomOutTime);
    }
  }
}

// Function to update hidden form fields with swipe gesture data
function updateSwipeData(zoomIn, zoomOut, swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  document.getElementById('zoomIn').value = zoomIn;
  document.getElementById('zoomOut').value = zoomOut;
  document.getElementById('swipeWidth').value = Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY);
  document.getElementById('swipingRepetitionsX').value = swipeDistanceX;
  document.getElementById('swipingRepetitionsY').value = swipeDistanceY;
  document.getElementById('totalTimeTaken').value = totalTimeTaken;


  // Variables to track right to left swipe
let rightToLeftStartX = 0;
let rightToLeftStartTime = 0;

// Function to handle touch start for right to left swipe
function handleTouchStartRightToLeft(event) {
  rightToLeftStartX = event.touches[0].clientX;
  rightToLeftStartTime = new Date().getTime();
}

// Function to handle touch end for right to left swipe
function handleTouchEndRightToLeft(event) {
  if (rightToLeftStartX !== 0) {
    const rightToLeftEndX = event.changedTouches[0].clientX;
    const rightToLeftEndTime = new Date().getTime();

    // Calculate the distance swiped in X direction for right to left swipe
    const swipeDistanceX = rightToLeftEndX - rightToLeftStartX;

    // Calculate the time taken for the right to left swipe gesture in milliseconds
    const rightToLeftTime = rightToLeftEndTime - rightToLeftStartTime;

    if (swipeDistanceX < 0) {
      // It's a right to left swipe gesture
      updateSwipeData(0, 0, swipeDistanceX, 0, rightToLeftTime);
    }
  }
}

// Add event listeners for touch start and touch end
document.addEventListener('touchstart', (event) => {
  handleTouchStartRightToLeft(event);
});

document.addEventListener('touchend', (event) => {
  handleTouchEndRightToLeft(event);
});


  // You can send this data to the server using JavaScript fetch or XMLHttpRequest
  // Example using fetch:
  fetch('/swipe_data', {
    method: 'POST',
    body: new FormData(document.getElementById('swipeForm')), // Automatically includes all form fields
  })
    .then(response => {
      if (response.ok) {
        console.log('Swipe data sent successfully.');
      } else {
        console.error('Error sending swipe data.');
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
}

// Add event listeners for touch start and touch end
document.addEventListener('touchstart', (event) => {
  handleTouchStartZoomIn(event);
  handleTouchStartZoomOut(event);
});

document.addEventListener('touchend', (event) => {
  handleTouchEndZoomIn(event);
  handleTouchEndZoomOut(event);
});

fetch('/swipe_data', {
  method: 'POST',
  body: new FormData(document.getElementById('swipeForm')), // Automatically includes all form fields
})
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      // Handle success, e.g., show a success message
      console.log('Swipe data sent successfully:', data.message);
      const successMessage = document.getElementById('successMessage');
      successMessage.style.display = 'block'; // Display the message

    } else {
      // Handle errors if the server responds with an error
      console.error('Error processing swipe data:', data.message);
    }
  })
  .catch(error => {
    // Handle network errors or other issues
    console.error('Network error:', error);
  });
