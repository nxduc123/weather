//lay api theo api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}
const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=b7b39aefe11c32e8af7a2859fe107588';
//const url2 = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b7b39aefe11c32e8af7a2859fe107588&units=metric';
//Lay theo vi tri dia ly cua dien thoai
const fetchWeather  = (lat,lon) => {
    const url = weatherUrl + '&lat=' + lat + '&lon=' + lon + '&units=metric';
    return fetch (url)
        .then(res => res.json())
        .then(json => ({
            country: json.sys.country,
            city: json.name,
            temp: json.main.temp,
            weather: json.weather[0].main,
            windSpeed: json.wind.speed,
            pressure: json.main.pressure,
            tempMax:json.main.temp_max,
            tempMin: json.main.temp_min
        }));
}


const fetchWeatherByCity = (city) => {
    const url2 = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b7b39aefe11c32e8af7a2859fe107588&units=metric';
    return fetch (url2)
      .then(res => res.json())
      .then(json => ({
        country: json.sys.country,
        temp: json.main.temp,
        weather: json.weather[0].main,
        windSpeed: json.wind.speed,
        pressure: json.main.pressure,
        tempMax: json.main.temp_max,
        tempMin: json.main.temp_min
      }));
  };

  export {fetchWeather, fetchWeatherByCity} ;