import { Router } from 'express';
import { wikiRecommendations } from './scrapers/wiki';
import { webRecommendations } from './scrapers/web';
import { getWikiSearchResults, getGoogleSearchResults } from './APIs/search';

const router: Router = Router();

router.post('/api/wikiSearch', getWikiSearchResults);
router.post('/api/googleSearch', getGoogleSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/webRecommendations', webRecommendations);

export {
  router
}