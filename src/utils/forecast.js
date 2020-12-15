const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=aeac79090ebb3bac65574d1ade469ca3&units=metric'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service', undefined)
        }
        else if (body.message) {
            callback(body.message, undefined)
        }
        else {
            callback(undefined ,body.main.temp)
        }
    })
}

module.exports = forecast