const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const emp = require('../models/employee');

passport.use(new LocalStrategy({
    usernameField: 'username',
},function(username,password,done){
    emp.findOne({username: username},function(err,empl){
        if(err){
            console.log(err);
            return done(err);
        }
        if(!empl || empl.password!=password){
            console.log("Invalid Username/Password");
            return done(null,false);
        }
        return done(null,empl);
    })
}))


passport.serializeUser(function(empl,done){
    done(null, empl.id)
})

passport.deserializeUser(function(id, done){
    emp.findById(id,function(err,empl){
        if(err){
            console.log(err);
            return done(err);
        }

        return done(null, empl)
    })
})

passport.checkAuthentication = function(req,res,next){
    console.log("hel")
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/signin');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
}

module.exports = passport;