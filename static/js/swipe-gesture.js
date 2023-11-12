// Variables to track left-to-right and right-to-left swipes
let leftToRightStartX = 0;
let leftToRightStartY = 0;
let leftToRightStartTime = 0;
let rightToLeftStartX = 0;
let rightToLeftStartY = 0;
let rightToLeftStartTime = 0;

// Variables to track scroll up and scroll down
let scrollUpStartX = 0;
let scrollUpStartY = 0;
let scrollUpStartTime = 0;
let scrollDownStartX = 0;
let scrollDownStartY = 0;
let scrollDownStartTime = 0;

// Function to handle touch start for left-to-right swipe
function handleTouchStartLeftToRight(event) {
  leftToRightStartX = event.touches[0].clientX;
  leftToRightStartY = event.touches[0].clientY;
  leftToRightStartTime = new Date().getTime();
}

// Function to handle touch end for left-to-right swipe
function handleTouchEndLeftToRight(event) {
  if (leftToRightStartX !== 0 && leftToRightStartY !== 0) {
    const leftToRightEndX = event.changedTouches[0].clientX;
    const leftToRightEndY = event.changedTouches[0].clientY;
    const leftToRightEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for left-to-right swipe
    const swipeDistanceX = leftToRightEndX - leftToRightStartX;
    const swipeDistanceY = leftToRightEndY - leftToRightStartY;

    // Calculate the time taken for the left-to-right swipe gesture in milliseconds
    const leftToRightTime = leftToRightEndTime - leftToRightStartTime;

    if (swipeDistanceX > 0 && Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
      // It's a left-to-right swipe
      updateSwipeData(1, 0, swipeDistanceX, swipeDistanceY, leftToRightTime);
    }
  }
}

// Function to handle touch start for right-to-left swipe
function handleTouchStartRightToLeft(event) {
  rightToLeftStartX = event.touches[0].clientX;
  rightToLeftStartY = event.touches[0].clientY;
  rightToLeftStartTime = new Date().getTime();
}

// Function to handle touch end for right-to-left swipe
function handleTouchEndRightToLeft(event) {
  if (rightToLeftStartX !== 0 && rightToLeftStartY !== 0) {
    const rightToLeftEndX = event.changedTouches[0].clientX;
    const rightToLeftEndY = event.changedTouches[0].clientY;
    const rightToLeftEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for right-to-left swipe
    const swipeDistanceX = rightToLeftEndX - rightToLeftStartX;
    const swipeDistanceY = rightToLeftEndY - rightToLeftStartY;

    // Calculate the time taken for the right-to-left swipe gesture in milliseconds
    const rightToLeftTime = rightToLeftEndTime - rightToLeftStartTime;

    if (swipeDistanceX < 0 && Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
      // It's a right-to-left swipe
      updateSwipeData(0, 1, swipeDistanceX, swipeDistanceY, rightToLeftTime);
    }
  }
}

// Function to handle touch start for scroll up
function handleTouchStartScrollUp(event) {
  scrollUpStartX = event.touches[0].clientX;
  scrollUpStartY = event.touches[0].clientY;
  scrollUpStartTime = new Date().getTime();
}

// Function to handle touch end for scroll up
function handleTouchEndScrollUp(event) {
  if (scrollUpStartX !== 0 && scrollUpStartY !== 0) {
    const scrollUpEndX = event.changedTouches[0].clientX;
    const scrollUpEndY = event.changedTouches[0].clientY;
    const scrollUpEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for scroll up
    const swipeDistanceX = scrollUpEndX - scrollUpStartX;
    const swipeDistanceY = scrollUpEndY - scrollUpStartY;

    // Calculate the time taken for the scroll up gesture in milliseconds
    const scrollUpTime = scrollUpEndTime - scrollUpStartTime;

    if (swipeDistanceY < 0 && Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
      // It's a scroll up gesture
      updateSwipeData(0, 0, swipeDistanceX, swipeDistanceY, scrollUpTime);
    }
  }
}

// Function to handle touch start for scroll down
function handleTouchStartScrollDown(event) {
  scrollDownStartX = event.touches[0].clientX;
  scrollDownStartY = event.touches[0].clientY;
  scrollDownStartTime = new Date().getTime();
}

// Function to handle touch end for scroll down
function handleTouchEndScrollDown(event) {
  if (scrollDownStartX !== 0 && scrollDownStartY !== 0) {
    const scrollDownEndX = event.changedTouches[0].clientX;
    const scrollDownEndY = event.changedTouches[0].clientY;
    const scrollDownEndTime = new Date().getTime();

    // Calculate the distance swiped in X and Y directions for scroll down
    const swipeDistanceX = scrollDownEndX - scrollDownStartX;
    const swipeDistanceY = scrollDownEndY - scrollDownStartY;

    // Calculate the time taken for the scroll down gesture in milliseconds
    const scrollDownTime = scrollDownEndTime - scrollDownStartTime;

    if (swipeDistanceY > 0 && Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)) {
      // It's a scroll down gesture
      updateSwipeData(0, 0, swipeDistanceX, swipeDistanceY, scrollDownTime);
    }
  }
}

// Add event listeners for touch start and touch end
document.addEventListener('touchstart', (event) => {
  handleTouchStartZoomIn(event);
  handleTouchStartZoomOut(event);
  handleTouchStartLeftToRight(event);
  handleTouchStartRightToLeft(event);
  handleTouchStartScrollUp(event);
  handleTouchStartScrollDown(event);
});

document.addEventListener('touchend', (event) => {
  handleTouchEndZoomIn(event);
  handleTouchEndZoomOut(event);
  handleTouchEndLeftToRight(event);
  handleTouchEndRightToLeft(event);
  handleTouchEndScrollUp(event);
  handleTouchEndScrollDown(event);
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
