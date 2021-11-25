const { add } = require('nodemon/lib/rules');
const request = require('request') 
const geocode = require('./geocode');
const forecast = (latitude, longtitude, callback)=>{
    // not importance url
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${geocode.address}.json?access_token=pk.eyJ1Ijoia2ltdG9uZyIsImEiOiJja3Zkc3g5ZW1iYWxjMzBtYXhsaHhuZWNxIn0.dkNXPtA77i4mIiv1fIysFA&limit=1`;
    request({url, json:true},(error,{body})=>{
        if (error){
            callback("Unable to connect to weather service",undefined);
        } else if (body.error){
            callback("unable to find your location",undefined);
        }else{
            console.log(body['features']);
            const location = body['features'][0]['place_name'];
            callback(undefined,`Location is in ${location} which have latitude is ${latitude} and longtitude is ${longtitude}`);
        }
    })
};

module.exports = forecast;