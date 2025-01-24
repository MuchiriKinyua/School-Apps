const apiKey = "your-api-key";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " knots";

            // Set weather icon based on data
            if (data.weather[0].main === "Clouds") {
                weatherIcon.src = "images/clouds.png";
                weatherIcon.alt = "Cloudy Weather";
            } else if (data.weather[0].main === "Clear") {
                weatherIcon.src = "images/clear.png";
                weatherIcon.alt = "Clear Weather";
            } else if (data.weather[0].main === "Rain") {
                weatherIcon.src = "images/rain.png";
                weatherIcon.alt = "Rainy Weather";
            } else if (data.weather[0].main === "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                weatherIcon.alt = "Drizzling Weather";
            } else if (data.weather[0].main === "Mist") {
                weatherIcon.src = "images/mist.png";
                weatherIcon.alt = "Misty Weather";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("An error occurred:", error);
        document.querySelector(".error").textContent = "Something went wrong. Please try again.";
        document.querySelector(".error").style.display = "block";
    }
}

// Trigger search on button click
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Trigger search on Enter key press
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
