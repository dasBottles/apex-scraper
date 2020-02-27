const axios = require('axios'),
    cheerio = require('cheerio');
    db = require('../../models');
    swal = require('sweetalert');
    


const scrapeData = (req, res) => {
    axios.get('https://www.originativeco.com/collections/keysets')
    .then((response) => {
        let $ = cheerio.load(response.data);
        $('.product-inner .title').each((i, element) =>{
            let result = {};
            
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
                console.log(err);
            });
        });
        // console.log(result.title);
    });
    res.send('Scrape Complete!');
    // swal("Nice", "You scraped the page!", "success");
}
module.exports = scrapeData;