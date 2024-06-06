const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("../model/userSchema");
const entitlementdb=  require("../model/entitlementSchema");
const clientid = process.env.CLIENT_ID;
const clientsecret = process.env.CLIENT_SECRET;

passport.use(
    new OAuth2Strategy({
        clientID: clientid,
        clientSecret: clientsecret,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userdb.findOne({ googleId: profile.id });

            if (!user) {
                user = new userdb({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
                    // ,isAdmin:isAdmin
                });

                await user.save();
            }
            const entitlement = await entitlementdb.findOne({ userId: profile.emails[0].value });
            const isAdmin = entitlement ? entitlement.role.includes('admin') : false;
            user.isAdmin = isAdmin;
            // console.log(entitlement.role)
            // console.log(profile.emails[0].value)
            // console.log(isAdmin)
            //user.isAdmin = isAdmin;


            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;
