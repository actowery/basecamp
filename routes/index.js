//express router
var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//ROOT Route
router.get("/", function(req,res){
    res.render("landing");
});


//Show Register form
router.get("/register", function(req, res) {
   res.render("register"); 
});

//signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err,user){
        if(err){
            console.log(err)
            res.redirect("/register")
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/camps");
        });
    });
});

//Show Login form
router.get("/login", function(req, res) {
   res.render("login"); 
});
//handling login logic using middleware
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/camps",
        failureRedirect:"/login"
    }),function(req, res) {
});
//logout route
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/camps");
});
//logincheck middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
