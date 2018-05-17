import { Router } from 'express';
import { wikiRecommendations } from './scrapers/wiki';
import { webRecommendations } from './scrapers/web';
import { getSearchResults } from './wikipediaAPI/search';

const router: Router = Router();

router.post('/api/wikiSearch', getSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/webRecommendations', webRecommendations);

export {
  router
}