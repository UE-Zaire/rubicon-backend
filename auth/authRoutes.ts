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
  req.session.token = req.user.token;
  res.redirect('http://localhost:3000');
}

const logout = (req: any, res: any) => {
  req.logout();
  req.session.exists = false;
  res.redirect('http://localhost:3000');
}

const checkLogged = (req: any, res: any) => {
  const logged = !!req.session.token;
  if (logged) {
    res.send('true');
  } else {
    res.send('false');
  }
}

export {
  authenticate,
  callBackAuth,
  callBackSucc,
  logout,
  checkLogged
}