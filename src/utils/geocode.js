const request = require('request')
const geoCode = (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2ltdG9uZyIsImEiOiJja3Zkc3g5ZW1iYWxjMzBtYXhsaHhuZWNxIn0.dkNXPtA77i4mIiv1fIysFA&limit=1`;
    request({url, json:true},(error,{body})=>{
        if (error){
            callback("Check your internet connection",undefined);
        } else if (body['features'].length === 0){
            callback("unable to find your location",undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;