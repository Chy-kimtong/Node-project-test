// node .\src\app.js -e js,hbs
const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const morgan =require('morgan');
const res = require('express/lib/response');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("server is up on port :",port);
})


// define paths for express config
const staticFilePath = path.join(__dirname,'../staticFile');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handlebars engine and views folder location
app.set('view engine','hbs')    //we tell express to look for hbs file
app.set('views',viewsPath)  // defaults will find views folder but we change its name to templates
hbs.registerPartials(partialsPath)


// middleware of static files (set up static directory to serve)
// we can access all file in th staticFile folder
app.use(express.static(staticFilePath))
// 3rd party of middleware by morgan
app.use(morgan('dev')); //display the time and status`and route


// render the file != send just send a normal html or string or json
app.get("/",(req,res)=>{
    res.render('index',{
        name: "Kimtong",
        age: 20,
        title: "this is our homepages"
    });
})
app.get("/about",(req,res)=>{
    res.render('about',{
        title: "about our information!!"
    })
})

// 1 req and 1 res per time
app.get('/products',(req,res)=>{
    // req.query.Whatever we use in the query string
    if(!req.query.search){
        // use return to leave the function
        return res.send({
            error: "You must provide the search term"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

// Query string
app.get('/weather',(req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "There is no search term for specific location"
        })
    }
    geocode(address,(error,{latitude,longtitude,location}={} )=>{   //={} to prevent from error to be undefined
        if (error){
            return res.send({error});
        }

        forecast(latitude,longtitude,(error,forcastData)=>{
            if(error){
                return res.send({error});
            }
            
            res.send({
                forecast: forcastData,
                location,
                address
            })
        })
    })
    // res.send({
    //     // req.query.Whatever we use in the query string
    //     address: req.query.address
    // })
})

app.get("/help",(req,res)=>{
    res.render('help',{
        helpText: 'I want to be node js developer',
        title: "Kinda help me to be an expert"
    })
})
app.get('/help/*',(req,res)=>{
    res.send('There is no other help was found',{
        title: '404',
        name: 'Unknown',
        errorMessage: 'Help article not found'
    })
})
// '*' char will handle every routes(char) that don't match the above route(char)
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Unknown',
        errorMessage: 'What you doing here, 404 is here'
    })
})
