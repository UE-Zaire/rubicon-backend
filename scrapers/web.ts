import axios from 'axios';
import cheerio from 'cheerio';
import { Graph } from './wiki';
import google from 'google';
import bland from './commonLinks';

interface webLinkGraph {
  links: Array<{ source: string; target: string; value: number; }>
  nodes: Array<{ id: string | undefined; group: number | undefined; link: string; }>
}

const getGoogleSearchResults = (req: any, res: any) => {
  const { query } = req.body;

  google.resultsPerPage = 25

  google(query, (err: any, response: any) => {
    if (err) console.error(err)
    const result: any = [];

    for (let i = 0; i < response.links.length; ++i) {
      const link = response.links[i];
      if (link.description && link.description.length > 2) {
        result.push({ title: link.title, link: link.href, description: link.description });
      }
    }
  res.send(result);
  })
}

const webRecommendations = (req: any, res: any) => {
  let { link, query } = req.body;
  query = query.replace(/[ ]/g, '\n');
  const memo: any = {};

  axios.get(link)
  .then((result: any) => {
    const recommendations: webLinkGraph = {links: [], nodes: [{ id: query, group: 2, link: link }]};
    const $ = cheerio.load(result.data);
    memo[query] = true;

    $('body').find('a').each((i, ele) => {
      const title: string = $(ele).text().replace(/[ ]/g, '\n');
      const link: string = $(ele).attr('href');
      if (!memo[title] && title && !title.match(/\W/) && recommendations.nodes.length < 100 && title.length > 1 && !bland[title.toLowerCase()]) {
        recommendations.nodes.push({id: title, group: 1, link: link});
        recommendations.links.push({source: query, target: title, value: 1 });
        memo[title] = true;
      }
        
    })
    
    res.send(recommendations);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

const extensionRecs = (req: any, res: any) => {
  const { link } = req.query;
  const memo: any = {};

  axios.get(link)
  .then((result: any) => {
    const recommendations: any = [];
    const $ = cheerio.load(result.data);
    let count = 0;
    $('body').find('a').each((i, ele) => {
      const title: string = $(ele).text().replace(/[ ]/g, '\n');
      const link: string = $(ele).attr('href');
      count++;
      if (count > 10 && !memo[title] && !title.match(/\W/) && recommendations.length < 3 && !bland[title.toLowerCase()]) {
        recommendations.push([title, link]);
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
  getGoogleSearchResults,
  extensionRecs
}