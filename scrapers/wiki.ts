import axios from 'axios';
import cheerio from 'cheerio';

interface Graph {
  links: Array<{ source: string; target: string; value: number; }>
  nodes: Array<{ id: string | undefined; group: number | undefined; }>
}

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

const wikiRecommendations = (req: any, res: any) => {
  const { link, query } = req.body;
  const memo: any = {};

  axios.get(link)
  .then((result: any) => {
   const recommendations: Graph = {
     links: [], 
     nodes: [ 
     {id: query, group: 1} 
     ]
   };
   memo[query] = true;

   const $ = cheerio.load(result.data);
   var sent = false;

   $('div[id=content]').find('a').each((i, ele) => {
     const title = $(ele).attr('title');

     if (title && !title.match(/\W/) && !memo[title]) {
       recommendations.nodes.push({id: title, group: 1});
       recommendations.links.push({source: query, target: title, value: 1});
       memo[title] = true;
     } 

     if (recommendations.nodes.length === 100 && !sent) {
       sent = true;
       res.send(recommendations);
     }
   })

   if (!sent) res.send(recommendations);
  })
  .catch((err: any) => {
    console.log(err);
  })
}

export {
  wikiRecommendations,
  getWikiSearchResults,
  Graph
}