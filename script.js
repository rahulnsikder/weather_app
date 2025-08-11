//e1936efb6e0a44b2a29114201251108

// Run when user presses Enter in the input box
// Run when user presses Enter in the input box
document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("cityInput");

    if (cityInput) {
        cityInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // stop form submission or page refresh
                getWeather();
            }
        });
    }
});




async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const apiKey = "e1936efb6e0a44b2a29114201251108"; // Replace with your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        const condition = data.current.condition.text.toLowerCase();
        let bgColor = "#2c3e50";

        if (condition.includes("sunny") || condition.includes("clear")) {
            bgColor = "#f1c40f";
        } else if (condition.includes("cloud")) {
            bgColor = "#95a5a6";
        } else if (condition.includes("rain")) {
            bgColor = "#3498db";
        } else if (condition.includes("snow")) {
            bgColor = "#ecf0f1";
        }

        const weatherCard = `
            <div class="weather-card" style="background-color:${bgColor}; color:${condition.includes("snow") ? "#2c3e50" : "#fff"};">
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p><em>${data.location.localtime}</em></p>
                <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
                <div class="weather-details">
                    <p><strong>Condition:</strong> ${data.current.condition.text}</p>
                    <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
                    <p><strong>Feels Like:</strong> ${data.current.feelslike_c}°C</p>
                    <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
                </div>
            </div>
        `;

        const container = document.getElementById("weatherResult");
        container.innerHTML = weatherCard;

        // Wait for DOM update, then add 'show' for animation
        requestAnimationFrame(() => {
            container.querySelector(".weather-card").classList.add("show");
        });

    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "❌ Error fetching weather data.";
        console.error(error);
    }
}
// Theme Toggle Functionality
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    themeToggle.textContent = "☀ Light Mode";
} else {
    body.classList.add("light-mode");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        themeToggle.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});
