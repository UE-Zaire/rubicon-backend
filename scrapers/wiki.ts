import axios from 'axios';
import cheerio from 'cheerio';

export interface Graph {
  links: Array<{ source: string; target: string; value: number }>;
  nodes: Array<{ id: string | undefined ; group: number | undefined}>
}

const wikiScraper = (req: any, res: any) => {
  const { link } = req.body;
  axios.get(link)
  .then((result: any) => {
    const $ = cheerio.load(result.data);
    res.send($('body').html());
  })
  .catch((err: any) => {
    console.log(err);
  })
};

const wikiRecommendations = (req: any, res: any) => {
  const { link, query } = req.body;
  axios.get(link)
  .then((result: any) => {
    const memo: any = {};
    const $ = cheerio.load(result.data);
    const arr: any = $('a');
    const recommendations: Graph = {links: [], nodes: []};

    recommendations.nodes.push({id: query, group: 1});

    for (let i = 13; recommendations.nodes.length < arr.length && recommendations.nodes.length < 100; i++) {
      if (arr[i].children[0]) {
        const item: any = arr[i].children[0].data;
        if (item === '^') {
          return res.send(recommendations);
        } else if (item && item.indexOf('[') === -1 && !memo.hasOwnProperty(item)) {
          recommendations.nodes.push({id: item, group: 1});
          recommendations.links.push({source: query, target: item, value: 1});
          memo[item] = true;
        }
      }
    }
    
    res.send(recommendations);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

export {
  wikiScraper,
  wikiRecommendations
}