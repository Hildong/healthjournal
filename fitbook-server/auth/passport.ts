import passport from "passport"
import {Strategy as LocalStrategy} from 'passport-local'
import { IUser, IUserDocument, User } from "../models/user.model";
import bcrypt from 'bcrypt'

declare global {
  namespace Express {
    interface User extends IUserDocument{}
  }
}

passport.serializeUser<any, any> ((req, user, cb) => {
  cb(undefined, user)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, cb) => {
    User.findOne({email: email.toLowerCase()}).exec()
      .then(user => {
        if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }
        
        user.correctPassword(password)
        .then(result => {
          if(result) {
            return cb(undefined, user);
          }
          return cb(undefined, false, {message: "Invalid credentials"})
        })
      })
        .catch(err => {
          return cb(err)
        })
    }) 
)