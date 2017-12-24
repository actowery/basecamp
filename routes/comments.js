//express router
var express = require("express");
var router = express.Router({mergeParams:true}); //mergeParams allows access for comment routes
var Camp = require("../models/camp");
var Comment = require("../models/comment");

//NEW COMMENT - show form to create new camp comment only if logged in
router.get("/new", isLoggedIn,function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.loge(err);
        } else {
            res.render("comments/new", {camp:camp});
        }
    });
});

//CREATE COMMENT - add new comment to camp DB
router.post("/", isLoggedIn,function(req,res){
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
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/camps/"+camp._id);
                }
            });
        }
    });

});
//middleware to be refactored soon
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
module.exports = router;