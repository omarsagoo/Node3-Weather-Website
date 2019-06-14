const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1Ijoib21zYWdvbyIsImEiOiJjandqa3Jzd2cwNmk1NDltcGtndnBlejJlIn0.UKJXHSBKz8_TRjzwVQrudw&limit=1'

    request({ url, json: true }, (error, {body}) => {

        const { length, center, place_name } = body.features[0]

        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (length === 0) {
            callback('Unable to find Location! Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })
        }
    })
}

module.exports = geocode
