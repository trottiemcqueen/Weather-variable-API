const PORT = 8000
const express = require('express')// need to initialize
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    res.json('Welcome to my Weather variable API')
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


//console.log(axios.isCancel('something'));