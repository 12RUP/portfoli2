window.onload = function() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    scrollToTopBtn.addEventListener("click", scrollToTop);

    window.addEventListener("scroll", handleScroll);

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.view-project').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.parentElement.querySelector('h3').textContent;
            const projectDescription = this.parentElement.querySelector('.description').innerHTML;
            const modalContent = document.querySelector('.modal-content');
            modalContent.querySelector('h2').textContent = projectTitle;
            modalContent.querySelector('p').innerHTML = projectDescription;
            document.getElementById('projectModal').style.display = 'block';
        });
    });

    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('projectModal').style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        const modal = document.getElementById('projectModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Load history from local storage
    loadHistory();

    document.getElementById('getWeatherBtn').addEventListener('click', function() {
        const city = document.getElementById('cityInput').value;
        if (city) {
            getWeather(city);
        }
    });

    document.getElementById('historyList').addEventListener('click', function(e) {
        if (e.target && e.target.nodeName == "LI") {
            getWeather(e.target.textContent);
        }
    });
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function handleScroll() {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (window.pageYOffset > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

function getWeather(city) {
    const apiKey = 'efecfb1bde9c5edcd618cb996a52d9dc';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('weatherInfo').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').classList.add('hidden');
            if (data.cod === 200) {
                document.getElementById('weatherInfo').classList.remove('hidden');
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').querySelector('span').textContent = `${data.main.temp} °C`;
                document.getElementById('weatherDescription').querySelector('span').textContent = data.weather[0].description;
                document.getElementById('humidity').querySelector('span').textContent = `${data.main.humidity}%`;
                document.getElementById('windSpeed').querySelector('span').textContent = `${data.wind.speed} m/s`;

                addToHistory(city);

                fetch(forecastUrl)
                    .then(response => response.json())
                    .then(forecastData => {
                        const forecastContainer = document.getElementById('forecast');
                        forecastContainer.innerHTML = '';
                        forecastData.list.forEach((forecast, index) => {
                            if (index % 8 === 0) {
                                const forecastItem = document.createElement('div');
                                forecastItem.classList.add('forecast-item');
                                forecastItem.innerHTML = `
                                    <h3>${new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                                    <p><i class="fas fa-temperature-low"></i> Temp: ${forecast.main.temp} °C</p>
                                    <p>${forecast.weather[0].description}</p>
                                `;
                                forecastContainer.appendChild(forecastItem);
                            }
                        });
                    });
            } else {
                document.getElementById('error').textContent = 'City not found!';
                document.getElementById('error').classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            document.getElementById('loading').classList.add('hidden');
            document.getElementById('error').textContent = 'Error fetching weather data. Please try again.';
            document.getElementById('error').classList.remove('hidden');
        });
}

function addToHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    if (!history.includes(city)) {
        history.push(city);
        localStorage.setItem('weatherHistory', JSON.stringify(history));
        displayHistory();
    }
}

function loadHistory() {
    displayHistory();
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        historyList.appendChild(listItem);
    });
}
function clearHistory() {
    localStorage.removeItem('weatherHistory');
    document.getElementById('historyList').innerHTML = '';
    document.getElementById('clearHistoryBtn').classList.remove('hidden');
}