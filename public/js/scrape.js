const axios = require('axios'),
    cheerio = require('cheerio');
    db = require('../../models');
    swal = require('sweetalert');
    scrapeSummary = require('./summary');
    


const scrapeData = (req, res) => {
    axios.get('https://www.originativeco.com/collections/keysets')
    .then((response) => {
        let $ = cheerio.load(response.data);
        
        $('.product-inner').each(async (i, element) =>{
            let result = {};
            
            result.title = $(element)
            .children('.title')
            .find('a')
            .text();

            result.link = $(element)
            .children('.title')
            .find('a')
            .attr('href');

            result.img = $(element)
            .find('img')
            .attr('src')

            result.summary = await scrapeSummary(result.link)
            
            console.log(result);
            db.Article.create(result)
            .then((dbArticle) => {
                console.log(dbArticle);
            })
            .catch((err) => {
                console.log(err);
            });
        });
    });
    res.send('Scrape Complete!');
    // swal("Nice", "You scraped the page!", "success");
}
module.exports = scrapeData;