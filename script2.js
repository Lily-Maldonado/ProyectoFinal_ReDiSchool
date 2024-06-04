const apiKey = "af7af4041c718fc8f5d57b55206ec54e"; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.error(`Error fetching weather: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}

function getSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "Spring";
  if (month >= 6 && month <= 8) return "Summer";
  if (month >= 9 && month <= 11) return "Autumn";
  return "Winter";
}

function suggestClothing(weather, season) {
  const temperature = weather.main.temp;
  const condition = weather.weather[0].main;
  let suggestion = "";

  if (season === "Summer") {
    suggestion = "Wear light clothing, stay hydrated.";
  } else if (season === "Winter") {
    suggestion = "Wear warm clothing, stay warm.";
  } else if (season === "Spring" || season === "Autumn") {
    suggestion = "Wear layers and a jacket.";
  }

  if (condition.includes("Rain")) {
    suggestion += " Don't forget an umbrella.";
  }

  return {
    suggestion: suggestion,
    keywords: suggestion
      .split(" ")
      .filter((word) => !word.includes(",") && !word.includes("."))
      .join(" "),
  };
}

function setWeatherIcon(condition) {
  const icon = document.getElementById("weather-icon");
  switch (condition.toLowerCase()) {
    case "clear":
      icon.className = "fas fa-sun";
      break;
    case "rain":
      icon.className = "fas fa-cloud-showers-heavy";
      break;
    case "clouds":
      icon.className = "fas fa-cloud";
      break;
    default:
      icon.className = "fas fa-cloud-sun";
      break;
  }
}

function setSeasonIcon(season) {
  const icon = document.getElementById("season-icon");
  switch (season.toLowerCase()) {
    case "summer":
      icon.className = "fas fa-umbrella-beach";
      break;
    case "winter":
      icon.className = "fas fa-snowflake";
      break;
    case "spring":
      icon.className = "fas fa-seedling";
      break;
    case "autumn":
      icon.className = "fas fa-leaf";
      break;
  }
}

/*Suggest an imagen*/
function updateSuggestionImage(keywords) {
  const image = document.getElementById("suggestion-image");
  const keywordToImageMap = {
    "light clothing": "imagenes/summer-outfits.jpg",
    "stay hydrated": "imagenes/hydrated.jpg",
    "warm clothing": "imagenes/winter-outfits.jpg",
    "stay warm": "imagenes/stay_warm.jpg",
    layers: "imagenes/spring-layers.jpg",
    jacket: "imagenes/Autumn-jacket.jpg",
    umbrella: "imagenes/umbrella_rain.jpg",
  };

  let selectedImage = "";
  for (const [key, value] of Object.entries(keywordToImageMap)) {
    if (keywords.includes(key)) {
      selectedImage = value;
      break;
    }
  }

  console.log(`Selected image: ${selectedImage}`);

  const debugMessage = document.getElementById("debug-message");
  if (selectedImage) {
    image.src = selectedImage;
    image.style.display = "block";
    debugMessage.textContent = `Loaded image: ${selectedImage}`;
  } else {
    image.style.display = "none";
    debugMessage.textContent = "No image selected";
  }
}
async function updateWeather(city) {
  const weather = await getWeather(city);
  if (!weather) {
    document.getElementById("weather-text").textContent =
      "Error fetching weather data.";
    return;
  }
  const season = getSeason();
  const suggestionData = suggestClothing(weather, season);

  document.getElementById("weather-text").textContent =
    weather.weather[0].description;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${weather.main.temp}°C`;
  document.getElementById("season-text").textContent = `Season: ${season}`;
  document.getElementById(
    "suggestion-text"
  ).textContent = `Suggestion: ${suggestionData.suggestion}`;

  setWeatherIcon(weather.weather[0].main);
  setSeasonIcon(season);

  updateSuggestionImage(suggestionData.keywords);
}

document
  .getElementById("fetch-weather-button")
  .addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
      console.log(`Fetching weather for: ${city}`);
      updateWeather(city);
    }
  });

document.getElementById("refresh-button").addEventListener("click", () => {
  location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("backHomeButton")
    .addEventListener("click", function () {
      console.log("Navigating back home");
      window.location.href = "index.html";
    });
});
