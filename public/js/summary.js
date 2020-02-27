const axios = require('axios'),
    cheerio = require('cheerio'),
    db = require('../../models');

const scrapeSummary = (req, res) => {
    // let keySet = '';
    // axios.get(`https://www.originativeco.com/products/${keySet}`)
    axios.get(`https://www.originativeco.com/products/gmk-toxic`)
    .then((response) => {
        let $ = cheerio.load(response.data);
        $('.rte').each((i, element) => {
            let summary = {};

            summary.body = $(element)
            .children('p')
            .text();

            console.log(summary);
            res.json(summary)
        });
    });
};

module.exports = scrapeSummary;