import { Router } from 'express';
import { wikiRecommendations, getWikiSearchResults } from './scrapers/wiki';
import { webRecommendations, getGoogleSearchResults } from './scrapers/web';
import { login } from './database/controllers/users';
import { saveHistory, getHistories, getHistory } from './database/controllers/histories';
import { authenticate, callBackAuth, callBackSucc, logout, checkLogged, createChromeSession } from './auth/authRoutes';
import passport from 'passport';

const router: Router = Router();

router.post('/api/wikiSearch', getWikiSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/googleSearch', getGoogleSearchResults);
router.post('/api/webRecommendations', webRecommendations);

router.post('/api/history', saveHistory);
router.get('/api/history', getHistory);
router.get('/api/histories', getHistories);

router.get('/login', authenticate);
router.get('/api/auth', callBackAuth, callBackSucc);

router.get('/logout', logout);
router.get('/api/logged', checkLogged);

router.post('/api/chromeSession', createChromeSession);

export {
  router
}