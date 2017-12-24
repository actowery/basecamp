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

app.get("/", function(req,res){
    res.render("landing");
});

//INDEX - Show all camp
app.get("/camps", function(req,res){
    //get all camps from db
    Camp.find({},function(err, allCamps){
        if(err){
            console.log(err);
        } else{
            res.render("camps/index",{camps:allCamps});
        }
    });
});
//CREATE - add new camp to DB
app.post("/camps", function(req,res){
    //get data and add to array
    var newCamp = req.body.camp;
    //create new camp and save to db
    Camp.create(newCamp,function(err, camp){
        if(err){
            console.log(err);
        } else{
            res.redirect("/camps");
        }
    });

});
//NEW CAMP - show form to create new camp
app.get("/camps/new", function(req, res) {
   res.render("camps/new"); 
});
//SHOW - info about a camp
app.get("/camps/:id", function(req,res){
    //get camp id
    Camp.findById(req.params.id).populate("comments").exec(function(err, camp){
        if(err){
            console.log(err);
        } else {
            console.log(camp);
            res.render("camps/show", {camp:camp});
        }
    });
});

//=================
//COMMENTS ROUTES
//=================

//NEW COMMENT - show form to create new camp comment
app.get("/camps/:id/comments/new", function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.loge(err);
        } else {
            res.render("comments/new", {camp:camp});
        }
    });
});

//CREATE COMMENT - add new comment to camp DB
app.post("/camps/:id/comments", function(req,res){
    //get data and add to array
    Camp.findById(req.params.id, function(err, camp) {
        if(err){
            console.log(err);
            res.redirect("/camps");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/camps/"+camp._id);
                }
            });
        }
    });

});
//====================
//AUTH ROUTES
//====================

//SHOW form
app.get("/register", function(req, res) {
   res.render("register"); 
});

//signup logic
app.post("/register", function(req, res) {
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

//show login form
app.get("/login", function(req, res) {
   res.render("login"); 
});
//handling login logic using middleware
app.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/camps",
        failureRedirect:"/login"
    }),function(req, res) {
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("baseCamp Server Has Started!");
});