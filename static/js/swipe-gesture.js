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
    // ... (Your existing code)

    // Call the function to update max and min swipe speeds
    minSwipeSpeed = calculateMinSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomInTime), minSwipeSpeed);
    maxSwipeSpeed = calculateMaxSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomInTime), maxSwipeSpeed);
  }
}

// Function to handle touch end for zoom out
function handleTouchEndZoomOut(event) {
  if (zoomOutStartX !== 0 && zoomOutStartY !== 0) {
    // ... (Your existing code)

    // Call the function to update max and min swipe speeds
    minSwipeSpeed = calculateMinSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomOutTime), minSwipeSpeed);
    maxSwipeSpeed = calculateMaxSwipeSpeed(calculateVelocity(swipeDistanceX, swipeDistanceY, zoomOutTime), maxSwipeSpeed);
  }
}

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
       // console.log('Swipe data sent successfully:', data.message);
        //const successMessage = document.getElementById('successMessage');
        //successMessage.style.display = 'block';
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
  let maximum = Math.max(velocity, maxSwipeSpeed);
  // Math.min(10,3,8,1,33)
  let minimum = Math.min(velocity, maxSwipeSpeed);
  let maxSwipeSpeed =  ([maximum, minimum]); 
  return result;
};



// Function to calculate min swipe speed
function calculateMinSwipeSpeed(velocity, minSwipeSpeed) {
  let maximum = Math.max(velocity, minSwipeSpeed);
  let minimum = Math.min(velocity, minSwipeSpeed);
  let minSwipeSpeed =  ([maximum, minimum]); 
  return result;}

