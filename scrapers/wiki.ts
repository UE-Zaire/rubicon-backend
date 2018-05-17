import axios from 'axios';
import cheerio from 'cheerio';

interface Graph {
  links: Array<{ source: string; target: string; value: number; }>
  nodes: Array<{ id: string | undefined; group: number | undefined; }>
}

const wikiRecommendations = (req: any, res: any) => {
  const { link, query } = req.body;
  axios.get(link)
  .then((result: any) => {
    const memo: any = {};
    const $ = cheerio.load(result.data);
    const arr: any = $('a', '#bodyContent');
    const arrH: any = $('a', '#bodyContent').html();
    const recommendations: Graph = {links: [], nodes: []};
    recommendations.nodes.push({id: query, group: 1});

    for (let i = 0; recommendations.nodes.length < arr.length && recommendations.nodes.length < 100; i++) {
      if (arr[i].children[0]) {
        const item: any = arr[i].children[0].data;
        if (item && !item.match(/\W/)) {

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
  wikiRecommendations,
  Graph
}