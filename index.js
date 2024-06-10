const PORT = 8000
const express = require('express')// need to initialize
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    res.json('Welcome to my Weather variable API')
});

app.get('/news', (req, res) => {
    //res.json('Welcome to my Weather variable API')
    axios.get('https://www.theguardian.com/environment/climate-crisis')
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
               const title = $(this).text() 
            })
        })
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


//console.log(axios.isCancel('something'));