//express router
var express = require("express");
var router = express.Router({mergeParams:true}); //mergeParams allows access for comment routes
var Camp = require("../models/camp");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//NEW COMMENT - show form to create new camp comment only if logged in
router.get("/new", middleware.isLoggedIn,function(req, res) {
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            console.loge(err);
        } else {
            res.render("comments/new", {camp:camp});
        }
    });
});

//CREATE COMMENT - add new comment to camp DB
router.post("/", middleware.isLoggedIn,function(req,res){
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

//EDIT Camp Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, found) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {camp_id:req.params.id, comment: found});
        }
    });
});
//UPDATE Camp Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //find and update 
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/camps/"+req.params.id);
        }
    });
});

//DESTROY Camp Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
     Comment.findByIdAndRemove(req.params.comment_id, function(err){
         if(err){
             res.redirect("back");
         } else {
         res.redirect("/camps/"+req.params.id);
         }
     });
});


module.exports = router;