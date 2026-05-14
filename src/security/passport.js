import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserRepositories from '../services/users/repositories/user-repositories.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const { id: provider_id, displayName: name, emails, photos } = profile;
        const email = emails[0].value;
        const avatar_url = photos[0]?.value ?? null;

        let user = await UserRepositories.findByProviderId(provider_id);

        if (!user) {
          user = await UserRepositories.createUser({
            email,
            name,
            avatar_url,
            provider: 'google',
            provider_id,
          });
        } else {
          user = await UserRepositories.updateUser(user.id, { name, avatar_url });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;