import * as passportAuth0 from 'passport-auth0';
import { functionConfig } from '../common/utils';
const config = functionConfig();
export const Auth0strategy = new passportAuth0(
    {
        domain: config.AUTH0_DOMAIN,
        clientID: config.AUTH0_CLIENT_ID,
        clientSecret: config.AUTH0_CLIENT_SECRET,
        callbackURL:
            config.AUTH0_CALLBACK || "http://localhost:5050/callback"
    // tslint:disable-next-line: only-arrow-functions
    }, function (accessToken, refreshToken, extraParams, profile, done) {
        /**
         * Access tokens are used to authorize users to an API
         * (resource server)
         * accessToken is the token to call the Auth0 API
         * or a secured third-party API
         * extraParams.id_token has the JSON Web Token
         * profile has all the information from the user
         */
        return done(null, profile);
    }
)