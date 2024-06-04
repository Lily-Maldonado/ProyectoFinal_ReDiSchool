/*Read More Section*/
const hideTextBtns = document.querySelectorAll(".hide-text-btn");
const hideTexts = document.querySelectorAll(".hide-text");

// Iterar sobre cada botón y agregar un evento de clic
hideTextBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    hideTexts[index].classList.toggle("show");

    if (hideTexts[index].classList.contains("show")) {
      btn.innerHTML = "Read Less";
    } else {
      btn.innerHTML = "Read More";
    }
  });
});

/*FOR MEDITATION SECTION*/
/*load sounds. free download from https://pixabay.com/sound-effects/search/bell%20meditation/?pagi=2 */
const inhaleSound = new Audio("audios/inhale.mp3");
const exhaleSound = new Audio("audios/exhale.mp3");
const holdSound = new Audio("audios/inhale.mp3");
const rainSound = new Audio("audios/rain.mp3");
const wavesSound = new Audio("audios/waves.mp3");
const forestSound = new Audio("audios/forest.mp3");

/* Selects the HTML element with the id 'countdown' and assigns it to the variable 'display'*/
const display = document.getElementById("countdown");
/* Selects the HTML element with the id 'resetButton' and assigns it to the variable 'resetButton'*/
const resetButton = document.getElementById("resetButton");

/*This method selects all elements in the document that match the specified CSS selector (.icon-button and .timer-button).
It returns a NodeList of all matching elements.*/
const roundedButtons = document.querySelectorAll(".icon-button");
const timerButtons = document.querySelectorAll(".timer-button");

/* Setup some variables */
let cycleInterval;
let countdownInterval;
let audioLoopInterval;
let cycleCount = 0;
let countdownDuration = 0;
let audioPlaying = false;
let selectedAudio = null;
let activeButton = null;

/*Function to start the breathing cycle, in this case is 12 seconds*/
function startBreathingCycle(duration) {
  /* Display the initial time left formatted as 'Time left: mm:ss'*/
  display.textContent = "Time left: " + formatTime(duration);

  /* Initialize cycle counter to 0 and display it*/
  document.getElementById("cycleCounter").textContent = "Cycles: 0";

  /* Clear any existing intervals to avoid overlapping cycles */
  clearInterval(cycleInterval);
  clearInterval(countdownInterval);
  clearInterval(audioLoopInterval);

  /* Check if a selected audio track exists */
  if (selectedAudio) {
    /* Reset audio track to the beginning and ensure it does not loop */
    selectedAudio.currentTime = 0;
    selectedAudio.loop = false;

    /* Attempt (catch) to play the audio track */
    selectedAudio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });

    /* Set audioPlaying flag to true */
    audioPlaying = true;

    /* Set interval to loop the audio track once it finishes playing */
    audioLoopInterval = setInterval(() => {
      selectedAudio.currentTime = 0;
      selectedAudio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }, selectedAudio.duration * 1000);
  }

  /* Set interval for the breathing cycle with a duration of 12 seconds */
  cycleInterval = setInterval(() => {
    /* Play inhale sound and increment the cycle count */
    inhaleSound
      .play()
      .then(() => {
        document.getElementById("cycleCounter").textContent =
          "Cycles: " + ++cycleCount;
      })
      .catch((error) => {
        console.error("Error playing inhale sound:", error);
      });

    /* Set timeout to play the hold sound 4 seconds after inhale */
    setTimeout(() => {
      holdSound.play().catch((error) => {
        console.error("Error playing hold sound:", error);
      });
    }, 4000);

    /* Set timeout to play the exhale sound 8 seconds after inhale */
    setTimeout(() => {
      exhaleSound.play().catch((error) => {
        console.error("Error playing exhale sound:", error);
      });
    }, 8000);

    /* Update the display with the time left */
    display.textContent = "Time left: " + formatTime(duration);
  }, 12000); /* Interval for one complete breathing cycle */

  /* Set the countdown duration to the initial duration provided */
  countdownDuration = duration;

  /* Set interval to update the countdown timer every second */
  countdownInterval = setInterval(() => {
    countdownDuration--; /* Decrement the countdown duration by 1 second */
    display.textContent =
      "Time left: " +
      formatTime(countdownDuration); /* Update the display with the time left */

    /* Check if countdown has reached zero */
    if (countdownDuration <= 0) {
      /* Clear all intervals to stop the cycle */
      clearInterval(cycleInterval);
      clearInterval(countdownInterval);
      clearInterval(audioLoopInterval);

      /* Pause the audio if it is playing */
      if (selectedAudio) {
        selectedAudio.pause();
        audioPlaying = false;
      }

      /* Call resetButtons function to reset the state of the buttons */
      resetButtons();
    }
  }, 1000); /* Interval for the countdown timer */
}

/* Function to stop the breathing cyle and stop the timer when clicked */
function stopBreathingCycle() {
  /* Clear the interval that manages the breathing cycle */
  clearInterval(cycleInterval);

  /* Clear the interval that updates the countdown timer */
  clearInterval(countdownInterval);

  /* Clear the interval that loops the audio track */
  clearInterval(audioLoopInterval);

  /* Check if a selected audio track exists */
  if (selectedAudio) {
    /* Pause the audio track */
    selectedAudio.pause();
    /* Set the audioPlaying flag to false */
    audioPlaying = false;
  }

  /* Call resetButtons function to reset the state of the buttons */
  resetButtons();

  /* Update the display with the remaining time formatted as 'Time left: mm:ss' */
  display.textContent = "Time left: " + formatTime(countdownDuration);
}

/* This function formats the time and ensures two digits as shown in html */
function formatTime(seconds) {
  /* Calculate the number of whole minutes by dividing the total seconds by 60 and rounding down */
  const minutes = Math.floor(seconds / 60);

  /* Calculate the remaining seconds after accounting for the minutes */
  const remainingSeconds = seconds % 60;

  /* Format the minutes and seconds as a string "mm:ss", ensuring both are two digits */
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
}

/* Functionalities for buttons: background music, timer and reset */
/* Iterate over each element in the NodeList 'roundedButtons' */
roundedButtons.forEach((btn) => {
  /* Add a 'click' event listener to each button */
  btn.addEventListener("click", () => {
    /* Remove the 'clicked' class from all buttons to reset their state */
    roundedButtons.forEach((button) => button.classList.remove("clicked"));
    /* Add the 'clicked' class to the button that was just clicked */
    btn.classList.add("clicked");

    /* Switch statement to handle different button ids and set 'selectedAudio' accordingly */
    switch (btn.id) {
      case "rainButton":
        /* If the button has id 'rainButton', set 'selectedAudio' to 'rainSound' */
        selectedAudio = rainSound;
        break;
      case "wavesButton":
        /* If the button has id 'wavesButton', set 'selectedAudio' to 'wavesSound' */
        selectedAudio = wavesSound;
        break;
      case "forestButton":
        /* If the button has id 'forestButton', set 'selectedAudio' to 'forestSound' */
        selectedAudio = forestSound;
        break;
      case "silentButton":
        /* If the button has id 'silentButton', set 'selectedAudio' to null to indicate no sound */
        selectedAudio = null;
        break;
    }

    /* Check if audio is currently playing */
    if (audioPlaying) {
      /* Attempt to play the selected audio, handling any errors that might occur */
      selectedAudio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  });
});

/* Iterate over each element in the NodeList 'timerButtons' */
timerButtons.forEach((btn) => {
  /* Add a 'click' event listener to each button */
  btn.addEventListener("click", () => {
    /* Convert the button's text content (assumed to be in minutes) to seconds */
    const duration = parseInt(btn.textContent) * 60;

    /* Check if the button's text content is 'Stop' */
    if (btn.textContent === "Stop") {
      /* Call the function to stop the breathing cycle */
      stopBreathingCycle();
      /* Restore the button's original text from its 'data-original-text' attribute */
      btn.textContent = btn.dataset.originalText;
      /* Set the activeButton variable to null to indicate no button is active */
      activeButton = null;
    } else {
      /* Reset the text content of all timer buttons to their original text or current text */
      timerButtons.forEach(
        (button) =>
          (button.textContent =
            button.dataset.originalText || button.textContent)
      );
      /* Start the breathing cycle with the calculated duration */
      startBreathingCycle(duration);
      /* Change the text content of the clicked button to 'Stop' */
      btn.textContent = "Stop";
      /* Set the clicked button as the active button */
      activeButton = btn;
    }
  });
});

/* Refresh the page to its initial state */ document.addEventListener(
  "DOMContentLoaded",
  function () {
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", () => {
      location.reload();
    });
  }
);
//For speech bubble//
document
  .getElementById("hover-text")
  .addEventListener("mouseover", function () {
    document.getElementById("speech-bubble").classList.add("visible");
  });

document.getElementById("hover-text").addEventListener("mouseout", function () {
  document.getElementById("speech-bubble").classList.remove("visible");
});

// To keep the bubble visible when clicking
document.getElementById("hover-text").addEventListener("click", function () {
  const speechBubble = document.getElementById("speech-bubble");
  if (speechBubble.classList.contains("visible")) {
    speechBubble.classList.remove("visible");
  } else {
    speechBubble.classList.add("visible");
  }
});

//for meditation back home button//
document.getElementById("homeButton").addEventListener("click", function () {
  window.location.href = "index.html";
});
