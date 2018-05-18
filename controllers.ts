import { Router } from 'express';
import { wikiRecommendations, getWikiSearchResults } from './scrapers/wiki';
import { webRecommendations, getGoogleSearchResults } from './scrapers/web';
import { login, addUser } from './database/controllers/users';
import { saveHistory, getHistories } from './database/controllers/histories';

const router: Router = Router();

router.post('/api/wikiSearch', getWikiSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/googleSearch', getGoogleSearchResults);
router.post('/api/webRecommendations', webRecommendations);

router.post('/api/user', addUser);
router.post('/api/login', login);
router.post('/api/history', saveHistory);

router.post('/api/histories', getHistories);

export {
  router
}