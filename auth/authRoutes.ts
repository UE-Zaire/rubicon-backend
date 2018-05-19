import passport from 'passport';

const authenticate = (req: any , res: any) => {
  passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile']
  })(req, res); 
}

const callBackAuth = (req: any, res: any, next: any) => {
  passport.authenticate('google', { failureRedirect: '/' })(req, res, next);
}

const callBackSucc = (req: any, res: any) => {
  const { token, id } = req.user;
  req.session.token = token;
  req.session.id = id;
  res.redirect('http://localhost:3000');
}

const logout = (req: any, res: any) => {
  req.logout();
  req.session = null;
  res.redirect('http://localhost:3000');
}

const checkLogged = (req: any, res: any) => {
  const logged = !!req.session.token;
  if (logged) {
    console.log(req.session);
    res.send('true');
  } else {
    res.send('false');
  }
}

const createChromeSession = (req: any, res: any) => {
  const { id } = req.body;
  req.session.id = id;
  console.log(req.session);
  res.send('saved');
}

export {
  authenticate,
  callBackAuth,
  callBackSucc,
  logout,
  checkLogged,
  createChromeSession
}