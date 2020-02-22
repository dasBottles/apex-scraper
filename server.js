const express = require('express'),
    cheerio = require('cheerio'),
    axios = require('axios'),
    mongoose = require('mongoose');
    db = require('./models');

const app = express(),
    PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));    

mongoose.connect("mongodb://user:password1@ds213896.mlab.com:13896/heroku_qtvczxd3", { useNewUrlParser: true });

// A GET route for scraping the Apex Legends update page
app.get('/scrape', (req, res) =>{
    axios.get('https://www.ea.com/games/apex-legends/news')
    .then((response) => {
        let $ = cheerio.load(response.data);
        let result = {};
        $('eapl-tile h5').each((i, element) =>{

            result.title = $(element)
            .children('a')
            .text();

            result.link = $(element)
            .children('a')
            .attr('href');

            db.Article.create(result)
            .then((dbArticle) => {
                console.log(dbArticle);
            })
            .catch((err) => {
                res.send(err);
            });
        });
    });
    res.send('Scrape Complete');
});


app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/public/html/index.html")
})

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
});