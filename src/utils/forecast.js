const request = require('request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b1a923b44c0d74363c4ebf3dfce1803b/' + latitude + ','+ longitude
    request({ url, json: true }, (error, {body}) => {

        const {summary} = body.daily.data[0]
        const {temperature, precipProbability} = body.currently

        if (error) {
            callback('Unable to connect to the weather service! Please try again!', undefined)
        } else if (body.error) {
            callback('Unable to find location! Please try again!', undefined)
        } else {
            const timeZone = body.timezone
            callback(undefined, summary + ' It is currently ' + temperature + ' degrees out.' + ' There is a ' + precipProbability*100 + '% chance of rain. In the ' + timeZone + ' timezone')
        }
    })
}

module.exports = forecast