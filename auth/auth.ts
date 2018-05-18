import { OAuth2Strategy } from 'passport-google-oauth';
import { login } from '../database/controllers/users';
import keys from '../config';

export default (passport: any) => {
  passport.serializeUser((user: any, done: any) => {
    done(null, user);
  });

  passport.deserializeUser((user: any, done: any) => {
    done(null, user);
  });

  passport.use(new OAuth2Strategy({
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3005/api/auth'
  }, login));
}
