const PORT = process.env.PORT || 8000 // this is for deploying to heroku
const express = require('express');// need to initialize legacy way
const axios = require('axios');
const cheerio = require('cheerio');
const app = express()

const newsp = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: ''
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: ''
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk'
    },
    {
        name: 'sun',
        address: 'https://www.thesun.co.uk/climate-change-environment/',
        base: ''
    },
    {
        name: 'bbc',
        address: 'https://www.bbc.co.uk/news/science_and_environment',
        base: 'https://www.bbc.co.uk'
    },
    {
        name: 'dm',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: ''
    },
    {
        name: 'nyp',
        address: 'https://www.nypost.com/tag/climate-change',
        base: ''
    }

]
const articles = []



newsp.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        })
})

app.get('/', (req, res) => {
    res.json('Welcome to my Weather variable API')
});


app.get('/news', (req, res) => {
    //res.json('Welcome to my Weather variable API')
    res.json(articles)
});


// to get information from just one newspaprer article
app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId

    const newspaperAddress = newsp.filter(newspaper => newspaper.name == newspaperId)[0].address
    const newspaperBase = newsp.filter(newspaper => newspaper.name == newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')

                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperId
                })
            })
            res.json(specificArticles)

        }).catch(err => console.log(err))

})
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


//console.log(axios.isCancel('something'));