const PORT = 8000
const express = require('express')// need to initialize
const axios = require('axios')
const cheerio = require('cheerio')
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
app.get('/news/:newspaperId', async (req, res) => {
    const newspaperId = req.params.newspaperId

    newsp.filter(newspaper => newspaper.name == newspaperId)

    axios.get()
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


//console.log(axios.isCancel('something'));