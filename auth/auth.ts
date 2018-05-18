import { OAuth2Strategy } from 'passport-google-oauth';
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
  },
  (token: any, refreshToken: any, profile: any, done: any) => {
    return done(null, {
      profile: profile,
      token: token
    });
  }));
}

