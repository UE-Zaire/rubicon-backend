import axios from 'axios';
import cheerio from 'cheerio';
import { Graph } from './wiki';
import google from 'google';

interface webLinkGraph {
  links: Array<{ source: string; target: string; value: number; targetLink: string; }>
  nodes: Array<{ id: string | undefined; group: number | undefined; }>
}

const getGoogleSearchResults = (req: any, res: any) => {
  const { query } = req.body;

  google.resultsPerPage = 25

  google(query, (err: any, response: any) => {
    if (err) console.error(err)
    const result: any = [];

    for (let i = 0; i < response.links.length; ++i) {
      const link = response.links[i];
      result.push({ title: link.title, link: link.href, description: link.description });
    }
  res.send(result);
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