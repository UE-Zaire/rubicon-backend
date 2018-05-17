import axios from 'axios';
import cheerio from 'cheerio';
import { Graph } from './wiki';

const webRecommendations = (req: any, res: any) => {
  const { link, query } = req.body;
  axios.get(link)
  .then((result: any) => {
    const $ = cheerio.load(result.data);
    const arr = $('a');
    const recommendations: Graph = {links: [], nodes: []};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].children[0]) {  
        const item: any = arr[i].children[0].data;
        if (item && !item.match(/\W/)) {
          recommendations.nodes.push({id: item, group: 1});
          recommendations.links.push({source: query, target: item, value: 1});
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
  webRecommendations
}