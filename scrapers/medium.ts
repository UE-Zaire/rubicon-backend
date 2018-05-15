import puppeteer from 'puppeteer';
import axios from 'axios';
import cheerio from 'cheerio';
import scraper from 'website-scraper';

const getPic = async (req: any, res: any) => {
  const { link } = req.body;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(link);
  await page.screenshot({ path: 'medium.png'});

  await browser.close();

  res.send('got it!');
}

const scrapeMedium = async (req: any, res: any) => {
  const { link } = req.body;
  // const browser = await puppeteer.launch({ headless: true });
  // const page = await browser.newPage();
  // await page.goto(link);
  // await page.waitFor(1000);

  // const bodyHandle = await page.$('.section-content');
  // const html = await page.evaluate((body) => body.innerHTML, bodyHandle);

  var options = {
    urls: [link],
    directory: __dirname + '/images',
    sources: [
      {selector: 'img', attr: 'src'}
    ]
  };

  scraper(options).then(() => {
    res.send('there');
  });

  //browser.close();
}

export {
  getPic,
  scrapeMedium
}