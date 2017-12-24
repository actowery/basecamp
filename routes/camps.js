var express = require("express");
var router = express.Router();
var Camp = require("../models/camp")

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
router.post("/", function(req,res){
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
router.get("/new", function(req, res) {
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

module.exports = router;
