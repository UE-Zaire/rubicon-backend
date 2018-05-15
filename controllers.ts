import { Router } from 'express';
import { wikiScraper, wikiRecommendations } from './scrapers/wiki';
import { getPic, scrapeMedium } from './scrapers/medium';
import { getSearchResults } from './wikipediaAPI/search';

const router: Router = Router();

router.post('/api/wiki', wikiScraper);
router.post('/api/medium', scrapeMedium);
router.post('/api/wikiSearch', getSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);

export {
  router
}