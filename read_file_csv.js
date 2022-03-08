
const csv = require('csv-parser');
const fs = require('fs');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());

const router = express.Router();
const data = []

// Load data
fs.createReadStream('01-01-2021.csv')
    .pipe(csv())
    .on('data', (row) => {
        data.push(row);
    });

// List of countries
function list_countries() {
    const countries = [];
    for(const i of data){
        if(countries.indexOf(i.Country_Region) === -1 ){
            countries.push(i.Country_Region);
        }
    }
    return countries;
}

// List of Countries and Provinces
function list_provinces(){
    
    var res = data.reduce(function(a, b) {
        if(a[b['Country_Region']]) {
          a[b['Country_Region']].push( {Province_State: b['Province_State']} )
        } else {
          a[b['Country_Region']] = [ {Province_State: b['Province_State']} ]
        }
        return a
      }, {})
    return res;
}

//Routes for API
router.get("/", function(req, res){
    res.send(list_provinces());
    //res.send('Hello Aictive, this API was developed by Rayd Trujillo :)');
});

router.get("/countries_confirmed", function(req, res){
    const countries = list_countries();
    const result = [];

    for(const country of countries){
        country_confirmed = {}
        confirmed = 0
        for(const i of data){
            if(i.Country_Region == country){
                confirmed += parseInt(i.Confirmed)
            }
        }
        country_confirmed['Country_Region'] = country;
        country_confirmed['Confirmed'] = confirmed;
        result.push(country_confirmed);
    }
    res.status(200).jsonp(result);
});

router.get("/countries_active", function (req, res) {
    if(!req.query.min || !req.query.max){
        res.status(400).jsonp({status_code: 400, message: "You must enter the minimum and maximum range"});
    }
    const min = parseInt(req.query.min)
    const max = parseInt(req.query.max)
    if( min >= max){
        res.status(400).jsonp({status_code: 400, message: "The maximum range must be greater than the minimum range"});    
    }
    const result = [];
    for(const i of data){
        countries_active = {}
        if(parseInt(i.Active) >= min && parseInt(i.Active) <= max){
            countries_active['Country_Region'] = i.Country_Region;
            countries_active['Province_State'] = i.Province_State;
            countries_active['Active'] = parseInt(i.Active);
            result.push(countries_active);
        }
    }
    res.status(200).jsonp(result);
})

app.use(router);

app.listen(3000, function(){
    console.log("Node server running on http://localhost:3000/");
})
