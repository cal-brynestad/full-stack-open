import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const api_key = import.meta.env.VITE_SOME_KEY
// variable api_key now has the value set in startup

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/all`)
    return request.then(response => response.data)
  }

const getCoordinates = ( cityName, limit ) => {
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${api_key}`)
  return request.then(response => response.data)
}

const getWeather = ( lat, lon ) => {
  const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => response.data)
}

  export default { getAll, getCoordinates, getWeather }