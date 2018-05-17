import axios from 'axios';
import cheerio from 'cheerio';
import { Graph } from './wiki';

interface webLinkGraph {
  links: Array<{ source: string; target: string; value: number; targetLink: string; }>
  nodes: Array<{ id: string | undefined; group: number | undefined; }>
}

const getGoogleSearchResults = (req: any, res: any) => {
  const { query } = req.body;
  axios.get(`https://www.google.com/search?output=search&query=${query}`)
  .then((result: any) => {
    const $ = cheerio.load(result.data);
    const results: any = [];  

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

const webRecommendations = (req: any, res: any) => {
  const { link, query } = req.body;
  const memo: any = {};

  axios.get(link)
  .then((result: any) => {
    const recommendations: webLinkGraph = {links: [], nodes: []};
    const $ = cheerio.load(result.data);

    $('body').find('a').each((i, ele) => {
      const title: string = $(ele).text();
      const link: string = $(ele).attr('href');
      if (!memo[title] && title && title.match(/\W/)) {
        recommendations.nodes.push({id: title, group: 1});
        recommendations.links.push({source: query, target: title, value: 1, targetLink: link });
        memo[title] = true;
      }
        
    })
    
    res.send(recommendations);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

export {
  webRecommendations,
  getGoogleSearchResults
}