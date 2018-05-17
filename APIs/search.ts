import axios from 'axios';
import cheerio from 'cheerio';
import google_key from '../config';


const getWikiSearchResults = (req: any, res: any) => {
  const { query } = req.body;
  axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=10&namespace=articles&format=json`)
  .then((result: any) => {
    res.send(result.data[1].map((id: string) => ({ id, label: id })));
  })
  .catch((err: any) => {
    console.log(err);
  })
}

const getGoogleSearchResults = (req: any, res: any) => {
  const { query } = req.body;
  axios.get(`https://www.google.com/search?output=search&query=${query}`)
  .then((result: any) => {
    const $ = cheerio.load(result.data);
    const results: Array<{ title: string, link: string }> = [];    
    $('div[id=ires]').find('a').each((i, ele) => {
      const link = $(ele).attr('href').slice(7);
      const title = $(ele).text();
      if (title !== 'Cached' && title !== 'Similar') {
        results.push({title: title, link: link});
      }
    });

    res.send(results);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

export {
  getWikiSearchResults,
  getGoogleSearchResults
}