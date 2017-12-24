var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Camp = require("./models/camp"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
//Route reqs    
var commentRoutes = require("./routes/comments"),
    campRoutes = require("./routes/camps"),
    indexRoutes = require("./routes/index");
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/basecamp");   
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
seedDB();

//PASPORT CONFIG
app.use(require("express-session")({
    secret: "The rain in Spain falls mainly in the plain",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for every route to check loged in user
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use("/camps/:id/comments", commentRoutes);
app.use("/camps",campRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("baseCamp Server Has Started!");
});