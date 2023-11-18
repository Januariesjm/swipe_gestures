// Variables to track zoom in and zoom out
let zoomInStartX = 0;
let zoomInStartY = 0;
let zoomInStartTime = 0;
let zoomOutStartX = 0;
let zoomOutStartY = 0;
let zoomOutStartTime = 0;

// Variables to track left to right swipe
let leftToRightStartX = 0;
let leftToRightStartTime = 0;

// Variables to track right to left swipe
let rightToLeftStartX = 0;
let rightToLeftStartTime = 0;

// Variables to track scroll up
let scrollUpStartY = 0;
let scrollUpStartTime = 0;

// Variables to track scroll down
let scrollDownStartY = 0;
let scrollDownStartTime = 0;

let minSwipeSpeed = Infinity; // Initialize to a large value
let maxSwipeSpeed = 0; // Initialize to 0

// Function to calculate max swipe speed
function calculateMaxSwipeSpeed(velocity, maxSwipeSpeed) {
  return Math.max(velocity, maxSwipeSpeed);
}

// Function to calculate min swipe speed
function calculateMinSwipeSpeed(velocity, minSwipeSpeed) {
  return Math.min(velocity, minSwipeSpeed);
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
      updateSwipeData(
        1,
        0,
        swipeDistanceX,
        swipeDistanceY,
        zoomInTime,
        0,
        0,
        0,
        0,
        0,
        calculateMaxSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomInTime), maxSwipeSpeed),
        calculateMinSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomInTime), minSwipeSpeed)
      );
    }
  }
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
      updateSwipeData(
        0,
        1,
        swipeDistanceX,
        swipeDistanceY,
        zoomOutTime,
        0,
        0,
        0,
        0,
        0,
        calculateMaxSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomOutTime), maxSwipeSpeed),
        calculateMinSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomOutTime), minSwipeSpeed)
      );
    }
  }
}

// Similar modifications for other touch end functions

// Function to update hidden form fields with swipe gesture data
function updateSwipeData(
  zoomIn,
  zoomOut,
  swipeDistanceX,
  swipeDistanceY,
  totalTimeTaken,
  leftToRightTime,
  rightToLeftTime,
  scrollUpTime,
  scrollDownTime,
  totalNumberOfClicks,
  maxSwipeSpeed,
  minSwipeSpeed
) {
  document.getElementById('zoomIn').value = calculateZoomIn(swipeDistanceX, swipeDistanceY, totalTimeTaken);
  document.getElementById('zoomOut').value = calculateZoomOut(swipeDistanceX, swipeDistanceY, totalTimeTaken);
  document.getElementById('swipeWidth').value = Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY);
  document.getElementById('swipingRepetitionsX').value = swipeDistanceX;
  document.getElementById('swipingRepetitionsY').value = swipeDistanceY;
  document.getElementById('totalTimeTaken').value = totalTimeTaken;

  // Additional fields
  document.getElementById('leftToRight').value = calculateLeftToRight(swipeDistanceX, swipeDistanceY, totalTimeTaken);
  document.getElementById('rightToLeft').value = calculateRightToLeft(swipeDistanceX, swipeDistanceY, totalTimeTaken);
  document.getElementById('scrollUp').value = calculateScrollUp(swipeDistanceX, swipeDistanceY, totalTimeTaken);
  document.getElementById('scrollDown').value = calculateScrollDown(swipeDistanceX, swipeDistanceY, totalTimeTaken);

  document.getElementById('totalClicks').value = calculateTotalClicks(totalNumberOfClicks);
  document.getElementById('velocity').value = calculateVelocity(swipeDistanceX, swipeDistanceY, totalTimeTaken) || 0;
  document.getElementById('maxSwipeSpeed').value = maxSwipeSpeed;
  document.getElementById('minSwipeSpeed').value = minSwipeSpeed;

  // You can send this data to the server using JavaScript fetch or XMLHttpRequest
  // Example using fetch:
  fetch('/swipe_data', {
    method: 'POST',
    body: new FormData(document.getElementById('swipeForm')),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      if (data.status === 'success') {
        // console.log('Swipe data sent successfully:', data.message);
        // const successMessage = document.getElementById('successMessage');
        // successMessage.style.display = 'block';
      } else {
        console.error('Error processing swipe data:', data.message);
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
}

// Add event listeners for touch start and touch end
document.addEventListener('touchstart', (event) => {
  // ... (Your existing code)
  handleTouchStartZoomIn(event);
  handleTouchStartZoomOut(event);
  handleTouchStartLeftToRight(event);
  handleTouchStartRightToLeft(event);
  handleTouchStartScrollUp(event);
  handleTouchStartScrollDown(event);
});

document.addEventListener('touchend', (event) => {
  // ... (Your existing code)
  handleTouchEndZoomIn(event);
  handleTouchEndZoomOut(event);
  handleTouchEndLeftToRight(event);
  handleTouchEndRightToLeft(event);
  handleTouchEndScrollUp(event);
  handleTouchEndScrollDown(event);
});

// Function to calculate velocity
function calculateVelocity(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  return Math.sqrt((swipeDistanceX ** 2) + (swipeDistanceY ** 2)) / totalTimeTaken;
}

// Function to calculate zoom in
function calculateZoomIn(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  if (swipeDistanceX > 50 && swipeDistanceY > 50) {
    return Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY) / totalTimeTaken;
  } else {
    return 0;
  }
}

// Function to calculate zoom out
function calculateZoomOut(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  if (swipeDistanceX < -50 && swipeDistanceY < -50) {
    return Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY) / totalTimeTaken;
  } else {
    return 0;
  }
}

// Function to calculate left to right swipe
function calculateLeftToRight(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  return swipeDistanceX > 50 && Math.abs(swipeDistanceY) < 50 ? swipeDistanceX / totalTimeTaken : 0;
}

// Function to calculate right to left swipe
function calculateRightToLeft(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  return swipeDistanceX < -50 && Math.abs(swipeDistanceY) < 50 ? Math.abs(swipeDistanceX) / totalTimeTaken : 0;
}

// Function to calculate scroll up
function calculateScrollUp(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  return swipeDistanceY > 50 && Math.abs(swipeDistanceX) < 50 ? swipeDistanceY / totalTimeTaken : 0;
}

// Function to calculate scroll down
function calculateScrollDown(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  if (swipeDistanceY < -50 && Math.abs(swipeDistanceX) < 50) {
    return Math.abs(swipeDistanceY) / totalTimeTaken;
  } else {
    return 0;
  }
}

// Function to calculate total number of clicks
function calculateTotalClicks(totalNumberOfClicks) {
  return totalNumberOfClicks || 0;
}

// Function to calculate total time taken
function calculateTotalTimeTaken(totalTimeTaken) {
  return totalTimeTaken || 0;
}
