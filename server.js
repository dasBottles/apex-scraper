const express = require('express'),
    mongoose = require('mongoose'),
    db = require('./models'),
    scrapeData = require('./public/js/scrape'),
    scrapeSummary = require('./public/js/summary');

const app = express(),
    PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public")); 
   
mongoose.connect("mongodb://user:password1@ds213896.mlab.com:13896/heroku_qtvczxd3", { useNewUrlParser: true });

// A GET route for scraping the keysets from originativeco
app.get('/scrape', (req, res) =>{
    // scrapeData(req, res);
    scrapeSummary(req,res);
});


app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/public/html/index.html")
});

app.get('/keysets', (req, res)=> {
    db.Article
    .find({})
    .then((response) => {
        res.json(response);
    })
    .catch((err) => {
        if (err) {
            res.json(err);
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`Listening on port: ${PORT}`);
});