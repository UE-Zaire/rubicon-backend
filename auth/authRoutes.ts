import passport from 'passport';
import knex from '../database/database';

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
    const name = req.session.passport.user.profile.displayName;
    const image = req.session.passport.user.profile.photos[0].value;
    res.send({ logged: true, name, image });
  } else {
    res.send({ logged: false });
  }
}

const createChromeSession = async (req: any, res: any) => {
  const { id, name, link, picture } = req.body;
  
  const checkUser = await knex('users').select().where({ email_id: id });

  if (!checkUser.length) {
    await knex('uses').insert({ user_name: name, email_id: id });
  }

  req.session.id = id;
  req.session.name = name;
  req.session.picture = picture;
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