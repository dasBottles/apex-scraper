const axios = require('axios'),
    cheerio = require('cheerio');

const scrapeSummary = async (link) => {
    // let keySet = '';
    const response = await axios.get(`https://www.originativeco.com${link}`)
    // axios.get(`https://www.originativeco.com/products/gmk-toxic`)
        let $ = cheerio.load(response.data);
        $('.rte').each((i, element) => {
            let summary = {};

            summary.body = $(element)
            .children('p')
            .text();

            console.log(summary.body);
            return summary.body;
        });
};

module.exports = scrapeSummary;