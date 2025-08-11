
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    

    const apiKey = "a611b05b582c411ab8b162940251108"; // Replace with your API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p><strong>Local Time:</strong> ${data.location.localtime}</p>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        `;
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
    themeToggle.textContent = "🔆";
} else {
    body.classList.add("light-mode");
}

// Toggle theme
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

