const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic25laGlsLSIsImEiOiJja2d3YXBmNngwMHE1MnhwZm9xbnplcG5oIn0.r75FPHR48m8UtoeoV-e5Ig'

    request({ url, json: true }, (error, response) => {
        if (error)
            callback('Unable to connect to location service', undefined)
        else if (response.body.message || response.body.features.length === 0)
            callback('Unable to find location', undefined)
        else
            callback(undefined, {
                name: response.body.features[0].place_name,
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]
            })
    })
}
module.exports = geocode
