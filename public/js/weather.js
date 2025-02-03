const icon = document.getElementById('weather-icon');
const currentTemp = document.querySelector('#current-temp');
const caption = document.querySelector('figcaption');

const mykey = 'e7b2a5f6573f039c65783c60c1b47ddc'
const mylat = '49.7'
const mylog = '6.64'
const URL = `//api.openweathermap.org/data/2.5/weather?lat=${mylat}5&lon=${mylog}&units=imperial&appid=${mykey}`

async function apiFetch() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            console.log(data) //testing 
            displayResult(data);
        }

    } catch (error) {
        console.log(error)
    }
}

apiFetch();

function displayResult(data) {
    currentTemp.innerHTML = `${data.main.temp} &deg;F`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    let desc = data.weather[0].icon;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', desc);
    caption.textContent = `${desc}`

    console.log('Hello')
}