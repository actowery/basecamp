var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Camp = require("./models/camp"),
    seedDB = require("./seeds");
    

seedDB();
mongoose.connect("mongodb://localhost/basecamp");   
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");




app.get("/", function(req,res){
    res.render("landing");
});

//INDEX - Show all camp
app.get("/camps", function(req,res){
    //get all camps from db
    Camp.find({},function(err, allCamps){
        if(err){
            console.log(err)
        } else{
            res.render("index",{camps:allCamps});
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
//NEW - show form to create new camp
app.get("/camps/new", function(req, res) {
   res.render("new"); 
});
//SHOW - info about a camp
app.get("/camps/:id", function(req,res){
    //get camp id
    Camp.findById(req.params.id,function(err, camp){
        if(err){
            console.log(err);
        } else{
            res.render("show", {camp:camp});
        }
    });
});
app.listen(process.env.PORT,process.env.IP, function(){
    console.log("baseCamp running");
});
 