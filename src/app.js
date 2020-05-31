const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const app = express()
// for Heroku
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handle bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // render is used for the handlebars (e.g. dynamic pages)
    res.render('index', {
        title: 'Weather app',
        name: 'Omar Miyazaki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Omar Miyazaki'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpInfo: 'I can help you with a web app',
        title: 'Help',
        name: 'Omar Miyazaki'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) { 
        return res.send({
            'error': 'You must provide a search term'
        })
    } else {
        geocode(address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData, 
                    location: location,
                    address: address
                })
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        text404: 'Help article not found.',
        title: '404',
        name: 'Omar Miyazaki'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        text404: 'Page not found',
        title: '404',
        name: 'Omar Miyazaki'
    })
})

   
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})