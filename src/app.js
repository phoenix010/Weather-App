require('dotenv').config()
const path = require('path')
const hbs = require('hbs')
const express = require('express')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const PORT =process.env.PORT || 3000

const app = express()
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

const partialsPath = path.join(__dirname,'../templates/partials')

const viewsPath = path.join(__dirname,'../templates/views')
//Set up view engine with handlebars
app.set('view engine', 'hbs')

//set up views(view location) with templates
app.set('views', viewsPath)

//set up static directories
app.use(express.static(publicDirectoryPath))

//set up partials
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Aditya Tyagi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aditya Tyagi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Aditya Tyagi',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            ErrorMessage: "Please Enter Address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = { })=>{
        if(error){
          return res.send({error})  
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address   
            })


        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
    title: 'Help Article not found',
    name: 'Aditya Tyagi',
    errorMessage: 'Help Article not found.' 
    })
    })

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Aditya Tyagi',
    errorMessage: 'Page not found.'
    })
    })


app.listen(PORT, () => {
    console.log('Server is up on port',PORT)
})