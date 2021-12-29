// API key for OpenWeatherMap API
const apiKey = '&units=imperial&appid=adc4cda29de863b91bfcf8a07fd40aa1';

// OpenWeatherMap URL address
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Click event listener 
document.getElementById('generate').addEventListener('click', getWeather);

// Function that fires off when the click has been registered
function getWeather(e) {
    e.preventDefault();
    const zipCode = document.getElementById('zip').value;
    const userFeeling = document.getElementById('feelings').value;
    getWeatherInfo(baseURL, zipCode, apiKey)
    .then(function (weatherData) {
        const temperature = weatherData.main.temp;
        const city = weatherData.name;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const windSpeed = weatherData.wind.speed;
        const humidity = weatherData.main.humidity;
        const feeling = userFeeling;
        const country = weatherData.sys.country;
        // Weather info posted to the server
        postData('/add', {
            temperature, 
            city, 
            description, 
            icon, 
            windSpeed,
            humidity,
            feeling,
            country
        }).then(() => {updateUI();})
        // updateUI function to be called after the click is fired off and the weather info is gathered
    });
}

// Takes the url + zip + API and calls the API for the data
const getWeatherInfo = async (baseURL, zipCode, apiKey) => {

    const response = await fetch(baseURL + zipCode + apiKey)
    try {
        const newData = await response.json();
        console.log(newData)
        return newData;
    } 
    catch(error) {
        console.log("error", error);
    }
};

// POST function to server
async function postData(url, data) {
    await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
}

async function updateUI() {
    // GET function that takes the info from the server
    const response = await fetch('/retrieve');
    const allData = await response.json();
    console.log(allData);
    document.querySelector('.city').innerHTML = "Weather in " + allData.city+", "+ allData.country;
    document.querySelector('.temperature').innerHTML = Math.floor(allData.temperature) + "°F";
    document.querySelector('.description').innerHTML = allData.description.charAt(0).toUpperCase() + allData.description.slice(1);
    document.querySelector('.humidity').innerHTML = "Humidity: " + allData.humidity + "%";
    document.querySelector('.wind').innerHTML = "Wind speed: " + allData.windSpeed + "km/H";
    document.querySelector('.icon').src = "https://openweathermap.org/img/wn/" + allData.icon +"@2x.png";
    document.querySelector('.date').innerHTML = newDate;
    document.querySelector('.content').innerHTML = allData.feeling;
}