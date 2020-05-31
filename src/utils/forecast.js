const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d131ac212b09e8b2f3e52a7e5866f434&query='+ latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service.', undefined)

        } else if (body.error) {
            callback('Unable to find location.', undefined)

        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. it feels like ' + body.current.feelslike + ' degrees out.')

        }

    })

}

module.exports = forecast