import { Router } from 'express';
import { wikiRecommendations, getWikiSearchResults } from './scrapers/wiki';
import { webRecommendations, getGoogleSearchResults } from './scrapers/web';
import { login, addUser } from './database/controllers/users';
import { saveHistory, getHistories } from './database/controllers/histories';
import passport from 'passport';

const router: Router = Router();

router.post('/api/wikiSearch', getWikiSearchResults);
router.post('/api/wikiRecommendations', wikiRecommendations);
router.post('/api/googleSearch', getGoogleSearchResults);
router.post('/api/webRecommendations', webRecommendations);

router.post('/api/user', addUser);
router.post('/api/login', login);
router.post('/api/history', saveHistory);

router.post('/api/histories', getHistories);

router.get('/', (req: any, res: any) => {
  if (req.session.token) {
    res.cookie('token', req.session.token);
    res.json({
        status: 'session cookie set'
    });
  } else {
    res.cookie('token', '')
    res.json({
        status: 'session cookie not set'
    });
  }
})

router.get('/login', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

router.get('/api/auth',
    passport.authenticate('google', { failureRedirect: '/' }), 
    (req: any, res: any) => {
      req.session.token = req.user.token;
      res.redirect('http://localhost:3000');
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    req.session.exists = false;
    res.redirect('/');
});

router.get('/api/logged', (req, res) => {
  const logged = !!req.session.token;
  if (logged) {
    res.send('true');
  } else {
    res.send('false');
  }
})

export {
  router
}