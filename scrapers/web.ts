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
      let title: any = $(ele).text().replace(/[ ]+/g, ' ').replace(/\n/g, '').trim().slice(0, 10);
      title = title.padEnd(13, '.');
      const link: string = $(ele).attr('href');
      const letterMatch = title.match(/[A-Za-z]/g);
      const nonLetterMatch = title.match(/\W/g);
      if (!memo[title] && title && letterMatch && nonLetterMatch && letterMatch.length >= nonLetterMatch.length && recommendations.nodes.length < 100 && title.length > 1 && title.length < 20 && !bland[title.toLowerCase()]) {
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
      let title: any = $(ele).text().replace(/[ ]+/g, ' ').replace(/\n/g, '').trim().slice(0, 13);
      title = title.padEnd(13, '.');
      const link: string = $(ele).attr('href');
      count++;
      if (count > 10 && !memo[title] && !title.match(/\W/) && title.match(/[A-Za-z]/g) && recommendations.length < 3 && !bland[title.toLowerCase()] && title.length > 1 && title.length < 20) {
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

const testRecs = (req: any, res: any) => {
  const { link } = req.body;
  const memo: any = {};

  axios.get(link)
  .then((result: any) => {
    const recommendations: any = [];
    const $ = cheerio.load(result.data);
    let count = 0;
    $('body').find('a').each((i, ele) => {
      const title: string = $(ele).text().replace(/[ ]+/g, ' ').replace(/\n/g, '').trim();
      const link: string = $(ele).attr('href');
      count++;

      if (count > 10 && !memo[title] && recommendations.length < 100 && !bland[title.toLowerCase()] && title.length > 1 && link.slice(0, 4) === "http") {
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
  extensionRecs,
  testRecs
}































