const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// define paths for express
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars and locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Snehil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Snehil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Snehil',
        message: 'Please help us developers'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'Please provide an address',
        })
    }

    geocode(req.query.address, (error, geoData) => {
        if(error){
            return res.send({error})
        }
        
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            
            result = 'The temperature is '+ forecastData + ' degree celsius in ' + geoData.name

            res.send({
                address: req.query.address,
                forecast: result,
                longitude: 83,
                latitude: 256
            }) 
        } )
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'Help Article not found',
        name: 'Error handling service'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        message: 'My 404 page',
        name: 'Error service'
    })
})

app.listen(3000, () => {
    console.log('Express started')
})