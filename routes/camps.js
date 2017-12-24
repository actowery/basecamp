var express = require("express");
var router = express.Router();
var Camp = require("../models/camp");
var middleware = require("../middleware");

//INDEX - Show all camp
router.get("/", function(req,res){
    //get all camps from db
    Camp.find({},function(err, allCamps){
        if(err){
            console.log(err);
        } else{
            res.render("camps/index",{camps:allCamps, currentUser:req.user});
        }
    });
});
//CREATE - add new camp to DB
router.post("/", middleware.isLoggedIn, function(req,res){
    //get data and add to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, desc: desc, author:author};
    //create new camp and save to db
    Camp.create(newCamp,function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            console.log(newlyCreated);
            res.redirect("/camps");
        }
    });

});
//NEW CAMP - show form to create new camp
router.get("/new", middleware.isLoggedIn, function(req, res) {
   res.render("camps/new"); 
});
//SHOW - info about a camp
router.get("/:id", function(req,res){
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

//EDIT Camp Route
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Camp.findById(req.params.id, function(err, foundCamp){
        if(err){/*meh*/}
        res.render("camps/edit", {camp:foundCamp});
    });
});
//UPDATE Camp Route
router.put("/:id", middleware.checkOwnership, function(req, res) {
    //find and update 
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updated){
        if(err){
            res.redirect("/camps");
        } else {
            res.redirect("/camps/"+req.params.id);
        }
    });
});

//DESTROY Camp Route
router.delete("/:id", middleware.checkOwnership, function(req,res){
     Camp.findByIdAndRemove(req.params.id, function(err){
         if(err){}
         res.redirect('/camps');
     });
});



    
module.exports = router;
