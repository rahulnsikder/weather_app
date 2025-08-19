const apiKey = "a611b05b582c411ab8b162940251108";
const weatherResult = document.getElementById("weatherResult");

// Press Enter to search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});

// Fetch weather by city
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    weatherResult.innerHTML = `<p>❌ Error fetching weather data.</p>`;
    console.error(err);
  }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1&aqi=yes`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
  } catch (err) {
    weatherResult.innerHTML = `<p>❌ Error fetching weather data.</p>`;
    console.error(err);
  }
}

// Display data
function displayWeather(data) {
  if (!data.location) {
    weatherResult.innerHTML = `<p>City not found.</p>`;
    return;
  }

  weatherResult.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p>🕒 Local Time: ${data.location.localtime}</p>
    <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
    <p>🌡️ <strong>Temperature:</strong> ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
    <p>☁️ <strong>Condition:</strong> ${data.current.condition.text}</p>
    <p>💧 <strong>Humidity:</strong> ${data.current.humidity}%</p>
    <p>💨 <strong>Wind:</strong> ${data.current.wind_kph} kph</p>
    <p>🌅 <strong>Sunrise:</strong> ${data.forecast.forecastday[0].astro.sunrise}</p>
    <p>🌇 <strong>Sunset:</strong> ${data.forecast.forecastday[0].astro.sunset}</p>
    <p>🟢 <strong>AQI (PM2.5):</strong> ${data.current.air_quality.pm2_5?.toFixed(1) || "Unavailable"}</p>
  `;
}

// Auto detect location on load
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => alert("Could not get your location. Please search manually.")
    );
  }
});

// Theme toggle with persistence
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "🔆";
} else {
  body.classList.add("light-mode");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    themeToggle.textContent = "🔆";
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }
});
