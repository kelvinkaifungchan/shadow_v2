require('dotenv').config();

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
    const strategy = new passportJWT.Strategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (payload, done) => {
        console.log(payload);
        let user = await knex("users").where({
          email: payload.email,
        });
  
        if (user.length === 0) {
          return done(new Error("User not found"), null);
        } else {
          console.log("successfully authenticated")
            return done(null, user);
        }
      }
    );
    passport.use(strategy);
  
    return {
      initialize: () => {
        return passport.initialize();
      },
      authenticate: () => {
        return passport.authenticate("jwt", {
            session: false,
          });
      },
    };
  };