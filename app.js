var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
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
app.use(methodOverride("_method"));
app.use(flash());

//seed the DB
//seedDB();

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


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/camps", campRoutes);
app.use("/camps/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("baseCamp Server Has Started!");
});