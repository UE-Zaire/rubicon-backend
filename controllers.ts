import { Router } from 'express';
import { wikiRecommendations, getWikiSearchResults } from './scrapers/wiki';
import { webRecommendations, getGoogleSearchResults } from './scrapers/web';
import { login } from './database/controllers/users';
import { saveHistory, getHistories, getHistory, deleteHistory, patchHistory } from './database/controllers/histories';
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
router.delete('/api/history', deleteHistory);
router.patch('api/history', patchHistory);

router.get('/login', authenticate);
router.get('/api/auth', callBackAuth, callBackSucc);
router.get('/api/logged', checkLogged);
router.get('/logout', logout);

router.post('/api/chromeSession', createChromeSession);

export {
  router
}

