module.exports = function(passport){

    // serialize
    passport.serializeUser(function(user, done){ 
        done(null, user.id);
    });

    // deserialize
    passport.deserializeUser(function(user, done){ 
        User.findById(id, function(err, user){
            done(err, user)
        });
    });

    passport.use('')

};