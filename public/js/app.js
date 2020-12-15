const weatherForm = document.querySelector('form')
const inputLocation = document.querySelector('input')

const forecastMessage = document.querySelector('#forecast-message')
const error = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const search = inputLocation.value

    forecastMessage.textContent = 'Getting Forecast!'
    error.textContent = ''

    fetch('http://localhost:3000/weather?address=' + search).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            forecastMessage.textContent = ''
            error.textContent = data.error
        }
        else
        forecastMessage.textContent = data.forecast
    })
})
})