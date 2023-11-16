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

let minSwipeSpeed = 0; 


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

// Function to handle touch start for left to right swipe
function handleTouchStartLeftToRight(event) {
  leftToRightStartX = event.touches[0].clientX;
  leftToRightStartTime = new Date().getTime();
}

// Function to handle touch end for left to right swipe
function handleTouchEndLeftToRight(event) {
  if (leftToRightStartX !== 0) {
    const leftToRightEndX = event.changedTouches[0].clientX;
    const leftToRightEndTime = new Date().getTime();

    // Calculate the distance swiped in X direction for left to right swipe
    const swipeDistanceX = leftToRightEndX - leftToRightStartX;

    // Calculate the time taken for the left to right swipe gesture in milliseconds
    const leftToRightTime = leftToRightEndTime - leftToRightStartTime;

    if (swipeDistanceX > 0) {
      // It's a left to right swipe gesture
      updateSwipeData(1, 0, swipeDistanceX, 0, leftToRightTime);
    }
  }
}

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
    const swipeDistanceX = rightToLeftStartX - rightToLeftEndX;

    // Calculate the time taken for the right to left swipe gesture in milliseconds
    const rightToLeftTime = rightToLeftEndTime - rightToLeftStartTime;

    if (swipeDistanceX > 0) {
      // It's a right to left swipe gesture
      updateSwipeData(0, 1, swipeDistanceX, 0, rightToLeftTime);
    }
  }
}

// Function to handle touch start for scroll up
function handleTouchStartScrollUp(event) {
  scrollUpStartY = event.touches[0].clientY;
  scrollUpStartTime = new Date().getTime();
}

// Function to handle touch end for scroll up
function handleTouchEndScrollUp(event) {
  if (scrollUpStartY !== 0) {
    const scrollUpEndY = event.changedTouches[0].clientY;
    const scrollUpEndTime = new Date().getTime();

    // Calculate the distance swiped in Y direction for scroll up
    const swipeDistanceY = scrollUpStartY - scrollUpEndY;

    // Calculate the time taken for the scroll up gesture in milliseconds
    const scrollUpTime = scrollUpEndTime - scrollUpStartTime;

    if (swipeDistanceY > 0) {
      // It's a scroll up gesture
      updateSwipeData(0, 0, 0, swipeDistanceY, scrollUpTime);
    }
  }
}

// Function to handle touch start for scroll down
function handleTouchStartScrollDown(event) {
  scrollDownStartY = event.touches[0].clientY;
  scrollDownStartTime = new Date().getTime();
}

// Function to handle touch end for scroll down
function handleTouchEndScrollDown(event) {
  if (scrollDownStartY !== 0) {
    const scrollDownEndY = event.changedTouches[0].clientY;
    const scrollDownEndTime = new Date().getTime();

    // Calculate the distance swiped in Y direction for scroll down
    const swipeDistanceY = scrollDownEndY - scrollDownStartY;

    // Calculate the time taken for the scroll down gesture in milliseconds
    const scrollDownTime = scrollDownEndTime - scrollDownStartTime;

    if (swipeDistanceY > 0) {
      // It's a scroll down gesture
      updateSwipeData(0, 0, 0, swipeDistanceY, scrollDownTime);
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
        console.log('Swipe data sent successfully:', data.message);
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
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
  // Replace this with your actual velocity calculation logic
  return Math.sqrt((swipeDistanceX ** 2) + (swipeDistanceY ** 2)) / totalTimeTaken;
}

// Function to calculate zoom in
function calculateZoomIn(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe to the right and downward
  if (swipeDistanceX > 50 && swipeDistanceY > 50) {
    // Calculate the zoom in factor or speed based on the swipe distance and time taken
    return Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY) / totalTimeTaken;
  } else {
    // Return 0 if the swipe doesn't meet the criteria for a zoom in gesture
    return 0;
  }
}

// Function to calculate zoom out
function calculateZoomOut(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe to the left and upward
  if (swipeDistanceX < -50 && swipeDistanceY < -50) {
    // Calculate the zoom out factor or speed based on the swipe distance and time taken
    return Math.sqrt(swipeDistanceX * swipeDistanceX + swipeDistanceY * swipeDistanceY) / totalTimeTaken;
  } else {
    // Return 0 if the swipe doesn't meet the criteria for a zoom out gesture
    return 0;
  }
}

// Function to calculate left to right swipe
function calculateLeftToRight(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe to the right in X direction
  return swipeDistanceX > 50 && Math.abs(swipeDistanceY) < 50 ? swipeDistanceX / totalTimeTaken : 0;
}

// Function to calculate right to left swipe
function calculateRightToLeft(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe to the left in X direction
  return swipeDistanceX < -50 && Math.abs(swipeDistanceY) < 50 ? Math.abs(swipeDistanceX) / totalTimeTaken : 0;
}

// Function to calculate scroll up
function calculateScrollUp(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe upward in Y direction
  return swipeDistanceY > 50 && Math.abs(swipeDistanceX) < 50 ? swipeDistanceY / totalTimeTaken : 0;
}

// Function to calculate scroll down
function calculateScrollDown(swipeDistanceX, swipeDistanceY, totalTimeTaken) {
  // Assuming a significant swipe downward in Y direction
  if (swipeDistanceY < -50 && Math.abs(swipeDistanceX) < 50) {
    // Calculate the scroll down speed as the absolute value of swipeDistanceY divided by totalTimeTaken
    return Math.abs(swipeDistanceY) / totalTimeTaken;
  } else {
    // Return 0 if the swipe doesn't meet the criteria for a significant downward swipe
    return 0;
  }
}
// Function to calculate total number of clicks
function calculateTotalClicks(totalNumberOfClicks) {
  // Assuming totalNumberOfClicks is already tracked
  return totalNumberOfClicks || 0;
}

// Function to calculate total time taken
function calculateTotalTimeTaken(totalTimeTaken) {
  // Assuming totalTimeTaken is already tracked
  return totalTimeTaken || 0;
}

// Function to calculate max swipe speed
function calculateMaxSwipeSpeed(velocity, maxSwipeSpeed) {
  // Assuming maxSwipeSpeed is already tracked
  if (isNaN(velocity)) {
    return maxSwipeSpeed || 0;
  }
  return Math.max(velocity, maxSwipeSpeed || 0);
}

// Function to calculate min swipe speed
function calculateMinSwipeSpeed(velocity, minSwipeSpeed) {
  // Assuming minSwipeSpeed is already tracked
  if (isNaN(velocity)) {
    return minSwipeSpeed || 0;
  }
  return Math.min(velocity, minSwipeSpeed ||0);
}


// Function to update hidden form fields with swipe gesture data
function updateSwipeData(
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
  document.getElementById('maxSwipeSpeed').value = calculateMaxSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, totalTimeTaken), maxSwipeSpeed); 
  document.getElementById('minSwipeSpeed').value = calculateMinSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, totalTimeTaken), minSwipeSpeed);

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
        console.log('Swipe data sent successfully:', data.message);
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
      } else {
        console.error('Error processing swipe data:', data.message);
      }
    })
    .catch(error => {
      console.error('Network error:', error);
    });
}

// ... (Your existing code)
