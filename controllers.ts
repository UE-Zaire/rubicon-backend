import { Router } from 'express';
import { wikiRecommendations, getWikiSearchResults } from './scrapers/wiki';
import { webRecommendations, getGoogleSearchResults } from './scrapers/web';

const router: Router = Router();

router.post('/api/wikiSearch', getWikiSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/googleSearch', getGoogleSearchResults);
router.post('/api/webRecommendations', webRecommendations);

export {
  router
}