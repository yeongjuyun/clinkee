import { Strategy } from "passport-google-oauth20";
import { authService } from "../../services";
import { userJWTObjectMaker } from "../../utils";
import dotenv from "dotenv";

dotenv.config();
const config = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
};

const google = new Strategy(
  config,
  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      email: profile._json.email,
      userName: profile.displayName,
      profileImage: profile.photos[0].value,
    };
    try {
      const user = await authService.findOrCreateUser(newUser, "google");
      done(null, userJWTObjectMaker(user));
    } catch (e) {
      done(e, null);
    }
  }
);

export { google };
